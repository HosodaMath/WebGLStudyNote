/**
 * 基本的な三角形の作成
 * @todo わからないところはすべてコメントの前に?をつける
 */
import * as Matrices from "./matrix/matrix";
import * as Grafics from "./gl/gl";

import "sanitize.css";

const canvas = document.querySelector("#canvas");
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("canvas要素がありません");
}

const gl = canvas.getContext("webgl");
if (!gl) {
  throw new Error("WebGLをサポートしていません");
}

/**
 * 三角形のWebGLBufferを作成
 * @description WebGLBufferの初期化と作成
 * @param gl WebGLRenderingContext
 * @returns squarePositionBuffer
 */
const createTriangleBuffer = (gl: WebGLRenderingContext) => {
  // WebGLBufferの作成
  const trianglePositionBuffer = gl.createBuffer();

  /// WebGLBufferをターゲットに結合する。
  /// この場合gl.ARRAY_BUFFERに結合する
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglePositionBuffer);

  /// -1 ~ 1の範囲
  // triagnle1
  // const tiranglePosition = [0.0, 0.0, 0.0, 0.5, 0.7, 0.0];
  // triangle2
  const tiranglePosition = [0.0, 1.0, 1.0, -1.0, -1.0, -1.0];

  /// ? bufferDataを調べる
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(tiranglePosition),
    gl.STATIC_DRAW
  );

  return trianglePositionBuffer;
};

/**
 * @description シーンの作成
 * @param gl
 * @param shaderProgram
 * @param buffer
 */
const drawTriangle = (
  gl: WebGLRenderingContext,
  shaderProgram: WebGLProgram,
  buffer: WebGLBuffer
) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // クリアーカラーを黒にする。
  // 背景は黒くなる
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // ?
  gl.enable(gl.DEPTH_TEST);
  // ?
  gl.depthFunc(gl.LEQUAL);
  // ? カラーバッファもしくはデプスバッファークリアにする
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.useProgram(shaderProgram);

  // WebGLProgram(この場合シェーダー)内の属性を返す -> 返り値はnumber
  // この場合頂点シェーダーのa_positionを指定している -> 0が出力される
  const index = gl.getAttribLocation(shaderProgram, "a_position");
  const size = 2;
  // 32ビットの浮動小数点
  const type = gl.FLOAT;
  // データをノーマライズしない
  const normalized = false;
  // シェーダーを呼び出すごとに進む距離
  const stride = 0;
  const offset = 0;
  // ?
  gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
  //  指定されたインデックスの汎用頂点配列を属性配列のリストにオンにする
  gl.enableVertexAttribArray(index);

  const first = 0;
  const vertexCount = 3;
  gl.drawArrays(gl.TRIANGLES, first, vertexCount);
};

const main = () => {
  const vertexShaderSource: string = `
  attribute vec4 a_position;

  // C/C++をやっているならおなじみのmain
  void main(){
    gl_Position = a_position;
  }
`;

  const fragmentShaderSource: string = `
  precision highp float;

  void main(){
    // この場合は空色になる
    gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
  }
`;

  const shaderProgram = Grafics.createShaderProgram(
    gl,
    vertexShaderSource,
    fragmentShaderSource
  );

  const triangleBuffer = createTriangleBuffer(gl);
  if (!triangleBuffer) {
    throw new Error("Error!! Bufferはnullです。");
  }

  drawTriangle(gl, shaderProgram, triangleBuffer);
};

window.onload = main;
