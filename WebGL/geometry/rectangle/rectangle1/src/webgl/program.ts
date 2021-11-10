/**
 *
 * @param gl
 * @param vertexShader
 * @param fragmentShader
 * @returns
 */
export const initProgram = (
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) => {
  const program = gl.createProgram();
  if (!program) {
    throw new Error("プログラムの作成に失敗しました。");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(
      `シェーダーのリンクに失敗しました ${gl.getProgramInfoLog(program)}`
    );
  }

  gl.useProgram(program);

  return program;
};
