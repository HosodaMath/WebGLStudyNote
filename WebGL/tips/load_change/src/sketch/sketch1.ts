/**
 * vaoを使ってみる
 * ちゃんとsquareの形にする
 * 形にするには各種座標変換行列を定義する必要がある。
 * 形はsquareつまり正方形になっている
 * -> 正方形を実装したので矩形を実装する
 */
import {
  createShader,
  createProgram,
  createVAO,
  getUniformLocation,
  updateClearColor,
} from "../webgl/webgl";
import { squareData } from "../data/square/squareData1";
import SquareVertexShader from "../shader/basic/square1.vert?raw";
import SquareFragmentShader from "../shader/basic/square1.frag?raw";
import { Matrix4, Vector3 } from "../math/mathematics";
export const sketch1 = () => {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const gl = canvas.getContext("webgl2");
  if (!gl) {
    throw new Error("Error!! Does not support WebGL2");
  }

  const vertexShader = createShader(gl, "VERTEX_SHADER", SquareVertexShader);
  const fragmentShader = createShader(
    gl,
    "FRAGMENT_SHADER",
    SquareFragmentShader
  );
  const program = createProgram(gl, vertexShader, fragmentShader);

  const attributeLocationIndex = [
    gl.getAttribLocation(program, "aColor"),
    gl.getAttribLocation(program, "aPosition"),
  ];

  const verticesColor = squareData[0].vertexColor;
  const verticesData = squareData[0].verticesData;
  const attributeSize = squareData[0].attributeSize;
  const indicesData = squareData[0].indicesData;

  const vaoData = {
    attributeLocationIndex: attributeLocationIndex,
    attributeSize: attributeSize,
    verticesData: [verticesColor, verticesData],
    indicesData: indicesData,
  };

  const squareVao = createVAO(gl, vaoData);

  const uniformLocationData = getUniformLocation(gl, program, [
    "modelViewProjectionMatrix",
  ]);

  const draw = () => {
    updateClearColor(canvas, gl, [0.0, 0.0, 0.0]);
    // モデル行列
    const modelMatrix = Matrix4.identity(Matrix4.init());
    // ビュー行列 主に視点に関わる行列
    const viewMatrix = Matrix4.identity(Matrix4.init());
    // プロジェクション行列
    const projectionMatrix = Matrix4.identity(Matrix4.init());
    // モデルビュープロジェクション行列
    const modelViewProjectionMatrix = Matrix4.identity(Matrix4.init());

    const eye = Vector3.set(0.0, 0.0, 3.0);
    const center = Vector3.set(0.0, 0.0, 0.0);
    const up = Vector3.set(0.0, 1.0, 0.0);
    Matrix4.lookAt(eye, center, up, viewMatrix);

    Matrix4.perspective(
      90.0,
      canvas.width / canvas.height,
      0.1,
      100,
      projectionMatrix
    );

    Matrix4.multiply(projectionMatrix, viewMatrix, modelViewProjectionMatrix);

    Matrix4.multiply(
      modelViewProjectionMatrix,
      modelMatrix,
      modelViewProjectionMatrix
    );

    gl.uniformMatrix4fv(
      uniformLocationData[0],
      false,
      modelViewProjectionMatrix
    );

    gl.bindVertexArray(squareVao);
    const squareMode = gl.TRIANGLES;
    const squareCount = indicesData.length;
    const squareType = gl.UNSIGNED_SHORT;
    const squareOffset = 0;
    gl.drawElements(squareMode, squareCount, squareType, squareOffset);
    gl.bindVertexArray(null);

    // requestAnimationFrame(draw);
  };

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(draw);
  });

  // requestAnimationFrame(draw);
  draw();
};
