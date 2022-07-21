/**
 * @description invert an image
 * @param gl 
 * @param imageData 
 * @returns 
 */
export const invertFilter = (
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
      resultImageData.data[index + 0] = 255 - data[index + 0];
      resultImageData.data[index + 1] = 255 - data[index + 1];
      resultImageData.data[index + 2] = 255 - data[index + 2];
      resultImageData.data[index + 3] = data[index + 3];
    });
  });

  return resultImageData;
};
