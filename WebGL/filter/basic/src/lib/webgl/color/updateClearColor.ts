export const updateClearColor = (
  width: number,
  height: number,
  gl: WebGL2RenderingContext,
  color: number[]
) => {
  gl.clearColor(color[0], color[1], color[2], 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clearDepth(1.0);
  gl.viewport(0, 0, width, height);
};
