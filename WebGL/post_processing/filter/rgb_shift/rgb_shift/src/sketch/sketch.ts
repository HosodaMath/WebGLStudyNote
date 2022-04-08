import {
  createVAO,
  createProgram,
  createShader,
  createFrameBuffer,
  updateClearColor,
} from "../webgl/webgl";
import {
  Matrix4,
  Vector4,
  Vector3,
  Vector2,
  Calculator,
} from "../math/mathematics";
import { createSphereVao } from "./sphereVao";
import { createPlaneVao } from "./planeVao";
import PhongMaterialVertexShader from "../shader/phong/phongMaterial.vert?raw";
import PhongMaterialFragmentShader from "../shader/phong/phongMaterial.frag?raw";
import CommonVertexShader from "../shader/texture/filter/common.vert?raw";
import RGBShiftFragmentShader from "../shader/texture/filter/rgb_shift.frag?raw";
/**
 * @description フレームバッファを適用すると見えなくなるため注意が必要なります。
 * @param canvas
 * @param gl
 */
export const sketch = async (
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext
) => {
  // ここからフレームバッファで使うシーンの作成
  // ライティングシェーダーを作成
  const lightVertexShader = createShader(
    gl,
    "VERTEX_SHADER",
    PhongMaterialVertexShader
  );

  const lightFragmentShader = createShader(
    gl,
    "FRAGMENT_SHADER",
    PhongMaterialFragmentShader
  );

  // ライティングプログラムの作成
  const lightProgram = createProgram(
    gl,
    lightVertexShader,
    lightFragmentShader
  );

  const lightAttributeLocationIndex = [0, 1, 2, 3];

  const lightAttributeSize = [4, 3, 3, 2];

  // ライティングを行うsphereを作成
  const sphereVaoData = createSphereVao(
    lightAttributeLocationIndex,
    lightAttributeSize
  );

  // sphere用vaoを作成
  const initSphereVao = createVAO(gl, sphereVaoData.vaoData);
  const lightSphereVao = initSphereVao.vao;
  const lightSphereIBO = initSphereVao.ibo;

  // lightUniformの初期化
  const lightUniformLocationData = {
    uModelViewProjectionMatrix: gl.getUniformLocation(
      lightProgram,
      "uModelViewProjectionMatrix"
    ),
    uNormalInvertMatrix: gl.getUniformLocation(
      lightProgram,
      "uNormalInvertMatrix"
    ),
    uAmbientMaterial: gl.getUniformLocation(lightProgram, "uAmbientMaterial"),
    uDirectionalLight: gl.getUniformLocation(lightProgram, "uDirectionalLight"),
    uEyeDirection: gl.getUniformLocation(lightProgram, "uEyeDirection"),
  };

  // ここまでがフレームバッファ用

  // ここからfilter用を作成
  const filterVertexShader = createShader(
    gl,
    "VERTEX_SHADER",
    CommonVertexShader
  );
  const filterFragmentShader = createShader(
    gl,
    "FRAGMENT_SHADER",
    RGBShiftFragmentShader
  );

  const filterProgram = createProgram(
    gl,
    filterVertexShader,
    filterFragmentShader
  );

  const filterAttributeLocationIndex = [0, 1, 2, 3];

  const filterAttributeSize = [4, 3, 3, 2];

  // 作成したフレームバッファーを貼り付けるためのplane
  // 必ずしもplaneを画面いっぱいに貼り付ける必要も無いですしそもそもplaneである必要もないです。
  const planeVaoData = createPlaneVao(
    filterAttributeLocationIndex,
    filterAttributeSize
  );

  const initPlaneVao = createVAO(gl, planeVaoData.vaoData);
  const planeVao = initPlaneVao.vao;
  const planeIBO = initPlaneVao.ibo;

  // filter用uniformの作成
  const filterUniformLocationData = {
    uResolution: gl.getUniformLocation(filterProgram, "uResolution"),
    uTexture: gl.getUniformLocation(filterProgram, "uTexture"),
  };

  // 各行列の初期化
  const uModelMatrix = Matrix4.identity(Matrix4.init());
  const uViewMatrix = Matrix4.identity(Matrix4.init());
  const uProjectionMatrix = Matrix4.identity(Matrix4.init());
  const uViewProjectionMatrix = Matrix4.identity(Matrix4.init());
  const uModelViewProjectionMatrix = Matrix4.identity(Matrix4.init());
  const uNormalInvertMatrix = Matrix4.identity(Matrix4.init());

  // 視点などの調整で重要
  const eye = Vector3.set(0.0, 0.0, 3.0);
  const center = Vector3.set(0.0, 0.0, 0.0);
  const up = Vector3.set(0.0, 1.0, 0.0);

  // フレームバッファの作成
  const frameBufferWidth = window.innerWidth;
  const frameBufferHeight = window.innerHeight;
  let frameBuffer = createFrameBuffer(gl, frameBufferWidth, frameBufferHeight);

  // アニメーション開始時間
  let startTime = Date.now();

  // 有効にしているもの
  // 必ずカリングと深度テストは有効にする
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.CULL_FACE);

  const draw = () => {
    // ここからフレームバッファ
    // ここにフレームバッファのコードを作成
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer.frameBuffer);

    updateClearColor(canvas, gl, [0.0, 0.0, 0.0]);

    gl.useProgram(lightProgram);

    // マテリアルの設定
    const uAmbientMaterial = Vector4.set(0.1, 0.1, 0.1, 1.0);
    const uAmbientMaterialData = lightUniformLocationData.uAmbientMaterial;
    gl.uniform4fv(uAmbientMaterialData, uAmbientMaterial);

    // 光源の設定
    const uDirectionalLight = Vector3.set(-0.5, 1.0, 0.5);
    const uDirectionalLightData = lightUniformLocationData.uDirectionalLight;
    gl.uniform3fv(uDirectionalLightData, uDirectionalLight);

    // 視点ベクトル
    const uEyeDirection = Vector3.set(0.0, 0.0, 20.0);
    const uEyeDirectionData = lightUniformLocationData.uEyeDirection;
    gl.uniform3fv(uEyeDirectionData, uEyeDirection);

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

    Matrix4.invert(uModelMatrix, uNormalInvertMatrix);

    const uNormalInvertMatrixData =
      lightUniformLocationData.uNormalInvertMatrix;

    gl.uniformMatrix4fv(uNormalInvertMatrixData, false, uNormalInvertMatrix);

    const uModelViewProjectionMatrixData =
      lightUniformLocationData.uModelViewProjectionMatrix;

    gl.uniformMatrix4fv(
      uModelViewProjectionMatrixData,
      false,
      uModelViewProjectionMatrix
    );

    // sphere
    gl.bindVertexArray(lightSphereVao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lightSphereIBO);
    const sphereMode = gl.TRIANGLES;
    const sphereCount = sphereVaoData.indices.length;
    const sphereType = gl.UNSIGNED_SHORT;
    const sphereOffset = 0;
    gl.drawElements(sphereMode, sphereCount, sphereType, sphereOffset);

    // bindの解除
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // ここまでがフレームバッファ
    // ここまで実行すると今まで見えていたsphereのライティングがバックグラウンドで動いているため見えなくなる
      
    // ここからfilter用のplaneを作成
    updateClearColor(canvas, gl, [0.0, 0.0, 0.0]);

    gl.useProgram(filterProgram);

    // 画面サイズ
    const uResolution = Vector2.set(canvas.width, canvas.height);

    const uResolutionData = filterUniformLocationData.uResolution;
    gl.uniform2fv(uResolutionData, uResolution);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, frameBuffer.frameBufferTexture);

    // plane
    gl.bindVertexArray(planeVao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planeIBO);

    const planeMode = gl.TRIANGLES;
    const planeCount = planeVaoData.indices.length;
    const planeType = gl.UNSIGNED_SHORT;
    const planeOffset = 0;
    gl.drawElements(planeMode, planeCount, planeType, planeOffset);

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

    frameBuffer = createFrameBuffer(gl, canvas.width, canvas.height);
  };

  window.addEventListener("resize", windowResize);

  draw();
};
