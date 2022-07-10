import {
  updateClearColor,
  createVAO,
  createProgram,
  createShader,
  Sphere,
  vaoParameter,
} from "../lib/webgl/webgl";
import { Matrix4, Vector3 } from "../lib/math/mathematics";
import { createFullScreen } from "../lib/window/window"
import DirectionalLightVertexShader from "../lib/shader/light/directionalLight/directionalLight1.vert?raw";
import DirectionalLightFragmentShader from "../lib/shader/light/directionalLight/directionalLight1.frag?raw";

const sketch = () => {
  const mainBody = document.body;
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

  // Gradation
  const gradationVetexShader = createShader(
    gl,
    "VERTEX_SHADER",
    DirectionalLightVertexShader
  );
  const gradationFragmentShader = createShader(
    gl,
    "FRAGMENT_SHADER",
    DirectionalLightFragmentShader
  );

  const gradationProgram = createProgram(
    gl,
    gradationVetexShader,
    gradationFragmentShader
  );
  const gradationAttributeLocationIndex = [0, 1, 2, 3];
  const gradationAttributeSize = [4, 3, 3, 2];

  // vaoの作成
  const sphereData = Sphere.sphere(128, 128, 1.0, [1.0, 1.0, 0.5, 1.0]);
  const sphereColor = sphereData.color;
  const sphereVertices = sphereData.vertices;
  const sphereNormal = sphereData.normal;
  const sphereTextureCoord = sphereData.textureCoord;
  const sphereIndices = sphereData.indices;
  const sphereVaoData: vaoParameter = {
    attributeLocationIndex: gradationAttributeLocationIndex,
    attributeSize: gradationAttributeSize,
    verticesData: [
      sphereColor,
      sphereVertices,
      sphereNormal,
      sphereTextureCoord,
    ],
    indicesData: sphereIndices,
  };

  const sphereVAO = createVAO(gl, sphereVaoData);

  const colorUniformLocationData = {
    uModelViewProjectionMatrix: gl.getUniformLocation(
      gradationProgram,
      "uModelViewProjectionMatrix"
    ),
    uInvertMatrix: gl.getUniformLocation(gradationProgram, "uInvertMatrix"),
    uLightDirection: gl.getUniformLocation(gradationProgram, "uLightDirection"),
    uPointSize: gl.getUniformLocation(gradationProgram, "uPointSize"),
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

  // Lighting
  // 平行光源の方向
  const uLightDirection = Vector3.set(-0.5, 0.5, 0.5);

  // PointSize 点の大きさ
  const uPointSize = 3.0;

  // アニメーション開始時間
  // let startTime = Date.now();

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

    gl.useProgram(gradationProgram);

    // 時間
    // const uTime = (Date.now() - startTime) * 0.005;
    // const radian = Calculator.radians(uTime);
    // const axis = Vector3.set(0.0, 1.0, 1.0);

    // 特定の位置を見る
    Matrix4.lookAt(eye, center, up, uViewMatrix);

    const fovy = 90.0;
    const aspect = width / height;
    const near = 0.1;
    const far = 100;
    Matrix4.perspective(fovy, aspect, near, far, uProjectionMatrix);
    Matrix4.multiply(uProjectionMatrix, uViewMatrix, uViewProjectionMatrix);
    Matrix4.identity(uModelMatrix);
    // translate
    // const theta = uTime;
    // const split = 128.0;
    // const size = 3.0;
    // const positionX = Math.cos(Calculator.radians(360 / split * theta));
    // const positionY = Math.sin(Calculator.radians(360 / split * theta));
    // const positionZ = 0;
    // const position = Vector3.set(positionX * size, positionY * size, positionZ);
    const position = Vector3.set(0, 0, 0);
    Matrix4.translate(uModelMatrix, position, uModelMatrix);
    // scale
    const sclaeValue = 2.0;
    const sclaeSize = Vector3.set(sclaeValue, sclaeValue, sclaeValue);
    Matrix4.scale(uModelMatrix, sclaeSize, uModelMatrix);
    Matrix4.multiply(
      uViewProjectionMatrix,
      uModelMatrix,
      uModelViewProjectionMatrix
    );

    Matrix4.invert(uModelMatrix, uInvertMatrix);

    // ジオメトリの位置や大きさ更にそれを見る視点やカメラなどに必要な行列
    gl.uniformMatrix4fv(
      colorUniformLocationData.uModelViewProjectionMatrix,
      false,
      uModelViewProjectionMatrix
    );

    gl.uniformMatrix4fv(
      colorUniformLocationData.uInvertMatrix,
      false,
      uInvertMatrix
    );

    gl.uniform3fv(colorUniformLocationData.uLightDirection, uLightDirection);

    // 点の大きさを加える
    gl.uniform1f(colorUniformLocationData.uPointSize, uPointSize);

    // circleを描画
    gl.bindVertexArray(sphereVAO.vao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVAO.ibo);
    const sphereMode = gl.TRIANGLES;
    //const sphereMode = gl.POINTS;
    const sphereCount = sphereVAO.indicesData.length;
    const sphereType = gl.UNSIGNED_SHORT;
    const sphereOffset = 0;
    gl.drawElements(sphereMode, sphereCount, sphereType, sphereOffset);

    // bindの解除
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    requestAnimationFrame(animation);
  };

  animation();

  /**
   * @description windowのりサイズ
   */
  const windowResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  window.addEventListener("resize", windowResize);

};

window.addEventListener("load", sketch);
