import { getCanvas, geGLContext2D } from "./utils/utils";
import { createVAO, initShader, initProgram } from "./webgl/gl";
import { RGBA } from "./color/rgba";
import VertexShader from "./shader/geometry/rect/rect1.vert";
import FragmentShader from "./shader/geometry/rect/rect1.frag";
import "sanitize.css";
import "./main.css";
window.addEventListener("DOMContentLoaded", () => {
  let gl: WebGL2RenderingContext;
  let width: number;
  let height: number;
  /**
   *
   * @param gl
   * @param color
   */
  const updateClearColor = (gl: WebGL2RenderingContext, color: number[]) => {
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  };

  const init = () => {
    const canvas = getCanvas();
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    gl = geGLContext2D(canvas);

    const windowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    window.addEventListener("resize", windowResize);
  };

  const draw = () => {
    const rgbaColor = new RGBA(0, 0, 0, 1);
    const color = rgbaColor.rgbaArray();
    updateClearColor(gl, color);

    const vertexShader = initShader(gl, "VERTEX_SHADER", VertexShader);
    const fragmentShader = initShader(gl, "FRAGMENT_SHADER", FragmentShader);
    const webglProgram = initProgram(gl, vertexShader, fragmentShader);

    const vertices = [
      -0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0,
    ];

    const indices = [0, 1, 2, 0, 2, 3];

    const vao = createVAO(gl, webglProgram, vertices, indices);
    gl.bindVertexArray(vao);
    const mode = gl.TRIANGLES;
    const count = indices.length;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(mode, count, type, offset);
    gl.bindVertexArray(null);
  };

  init();
  draw();
});
