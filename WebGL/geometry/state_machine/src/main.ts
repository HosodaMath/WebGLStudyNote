import { getCanvas, geGLContext2D } from "./utils/utils";
import { createVAO, initShader, initProgram } from "./webgl/gl";
import { Vector3, Matrix4 } from "./math/math";
import { RGBA } from "./color/rgba";
import VertexShader from "./shader/geometry/cone/cone1.vert";
import FragmentShader from "./shader/geometry/cone/cone1.frag";
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
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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

    const projectionMatrix = Matrix4.init();
    const modelViewMatrix = Matrix4.init();
    Matrix4.perspective(
      45,
      gl.canvas.width / gl.canvas.height,
      0.1,
      1000,
      projectionMatrix
    );
    Matrix4.identity(modelViewMatrix);

    const vec = Vector3.set(0, 0, -5);
    Matrix4.translate(modelViewMatrix, vec, modelViewMatrix);

    const vertices = [
      1.5, 0, 0, -1.5, 1, 0, -1.5, 0.809017, 0.587785, -1.5, 0.309017, 0.951057,
      -1.5, -0.309017, 0.951057, -1.5, -0.809017, 0.587785, -1.5, -1, 0, -1.5,
      -0.809017, -0.587785, -1.5, -0.309017, -0.951057, -1.5, 0.309017,
      -0.951057, -1.5, 0.809017, -0.587785,
    ];

    const indices = [
      0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 7, 0, 7, 8, 0, 8, 9, 0,
      9, 10, 0, 10, 1,
    ];

    const vertexShader = initShader(gl, "VERTEX_SHADER", VertexShader);
    const fragmentShader = initShader(gl, "FRAGMENT_SHADER", FragmentShader);
    const webglProgram = initProgram(gl, vertexShader, fragmentShader);
    const vao = createVAO(gl, webglProgram, vertices, indices);

    const uModelViewMatrixIndex = gl.getUniformLocation(
      webglProgram,
      "uModelViewMatrix"
    );

    const uProjectionMatrixIndex = gl.getUniformLocation(
      webglProgram,
      "uProjectionMatrix"
    );
  
    gl.uniformMatrix4fv(uProjectionMatrixIndex, false, projectionMatrix);
    gl.uniformMatrix4fv(uModelViewMatrixIndex, false, modelViewMatrix);

    gl.bindVertexArray(vao);

    gl.drawElements(gl.LINE_LOOP, indices.length, gl.UNSIGNED_SHORT, 0);

    gl.bindVertexArray(null);
  };

  const animation = () => {
    draw();

    requestAnimationFrame(animation);
  };

  init();
  //draw();
  animation();
});
