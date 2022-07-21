/**
 * @description alpha値を変更
 * @param gl
 * @param imageData
 * @returns
 */
export const alphaFilter1 = (
  gl: CanvasRenderingContext2D,
  imageData: ImageData
) => {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  const resultImageData = gl.createImageData(width, height);

  [...Array(height).keys()].forEach((y) => {
    [...Array(width).keys()].forEach((x) => {
      const index = (y * width + x) * 4;
      resultImageData.data[index + 0] = data[index + 0];
      resultImageData.data[index + 1] = data[index + 1];
      resultImageData.data[index + 2] = data[index + 2];
      resultImageData.data[index + 3] = x * 0.5;
    });
  });

  return resultImageData;
};
