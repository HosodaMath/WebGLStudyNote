import { sketch0 } from "./sketch/sketch0";
import { sketch1 } from "./sketch/sketch1";
import { sketch2 } from "./sketch/sketch2"
import { sketch3 } from "./sketch/sketch3";
import { random } from "./math/mathematics"
import { createFullScreen } from "./window/window";
import "sanitize.css";
import "./style.scss";

const gameBody = document.body;
createFullScreen(gameBody);
window.addEventListener("DOMContentLoaded", () => {
  const sketchData = [0, 1, 2, 3];
  const choice = Math.floor(random(0, sketchData.length));
  if (choice === 0) {
    sketch0();
  } else if (choice === 1) {
    sketch1();
  } else if (choice === 2) {
    sketch2();
  } else if(choice === 3){
    sketch3();
  }
});
