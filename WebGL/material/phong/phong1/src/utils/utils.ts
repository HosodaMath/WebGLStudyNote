/**
 * 
 * @returns 
 */
export const getCanvas = () => {
  const canvas = document.querySelector(".canvas");
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Error!! HTML5 Canvas was found on this page ");
  }

  return canvas;
};

/**
 * 
 * @param canvas 
 * @returns 
 */
export const geGLContext2D = (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    throw new Error("Error!! WebGL2 not supported");
  }

  return gl;
};


