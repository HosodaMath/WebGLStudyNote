import {
  createVAO,
  createProgram,
  createShader,
  updateClearColor,
} from "../webgl/webgl";
import { Vector2, Calculator } from "../math/mathematics";
import { createPlaneVao } from "./planeVao";
import CommonVertexShader from "../shader/texture/postProcessing/common.vert?raw";
import RGBShiftFragmentShader from "../shader/texture/postProcessing/rgb_shift.frag?raw";
import PlantsImage from "../assets/texture/plants.png";
/**
 * @@description PostProcessing
 * @param canvas
 * @param gl
 */
export const sketch = (
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext
) => {
  const filterVertexShader = createShader(
    gl,
    "VERTEX_SHADER",
    CommonVertexShader
  );

  const filterFragmentShader = createShader(
    gl,
    "FRAGMENT_SHADER",
    RGBShiftFragmentShader
  );

  const filterProgram = createProgram(
    gl,
    filterVertexShader,
    filterFragmentShader
  );

  const filterAttributeLocationIndex = [0, 1, 2, 3];

  const filterAttributeSize = [4, 3, 3, 2];

  const planeVaoData = createPlaneVao(
    filterAttributeLocationIndex,
    filterAttributeSize
  );

  const initPlaneVao = createVAO(gl, planeVaoData.vaoData);
  const planeVao = initPlaneVao.vao;
  const planeIBO = initPlaneVao.ibo;

  // uniformの初期化
  const filterUniformLocationData = {
    uResolution: gl.getUniformLocation(filterProgram, "uResolution"),
    uMouse: gl.getUniformLocation(filterProgram, "uMouse"),
    uTexture0: gl.getUniformLocation(filterProgram, "uTexture0"),
  };

  // let startTime = Date.now();

  let uTexture0: WebGLTexture | null = null;

  /**
   * @todo 非同期処理に変える
   * @todo マルチテクスチャ対応 -> 完了
   * @description テクスチャの作成
   * @param imageURL 画像URL
   */
  const createTexture = (imageURL: string, textureNumber: number) => {
    const img = new Image();

    img.src = imageURL;
    console.log(img.width, img.height);

    const initTexture = () => {
      const initTexture = gl.createTexture();

      gl.bindTexture(gl.TEXTURE_2D, initTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.bindTexture(gl.TEXTURE_2D, null);

      switch (textureNumber) {
        case 0:
          uTexture0 = initTexture;
          break;
      }
    };

    img.addEventListener("load", initTexture);
  };

  createTexture(PlantsImage, 0);

  // 有効にしているもの
  // 必ずカリングと深度テストは有効にする
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.CULL_FACE);


  let uMouse = Vector2.set(0, 0);
  const uMouseData = filterUniformLocationData.uMouse;
  gl.uniform2fv(uMouseData, uMouse);

  // MouseEvent
  window.addEventListener("mousemove", (event) => {
    const x = Calculator.map(event.clientX, 0, canvas.width, -10, 10);
    const y = Calculator.map(event.clientY, 0, canvas.height, -10, 10);
    uMouse = Vector2.set(x, y);
    const uMouseData = filterUniformLocationData.uMouse;
    gl.uniform2fv(uMouseData, uMouse);
  });

  const draw = () => {
    updateClearColor(canvas, gl, [0.0, 0.0, 0.0]);

    // ここからuniformの設定
    // 画面サイズ
    const uResolution = Vector2.set(canvas.width, canvas.height);
    const uResolutionData = filterUniformLocationData.uResolution;
    gl.uniform2fv(uResolutionData, uResolution);

    // const uTime = (Date.now() - startTime) * 0.025;

    // ここからテクスチャ
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, uTexture0);
    const uTextureData0 = filterUniformLocationData.uTexture0;
    gl.uniform1i(uTextureData0, 0);

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
