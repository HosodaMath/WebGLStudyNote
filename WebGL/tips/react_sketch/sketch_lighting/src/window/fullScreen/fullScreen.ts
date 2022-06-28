/**
 * @description fullscreenの機能を追加
 * @param mainBody
 */
export const createFullScreen = (mainBody: HTMLElement) => {
  const button = document.createElement("button");
  button.className = "fullScreenButton";
  button.textContent = "fullScreen";
  mainBody.appendChild(button);

  button.addEventListener("click", () => {
    mainBody.requestFullscreen();
  });
};
