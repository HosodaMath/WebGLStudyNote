// import { sketch1 } from "./sketch/webgl/sketch1"
import { sketch2 } from "./sketch/webgl/sketch2";
import { invertFilter, grayscaleFilter, binarizationFilter } from "./lib/filter/filter";
const sketch = (canvas: HTMLCanvasElement, imageData: CanvasImageSource) => {
  // CanvasRenderingContext2Dの作成
  const gl = canvas.getContext("2d");
  if (!gl) {
    throw new Error("CanvasRenderingContext2Dの作成に失敗しました。");
  }

  // 読み込んだ画像を表示
  gl.save();
  gl.translate(0, 0);
  gl.drawImage(imageData, 0, 0);
  gl.restore();

  const pixelData = gl.getImageData(0, 0, canvas.width, canvas.height);
  // console.log(pixelData);

  // 反転画像
  // const invertImage = invertFilter(gl, pixelData);
  // gl.putImageData(invertImage, 0, 0);

  // グレイスケール画像
  // const grayScaleImage = grayscaleFilter(gl, pixelData);
  // gl.putImageData(grayScaleImage, 0, 0);

  // 2値化画像
  // const binarizationImage = binarizationFilter(gl, pixelData);
  // gl.putImageData(binarizationImage, 0, 0);

  // 反転画像 + グレイスケール化
  const invertImage = invertFilter(gl, pixelData);
  const grayScaleImage = grayscaleFilter(gl, invertImage);
  gl.putImageData(grayScaleImage, 0, 0);
  
};

const main = () => {
  const mainBody = document.body;
  // const canvas = sketch1(mainBody);
  const texture = sketch2(mainBody);
  // console.log(texture);

  const imageData: CanvasImageSource = texture;

  // Canvas API用HTMLCanvasElementの作成
  const canvas = document.createElement("canvas");
  /**
   * 本来は画像に合わせて生成するものだが今回は大きさが同じであるのは自明なので
   * window.innerWidthやwindow.innerHeightを使用している。
   */
  canvas.width = 512;
  canvas.height = 512;
  // console.log(imageWidth, imageHeight);
  canvas.classList.add(...["canvas", "canvas2D"]);
  mainBody.appendChild(canvas);

  sketch(canvas, imageData);
};

window.addEventListener("load", main);
