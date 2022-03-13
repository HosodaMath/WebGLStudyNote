/**
 * 
 * @param gl 
 * @param uniformLocationData 
 * @param pointSize 
 * @param uPointSizeValue 
 */
export const unifromPointSize = (
  gl: WebGL2RenderingContext,
  uniformLocationData: Map<string, WebGLUniformLocation>,
  pointSize: string,
  uPointSizeValue: HTMLDivElement
) => {
  const pointSizeData = uniformLocationData.get("uPointSize");
  if (!pointSizeData) {
    throw new Error("Error!! データが未定義です");
  }

  gl.uniform1f(pointSizeData, Number(pointSize));

  uPointSizeValue.textContent = `${pointSize}`;
};
