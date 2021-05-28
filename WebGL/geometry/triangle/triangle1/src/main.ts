import * as Matrices from "./matrix/matrix";
import * as GL from "./gl/gl";
/**
 * 生のWebGLで三角形を描画する
 */
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#canvas");
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("canvas要素がありません");
  }

  const gl = canvas.getContext("webgl");
  if (!gl) {
    throw new Error("WebGLをサポートしていません");
  }

  // 頂点シェーダー
  const vertexShaderSource: string = `
  attribute vec4 a_position;
  void main(){
    gl_Position = a_position;
  }
`;

  // フラグメントシェーダー
  const fragmentShaderSource: string = `
  precision highp float;
  uniform vec2 resolution;
  uniform vec2 mouse;
  uniform float time;
  void main(){
    gl_FragColor = vec4(0, 0.5, 1, 1);
  }
`;
  let width: number;
  let height: number;
  let gl_program: WebGLProgram;
  let positonBuffer: WebGLBuffer;
  let attributeLocation: number;
  let resolutionUniformLocation: WebGLUniformLocation | null;
  const init = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    /// クリアーカラーを黒にする。
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    // カラーバッファをクリアにする
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // シェーダーの作成
    const vShader = GL.createWebGLShader(
      gl,
      "VERTEX_SHADER",
      vertexShaderSource
    );
    const fShader = GL.createWebGLShader(
      gl,
      "FRAGMENT_SHADER",
      fragmentShaderSource
    );

    gl_program = GL.createShaderProgram(gl, vShader, fShader);

    attributeLocation = gl.getAttribLocation(gl_program, "a_position");

    resolutionUniformLocation = gl.getUniformLocation(
      gl_program,
      "u_resolution"
    );

    // 三角形を真ん中に描画したい場合はどうするか。
    const position = new Float32Array([-0.5, 0.0, 0.0, 0.5, 0.5, 0.0]);

    // VBOの作成
    const canvasSize = new Matrices.Vector2(width, height);
    positonBuffer = GL.createVBO(
      gl,
      position,
      attributeLocation,
      gl_program,
      canvasSize
    );
  };

  const draw = () => {
    /// 三角形の描画
    gl.bindBuffer(gl.ARRAY_BUFFER, positonBuffer);
    const index = attributeLocation;
    const size = 2;
    const type = gl.FLOAT;
    const normalized = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(index, size, type, normalized, stride, offset);

    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  init();
  draw();
});
