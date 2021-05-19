/**
 * 3D描画の準備
 * 平面コンテキストの作成
 */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const canvas = document.querySelector("#canvas");
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("canvas要素がありません");
}

const gl = canvas.getContext("webgl");
if (!gl) {
  throw new Error("WebGLをサポートしていません");
}

const vertexShaderSource = `
  attribute vec4 a_position;
  
  void main(){
    gl_Position = a_position;
  }
`;

const fragmentShaderSource = `
  void main(){
    gl_FragColor = vec4(1, 1, 0.5, 1);
  }
`;

/**
 *
 * @param shaderType
 * @param source
 * @todo WebGLRenderingContextについて調べる。
 */
const createShader = (
  shaderType: "VERTEX_SHADER" | "FRAGMENT_SHADER",
  source: string
) => {
  const shader = gl.createShader(gl[shaderType]);
  if (!shader) {
    throw new Error("シェーダーの作成に失敗しました。");
  }

  // シェーダーのソースコードをシェーダーオブジェクトに送る。
  // gl.shaderSource(shader, source)を調べる
  gl.shaderSource(shader, source);

  // シェーダーのコンパイル
  gl.compileShader(shader);

  // コンパイルエラー処理
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error("シェーダーのコンパイルエラーが起きました。");
  }

  return shader;
};

/**
 *
 */
const createShaderProgram = () => {
  // 頂点シェーダーの作成
  const vertexShader = createShader("VERTEX_SHADER", vertexShaderSource);
  // フラグメントシェーダーの作成
  const fragmentShader = createShader("FRAGMENT_SHADER", fragmentShaderSource);

  // WebGLProgramの作成
  const shaderProgram = gl.createProgram();
  if (!shaderProgram) {
    throw new Error("WebGLプログラムの作成に失敗しました。");
  }

  // 頂点シェーダーをWebGLProgramにアタッチする
  gl.attachShader(shaderProgram, vertexShader);
  // フラグメントシェーダーをWebGLProgramにアタッチする
  gl.attachShader(shaderProgram, fragmentShader);

  // シェーダーのリンクをおこなう
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw new Error("シェーダーのリンクに失敗しました。");
  }

  return shaderProgram;
};

const main = () => {
  /// クリアーカラーを黒にする。
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // カラーバッファをクリアにする
  gl.clear(gl.COLOR_BUFFER_BIT);

  const program = createShaderProgram();

  gl.useProgram(program);

  /// バッファーの作成
  const webglBuffer = gl.createBuffer();

  /// ?
  gl.bindBuffer(gl.ARRAY_BUFFER, webglBuffer);

  /// -1 ~ 1
  const position = [0, 1, 1, -1, -1, -1];
  
  /// ?
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);

  const index = gl.getAttribLocation(program, "a_position");
  const size = 2;
  const type = gl.FLOAT;
  const normalized = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
  gl.enableVertexAttribArray(index);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

window.onload = main;
