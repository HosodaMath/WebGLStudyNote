import { unifromPointSize } from "./uniform/uniformPointSize";
/**
 * @description コントロールパネルは作成されていることが前提
 * @param gl
 * @param uniformLocationData
 */
export const uniformController = (
  gl: WebGL2RenderingContext,
  uniformLocationData: Map<string, WebGLUniformLocation>
) => {
  // uFrequencyの取得
  const uFrequency = document.querySelector(".uFrequency");
  if (!(uFrequency instanceof HTMLInputElement)) {
    throw new Error("Error!! HTMLInputElementは作成できていません");
  }

  const uFrequencyValue = document.querySelector(".uFrequencyValue");
  if (!(uFrequencyValue instanceof HTMLDivElement)) {
    throw new Error("Error!! 数値結果を返せません");
  }

  // 初期値
  const frequency = uFrequency.value;
  uFrequencyValue.textContent = `${frequency}`;

  // frequencyの発火
  uFrequency.addEventListener("change", () => {
    const frequency = uFrequency.value;
    uFrequencyValue.textContent = `${frequency}`;
  });

  // uAmplitudeを取得
  const uAmplitude = document.querySelector(".uAmplitude");
  if (!(uAmplitude instanceof HTMLInputElement)) {
    throw new Error("Error!! HTMLInputElementは作成できていません");
  }

  const uAmplitudeValue = document.querySelector(".uAmplitudeValue");
  if (!(uAmplitudeValue instanceof HTMLDivElement)) {
    throw new Error("Error!! 数値結果を返せません");
  }

  // 初期値
  const amlitude = uAmplitude.value;
  uAmplitudeValue.textContent = `${amlitude}`;

  // amplitudeの発火
  uAmplitude.addEventListener("change", () => {
    const amlitude = uAmplitude.value;
    uAmplitudeValue.textContent = `${amlitude}`;
  });

  // uPointSizeを取得
  const uPointSize = document.querySelector(".uPointSize");
  if (!(uPointSize instanceof HTMLInputElement)) {
    throw new Error("Error!! HTMLInputElementは作成できていません");
  }

  const uPointSizeValue = document.querySelector(".uPointSizeValue");
  if (!(uPointSizeValue instanceof HTMLDivElement)) {
    throw new Error("Error!! 数値結果を返せません");
  }

  // 初期値
  const pointSize = uPointSize.value;

  unifromPointSize(gl, uniformLocationData, pointSize, uPointSizeValue);

  // amplitudeの発火
  uPointSize.addEventListener("change", () => {
    const pointSize = uPointSize.value;

    unifromPointSize(gl, uniformLocationData, pointSize, uPointSizeValue);
  });
};
