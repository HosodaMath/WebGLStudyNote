/**
 * @description image binarization
 * @param gl
 * @param imageData
 * @returns
 */
export const binarizationFilter = (
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
      const r = data[index + 0];
      const g = data[index + 1];
      const b = data[index + 2];
      const lum = (r + g + b) / 3.0;
      if (lum > 128) {
        const val = 255;
        resultImageData.data[index + 0] = data[index + 0] * val;
        resultImageData.data[index + 1] = data[index + 1] * val;
        resultImageData.data[index + 2] = data[index + 2] * val;
      } else {
        const val = 0;
        resultImageData.data[index + 0] = data[index + 0] * val;
        resultImageData.data[index + 1] = data[index + 1] * val;
        resultImageData.data[index + 2] = data[index + 2] * val;
      }

      resultImageData.data[index + 3] = data[index + 3];
    });
  });

  return resultImageData;
};
