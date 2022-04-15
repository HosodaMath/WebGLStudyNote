type FrameBufferType = {
  frameBuffer: WebGLFramebuffer | null;
  depthRenderBuffer: WebGLRenderbuffer | null;
  frameBufferTexture: WebGLTexture | null;
};

/**
 * @description framebufferの作成
 * @param gl 
 * @param width 
 * @param height 
 * @returns 
 */
export const createFrameBuffer = (
  gl: WebGL2RenderingContext,
  width: number,
  height: number
): FrameBufferType => {
  const frameBuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

  const depthRenderBuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
  gl.framebufferRenderbuffer(
    gl.FRAMEBUFFER,
    gl.DEPTH_ATTACHMENT,
    gl.RENDERBUFFER,
    depthRenderBuffer
  );

  const fTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, fTexture);

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    width,
    height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null
  );

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    fTexture,
    0
  );

  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  const data: FrameBufferType = {
    frameBuffer: frameBuffer,
    depthRenderBuffer: depthRenderBuffer,
    frameBufferTexture: fTexture,
  };

  return data;
};
