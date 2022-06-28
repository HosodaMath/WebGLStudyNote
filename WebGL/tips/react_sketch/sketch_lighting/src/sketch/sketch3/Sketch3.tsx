import { useEffect, useRef } from "react";
import {
  updateClearColor,
  createVAO,
  createProgram,
  createShader,
  Sphere,
  vaoParameter,
} from "../../webgl/webgl";
import { Calculator, Matrix4, Vector2, Vector3 } from "../../math/mathematics";
import WaterVertexShader from "../../shader/water/water0.vert?raw";
import WaterFragmentShader from "../../shader/water/water0.frag?raw";

/**
 * @description waterShader + DirectinalLight
 * @returns
 */
export const SketchDirectinalLighting3 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      throw new Error("Error!! WebGL2をサポートしていません。");
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frameCount = 0;

    // Gradation
    const colorVetexShader = createShader(
      gl,
      "VERTEX_SHADER",
      WaterVertexShader
    );
    const colorFragmentShader = createShader(
      gl,
      "FRAGMENT_SHADER",
      WaterFragmentShader
    );

    const waterProgram = createProgram(
      gl,
      colorVetexShader,
      colorFragmentShader
    );
    const waterAttributeLocationIndex = [0, 1, 2, 3];
    const waterAttributeSize = [4, 3, 3, 2];

    const sphereData = Sphere.sphere(128, 128, 1.0, [1.0, 1.0, 0.5, 1.0]);
    const sphereColor = sphereData.color;
    const sphereVertices = sphereData.vertices;
    const sphereNormal = sphereData.normal;
    const sphereTextureCoord = sphereData.textureCoord;
    const sphereIndices = sphereData.indices;
    const sphereVaoData: vaoParameter = {
      attributeLocationIndex: waterAttributeLocationIndex,
      attributeSize: waterAttributeSize,
      verticesData: [
        sphereColor,
        sphereVertices,
        sphereNormal,
        sphereTextureCoord,
      ],
      indicesData: sphereIndices,
    };

    const sphereVAO = createVAO(gl, sphereVaoData);

    const waterUniformLocationData = {
      uModelViewProjectionMatrix: gl.getUniformLocation(
        waterProgram,
        "uModelViewProjectionMatrix"
      ),
      uInvertMatrix: gl.getUniformLocation(waterProgram, "uInvertMatrix"),
      uLightDirection: gl.getUniformLocation(waterProgram, "uLightDirection"),
      uFrequency: gl.getUniformLocation(waterProgram, "uFrequency"),
      uAmplitude: gl.getUniformLocation(waterProgram, "uAmplitude"),
      uTime: gl.getUniformLocation(waterProgram, "uTime"),
      uPointSize: gl.getUniformLocation(waterProgram, "uPointSize"),
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

    // uniformのパラメーター

    // Lighting
    // 平行光源の方向
    let uLightDirection = Vector3.set(-0.5, 0.5, 0.5);
    const lightDirection = (event: MouseEvent) => {
      const positionX = Calculator.map(event.offsetX, 0, width, -0.5, 0.5);
      const positionY = Calculator.map(event.offsetY, 0, height, -0.5, 0.5);
      const positionZ = 0.5;
      uLightDirection = Vector3.set(positionX, positionY, positionZ);
    };
    window.addEventListener("mousemove", lightDirection);

    // WaveEffect
    // uFrequency
    let uFrequency = Vector2.set(0.0, 0.0);
    const frequency = (event: MouseEvent) => {
      const positionX = Calculator.map(event.offsetX, 0, width, -20, 20);
      const positionY = Calculator.map(event.offsetY, 0, height, -20, 20);
      uFrequency = Vector2.set(positionX, positionY);
    };
    window.addEventListener("mousemove", frequency);

    // uAmplitude
    let uAmplitude = Vector2.set(0.0, 0.0);
    const amplitude = (event: MouseEvent) => {
      const positionX = Calculator.map(event.offsetX, 0, width, -0.05, 0.05);
      const positionY = Calculator.map(event.offsetY, 0, height, -0.05, 0.05);
      uAmplitude = Vector2.set(positionX, positionY);
    };
    window.addEventListener("mousemove", amplitude);

    // PointSize 点の大きさ
    const uPointSize = 3.0;

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
      updateClearColor(canvas, gl, [0.0, 0.0, 0.0]);

      // cloudProgramを使用
      gl.useProgram(waterProgram);

      // uniform時間
      const uTime = (Date.now() - startTime) * 0.005;
      // const radian = Calculator.radians(uTime);
      // const axis = Vector3.set(0.0, 1.0, 1.0);

      // 特定の位置を見る
      Matrix4.lookAt(eye, center, up, uViewMatrix);

      const fovy = 90.0;
      const aspect = window.innerWidth / window.innerHeight;
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
        waterUniformLocationData.uModelViewProjectionMatrix,
        false,
        uModelViewProjectionMatrix
      );

      // 逆行列
      gl.uniformMatrix4fv(
        waterUniformLocationData.uInvertMatrix,
        false,
        uInvertMatrix
      );

      // 平行光源の向き
      gl.uniform3fv(waterUniformLocationData.uLightDirection, uLightDirection);

      // frequency
      gl.uniform2fv(waterUniformLocationData.uFrequency, uFrequency);

      // amplitude
      gl.uniform2fv(waterUniformLocationData.uAmplitude, uAmplitude);

      // 時間変化
      gl.uniform1f(waterUniformLocationData.uTime, uTime);

      // 点の大きさを加える
      gl.uniform1f(waterUniformLocationData.uPointSize, uPointSize);

      // circleを描画
      gl.bindVertexArray(sphereVAO.vao);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVAO.ibo);
      const sphereMode = gl.TRIANGLES;
      // const sphereMode = gl.POINTS;
      const sphereCount = sphereVAO.indicesData.length;
      const sphereType = gl.UNSIGNED_SHORT;
      const sphereOffset = 0;
      gl.drawElements(sphereMode, sphereCount, sphereType, sphereOffset);

      // bindの解除
      gl.bindVertexArray(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

      frameCount = requestAnimationFrame(animation);
    };

    animation();

    const windowResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", windowResize);

    return () => {
      console.log("アニメーションをキャンセルしました");
      cancelAnimationFrame(frameCount);
      console.log("各イベントをキャンセルしました。")
      window.removeEventListener("mousemove", lightDirection);
      window.removeEventListener("mousemove", frequency);
      window.removeEventListener("mousemove", amplitude);
      window.removeEventListener("resize", windowResize);
    };
  }, []);
  return (
    <div className="App">
      <section>
        <h2>DirectinalLight3</h2>
        <canvas ref={canvasRef}></canvas>
      </section>
    </div>
  );
};
