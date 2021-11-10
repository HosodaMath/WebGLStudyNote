/**
 *
 * @param gl
 * @param type
 * @param sorce
 * @returns
 */
export const initShader = (
  gl: WebGL2RenderingContext,
  type: "VERTEX_SHADER" | "FRAGMENT_SHADER",
  sorce: string
) => {
  const shader = gl.createShader(gl[type]);
  if (!shader) {
    throw new Error("WebGLShaderの作成に失敗しました");
  }

  gl.shaderSource(shader, sorce);

  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(
      `コンパイルエラーが発生しました${gl.getShaderInfoLog(shader)}`
    );
  }

  return shader;
};
