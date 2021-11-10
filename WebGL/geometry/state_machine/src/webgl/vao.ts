/**
 * @description VertexArrayObjectの作成
 * @param gl
 * @param program
 * @param vertices
 * @param indices
 * @returns
 */
export const createVAO = (
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  vertices: number[],
  indices: number[]
): WebGLVertexArrayObject => {
  // VertexArrayObjectの作成
  const coneVao = gl.createVertexArray();
  if (!coneVao) {
    throw new Error("VertexArrayObjectの作成に失敗しました");
  }
  gl.bindVertexArray(coneVao);
  // vaoバッファの作成
  const coneVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const index = gl.getAttribLocation(program, "aVertexPosition");
  const size = 3;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(index, size, type, normalize, stride, offset);
  gl.enableVertexAttribArray(index);

  let coneIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coneIndexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  if (coneVertexBuffer === gl.getParameter(gl.ARRAY_BUFFER_BINDING)) {
    const vboName = "coneVertexBuffer";
  }

  if (coneIndexBuffer === gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING)) {
    const iboName = "coneIndexBuffer";
  }

  const vboSize = gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE);
  const vboUsage = gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_USAGE);

  const iboSize = gl.getBufferParameter(
    gl.ELEMENT_ARRAY_BUFFER,
    gl.BUFFER_SIZE
  );
  const iboUsage = gl.getBufferParameter(
    gl.ELEMENT_ARRAY_BUFFER,
    gl.BUFFER_USAGE
  );

  let isVerticesVbo: boolean;
  try {
    isVerticesVbo = gl.isBuffer(vertices);
  } catch (e) {
    isVerticesVbo = false;
  }

  const isConeVertexNumber = gl.isBuffer(coneVertexBuffer);

  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return coneVao;
};
