import {
  updateClearColor,
  createVAO,
  createProgram,
  createShader,
  Sphere,
  Torus,
  vaoParameter,
} from "../lib/webgl/webgl";
import { Calculator, Matrix4, Vector2, Vector3 } from "../lib/math/mathematics";
import { createFullScreen } from "../lib/window/window";
import WaterLightVertexShader1 from "../lib/shader/main/wave.vert?raw";
import WaterLightFragmentShader1 from "../lib/shader/main/water1.frag?raw";
import WaterLightVertexShader2 from "../lib/shader/background/wave.vert?raw";
import WaterLightFragmentShader2 from "../lib/shader/background/water1.frag?raw";

/**
 * @description PhongMaterial
 * @param mainBody 
 */
export const sketch1 = (mainBody: HTMLElement) => {
  const canvas = document.createElement("canvas");
  canvas.classList.add(...["canvas"]);
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  createFullScreen(mainBody);
  mainBody.appendChild(canvas);

  const gl = canvas.getContext("webgl2");
  if (!gl) {
    throw new Error("Error!! WebGL2をサポートしていません。");
  }

  // Water1
  const waterVetexShader1 = createShader(
    gl,
    "VERTEX_SHADER",
    WaterLightVertexShader1
  );
  const waterFragmentShader1 = createShader(
    gl,
    "FRAGMENT_SHADER",
    WaterLightFragmentShader1
  );

  const waterProgram1 = createProgram(
    gl,
    waterVetexShader1,
    waterFragmentShader1
  );
  const waterAttributeLocationIndex1 = [0, 1, 2, 3];
  const waterAttributeSize1 = [4, 3, 3, 2];

  // SphereVaoの作成
  const sphereData = Sphere.sphere(128, 128, 1.0, [1.0, 1.0, 0.5, 1.0]);
  const sphereColor = sphereData.color;
  const sphereVertices = sphereData.vertices;
  const sphereNormal = sphereData.normal;
  const sphereTextureCoord = sphereData.textureCoord;
  const sphereIndices = sphereData.indices;
  const sphereVaoData: vaoParameter = {
    attributeLocationIndex: waterAttributeLocationIndex1,
    attributeSize: waterAttributeSize1,
    verticesData: [
      sphereColor,
      sphereVertices,
      sphereNormal,
      sphereTextureCoord,
    ],
    indicesData: sphereIndices,
  };

  const sphereVAO = createVAO(gl, sphereVaoData);

  const waterUniformLocationData1 = {
    uModelViewProjectionMatrix: gl.getUniformLocation(
      waterProgram1,
      "uModelViewProjectionMatrix"
    ),
    uInvertMatrix: gl.getUniformLocation(waterProgram1, "uInvertMatrix"),
    uLightDirection: gl.getUniformLocation(waterProgram1, "uLightDirection"),
    uEyeDirection: gl.getUniformLocation(waterProgram1, "uEyeDirection"),
    uAmbientColor: gl.getUniformLocation(waterProgram1, "uAmbientColor"),
    uFrequency: gl.getUniformLocation(waterProgram1, "uFrequency"),
    uAmplitude: gl.getUniformLocation(waterProgram1, "uAmplitude"),
    uTime: gl.getUniformLocation(waterProgram1, "uTime"),
    uPointSize: gl.getUniformLocation(waterProgram1, "uPointSize"),
  };

  // Water2
  const waterVetexShader2 = createShader(
    gl,
    "VERTEX_SHADER",
    WaterLightVertexShader2
  );
  const waterFragmentShader2 = createShader(
    gl,
    "FRAGMENT_SHADER",
    WaterLightFragmentShader2
  );

  const waterProgram2 = createProgram(
    gl,
    waterVetexShader2,
    waterFragmentShader2
  );
  const waterAttributeLocationIndex2 = [0, 1, 2, 3];
  const waterAttributeSize2 = [4, 3, 3, 2];

  // TorusVaoの作成
  const torusData = Torus.torus(128, 128, 1.0, 1.0, [1.0, 1.0, 0.5, 1.0]);
  const torusColor = torusData.color;
  const torusVertices = torusData.vertices;
  const torusNormal = torusData.normal;
  const torusTextureCoord = torusData.textureCoord;
  const torusIndices = torusData.indices;
  const torusVaoData: vaoParameter = {
    attributeLocationIndex: waterAttributeLocationIndex2,
    attributeSize: waterAttributeSize2,
    verticesData: [torusColor, torusVertices, torusNormal, torusTextureCoord],
    indicesData: torusIndices,
  };

  const torusVAO = createVAO(gl, torusVaoData);

  const waterUniformLocationData2 = {
    uModelViewProjectionMatrix: gl.getUniformLocation(
      waterProgram2,
      "uModelViewProjectionMatrix"
    ),
    uInvertMatrix: gl.getUniformLocation(waterProgram2, "uInvertMatrix"),
    uLightDirection: gl.getUniformLocation(waterProgram2, "uLightDirection"),
    uEyeDirection: gl.getUniformLocation(waterProgram2, "uEyeDirection"),
    uAmbientColor: gl.getUniformLocation(waterProgram2, "uAmbientColor"),
    uFrequency: gl.getUniformLocation(waterProgram2, "uFrequency"),
    uAmplitude: gl.getUniformLocation(waterProgram2, "uAmplitude"),
    uTime: gl.getUniformLocation(waterProgram2, "uTime"),
    uPointSize: gl.getUniformLocation(waterProgram2, "uPointSize"),
  };

  // 各行列の初期化
  const uModelMatrix = Matrix4.identity(Matrix4.init());
  const uViewMatrix = Matrix4.identity(Matrix4.init());
  const uProjectionMatrix = Matrix4.identity(Matrix4.init());
  const uViewProjectionMatrix = Matrix4.identity(Matrix4.init());
  const uModelViewProjectionMatrix = Matrix4.identity(Matrix4.init());
  const uInvertMatrix = Matrix4.identity(Matrix4.init());

  // Camera 視点などの調整で重要
  const eye = Vector3.set(0.0, 0.0, 3.0);
  const center = Vector3.set(0.0, 0.0, 0.0);
  const up = Vector3.set(0.0, 1.0, 0.0);

  // ここからUniform

  // Lighting
  // 平行光源の方向
  let uLightDirection = Vector3.set(-0.5, 0.5, 0.5);

  // uEyeDirection
  // 視点ベクトル
  let uEyeDirection = Vector3.set(0.0, 0.0, 20.0);

  // uAmbientColor
  // 環境光源の色（小さい方が良い）
  let uAmbientColor = Vector3.set(0.1, 0.1, 0.1);

  // 振動数
  let uFrequency = Vector2.set(0.0, 0.0);

  // 振幅
  let uAmplitude = Vector2.set(0.0, 0.0);

  // PointSize 点の大きさ
  let uPointSize = 3.0;

  // ここまでがuniform

  // アニメーション開始時間
  let startTime = Date.now();

  // 有効にしているもの
  // 深度テスト
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  // カリング
  // Sphereなどを大きくしたい場合（背景などに使う場合など）は有効化を解除
  // gl.enable(gl.CULL_FACE);

  const animation = () => {
    // Color Program
    updateClearColor(width, height, gl, [0.0, 0.0, 0.0]);

    gl.useProgram(waterProgram1);

    // 時間
    const uTime = (Date.now() - startTime) * 0.005;

    // 特定の位置を見る
    Matrix4.lookAt(eye, center, up, uViewMatrix);

    const fovy = 90.0;
    const aspect = width / height;
    const near = 0.1;
    const far = 100;
    Matrix4.perspective(fovy, aspect, near, far, uProjectionMatrix);
    Matrix4.multiply(uProjectionMatrix, uViewMatrix, uViewProjectionMatrix);

    // ここからSphere
    Matrix4.identity(uModelMatrix);
    // translate
    // const theta = uTime;
    // const split = 128.0;
    // const size = 3.0;
    // const positionX = Math.cos(Calculator.radians(360 / split * theta));
    // const positionY = Math.sin(Calculator.radians(360 / split * theta));
    // const positionZ = 0;
    // const position = Vector3.set(positionX * size, positionY * size, positionZ);
    const position1 = Vector3.set(0, 0, 0);
    Matrix4.translate(uModelMatrix, position1, uModelMatrix);
    // scale
    const sclaeValue1 = 1.0;
    const sclaeSize1 = Vector3.set(sclaeValue1, sclaeValue1, sclaeValue1);
    Matrix4.scale(uModelMatrix, sclaeSize1, uModelMatrix);
    Matrix4.multiply(
      uViewProjectionMatrix,
      uModelMatrix,
      uModelViewProjectionMatrix
    );

    Matrix4.invert(uModelMatrix, uInvertMatrix);

    // ジオメトリの位置や大きさ更にそれを見る視点やカメラなどに必要な行列
    gl.uniformMatrix4fv(
      waterUniformLocationData1.uModelViewProjectionMatrix,
      false,
      uModelViewProjectionMatrix
    );

    gl.uniformMatrix4fv(
      waterUniformLocationData1.uInvertMatrix,
      false,
      uInvertMatrix
    );

    // ライトベクトルを追加
    gl.uniform3fv(waterUniformLocationData1.uLightDirection, uLightDirection);

    // 視点ベクトルを追加
    gl.uniform3fv(waterUniformLocationData1.uEyeDirection, uEyeDirection);

    // 環境光を追加
    gl.uniform3fv(waterUniformLocationData1.uAmbientColor, uAmbientColor);

    // 振動数を加える
    gl.uniform2fv(waterUniformLocationData1.uFrequency, uFrequency);

    // 振幅を加える
    gl.uniform2fv(waterUniformLocationData1.uAmplitude, uAmplitude);

    // 時間を加える
    gl.uniform1f(waterUniformLocationData1.uTime, uTime);

    // 点の大きさを加える
    gl.uniform1f(waterUniformLocationData1.uPointSize, uPointSize);

    // sphereを描画
    gl.bindVertexArray(sphereVAO.vao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVAO.ibo);
    const sphereMode = gl.TRIANGLES;
    // const sphereMode = gl.POINTS;
    // const sphereMode = gl.LINES;
    const sphereCount = sphereVAO.indicesData.length;
    const sphereType = gl.UNSIGNED_SHORT;
    const sphereOffset = 0;
    gl.drawElements(sphereMode, sphereCount, sphereType, sphereOffset);

    // bindの解除
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    gl.useProgram(waterProgram2);

    // ここからTorus
    Matrix4.identity(uModelMatrix);
    // translate
    // const theta = uTime;
    // const split = 128.0;
    // const size = 3.0;
    // const positionX = Math.cos(Calculator.radians(360 / split * theta));
    // const positionY = Math.sin(Calculator.radians(360 / split * theta));
    // const positionZ = 0;
    // const position = Vector3.set(positionX * size, positionY * size, positionZ);
    const position2 = Vector3.set(0, 0, 0);
    Matrix4.translate(uModelMatrix, position2, uModelMatrix);

    // scale
    const sclaeValue2 = 2.0;
    const sclaeSize2 = Vector3.set(sclaeValue2, sclaeValue2, sclaeValue2);
    Matrix4.scale(uModelMatrix, sclaeSize2, uModelMatrix);
    Matrix4.multiply(
      uViewProjectionMatrix,
      uModelMatrix,
      uModelViewProjectionMatrix
    );

    // rotate
    // const radian = Calculator.radians(uTime);
    // const axis = Vector3.set(0.0, 1.0, 1.0);
    // Matrix4.rotate(uModelMatrix, radian, axis, uModelMatrix);

    Matrix4.invert(uModelMatrix, uInvertMatrix);

    // ジオメトリの位置や大きさ更にそれを見る視点やカメラなどに必要な行列
    gl.uniformMatrix4fv(
      waterUniformLocationData2.uModelViewProjectionMatrix,
      false,
      uModelViewProjectionMatrix
    );

    gl.uniformMatrix4fv(
      waterUniformLocationData2.uInvertMatrix,
      false,
      uInvertMatrix
    );

    // ライトベクトルを追加
    gl.uniform3fv(waterUniformLocationData2.uLightDirection, uLightDirection);

    // 視点ベクトルを追加
    gl.uniform3fv(waterUniformLocationData2.uEyeDirection, uEyeDirection);
    
    // 環境光を追加
    gl.uniform3fv(waterUniformLocationData2.uAmbientColor, uAmbientColor);

    // 振動数を加える
    gl.uniform2fv(waterUniformLocationData2.uFrequency, uFrequency);

    // 振幅を加える
    gl.uniform2fv(waterUniformLocationData2.uAmplitude, uAmplitude);

    // 時間を加える
    gl.uniform1f(waterUniformLocationData2.uTime, uTime);

    // 点の大きさを加える
    gl.uniform1f(waterUniformLocationData2.uPointSize, uPointSize);

    // torusを描画
    gl.bindVertexArray(torusVAO.vao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, torusVAO.ibo);
    // const torusMode = gl.TRIANGLES;
    // const torusMode = gl.POINTS;
    const torusMode = gl.LINES;
    const torusCount = torusVAO.indicesData.length;
    const torusType = gl.UNSIGNED_SHORT;
    const torusOffset = 0;
    gl.drawElements(torusMode, torusCount, torusType, torusOffset);

    // bindの解除
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    requestAnimationFrame(animation);
  };

  animation();

  /**
   * @description 平行光源の方向を調節
   * @param event
   */
  const controlLight = (event: MouseEvent) => {
    const x = (event.clientX / width - 0.5) * 2.0;
    const y = (event.clientY / height - 0.5) * 2.0;
    // const x = Calculator.map(event.clientX, 0, width, -1.0, 1.0);
    // const y = Calculator.map(event.clientY, 0, height, -1.0, 1.0);
    uLightDirection = Vector3.set(x, -y, 0.5);
  };

  const controlFrequency = (event: MouseEvent) => {
    const x = Calculator.map(event.clientX, 0, width, -20.0, 20.0);
    const y = Calculator.map(event.clientY, 0, height, -20.0, 20.0);
    uFrequency = Vector2.set(x, y);
  };

  const controlAmplitude = (event: MouseEvent) => {
    const x = Calculator.map(event.clientX, 0, width, -0.5, 0.5);
    const y = Calculator.map(event.clientY, 0, height, -0.5, 0.5);
    uAmplitude = Vector2.set(x, y);
  };

  /**
   * @description windowのりサイズ
   */
  const windowResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  window.addEventListener("mousemove", controlLight);
  window.addEventListener("mousemove", controlFrequency);
  window.addEventListener("mousemove", controlAmplitude);
  window.addEventListener("resize", windowResize);
};


