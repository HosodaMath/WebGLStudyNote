/**
 * @description grayscale image
 * @todo 様々なグレースケール化を試す
 * @param gl
 * @param imageData
 * @returns
 */
export const grayscaleFilter = (
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
      resultImageData.data[index + 0] = lum;
      resultImageData.data[index + 1] = lum;
      resultImageData.data[index + 2] = lum;
      resultImageData.data[index + 3] = data[index + 3];
    });
  });

  return resultImageData;
};
