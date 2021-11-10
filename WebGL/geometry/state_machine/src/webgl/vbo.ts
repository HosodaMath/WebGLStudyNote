/**
 *
 * @param gl
 * @param vertices
 * @returns
 */
export const createVBO = (gl: WebGL2RenderingContext, vertices: number[]) => {
  const vbo = gl.createBuffer();
  if (!vbo) {
    throw new Error("バッファの作成に失敗しました");
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return vbo;
};
