/**
 *  WebGL2
 *  Color ImageProcessing
 */
// THREE.js
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { UnrealBloomType } from "./postprocessing/unreal_bloomtype";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Original Libraly
import * as ImageProcessing from "./shader/imageProcessing";
import * as Calc from "./math/calculation";
// css
import "sanitize.css";
import "./main.css";
// image
import NoiseTexture from "./image/noise.png";
import PlantsTexture from "./image/plants.png";
import PaintTexture from "./image/paint_background.png";
window.addEventListener("DOMContentLoaded", async () => {
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;
  let width: number;
  let height: number;
  let mouse: number[] = [0, 0];
  let uniformsCustom: {
    uTexture: { value: THREE.Texture };
    uResolution: { value: number[] };
    uTime: { value: number };
    uFrequency: { value: number };
    uAmplitude: { value: number };
  };
  let uTime: number = 0;
  let uFrequency: number = 0;
  let uAmplitude: number = 0;
  let ampData = new THREE.Vector2(0, 0);
  let ampVelocity = new THREE.Vector2(0.1, 0.1);
  let composer: EffectComposer;
  const init = () => {
    // レンダラーの設定
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.toneMapping = THREE.ReinhardToneMapping;
    document.body.appendChild(renderer.domElement);

    // 画面サイズ
    width = window.innerWidth;
    height = window.innerHeight;

    /// シーン
    scene = new THREE.Scene();

    /// カメラ
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    const cameraPosition = new THREE.Vector3(0, 0, 100);
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    scene.add(camera);

    // カメラに点光源を追加する
    const pointLight = new THREE.PointLight(0xffffff, 0.1);
    camera.add(pointLight);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    const unrealBloomParameters: UnrealBloomType = {
      exposure: 1.0,
      bloomStrength: 1.5,
      bloomThreshold: 0,
      bloomRadius: 0,
    };

    setPostProcessing(scene, camera, unrealBloomParameters);

    renderImageProcessing();

    const windowResize = () => {
      // 画面サイズ
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      composer.setSize(width, height);

      // カメラのアスペクト比を正す。
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const mouseEvent = (event: MouseEvent) => {
      mouse[0] = event.offsetX;
      mouse[1] = event.offsetY;

      return mouse;
    };

    const fullScreen = (event: KeyboardEvent) => {
      if (event.key === "f" || event.key === "F") {
        const element = document.body;
        element.requestFullscreen();
      }
    };

    // マウスカーソル座標の追跡
    window.addEventListener("mousemove", mouseEvent, true);

    // 全画面表示イベント
    window.addEventListener("keydown", fullScreen, true);

    windowResize();
    // 画面リサイズのイベント
    window.addEventListener("resize", windowResize);
  };

  /**
   * @description ポストプロセッシングに関する設定
   * @param scene
   * @param camera
   * @param unreal_bloom_parameters
   */
  const setPostProcessing = (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    unreal_bloom_parameters: UnrealBloomType
  ) => {
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );

    bloomPass.threshold = unreal_bloom_parameters.bloomThreshold;
    bloomPass.strength = unreal_bloom_parameters.bloomStrength;
    bloomPass.radius = unreal_bloom_parameters.bloomRadius;

    composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
  };

  const renderImageProcessing = () => {
    /*
    uniformsCustom = ImageProcessing.SinWaveDistort.rgbSplitProcessing(
      scene,
      NoiseTexture,
      uTime,
      uFrequency,
      uAmplitude
    );*/

    
    uniformsCustom = ImageProcessing.SinWaveDistort.rgbSplitProcessingSphere(
      scene,
      NoiseTexture,
      uTime,
      uFrequency,
      uAmplitude
    );
  };

  const main = () => {
    controls.update();

    uTime = performance.now();

    uniformsCustom.uTime.value = uTime;

    ampData.add(ampVelocity);
    if (ampData.x < 0 || ampData.x > width) {
      ampVelocity.x *= -1;
    }

    if (ampData.y < 0 || ampData.y > height) {
      ampVelocity.y *= -1;
    }

    uFrequency = Calc.MathCalc.map(ampData.x, 0, width, 0, 10.0);
    uAmplitude = Calc.MathCalc.map(ampData.y, 0, height, 0, 0.25);

    uniformsCustom.uFrequency.value = 10.0;
    uniformsCustom.uAmplitude.value = 0.25;

    console.log(uFrequency, uAmplitude, uTime);

    // renderer.render(scene, camera);
    composer.render();

    requestAnimationFrame(main);
  };

  init();
  main();
});
