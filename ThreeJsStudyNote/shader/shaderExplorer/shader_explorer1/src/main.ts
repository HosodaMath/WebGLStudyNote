import * as Stage from "./Stage";
import * as Box from "./Box";
import "sanitize.css";
import "./main.css";

window.addEventListener("DOMContentLoaded", () => {
  const stage = new Stage.Stage();
  stage.initStage();

  const box = new Box.Box(stage);
  box.drawBox();

  window.addEventListener("resize", () => {
    stage.useResize();
    box.useResize();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "f" || event.key === "F") {
      console.log("push f or F!!");
      const element = document.body;
      element.requestFullscreen();
    }
  });

  const animation = () => {
    const uFrameCount = window.requestAnimationFrame(() => {
      //console.log(uFrameCount);
      animation();
      const uTime = uFrameCount
      stage.useAnimation();
      box.useAnimation(uTime);
      
    });
  };

  animation();
});
