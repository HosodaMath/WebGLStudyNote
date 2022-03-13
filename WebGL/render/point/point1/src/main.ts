import { pointSketch } from "./sketch"
import { createFullScreen } from "./window/window";
import "sanitize.css";
import "./style.css";

const gameBody = document.body;
document.addEventListener("DOMContentLoaded", () => {
  createFullScreen(gameBody);
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const gl = canvas.getContext("webgl2");
  if (!gl) {
    throw new Error("Error!! WebGL2をサポートしていません。");
  }

  pointSketch(canvas, gl);
});
