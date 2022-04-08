import { getUniformFloat1 } from "./float/getUniformFloat1";
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
  const uFrequencyKey = "uFrequency";
  const uFrequency = document.querySelector(`.${uFrequencyKey}`);
  if (!(uFrequency instanceof HTMLInputElement)) {
    throw new Error("Error!! HTMLInputElementは作成できていません");
  }

  const uFrequencyValue = document.querySelector(".uFrequencyValue");
  if (!(uFrequencyValue instanceof HTMLDivElement)) {
    throw new Error("Error!! 数値結果を返せません");
  }

  getUniformFloat1(
    gl,
    uniformLocationData,
    uFrequencyKey,
    uFrequency,
    uFrequencyValue
  );

  // frequencyの発火
  uFrequency.addEventListener("change", () => {
    getUniformFloat1(
      gl,
      uniformLocationData,
      uFrequencyKey,
      uFrequency,
      uFrequencyValue
    );
  });

  // uAmplitudeを取得
  const uAmplitudeKey = "uAmplitude";
  const uAmplitude = document.querySelector(`.${uAmplitudeKey}`);
  if (!(uAmplitude instanceof HTMLInputElement)) {
    throw new Error("Error!! HTMLInputElementは作成できていません");
  }

  const uAmplitudeValue = document.querySelector(".uAmplitudeValue");
  if (!(uAmplitudeValue instanceof HTMLDivElement)) {
    throw new Error("Error!! 数値結果を返せません");
  }

  // 初期値
  getUniformFloat1(
    gl,
    uniformLocationData,
    uAmplitudeKey,
    uAmplitude,
    uAmplitudeValue
  );

  // amplitudeの発火
  uAmplitude.addEventListener("change", () => {
    getUniformFloat1(
      gl,
      uniformLocationData,
      uAmplitudeKey,
      uAmplitude,
      uAmplitudeValue
    );
  });

  // uPointSizeを取得
  const uPointSizeKey = "uPointSize";
  const uPointSize = document.querySelector(`.${uPointSizeKey}`);
  if (!(uPointSize instanceof HTMLInputElement)) {
    throw new Error("Error!! HTMLInputElementは作成できていません");
  }

  const uPointSizeValue = document.querySelector(".uPointSizeValue");
  if (!(uPointSizeValue instanceof HTMLDivElement)) {
    throw new Error("Error!! 数値結果を返せません");
  }

  // 初期値
  getUniformFloat1(
    gl,
    uniformLocationData,
    uPointSizeKey,
    uPointSize,
    uPointSizeValue
  );

  // amplitudeの発火
  uPointSize.addEventListener("change", () => {
    getUniformFloat1(
      gl,
      uniformLocationData,
      uPointSizeKey,
      uPointSize,
      uPointSizeValue
    );
  });
};
