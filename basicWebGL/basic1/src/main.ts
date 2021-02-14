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
  
  //画面の初期化
  //クリアーカラーを緑にする。
  gl.clearColor(0.0, 1.0, 0.5, 1.0);

  //カラーバッファでクリア
  gl.clear(gl.COLOR_BUFFER_BIT);

  
}

window.onload = main;