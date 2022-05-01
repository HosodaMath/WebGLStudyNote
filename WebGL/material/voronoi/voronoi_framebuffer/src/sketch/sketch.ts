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
import VoronoiMaterialVertexShader from "../shader/voronoi/voronoi.vert?raw";
import VoronoiMaterialFragmentShader from "../shader/voronoi/voronoi.frag?raw";
import CommonVertexShader from "../shader/texture/postProcessing/common.vert?raw";
import WaveFragmentShader from "../shader/texture/postProcessing/wave.frag?raw";
import ColorImageTexture from "../assets/texture/cloud.png";
/**
 * @description フレームバッファを適用すると見えなくなるため注意が必要なります。
 * @param canvas
 * @param gl
 * @todo 課題としてgl_POINTSでレンダリングをすると重くなってしまうの事案が確認されたので原因を究明したいと思います。
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
    VoronoiMaterialVertexShader
  );

  const lightFragmentShader = createShader(
    gl,
    "FRAGMENT_SHADER",
    VoronoiMaterialFragmentShader
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
  const mainSphereVao = initSphereVao.vao;
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
    uTime: gl.getUniformLocation(lightProgram, "uTime"),
    uFrameCount: gl.getUniformLocation(lightProgram, "uFrameCount"),
    isTexture: gl.getUniformLocation(lightProgram, "isTexture"),
    uTexture: gl.getUniformLocation(lightProgram, "uTexture"),
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
    WaveFragmentShader
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

  /**
   * テクスチャ作成のための準備
   * @todo fetchで実装したほうが良い？
   *
   * */

  let uTexture: WebGLTexture | null = null;

  const img = new Image();

  img.addEventListener("load", () => {
    const initTexture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, initTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    gl.bindTexture(gl.TEXTURE_2D, null);

    //グローバルで定義するべきか？
    uTexture = initTexture;
  });

  img.src = ColorImageTexture;

  // filter用uniformの作成
  const filterUniformLocationData = {
    uResolution: gl.getUniformLocation(filterProgram, "uResolution"),
    uFrequency: gl.getUniformLocation(filterProgram, "uFrequency"),
    uAmplitude: gl.getUniformLocation(filterProgram, "uAmplitude"),
    uTime: gl.getUniformLocation(filterProgram, "uTime"),
    uTexture0: gl.getUniformLocation(filterProgram, "uTexture0"),
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
  const frameBufferWidth = canvas.width;
  const frameBufferHeight = canvas.height;
  let frameBuffer = createFrameBuffer(gl, frameBufferWidth, frameBufferHeight);

  // アニメーション開始時間
  let startTime = Date.now();

  // 有効にしているもの
  // 深度テスト
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  // gl.enable(gl.CULL_FACE);

  // 振動値
  let uFrequency = Vector2.set(0, 0);
  const uFrequencyData = filterUniformLocationData.uFrequency;
  gl.uniform2fv(uFrequencyData, uFrequency);

  // 増幅値
  let uAmplitude = Vector2.set(0, 0);
  const uAmplitudeData = filterUniformLocationData.uAmplitude;
  gl.uniform2fv(uAmplitudeData, uAmplitude);

  const uniformEvent = (event: MouseEvent) => {
    // uFrequency 振動値
    const uFrequencyX = Calculator.map(event.clientX, 0, canvas.width, -20, 20);
    const uFrequencyY = Calculator.map(
      event.clientY,
      0,
      canvas.height,
      -20,
      20
    );

    uFrequency = Vector2.set(uFrequencyX, uFrequencyY);

    const uFrequencyData = filterUniformLocationData.uFrequency;

    gl.uniform2fv(uFrequencyData, uFrequency);

    // uAmplitude 増幅値
    const uAmplitudeX = Calculator.map(
      event.clientX,
      0,
      canvas.width,
      -0.05,
      0.05
    );
    const uAmplitudeY = Calculator.map(
      event.clientY,
      0,
      canvas.height,
      -0.05,
      0.05
    );

    uAmplitude = Vector2.set(uAmplitudeX, uAmplitudeY);

    const uAmplitudeData = filterUniformLocationData.uAmplitude;

    gl.uniform2fv(uAmplitudeData, uAmplitude);
  };

  // MouseEvent
  window.addEventListener("mousemove", uniformEvent);

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

    // 特定の位置を見る
    Matrix4.lookAt(eye, center, up, uViewMatrix);

    const fovy = 90.0;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 100;
    Matrix4.perspective(fovy, aspect, near, far, uProjectionMatrix);

    Matrix4.multiply(uProjectionMatrix, uViewMatrix, uViewProjectionMatrix);

    // ここからBackgroundSphere
    Matrix4.identity(uModelMatrix);

    // ここで回転させる
    Matrix4.rotate(uModelMatrix, radian, axis, uModelMatrix);

    // scale
    const sclaeSize = Vector3.set(5.0, 5.0, 5.0);
    Matrix4.scale(uModelMatrix, sclaeSize, uModelMatrix);

    // モデルビュー射影変換行列を求める
    Matrix4.multiply(
      uViewProjectionMatrix,
      uModelMatrix,
      uModelViewProjectionMatrix
    );

    // 逆行列を求める
    Matrix4.invert(uModelMatrix, uNormalInvertMatrix);

    const uNormalInvertMatrixData =
      lightUniformLocationData.uNormalInvertMatrix;

    // ライティングに必要な行列
    gl.uniformMatrix4fv(uNormalInvertMatrixData, false, uNormalInvertMatrix);

    const uModelViewProjectionMatrixData =
      lightUniformLocationData.uModelViewProjectionMatrix;

    // ジオメトリの位置や大きさ更にそれを見る視点やカメラなどに必要な行列
    gl.uniformMatrix4fv(
      uModelViewProjectionMatrixData,
      false,
      uModelViewProjectionMatrix
    );

    // 時間変化を加える
    const uTimeData = lightUniformLocationData.uTime;
    gl.uniform1f(uTimeData, uTime);

    // フレームのカウント数による変化 -> 今回は時間変化とイコール
    const uFrameCountData = lightUniformLocationData.uFrameCount;
    gl.uniform1f(uFrameCountData, uTime);
    
    // テクスチャを使わないのでColorPalette関数を用いる
    const isTextureData = lightUniformLocationData.isTexture;
    gl.uniform1i(isTextureData, Number(false));

    // BackGroundSphereを描画
    gl.bindVertexArray(mainSphereVao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lightSphereIBO);
    const sphereMode1 = gl.TRIANGLES;
    const sphereCount1 = sphereVaoData.indices.length;
    const sphereType1 = gl.UNSIGNED_SHORT;
    const sphereOffset1 = 0;
    gl.drawElements(sphereMode1, sphereCount1, sphereType1, sphereOffset1);

    // bindの解除
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    // テクスチャは背景でしか使わないので解除しています。
    gl.bindTexture(gl.TEXTURE_2D, null);

    // ここからMainSphere
    Matrix4.identity(uModelMatrix);

    // ここで回転させる
    Matrix4.rotate(uModelMatrix, radian, axis, uModelMatrix);

    // モデルビュー射影変換行列を求める
    Matrix4.multiply(
      uViewProjectionMatrix,
      uModelMatrix,
      uModelViewProjectionMatrix
    );

    // 逆行列を求める
    Matrix4.invert(uModelMatrix, uNormalInvertMatrix);

    // ライティングに必要な行列
    gl.uniformMatrix4fv(uNormalInvertMatrixData, false, uNormalInvertMatrix);

    // ジオメトリの位置や大きさ更にそれを見る視点やカメラなどに必要な行列
    gl.uniformMatrix4fv(
      uModelViewProjectionMatrixData,
      false,
      uModelViewProjectionMatrix
    );

    // 時間変化を加える
    gl.uniform1f(uTimeData, uTime);

    // フレームのカウント数による変化 -> 今回は時間変化とイコール
    gl.uniform1f(uFrameCountData, uTime);

     // テクスチャ
    // テクスチャを適用しない場合はColorPalette関数を用いる
    gl.uniform1i(isTextureData, Number(true));

    // Texture1を適用する
    const uTextureData = lightUniformLocationData.uTexture;
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, uTexture);
    gl.uniform1i(uTextureData, 1);

    // MainSphere
    gl.bindVertexArray(mainSphereVao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lightSphereIBO);
    const sphereMode2 = gl.POINTS;
    const sphereCount2 = sphereVaoData.indices.length;
    const sphereType2 = gl.UNSIGNED_SHORT;
    const sphereOffset2 = 0;
    gl.drawElements(sphereMode2, sphereCount2, sphereType2, sphereOffset2);

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

    const uTimefilterData = filterUniformLocationData.uTime;
    gl.uniform1f(uTimefilterData, uTime);

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
