export interface VAOParameter {
  attributeLocationIndex: number[];
  attributeSize: number[];
  verticesData: number[][];
  indicesData: number[];
}

/**
 * 
 * @param gl 
 * @param vaoParameter 
 * @returns 
 */
export const createVAO = (
  gl: WebGL2RenderingContext,
  vaoParameter: VAOParameter
) => {
  // VertexArrayObjectの作成
  const vao = gl.createVertexArray();
  if (!vao) {
    throw new Error("VertexArrayObjectの作成に失敗しました");
  }
  gl.bindVertexArray(vao);

  // vertexバッファの作成
  // verticesDataの個数分ループ
  const Max = vaoParameter.verticesData.length;
  [...Array(Max).keys()].forEach((count) => {
    const vaoBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vaoBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vaoParameter.verticesData[count]),
      gl.STATIC_DRAW
    );
    const index = vaoParameter.attributeLocationIndex[count];
    const size = vaoParameter.attributeSize[count];
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.enableVertexAttribArray(index);
    gl.vertexAttribPointer(index, size, type, normalize, stride, offset);
  });

  // Index Bufferの作成
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(vaoParameter.indicesData),
    gl.STATIC_DRAW
  );

  // メモリの開放
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return vao;
};
