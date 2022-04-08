/**
 * @description uniform1fのデータ取得と値の変更
 * @param gl WebGL2RenderingContext
 * @param uniformLocationData Mapで定義したuniform1f
 * @param uniformKey Mapのkeyデータ
 * @param inputValue 取得するデータのHTMLInputElement
 * @param resultValue 数値結果を返すHTMLDivElement
 */
export const getUniformFloat1 = (
  gl: WebGL2RenderingContext,
  uniformLocationData: Map<string, WebGLUniformLocation>,
  uniformKey: string,
  inputValue: HTMLInputElement,
  resultValue: HTMLDivElement
) => {
  const value = inputValue.value;

  const unifromData = uniformLocationData.get(uniformKey);
  if (!unifromData) {
    throw new Error("Error!! データが未定義です");
  }

  gl.uniform1f(unifromData, Number(value));

  resultValue.textContent = `${value}`;
};
