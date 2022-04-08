/**
 * @description カスタムコントローラの作成
 * @param gameBody
 */
export const createController = (gameBody: HTMLElement) => {
  const controllerSection = document.createElement("section");
  controllerSection.className = "controllerSection";

  const controllerTemplate = `
  <form class="controllerForm">
      <div>
        <label>uFrequency</label>
        <input
          class="input uFrequency"
          type="range"
          min="0"
          max="20"
          value="0"
          step="0.01"
        />
        <div class="uFrequencyValue"></div>
      </div>
      <div>
        <label>uAmplitude</label>
        <input
          class="input uAmplitude"
          type="range"
          min="0"
          max="0.1"
          value="0"
          step="0.01"
        />
        <div class="uAmplitudeValue"></div>
      </div>
      <div>
      <label>uPointSize</label
      ><input
        class="input uPointSize"
        type="range"
        min="1"
        max="5"
        value="3"
        step="1"
      />
      <div class="uPointSizeValue"></div>
    </div>
    </form>
  `;

  controllerSection.innerHTML = controllerTemplate;

  gameBody.appendChild(controllerSection);
};
