import {
  createVAO,
  createProgram,
  createShader,
  getUniformLocation,
  updateClearColor,
} from "../webgl/webgl";
import { Matrix4, Vector3, Calculator } from "../math/mathematics";
import { createSphereVao } from "./sphereVao";
import colorMaterialVertexShader from "../shader/color/color.vert?raw";
import colorMaterialFragmentShader from "../shader/color/color.frag?raw";
import ColorTextureImage from "../assets/texture/color.png";
export const sketch = async (
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext
) => {
  const vertexShader = createShader(
    gl,
    "VERTEX_SHADER",
    colorMaterialVertexShader
  );

  const fragmentShader = createShader(
    gl,
    "FRAGMENT_SHADER",
    colorMaterialFragmentShader
  );

  const program = createProgram(gl, vertexShader, fragmentShader);

  const attributeLocationIndex = [0, 1, 2, 3];

  const commonAttributeSize = [4, 3, 3, 2];

  const sphereVaoData = createSphereVao(
    attributeLocationIndex,
    commonAttributeSize
  );

  const initSphereVao = createVAO(gl, sphereVaoData.vaoData);
  const sphereVao = initSphereVao.vao;
  const sphereIBO = initSphereVao.ibo;

  // uniformの初期化
  const uniformLocationData = getUniformLocation(gl, program, [
    "uModelViewProjectionMatrix",
    "uColorTexture",
  ]);

  // 各行列の初期化
  const uModelMatrix = Matrix4.identity(Matrix4.init());
  const uViewMatrix = Matrix4.identity(Matrix4.init());
  const uProjectionMatrix = Matrix4.identity(Matrix4.init());
  const uViewProjectionMatrix = Matrix4.identity(Matrix4.init());
  const uModelViewProjectionMatrix = Matrix4.identity(Matrix4.init());

  // 視点ベクトル
  // 視点などの調整で重要
  const eye = Vector3.set(0.0, 0.0, 3.0);
  const center = Vector3.set(0.0, 0.0, 0.0);
  const up = Vector3.set(0.0, 1.0, 0.0);

  let startTime = Date.now();

  let uColorTexture: WebGLTexture | null = null;

  // fetchで実装したほうが良い？
  const img = new Image();

  img.addEventListener("load", () => {
    const initTexture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, initTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

    //グローバルで定義するべきか？
    uColorTexture = initTexture;
  });

  img.src = ColorTextureImage;

  // 有効にしているもの
  // 必ずカリングと深度テストは有効にする
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.CULL_FACE);

  gl.activeTexture(gl.TEXTURE0);

  const draw = () => {
    updateClearColor(canvas, gl, [0.0, 0.0, 0.0]);

    const uTime = (Date.now() - startTime) * 0.025;
    const radian = Calculator.radians(uTime);
    const axis = Vector3.set(0.0, 1.0, 1.0);

    Matrix4.lookAt(eye, center, up, uViewMatrix);

    const fovy = 90.0;
    const aspect = canvas.width / canvas.height;
    const near = 0.1;
    const far = 100;
    Matrix4.perspective(fovy, aspect, near, far, uProjectionMatrix);

    Matrix4.multiply(uProjectionMatrix, uViewMatrix, uViewProjectionMatrix);

    Matrix4.identity(uModelMatrix);

    Matrix4.rotate(uModelMatrix, radian, axis, uModelMatrix);

    Matrix4.multiply(
      uViewProjectionMatrix,
      uModelMatrix,
      uModelViewProjectionMatrix
    );

    const uModelViewProjectionMatrixData = uniformLocationData.get(
      "uModelViewProjectionMatrix"
    );

    if (!uModelViewProjectionMatrixData) {
      throw new Error("Error!! 未定義です");
    }

    gl.uniformMatrix4fv(
      uModelViewProjectionMatrixData,
      false,
      uModelViewProjectionMatrix
    );

    gl.bindTexture(gl.TEXTURE_2D, uColorTexture);
    const uColorTextureData = uniformLocationData.get("uColorTexture");
    if (!uColorTextureData) {
      throw new Error("Error 未定義です");
    }
    gl.uniform1i(uColorTextureData, 0);

    // sphere
    gl.bindVertexArray(sphereVao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIBO);

    const sphereMode = gl.TRIANGLES;
    // const sphereMode = gl.LINES;
    const sphereCount = sphereVaoData.indices.length;
    const sphereType = gl.UNSIGNED_SHORT;
    const sphereOffset = 0;
    gl.drawElements(sphereMode, sphereCount, sphereType, sphereOffset);

    // bindの解除
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // requestAnimationFrame(draw);
  });

  draw();
  //requestAnimationFrame(draw);
};
