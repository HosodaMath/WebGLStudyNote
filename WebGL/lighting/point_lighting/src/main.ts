/***
 * 点光源 Point Light
 * 平行光源とは違い光源の位置は空間上で固定されるよってオブジェクトの位置によって光の当たり方が変わる。
 * 点光源は電球に近いですが電球は減衰を起こし遠ざかれば光の量は減ります。
 * 減衰を考慮する実装もありますがここでは考慮しません。
 * 点光源の位置が決まっているのでまずその座標が必要になります。
 * この光源が頂点に向うベクトルを算出してこれをライトベクトルとして陰影の計算を行う。
 * あとは平行光源と同じ
 * 光源が頂点に向かうベクトルの算出は頂点シェーダーにある
 * 位置ベクトルをフラグメントシェーダーに渡す必要があるので
 * vPositionと言う変数を定義する必要があります。
 * ただしそのままだとローカル座標として渡されてモデルの位置が変わってしまうと頂点の位置が変わってしまいます。
 * ライトベクトルはモデル座標変換を行ったあとの頂点の位置を考慮して計算する必要があります。
 * ただ座標を渡すだけではなくモデル座標変換行列と位置ベクトルを掛けて渡す必要があります。
 * 頂点シェーダーまとめ
 * フラグメントシェーダーに渡す位置ベクトル
 * out vec3 vPosition;
 * 渡すためにはモデル座標変換行列を掛ける必要があるので
 * uniformにuModelMatrixを追記しました。
 * フラグメントシェーダーでは座標変換済みの位置ベクトルをinとして受け取り
 * 平行光源は使わないのでそのベクトルを点光源のベクトルとして修正しました。
 * ライトベクトルはライトの座標 - モデルの位置で求まります。
 * あとは反射光源と同じです。
 * また点光源は球体を実装するとわかりやすいので球体を作ります。
 *
 */
import { getCanvas, geGLContext2D } from "./utils/utils";
import {
  initShader,
  initProgram,
  createVAO,
  VAOParameter,
  torus,
  sphere,
} from "./webgl2/gl";
import * as Color from "./color/rgba";
import * as GLMath from "./math/math";
import PointLightVertexShader from "./shader/light/point_light.vert";
import PointLightFragmentShader from "./shader/light/point_light.frag";
import "sanitize.css";
import "./main.css";
window.addEventListener("DOMContentLoaded", () => {
  let gl: WebGL2RenderingContext;
  let width: number;
  let height: number;
  let startTime: number;
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
      PointLightVertexShader
    );
    const rectFragmentShader = initShader(
      gl,
      "FRAGMENT_SHADER",
      PointLightFragmentShader
    );

    const program = initProgram(gl, rectVertexShader, rectFragmentShader);

    // トーラスと球体で共通のattributeを初期化
    const attributeLocationIndex = [
      gl.getAttribLocation(program, "aColor"),
      gl.getAttribLocation(program, "aPosition"),
      gl.getAttribLocation(program, "aNormal"),
      gl.getAttribLocation(program, "aTexCoord"),
    ];

    // トーラスと球体で共通
    const geometryAttributeSize = [4, 3, 3, 2];
    // トーラス描画のデータ
    const torusData = torus(64, 64, 0.25, 0.75, [0.0, 0.5, 1.0, 1.0]);
    const torusColorData = torusData.color;
    const torusPositionData = torusData.position;
    const torusNormalData = torusData.normal;
    const torusTextureCoordData = torusData.textureCoord;
    const torusIndicesData = torusData.indices;
    const torusVerticesData = [
      torusColorData,
      torusPositionData,
      torusNormalData,
      torusTextureCoordData,
    ];

    // 球体の描画
    const sphereData = sphere(64, 64, 0.5, [0.0, 1.5, 1.0, 1.0]);
    const sphereColorData = torusData.color;
    const spherePositionData = sphereData.position;
    const sphereNormalData = sphereData.normal;
    const sphereTextureCoordData = sphereData.textureCoord;
    const sphereIndicesData = sphereData.indices;
    const sphereVerticesData = [
      sphereColorData,
      spherePositionData,
      sphereNormalData,
      sphereTextureCoordData,
    ];

    const uniformLocation: WebGLUniformLocation[] = [];
    uniformLocation.push(
      gl.getUniformLocation(program, "uModelViewProjectionMatrix")
    );
    uniformLocation.push(gl.getUniformLocation(program, "uModelMatrix"));
    uniformLocation.push(gl.getUniformLocation(program, "uInvertMatrix"));
    uniformLocation.push(gl.getUniformLocation(program, "uAmbinetColor"));
    uniformLocation.push(gl.getUniformLocation(program, "uEyeDirection"));
    uniformLocation.push(gl.getUniformLocation(program, "uLightDirection"));

    initMatrix();
    // これらを渡すのはトーラスのみ
    const uAmbinetColor = GLMath.Vector4.set(0.1, 0.1, 0.1, 0.1);
    const uLightPosition = GLMath.Vector3.set(-0.5, 0.5, 0.0);
    const uEyeDirection = GLMath.Vector3.set(0.0, 0.0, 20.0);

    startTime = Date.now();
    let count = 0;
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);

    const draw = () => {
      const rgbaColor = new Color.RGBA(0, 0, 0, 1);
      const color = rgbaColor.rgbaArray();
      updateClearColor(gl, color);

      // 空間内のグローバル時間
      const gTime = (Date.now() - startTime) * 0.025;

      count++;
      const radian = GLMath.Calculator.radians(count);
      //ここからトーラスの描画
      const axis = GLMath.Vector3.set(0.0, 1.0, 1.0);
      const posX = Math.cos(radian) * 3.5;
      const posY = Math.sin(radian) * 3.5;
      const posZ = Math.sin(radian) * 3.5;
      const primitivePosition1 = GLMath.Vector3.set(posX, -posY, -posZ);
      GLMath.Matrix4.identity(modelMatrix);
      GLMath.Matrix4.translate(modelMatrix, primitivePosition1, modelMatrix);
      GLMath.Matrix4.rotate(modelMatrix, radian, axis, modelMatrix);
      GLMath.Matrix4.multiply(
        viewProjectionMatrix,
        modelMatrix,
        modelViewProjectionMatrix
      );
      GLMath.Matrix4.invert(modelMatrix, invertMatrix);

      gl.uniformMatrix4fv(uniformLocation[0], false, modelViewProjectionMatrix);
      gl.uniformMatrix4fv(uniformLocation[1], false, modelMatrix);
      gl.uniformMatrix4fv(uniformLocation[2], false, invertMatrix);
      gl.uniform4fv(uniformLocation[3], uAmbinetColor);
      gl.uniform3fv(uniformLocation[4], uLightPosition);
      gl.uniform3fv(uniformLocation[5], uEyeDirection);

      // トーラスのvaoパラメーター
      const vaoTorusParameter: VAOParameter = {
        attributeLocationIndex: attributeLocationIndex,
        attributeSize: geometryAttributeSize,
        verticesData: torusVerticesData,
        indicesData: torusIndicesData,
      };
      const torusVAO = createVAO(gl, vaoTorusParameter);

      gl.bindVertexArray(torusVAO);
      const torusMode = gl.TRIANGLES;
      const torusCount = torusIndicesData.length;
      const torusType = gl.UNSIGNED_SHORT;
      const torusOffset = 0;
      gl.drawElements(torusMode, torusCount, torusType, torusOffset);
      gl.bindVertexArray(null);

      // 球体の描画
      const primitivePosition2 = GLMath.Vector3.set(-posX, posY, posZ);
      GLMath.Matrix4.identity(modelMatrix);
      GLMath.Matrix4.translate(modelMatrix, primitivePosition2, modelMatrix);
      GLMath.Matrix4.multiply(
        viewProjectionMatrix,
        modelMatrix,
        modelViewProjectionMatrix
      );
      GLMath.Matrix4.invert(modelMatrix, invertMatrix);

      gl.uniformMatrix4fv(uniformLocation[0], false, modelViewProjectionMatrix);
      gl.uniformMatrix4fv(uniformLocation[1], false, modelMatrix);
      gl.uniformMatrix4fv(uniformLocation[2], false, invertMatrix);
      const vaoSphereParameter: VAOParameter = {
        attributeLocationIndex: attributeLocationIndex,
        attributeSize: geometryAttributeSize,
        verticesData: sphereVerticesData,
        indicesData: sphereIndicesData,
      };
      const sphereVAO = createVAO(gl, vaoSphereParameter);

      gl.bindVertexArray(sphereVAO);
      const sphereMode = gl.TRIANGLES;
      const sphereCount = sphereIndicesData.length;
      const sphereType = gl.UNSIGNED_SHORT;
      const sphereOffset = 0;
      gl.drawElements(sphereMode, sphereCount, sphereType, sphereOffset);
      gl.bindVertexArray(null);

      requestAnimationFrame(draw);
    };

    draw();
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

  init();
});
