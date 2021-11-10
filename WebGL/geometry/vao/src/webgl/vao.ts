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
) => {
  // VertexArrayObjectの作成
  const vao = gl.createVertexArray();
  if (!vao) {
    throw new Error("VertexArrayObjectの作成に失敗しました");
  }

  gl.bindVertexArray(vao);
  // vaoバッファの作成
  const vaoBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vaoBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const index = gl.getAttribLocation(program, "aVertexPosition");
  const size = 3;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.enableVertexAttribArray(index);
  gl.vertexAttribPointer(index, size, type, normalize, stride, offset);

  // iboの作成
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
  
  // clean
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  
  return vao;
};
