/**
 * vaoを使ってみる
 * squareを描画する
 * 色の描画がおかしいなぜなのか？
 * 頂点分の色を定義する必要がある。
 * rgbaなので4 * 4 = 16
 * 頂点ごとに異なる色を設定する事もできる。
 * しかしこれはまだしかしこれはsquareになっていない
 * sketch1でその問題を解決する。
 */
import {
  createShader,
  createProgram,
  createVAO,
  updateClearColor,
} from "../webgl/webgl";
import { squareData } from "../data/square/squareData1";
import SquareVertexShader from "../shader/basic/square0.vert?raw";
import SquareFragmentShader from "../shader/basic/square0.frag?raw";
export const sketch0 = () => {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const gl = canvas.getContext("webgl2");
  if (!gl) {
    throw new Error("Error!! Does not support WebGL2");
  }

  const draw = () => {
    updateClearColor(canvas, gl, [0.0, 0.0, 0.0]);

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

    // requestAnimationFrame(draw);
  });

  // requestAnimationFrame(draw);
  draw();
};
