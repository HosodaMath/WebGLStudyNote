import { sketch } from "./sketch/sketch";
import { RenderProps } from "../parameter/parameter";
import { createController } from "../component/controller/createController";
/**
 * @description render
 * @param renderProps
 */
export const render = (renderProps: RenderProps) => {
  const gameBody = renderProps.gameBody;
  const canvas = renderProps.canvas;
  const gl = renderProps.gl;

  createController(gameBody);

  sketch(canvas, gl, gl.TRIANGLES);
};
