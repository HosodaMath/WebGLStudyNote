import { sketch } from "./sketch/sketch";
import { createFullScreen } from "./window/window";
import "sanitize.css";
import "./style.css";

const gameBody = document.body;

window.addEventListener("DOMContentLoaded", () => {
  createFullScreen(gameBody);

  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // canvas.style.display = "none";
  gameBody.appendChild(canvas);

  const gl = canvas.getContext("webgl2");
  if (!gl) {
    throw new Error("Error!! WebGL2をサポートしていません。");
  }

  sketch(canvas, gl);
});
