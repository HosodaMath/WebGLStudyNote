type InputRangeType = {
  type: string;
  min: string;
  max: string;
  value: string;
  step: string;
};

/**
 * @description
 * @todo ここは別にするおそらくinput系コントローラーとして作成
 * @param inputRangeValue 
 * @param selectorsName 
 * @returns 
 */
const getInputValue = (inputRangeValue: InputRangeType, selectorsName: string) => {
  const selectors = document.querySelector(selectorsName);
  if (!(selectors instanceof HTMLInputElement)) {
    throw new Error("Error");
  }

  selectors.type = inputRangeValue.type;
  selectors.min = inputRangeValue.min;
  selectors.max = inputRangeValue.max;
  selectors.value = inputRangeValue.value;
  selectors.step = inputRangeValue.step;

  return selectors;
};


/**
 * @description WebGL専用カスタマイズコントローラー
 * @param gl 
 */
export const getTranslateValue = (gl: WebGL2RenderingContext) => {
  const type = "range";
  const min = "-1";
  const max = "1";
  const value = "1";
  const step = "0.01";

  const inputRangeValue: InputRangeType = {
    type: type,
    min: min,
    max: max,
    value: value,
    step: step,
  };

  const translateX = getInputValue(inputRangeValue, "form .TranslateX");
  const translateY = getInputValue(inputRangeValue, "form .TranslateY");
  const translateZ = getInputValue(inputRangeValue, "form .TranslateZ");

  const data: [number, number, number] = [0, 0, 0];

  translateX.addEventListener("change", () => {
    data[0] = Number(translateX.value);
    console.log(data);
  });

  translateY.addEventListener("change", () => {
    data[1] = Number(translateY.value);
    console.log(data);
  });

  translateZ.addEventListener("change", () => {
    data[2] = Number(translateZ.value);
    console.log(data);
  });
};