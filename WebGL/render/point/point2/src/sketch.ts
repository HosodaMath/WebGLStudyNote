import {
  createShader,
  createProgram,
  updateClearColor,
  getUniformLocation,
  Sphere,
  createVAO,
  vaoParameter,
} from "./webgl/webgl";
import { Matrix4, Vector3, Calculator } from "./math/mathematics";
import { uniformController } from "./controller/unifromController"
import PointVertexShader from "./shader/point/point.vert?raw";
import PointFragmentShader from "./shader/point/point.frag?raw";

export const pointSketch = (
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext
) => {
  const pointVertexShader = createShader(
    gl,
    "VERTEX_SHADER",
    PointVertexShader
  );
  const pointFragmentShader = createShader(
    gl,
    "FRAGMENT_SHADER",
    PointFragmentShader
  );

  const pointProgram = createProgram(
    gl,
    pointVertexShader,
    pointFragmentShader
  );

  const attributeLocationIndex = [0, 1, 2];
  const attributeSize = [3, 3, 2];

  const geometryData = Sphere.sphere(64, 64, 0.5, [1.0, 1.0, 1.0, 1.0]);
  const geometryVertices = geometryData.vertices;
  const geometryNormal = geometryData.normal;
  const geometryTexCoord = geometryData.textureCoord;
  const geometryIndices = geometryData.indices;

  const geometryVaoData: vaoParameter = {
    attributeLocationIndex: attributeLocationIndex,
    attributeSize: attributeSize,
    verticesData: [geometryVertices, geometryNormal, geometryTexCoord],
    indicesData: geometryIndices,
  };

  const initGeometryVao = createVAO(gl, geometryVaoData);
  const geometryVao = initGeometryVao.vao;
  const geometryIbo = initGeometryVao.ibo;

  // uniformデータの初期化
  const uniformLocationData = getUniformLocation(gl, pointProgram, [
    "uModelViewProjectionMatrix",
    "uPointSize",
  ]);

  // 行列の初期化
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

  // アニメーション用時間の設定
  let startTime = Date.now();

  // ブレンドファクターを有効にする
  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE);

  /*
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.CULL_FACE);
  */

  const initController = () => {
    uniformController(gl, uniformLocationData);
  }

  const draw = () => {
    updateClearColor(canvas, gl, [0, 0, 0]);

    const uTime = (Date.now() - startTime) * 0.025;
    const radian = Calculator.radians(uTime);
    const axis = Vector3.set(0.0, 1.0, 1.0);
    Matrix4.lookAt(eye, center, up, uViewMatrix);

    // 透視投影変換
    const fovy = 90.0;
    const aspect = canvas.width / canvas.height;
    const near = 0.1;
    const far = 15;
    Matrix4.perspective(fovy, aspect, near, far, uProjectionMatrix);

    // ワールド行列
    Matrix4.identity(uModelMatrix);
    Matrix4.rotate(uModelMatrix, radian, axis, uModelMatrix);
    Matrix4.multiply(
      uViewProjectionMatrix,
      uModelMatrix,
      uModelViewProjectionMatrix
    );

    const matrixData1 = uniformLocationData.get("uModelViewProjectionMatrix");
    if (!matrixData1) {
      throw new Error("Error!! データが未定義です");
    }
    gl.uniformMatrix4fv(matrixData1, false, uModelViewProjectionMatrix);

    // uniformControllerに移動しました
    /*
    const pointSizeData = uniformLocationData.get("uPointSize");
    if (!pointSizeData) {
      throw new Error("Error!! データが未定義です");
    }

    gl.uniform1f(pointSizeData, uPointSize);
    */

    gl.bindVertexArray(geometryVao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometryIbo);

    const geometryMode = gl.POINTS;
    const geometryCount = geometryIndices.length;
    const geometryType = gl.UNSIGNED_SHORT;
    const geometryOffset = 0;
    gl.drawElements(geometryMode, geometryCount, geometryType, geometryOffset);

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

  initController();
  draw();
  // requestAnimationFrame(draw);
};
