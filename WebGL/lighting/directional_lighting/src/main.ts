/**
 * 計算負荷が軽い
 * 
 */
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
import DirectinalLightVertexShader from "./shader/light/directinal_light.vert";
import DirectinalLightFragmentShader from "./shader/light/directinal_light.frag";
import "sanitize.css";
import "./main.css";
window.addEventListener("DOMContentLoaded", () => {
  const uniformVertexLocation: WebGLUniformLocation[] = [];
  const uniformFragmentLocation: WebGLUniformLocation[] = [];
  let gl: WebGL2RenderingContext;
  let width: number;
  let height: number;
  let startTime: number;
  let indexTorusData: number[];
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
    const rectVertexShader = initShader(
      gl,
      "VERTEX_SHADER",
      DirectinalLightVertexShader
    );
    const rectFragmentShader = initShader(
      gl,
      "FRAGMENT_SHADER",
      DirectinalLightFragmentShader
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

    const torusData = torus(64, 64, 0.25, 0.75, [0.0, 0.5, 1.0, 1.0]);
    const colorTorus = torusData.color;
    const positionTorusData = torusData.position;
    const normalTorusData = torusData.normal;
    const textureCoord = torusData.textureCoord;
    const indicesTorusData = torusData.indices;
    indexTorusData = indicesTorusData;

    const verticesData = [
      colorTorus,
      positionTorusData,
      normalTorusData,
      textureCoord,
    ];

    // VAOパラメーター
    const vaoParameter: VAOParameter = {
      attributeLocationIndex: attributeLocationIndex,
      attributeSize: attributeSize,
      verticesData: verticesData,
      indicesData: indicesTorusData,
    };

    const VAO = createVAO(gl, vaoParameter);
    vao = VAO;

    // 頂点シェーダーのuniformをセット
    uniformVertexLocation.push(
      gl.getUniformLocation(program, "uModelViewProjectionMatrix")
    );

    // フラグメントシェーダーのuniformをセット
    uniformFragmentLocation.push(
      gl.getUniformLocation(program, "uInvertMatrix")
    );
    uniformFragmentLocation.push(
      gl.getUniformLocation(program, "uLightDirection")
    );

    initMatrix();

    startTime = Date.now();

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);
  };

  /**
   * @description 行列計算の初期化
   */
  const initMatrix = () => {
    modelMatrix = GLMath.Matrix4.identity(GLMath.Matrix4.init());
    viewMatrix = GLMath.Matrix4.identity(GLMath.Matrix4.init());
    projectionMatrix = GLMath.Matrix4.identity(GLMath.Matrix4.init());
    viewProjectionMatrix = GLMath.Matrix4.identity(GLMath.Matrix4.init());
    modelViewProjectionMatrix = GLMath.Matrix4.identity(GLMath.Matrix4.init());
    invertMatrix = GLMath.Matrix4.identity(GLMath.Matrix4.init());

    //ビュープロジェクション座標変換行列
    const eye = GLMath.Vector3.set(0.0, 0.0, 5.0);
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

    // 空間内のグローバル時間
    const gTime = (Date.now() - startTime) * 0.025;
    // shader内時間
    // const uTime = gTime * 0.5;

    const radian = GLMath.Calculator.radians(gTime);

    // モデル座標変換行列
    GLMath.Matrix4.identity(modelMatrix);
    // 回転行列の計算
    const axis = GLMath.Vector3.set(0.0, 1.0, 1.0);
    GLMath.Matrix4.rotate(modelMatrix, radian, axis, modelMatrix);

    // モデルビュープロジェクション座標変換行列
    GLMath.Matrix4.multiply(
      viewProjectionMatrix,
      modelMatrix,
      modelViewProjectionMatrix
    );

    // モデル座標変換行列から逆行列を算出する
    GLMath.Matrix4.invert(modelMatrix, invertMatrix);

    // 頂点シェーダーのuniformをセット
    gl.uniformMatrix4fv(
      uniformVertexLocation[0],
      false,
      modelViewProjectionMatrix
    );

    // フラグメントシェーダーのuniformをセット
    // 逆行列をセット
    gl.uniformMatrix4fv(uniformFragmentLocation[0], false, invertMatrix);
    // ライトベクトル
    const uLightDirection = GLMath.Vector3.set(-0.5, 0.5, 0.5);
    gl.uniform3fv(uniformFragmentLocation[1], uLightDirection);

    // vaoからプリミティブを生成
    gl.bindVertexArray(vao);
    const mode = gl.TRIANGLES;
    const count = indexTorusData.length;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(mode, count, type, offset);

    gl.bindVertexArray(null);

    requestAnimationFrame(draw);
  };

  init();
  draw();
});
