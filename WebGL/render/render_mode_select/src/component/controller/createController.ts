/**
 * @description カスタムコントローラの作成
 * @param gameBody
 */
export const createController = (gameBody: HTMLElement) => {
  const controllerSection = document.createElement("section");
  controllerSection.className = "controllerSection";

  const controllerTemplate = `
  <form class="controllerForm">
  <div class="rangeItem">
    <label>uFrequency</label>
    <input
      class="input uFrequency"
      type="range"
      min="0"
      max="20"
      value="0"
      step="0.01"
    />
    <p class="uFrequencyValue">1</p>
  </div>
  <div class="rangeItem">
    <label>uAmplitude</label>
    <input
      class="input uAmplitude"
      type="range"
      min="0"
      max="0.1"
      value="0"
      step="0.01"
    />
    <p class="uAmplitudeValue">2</p>
  </div>
  <div class="rangeItem">
    <label>uPointSize</label
    ><input
      class="input uPointSize"
      type="range"
      min="1"
      max="5"
      value="3"
      step="1"
    />
    <p class="uPointSizeValue">3</p>
  </div>
  <div class="checkItem">
    <label>uIsPointRender</label
    ><input class="input uIsPointRender" type="checkbox" />
    <p class="uIsPointRenderValue">ture</p>
  </div>
  <div class="checkItem">
    <label>uIsTexture</label
    ><input class="input uIsTexture" type="checkbox" checked />
    <p class="uIsTextureValue">ture</p>
  </div>
</form>  
  `;

  controllerSection.innerHTML = controllerTemplate;

  gameBody.appendChild(controllerSection);
};
