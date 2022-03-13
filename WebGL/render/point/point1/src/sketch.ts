import {
  createShader,
  createProgram,
  updateClearColor,
  getUniformLocation,
  Sphere,
} from "./webgl/webgl";
import PointVertexShader from "./shader/point/point.vert?raw";
import PointFragmentShader from "./shader/point/point.frag?raw";
import { Matrix4, Vector3, Calculator } from "./math/mathematics";
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

  const attributeLocationIndex = [0];
  const attributeSize = [3];
  const sphere = Sphere.sphereColor(64, 64, 0.5);
  const sphereVertices = sphere.vertices;

  // vboの作成
  const vbo = gl.createBuffer();
  if (!vbo) {
    throw new Error("WebGLBufferの作成に失敗しました。");
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  const index = attributeLocationIndex[0];
  const size = attributeSize[0];
  const type = gl.FLOAT;
  const normalized = false;
  const stride = 0;
  const offset = 0;
  gl.enableVertexAttribArray(index);
  gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(sphereVertices),
    gl.DYNAMIC_DRAW
  );

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

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.CULL_FACE);

  const draw = () => {
    updateClearColor(canvas, gl, [0, 0, 0]);

    const uTime = (Date.now() - startTime) * 0.025;
    const radian = Calculator.radians(uTime);
    const axis = Vector3.set(0.0, 1.0, 1.0);
    Matrix4.lookAt(eye, center, up, uViewMatrix);

    // 透視投影変換
    const fovy = 45.0;
    const aspect = canvas.width / canvas.height;
    const near = 0.1;
    const far = 15;
    Matrix4.perspective(fovy, aspect, near, far, uProjectionMatrix);

    // pointの更新

    for (let iter = 0, j = sphereVertices.length; iter < j; iter += 3) {
      const time = Math.sin(uTime);
      const x = sphere.vertices[iter] + sphere.vertices[iter] * time;
      const y = sphere.vertices[iter + 1] + sphere.vertices[iter + 1] * time;
      const z = sphere.vertices[iter + 2] + sphere.vertices[iter + 2] * time;
      sphereVertices[iter] = x;
      sphereVertices[iter + 1] = y;
      sphereVertices[iter + 2] = z;
    }
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(sphereVertices));

    // ワールド行列
    Matrix4.identity(uModelMatrix);
    Matrix4.rotate(uModelMatrix, radian, axis, uModelMatrix);
    Matrix4.multiply(
      uViewProjectionMatrix,
      uModelMatrix,
      uModelViewProjectionMatrix
    );

    const unfiromData1 = uniformLocationData.get("uModelViewProjectionMatrix");
    if (!unfiromData1) {
      throw new Error("Error");
    }
    gl.uniformMatrix4fv(unfiromData1, false, uModelViewProjectionMatrix);

    const uPointSize = 3.0;
    const unfiromData2 = uniformLocationData.get("uPointSize");
    if (!unfiromData2) {
      throw new Error("Error");
    }
    gl.uniform1f(unfiromData2, uPointSize);

    gl.drawArrays(gl.POINTS, 0, sphereVertices.length / 3.0);

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // requestAnimationFrame(draw);
  });

  draw();
};
