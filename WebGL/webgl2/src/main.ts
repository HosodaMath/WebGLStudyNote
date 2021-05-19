/**
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
    gl_FragColor = vec4(0, 0.5, 1, 1);
  }
`;

/**
 * @description WebGLShaderの作成(シェーダーをコンパイルする)
 * @param shaderType
 * @param source
 * @todo WebGLRenderingContextについて調べる。
 * @todo WebGLShaderについて調べる。
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
 * @description
 * WebGLProgram(シェーダープログラム)の作成
 * 具体的には頂点シェーダーとフラグメントシェーダーをWebGLシェーダーにコンパイルして
 * WebGLProgramにアタッチと各シェーダーのリンクをおこなう。
 *
 * @todo 後で改良する
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

  // WebGLProgramにアタッチした頂点シェーダーとフラグメントシェーダーのリンクをおこなう
  gl.linkProgram(shaderProgram);

  // シェーダーのリンクに失敗したときに出力
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw new Error("シェーダーのリンクに失敗しました。");
  }

  return shaderProgram;
};

/**
 * @description
 * WebGLBufferの初期化と作成
 *
 */
const createBuffer = () => {
  // WebGLBufferの作成
  const webglBuffer = gl.createBuffer();

  /// WebGLBufferをターゲットに結合する。
  /// この場合gl.ARRAY_BUFFERに結合する
  gl.bindBuffer(gl.ARRAY_BUFFER, webglBuffer);

  /// -1 ~ 1
  const position = [0.8, 0.8, -0.8, 0.8, 0.8, -0.8, -0.8, -0.8];

  /// bufferDataを調べる
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);
};

const main = () => {
  // クリアーカラーを黒にする。
  // 背景は黒くなる
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // カラーバッファをクリアにする
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 作成したWebGLProgramを呼び出す
  const shaderProgram = createShaderProgram();

  /// WebGLProgramを描画ステートの一部として設定する
  console.log(shaderProgram);
  gl.useProgram(shaderProgram);

  createBuffer();

  // WebGLProgram(この場合シェーダー)内の属性を返す -> 返り値はnumber
  // この場合頂点シェーダーのa_positionを指定している -> 0が出力される
  const index = gl.getAttribLocation(shaderProgram, "a_position");
  // console.log("index", index);
  const size = 2;
  const type = gl.FLOAT;
  const normalized = false;
  const stride = 0;
  const offset = 0;
  // vertexAttribPointerについて調べる
  gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
  //  指定されたインデックスの汎用頂点配列を属性配列のリストにオンにする
  gl.enableVertexAttribArray(index);

  // 描画する
  const first = 0;
  const vertexCount = 4;
  gl.drawArrays(gl.TRIANGLE_STRIP, first, vertexCount);
};

window.onload = main;
