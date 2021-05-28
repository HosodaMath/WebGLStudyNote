import * as Matrices from "../matrix/matrix";
/**
 * @description vboの作成
 * @param gl
 * @param position_data
 * @param attributeLocation
 * @param gl_program
 */
export const createVBO = (
  gl: WebGLRenderingContext,
  position_data: Float32Array,
  attributeLocation: number,
  gl_program: WebGLProgram,
  canvas_size: Matrices.Vector2
) => {
  // バッファーの作成
  const positonBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positonBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, position_data, gl.STATIC_DRAW);
  gl.viewport(0, 0, canvas_size.x, canvas_size.y);
  gl.useProgram(gl_program);
  gl.enableVertexAttribArray(attributeLocation);
  if (!positonBuffer) {
    throw new Error("Error: The WebGLBuffer is null.");
  }

  return positonBuffer;
};
