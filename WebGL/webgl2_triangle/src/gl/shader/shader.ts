/**
 * WebGLShaderの作成
 * @description シェーダーをコンパイルする
 * @param gl
 * @param shaderType
 * @param source
 * @todo WebGLRenderingContextについて調べる。
 * @todo WebGLShaderについて調べる。
 */
 export const createWebGLShader = (
  gl: WebGLRenderingContext,
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
 * WebGLProgram(シェーダープログラム)の作成
 * @description
 * 具体的には頂点シェーダーとフラグメントシェーダーをWebGLシェーダーにコンパイルして
 * WebGLProgramにアタッチと各シェーダーのリンクをおこなう。
 *
 * @todo 後で改良する
 */
 export const createShaderProgram = (
  gl: WebGLRenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
) => {
  // 頂点シェーダーの作成
  const vertexShader = createWebGLShader(
    gl,
    "VERTEX_SHADER",
    vertexShaderSource
  );
  // フラグメントシェーダーの作成
  const fragmentShader = createWebGLShader(
    gl,
    "FRAGMENT_SHADER",
    fragmentShaderSource
  );

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