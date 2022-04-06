/**
 * @todo 有効にしているもの 必ずカリングと深度テストは有効にする
 * @param gl
 */
export const option = (gl: WebGL2RenderingContext) => {
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.CULL_FACE);
};
