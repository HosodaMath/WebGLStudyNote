import {
  createVAO,
  createProgram,
  createShader,
  getUniformLocation,
  updateClearColor,
} from "../webgl/webgl";
import { Matrix4, Vector3, Calculator } from "../math/mathematics";
import { createSphereVao } from "./sphereVao";
import { createTorusVao } from "./torusVao";
import colorMaterialVertexShader from "../shader/texture/pointTexture1.vert?raw";
import colorMaterialFragmentShader from "../shader/texture/pointTexture1.frag?raw";
import WaterImage from "../assets/texture/water.jpg";
import WaterNormalImage from "../assets/texture/waternormals.jpg";
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

  const torusVaoData = createTorusVao(
    attributeLocationIndex,
    commonAttributeSize
  );

  const initTorusVao = createVAO(gl, torusVaoData.vaoData);
  const torusVao = initTorusVao.vao;
  const torusIBO = initTorusVao.ibo;

  // uniformの初期化
  const uniformLocationData = getUniformLocation(gl, program, [
    "uModelViewProjectionMatrix",
    "uPointSize",
    "uTexture0",
    "uTexture1",
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

  // pointの大きさ
  const uPointSize = 3;

  let startTime = Date.now();

  let uTexture0: WebGLTexture | null = null;
  let uTexture1: WebGLTexture | null = null;

  /**
   * @todo 非同期処理に変える
   * @todo マルチテクスチャ対応 -> 完了
   * @description テクスチャの作成
   * @param imageURL 画像URL
   */
  const createTexture = (imageURL: string, textureNumber: number) => {
    const img = new Image();

    img.src = imageURL;

    const initTexture = () => {
      const initTexture = gl.createTexture();

      gl.bindTexture(gl.TEXTURE_2D, initTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.bindTexture(gl.TEXTURE_2D, null);

      switch (textureNumber) {
        case 0:
          uTexture0 = initTexture;
          break;
        case 1:
          uTexture1 = initTexture;
          break;
      }
    };

    img.addEventListener("load", initTexture);
  };

  createTexture(WaterImage, 0);
  createTexture(WaterNormalImage, 1);

  // 有効にしているもの
  // 必ずカリングと深度テストは有効にする
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.CULL_FACE);

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

    const uPointSizeData = uniformLocationData.get("uPointSize");
    if (!uPointSizeData) {
      throw new Error("Error 未定義です");
    }

    gl.uniform1f(uPointSizeData, uPointSize);

    // ここからマルチテクスチャ
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, uTexture0);
    const uTextureData0 = uniformLocationData.get("uTexture0");
    if (!uTextureData0) {
      throw new Error("Error 未定義です");
    }
    gl.uniform1i(uTextureData0, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, uTexture1);
    const uTextureData1 = uniformLocationData.get("uTexture1");
    if (!uTextureData1) {
      throw new Error("Error 未定義です");
    }
    gl.uniform1i(uTextureData1, 1);

    // sphere
    gl.bindVertexArray(sphereVao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIBO);

    const sphereMode = gl.TRIANGLES;
    // const sphereMode = gl.LINES;
    //const sphereMode = gl.POINTS;
    const sphereCount = sphereVaoData.indices.length;
    const sphereType = gl.UNSIGNED_SHORT;
    const sphereOffset = 0;
    gl.drawElements(sphereMode, sphereCount, sphereType, sphereOffset);

    // bindの解除
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // torus
    gl.bindVertexArray(torusVao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, torusIBO);

    const torusMode = gl.TRIANGLES;
    // const torusMode = gl.LINES;
    // const torusMode = gl.POINTS;
    const torusCount = torusVaoData.indices.length;
    const torusType = gl.UNSIGNED_SHORT;
    const torusOffset = 0;
    gl.drawElements(torusMode, torusCount, torusType, torusOffset);

    // bindの解除
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    requestAnimationFrame(draw);
  };

  const windowResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  
  window.addEventListener("resize", windowResize);

  draw();
};
