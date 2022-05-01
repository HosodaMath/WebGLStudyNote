import {
  createVAO,
  createProgram,
  createShader,
  updateClearColor,
} from "../webgl/webgl";
import { Vector2, Calculator } from "../math/mathematics";
import { createPlaneVao } from "./planeVao";
import VoronoiVertexShader from "../shader/material/voronoi/voronoi.vert?raw";
import VoronoiFragmentShader from "../shader/material/voronoi/voronoi.frag?raw";
/**
 * @@description PostProcessing
 * @param canvas
 * @param gl
 */
export const sketch = (
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext
) => {
  const voronoiVertexShader = createShader(
    gl,
    "VERTEX_SHADER",
    VoronoiVertexShader
  );

  const voronoiFragmentShader = createShader(
    gl,
    "FRAGMENT_SHADER",
    VoronoiFragmentShader
  );

  const voronoiProgram = createProgram(
    gl,
    voronoiVertexShader,
    voronoiFragmentShader
  );

  const voronoiAttributeLocationIndex = [0, 1, 2, 3];

  const voronoiAttributeSize = [4, 3, 3, 2];

  const planeVaoData = createPlaneVao(
    voronoiAttributeLocationIndex,
    voronoiAttributeSize
  );

  const initPlaneVao = createVAO(gl, planeVaoData.vaoData);
  const planeVao = initPlaneVao.vao;
  const planeIBO = initPlaneVao.ibo;

  // uniformの初期化
  const filterUniformLocationData = {
    uResolution: gl.getUniformLocation(voronoiProgram, "uResolution"),
    uMouse: gl.getUniformLocation(voronoiProgram, "uMouse"),
    uTime: gl.getUniformLocation(voronoiProgram, "uTime"),
  };

  // アニメーション開始時間
  let startTime = Date.now();

  // 有効にしているもの
  // 必ずカリングと深度テストは有効にする
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.CULL_FACE);

  let uMouse = Vector2.set(0, 0);
  const uMouseData = filterUniformLocationData.uMouse;
  gl.uniform2fv(uMouseData, uMouse);

  const uMouseMove = (event: MouseEvent) => {
    const mouseX = Calculator.map(event.clientX, 0, canvas.width, -1.0, 1.0);
    const mouseY = Calculator.map(event.clientY, 0, canvas.height, -1.0, 1.0);
    uMouse = Vector2.set(mouseX, mouseY);
    gl.uniform2fv(uMouseData, uMouse);
  };

  window.addEventListener("mousemove", uMouseMove);

  const draw = () => {
    updateClearColor(canvas, gl, [0.0, 0.0, 0.0]);

    // ここからuniformの設定
    // 画面サイズ
    const uResolution = Vector2.set(canvas.width, canvas.height);
    const uResolutionData = filterUniformLocationData.uResolution;
    gl.uniform2fv(uResolutionData, uResolution);

    const uTime = (Date.now() - startTime) * 0.025;

    const uTimeData = filterUniformLocationData.uTime;
    gl.uniform1f(uTimeData, uTime);

    // plane
    gl.bindVertexArray(planeVao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planeIBO);

    const planeMode = gl.TRIANGLES;
    const planeCount = planeVaoData.indices.length;
    const planeType = gl.UNSIGNED_SHORT;
    const planeOffset = 0;
    gl.drawElements(planeMode, planeCount, planeType, planeOffset);

    // bindの解除
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    requestAnimationFrame(draw);
  };

  const windowResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  window.addEventListener("resize", windowResize);

  draw();
};
