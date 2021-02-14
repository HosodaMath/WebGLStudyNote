const main = () => {
  // #sketch 要素の取得
  const canvas = document.querySelector("#sketch");
  
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('not found canvas element');
  }

  // WebGL レンダリングコンテキストの取得
  const gl = canvas.getContext("webgl");

  if(!gl) {
    throw new Error("Unable to initialize WebGL. Your browser or machine may not support it.");
  }
  
  // 画面の初期化
  
  // クリアーカラーを緑にする。
  gl.clearColor(0.0, 1.0, 0.5, 1.0);

  // カラーバッファでクリア
  gl.clear(gl.COLOR_BUFFER_BIT);

  // シェーダーの定義
  /**
   * 頂点シェーダもしくはフラグメントシェーダーを作成
   * @param {"VERTEX_SHADER" | "FRAGMENT_SHADER"} type 頂点シェーダもしくはフラグメントシェーダー 
   * @param {string} source シェーダーのソースコード
   */
  const initShader = (type: "VERTEX_SHADER" | "FRAGMENT_SHADER", source: string) => {
    const shader = gl.createShader(gl[type]);
  
    if(!shader) {
      throw new Error("シェーダーの作成に失敗しました。");
    }

    // シェーダーセット
    gl.shaderSource(shader, source);
    
    // シェーダーのコンパイル
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
      throw new Error("シェーダーのコンパイルに失敗しました。");
    }

    return shader;
  }

  // 頂点シェーダ
  const vertexShader = initShader("VERTEX_SHADER", `
    attribute vec4 a_position;

    void main(){
      gl_Position = a_position;
    }
  `
  );

  // フラグメントシェーダーの作成
  const fragmentShader = initShader("FRAGMENT_SHADER", `
    void main(){
      gl_FragColor = vec4(0, 0, 0, 1); 
    }
  `);
  // ここまでがシェーダー

  // ここからWebGL
  const program = gl.createProgram();
  if(!program) {
    throw new Error("プログラムの作成に失敗しました。");
  }

  // シェーダーをWebGLProgramにアタッチする。
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader)

  // 頂点シェーダーとフラグメントシェーダーをリンクする。
  gl.linkProgram(program);
  
  if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    throw new Error(`シェーダーのリンクに失敗しました: ${gl.getProgramInfoLog(program)}`);
  }

  // プログラム設定
  gl.useProgram(program);

  // 頂点バッファ
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [
    0, 1,
    0.866, -0.5,
    -0.866, -0.5,
  ];

  //バッファオブジェクトのデータストアを初期化
  gl.bufferData(
    gl.ARRAY_BUFFER, 
    new Float32Array(positions), 
    gl.STATIC_DRAW
  );
  
  // 各パラメータ
  const INDEX = gl.getAttribLocation(program, "a_position");
  const SIZE = 2;
  const TYPE = gl.FLOAT;
  const NORMALIZED = false;
  const STRIDE = 0;
  const OFFSET = 0;

  gl.vertexAttribPointer(INDEX, SIZE, TYPE, NORMALIZED, STRIDE, OFFSET);
  gl.enableVertexAttribArray(INDEX);

  // 描画
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

window.onload = main;