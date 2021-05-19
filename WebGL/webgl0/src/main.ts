/**
 * 3D描画の準備
 * カラークリア
 */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const canvas = document.querySelector("#canvas");
if(!(canvas instanceof HTMLCanvasElement)){
  throw new Error("canvas要素がありません");
}

const gl = canvas.getContext("webgl");
if(!gl){
  throw new Error("WebGLをサポートしていません");
}

const main = () => {
  /// クリアーカラーを黒にする。
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // カラーバッファをクリアにする
  gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload = main;
