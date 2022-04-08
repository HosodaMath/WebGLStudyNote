/**
 *
 * @param gl
 * @param program
 * @param names
 * @returns
 */
export const getUniformLocation = (
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  names: string[]
): Map<string, WebGLUniformLocation> => {
  const uniformLocationData: Map<string, WebGLUniformLocation> = new Map();
  [...Array(names.length).keys()].forEach((count) => {
    const uniformLocaiton = gl.getUniformLocation(program, names[count]);

    if (!uniformLocaiton) {
      throw new Error("Error");
    }

    uniformLocationData.set(names[count], uniformLocaiton);
  });

  return uniformLocationData;
};
