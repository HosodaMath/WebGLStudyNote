export type vaoParameter = {
  attributeLocationIndex: number[];
  attributeSize: number[];
  verticesData: number[][];
  indicesData: number[];
};

type VAO = {
  vao: WebGLVertexArrayObject;
  ibo: WebGLBuffer;
};

export class WebGL2 {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
    this.canvas = canvas;
    this.gl = gl;
  }

  createShader(type: "VERTEX_SHADER" | "FRAGMENT_SHADER", source: string) {
    const shader = this.gl.createShader(this.gl[type]);
    if (!shader) {
      throw new Error(
        "WebGLShaderの作成中エラーが起きました。強制終了します。"
      );
    }

    this.gl.shaderSource(shader, source);

    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw new Error(`${this.gl.getShaderInfoLog(shader)} ${source}`);
    }

    return shader;
  }

  createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader){
    const program = this.gl.createProgram();
    if (!program) {
      throw new Error("Error");
    }
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      throw new Error(
        `シェーダーのリンクに失敗しました ${this.gl.getProgramInfoLog}`
      );
    }

    this.gl.useProgram(program);

    return program;
  };

  createVAO(vaoData: vaoParameter){
    // VertexArrayObjectの作成
    const vertexArrayObject = this.gl.createVertexArray();
    if (!vertexArrayObject) {
      throw new Error("VertexArrayObjectの作成に失敗しました。");
    }
    this.gl.bindVertexArray(vertexArrayObject);

    const loopMax = vaoData.verticesData.length;
    // vbo相当？ 型付浮動小数点
    [...Array(loopMax).keys()].forEach((count) => {
      const vaoBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vaoBuffer);
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array(vaoData.verticesData[count]),
        this.gl.STATIC_DRAW
      );

      const index = vaoData.attributeLocationIndex[count];
      const size = vaoData.attributeSize[count];
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      // console.log(index, size);
      this.gl.enableVertexAttribArray(index);
      this.gl.vertexAttribPointer(index, size, type, normalize, stride, offset);
    });

    // IBOに相当？ 型付整数
    // Index Bufferの作成
    const indexBufferObject = this.gl.createBuffer();
    if (!indexBufferObject) {
      throw new Error("Error!! IndexBufferの作成に失敗しました。");
    }
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(vaoData.indicesData),
      this.gl.STATIC_DRAW
    );

    // メモリの開放
    this.gl.bindVertexArray(null);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);

    const data: VAO = { vao: vertexArrayObject, ibo: indexBufferObject };

    return data;
  };
}
