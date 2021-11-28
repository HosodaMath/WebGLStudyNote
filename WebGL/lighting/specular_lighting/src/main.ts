/***
 * 反射光によるライティング
 * 光の反射をシミュレーションする。
 * 3Dシーンのリアリティが増す。
 * モデルに光沢や輝きをもたせる事が可能になる。
 * 金属感やツルツルとした質感をもたせることができる。
 * 拡散光では光が強くあたっている部分でもモデルの色がそのまま出力するだけ。
 * 光沢を表すにはハイライトのような強い光を表現しないといけない。
 * 拡散光は視線を考慮しないため拡散光だけでハイライトをしようとすると不自然になる。
 * 反射光はモデルを見つめる視線と光の向きを考慮するので自然なハイライトになる。
 * ただしそのままシミュレーションすると重くなってしまう。
 * そこで近似的に結果を求めるために使われるのが
 * ライトベクトルと視線ベクトルとのハーフベクトルを使って結果を求めるというわけです。
 * ハーフベクトルと面の法線ベクトルとの内積で反射光の強さを求める。
 * 実装するには
 * uniformに視線ベクトルを追加する
 * ライトベクトルと視線ベクトルのハーフベクトルの求め方は
 * ライトベクトルと視線ベクトルを加算しその結果を正規化する。
 * そのままフォンシェーディングとして扱うことができる。
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
import SpecularLightVertexShader from "./shader/light/specular_light.vert";
import SpecularLightFragmentShader from "./shader/light/specular_light.frag";
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
      SpecularLightVertexShader
    );
    const rectFragmentShader = initShader(
      gl,
      "FRAGMENT_SHADER",
      SpecularLightFragmentShader
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
      gl.getUniformLocation(program, "uAmbinetColor")
    );
    uniformFragmentLocation.push(
      gl.getUniformLocation(program, "uEyeDirection")
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

    console.log(modelMatrix)
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
    // 環境光の色 光の乱反射をシミュレーションしているので値は大きすぎないほうが良い
    const uAmbinetColor = GLMath.Vector4.set(0.1, 0.1, 0.1, 0.1);
    gl.uniform4fv(uniformFragmentLocation[1], uAmbinetColor);
    // ライトベクトル
    const uLightDirection = GLMath.Vector3.set(-0.5, 0.5, 0.5);
    gl.uniform3fv(uniformFragmentLocation[2], uLightDirection);
    // 視線ベクトル
    const uEyeDirection = GLMath.Vector3.set(0.0, 0.0, 20.0);
    gl.uniform3fv(uniformFragmentLocation[3], uEyeDirection);

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
