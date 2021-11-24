import { getCanvas, geGLContext2D } from "./utils/utils";
import {
  initShader,
  initProgram,
  createVAO,
  VAOParameter,
  torus,
} from "./webgl2/gl";
import * as Color from "./color/rgba";
import * as GLMath from "./math/math";
import PlaneVertexShader from "./shader/material/phong2.vert";
import PlaneFragmentShader from "./shader/material/phong2.frag";
import "sanitize.css";
import "./main.css";
window.addEventListener("DOMContentLoaded", () => {
  const uniformVertexLocation: WebGLUniformLocation[] = [];
  const uniformFragmentLocation: WebGLUniformLocation[] = [];
  let gl: WebGL2RenderingContext;
  let width: number;
  let height: number;
  let startTime: number;
  let indexPlaneData: number[];
  let vao: WebGLVertexArrayObject;
  let program: WebGLProgram;
  let modelMatrix: Float32Array;
  let viewMatrix: Float32Array;
  let projectionMatrix: Float32Array;
  let viewProjectionMatrix: Float32Array;
  let modelViewProjectionMatrix: Float32Array;
  let invertMatrix: Float32Array;
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

    // Rectangle Shader
    const rectVertexShader = initShader(gl, "VERTEX_SHADER", PlaneVertexShader);
    const rectFragmentShader = initShader(
      gl,
      "FRAGMENT_SHADER",
      PlaneFragmentShader
    );
    const WebGLProg = initProgram(gl, rectVertexShader, rectFragmentShader);
    program = WebGLProg;

    // VAOパラメーターの準備
    const attributeLocationIndex = [
      gl.getAttribLocation(WebGLProg, "aColor"),
      gl.getAttribLocation(WebGLProg, "aPosition"),
      gl.getAttribLocation(WebGLProg, "aNormal"),
      gl.getAttribLocation(WebGLProg, "aTexCoord"),
    ];

    const attributeSize = [4, 3, 3, 2];

    const torusData = torus(64, 64, 0.25, 0.75, [0.0, 0.0, 0.0, 1.0]);
    const colorPlaneData = torusData.color;
    const positionPlaneData = torusData.position;
    const normalPlaneData = torusData.normal;
    const textureCoord = torusData.textureCoord;
    const indicesPlaneData = torusData.indices;
    indexPlaneData = indicesPlaneData;

    const verticesData = [
      colorPlaneData,
      positionPlaneData,
      normalPlaneData,
      textureCoord,
    ];

    // VAOパラメーター
    const vaoParameter: VAOParameter = {
      attributeLocationIndex: attributeLocationIndex,
      attributeSize: attributeSize,
      verticesData: verticesData,
      indicesData: indicesPlaneData,
    };

    const VAO = createVAO(gl, vaoParameter);
    vao = VAO;

    // Vertex Shader uniformのセットアップ
    uniformVertexLocation.push(gl.getUniformLocation(program, "mvpMatrix"));

    uniformFragmentLocation.push(
      gl.getUniformLocation(program, "uInvertMatrix")
    );
    uniformFragmentLocation.push(
      gl.getUniformLocation(program, "uAmbientColor")
    );
    uniformFragmentLocation.push(
      gl.getUniformLocation(program, "uLightDirecton")
    );
    uniformFragmentLocation.push(
      gl.getUniformLocation(program, "uEyeDirection")
    );
    uniformFragmentLocation.push(gl.getUniformLocation(program, "uResolution"));
    uniformFragmentLocation.push(gl.getUniformLocation(program, "uTime"));

    initMatrix();

    startTime = Date.now();

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);
  };

  const initMatrix = () => {
    modelMatrix = GLMath.Matrix4.identity(GLMath.Matrix4.init());
    viewMatrix = GLMath.Matrix4.identity(GLMath.Matrix4.init());
    projectionMatrix = GLMath.Matrix4.identity(GLMath.Matrix4.init());
    viewProjectionMatrix = GLMath.Matrix4.identity(GLMath.Matrix4.init());
    modelViewProjectionMatrix = GLMath.Matrix4.identity(GLMath.Matrix4.init());
    invertMatrix = GLMath.Matrix4.identity(GLMath.Matrix4.init());

    const eye = GLMath.Vector3.set(0.0, 0.0, 4.0);
    const center = GLMath.Vector3.set(0.0, 0.0, 0.0);
    const up = GLMath.Vector3.set(0.0, 1.0, 0.0);
    GLMath.Matrix4.lookAt(eye, center, up, viewMatrix);

    GLMath.Matrix4.perspective(
      90.0,
      width / height,
      0.1,
      100,
      projectionMatrix
    );

    GLMath.Matrix4.multiply(projectionMatrix, viewMatrix, viewProjectionMatrix);
  };

  const draw = () => {
    const rgbaColor = new Color.RGBA(0, 0, 0, 1);
    const color = rgbaColor.rgbaArray();
    updateClearColor(gl, color);

    const uTime = (Date.now() - startTime) * 0.025;

    const radian = GLMath.Calculator.radians(uTime);

    GLMath.Matrix4.identity(modelMatrix);

    const axis = GLMath.Vector3.set(0.0, 1.0, 1.0);
    GLMath.Matrix4.rotate(modelMatrix, radian, axis, modelMatrix);

    GLMath.Matrix4.multiply(
      viewProjectionMatrix,
      modelMatrix,
      modelViewProjectionMatrix
    );

    GLMath.Matrix4.invert(modelMatrix, invertMatrix);

    gl.uniformMatrix4fv(
      uniformVertexLocation[0],
      false,
      modelViewProjectionMatrix
    );

    const uAmbientColor = GLMath.Vector4.set(0.1, 0.1, 0.1, 1.0);
    const uLightDirecton = GLMath.Vector3.set(-0.5, 1.0, 0.5);
    const uEyeDirection = GLMath.Vector3.set(0.0, 0.0, 10.0);

    const uResolution = GLMath.Vector2.set(width, height);
    gl.uniformMatrix4fv(uniformFragmentLocation[0], false, invertMatrix);
    gl.uniform4fv(uniformFragmentLocation[1], uAmbientColor);
    gl.uniform3fv(uniformFragmentLocation[2], uLightDirecton);
    gl.uniform3fv(uniformFragmentLocation[3], uEyeDirection);
    gl.uniform2fv(uniformFragmentLocation[4], [uResolution[0], uResolution[1]]);
    gl.uniform1f(uniformFragmentLocation[5], uTime);

    gl.bindVertexArray(vao);
    const mode = gl.TRIANGLES;
    const count = indexPlaneData.length;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(mode, count, type, offset);

    gl.bindVertexArray(null);

    requestAnimationFrame(draw);
  };

  init();
  draw();
});
