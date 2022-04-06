import { render } from "./render/render";
import { createFullScreen } from "./window/window";
import "sanitize.css";
import "./style.css";
// import { renderMenu } from "./render/controlPanel/menu";

const gameBody = document.body;

const main = () => {
  createFullScreen(gameBody);

  const canvas = document.createElement("canvas");
  canvas.classList.add("canvas1");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gameBody.appendChild(canvas);

  const gl = canvas.getContext("webgl2");
  if (!gl) {
    throw new Error("Error!! WebGL2をサポートしていません。");
  }

  render({ gameBody: gameBody, canvas: canvas, gl: gl });
};

window.addEventListener("DOMContentLoaded", main);
