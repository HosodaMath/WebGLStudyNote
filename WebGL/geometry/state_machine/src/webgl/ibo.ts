/**
 *
 * @param gl
 * @param indices
 * @returns
 */
export const createIBO = (gl: WebGL2RenderingContext, indices: number[]) => {
  const ibo = gl.createBuffer();
  if (!ibo) {
    throw new Error("iboの作成に失敗しました");
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return ibo;
};
