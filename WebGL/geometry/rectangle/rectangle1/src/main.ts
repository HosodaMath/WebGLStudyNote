import { getCanvas, geGLContext2D } from "./utils/utils";
import { createVBO, createIBO, initShader, initProgram } from "./webgl/gl";
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
    console.log(width, height);

    gl = geGLContext2D(canvas);
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
    const vbo = createVBO(gl, vertices);

    const indices = [0, 1, 2, 0, 2, 3];
    const ibo = createIBO(gl, indices);

    const index = gl.getAttribLocation(webglProgram, "aVertexPosition");
    const size = 3;
    const type1 = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset1 = 0;

    // Bind VBO
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(index, size, type1, normalize, stride, offset1);
    gl.enableVertexAttribArray(index);

    // Bind IBO
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    const mode = gl.TRIANGLES;
    const count = indices.length;
    const type2 = gl.UNSIGNED_SHORT;
    const offset2 = 0;

    gl.drawElements(mode, count, type2, offset2);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  };

  init();
  draw();
});
