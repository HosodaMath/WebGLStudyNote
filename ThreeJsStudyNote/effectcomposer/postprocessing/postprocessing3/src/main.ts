import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader";
import { DotScreenShader } from "three/examples/jsm/shaders/DotScreenShader";
import * as Particle from "./particle/particle";
import "sanitize.css";

window.addEventListener("DOMContentLoaded", () => {
  let renderer: THREE.WebGLRenderer;
  let camera: THREE.PerspectiveCamera;
  let scene: THREE.Scene;

  let object: THREE.Object3D;
  // postprocessing
  let composer: EffectComposer;
  // Light and Geometry
  let point_light: THREE.PointLight;
  let buble_particle: Particle.BaseBubleParticle;

  let width: number;
  let height: number;
  const initRenderer = () => {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    document.body.appendChild(renderer.domElement);

    width = window.innerWidth;
    height = window.innerHeight;
  };

  const initScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x011f30);
    /// 霧の作成
    scene.fog = new THREE.Fog(0xffffff, 1, 1000);
    object = new THREE.Object3D();
    scene.add(object);
  };

  const initCamera = () => {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 0, 500);
  };

  const init = () => {
    initRenderer();
    initScene();
    initCamera();
    // ポストプロセシングの設定
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const effect1 = new ShaderPass(DotScreenShader);
    effect1.uniforms["scale"].value = 4;
    composer.addPass(effect1);

    const effect2 = new ShaderPass(RGBShiftShader);
    effect2.uniforms["amount"].value = 0.0015;
    composer.addPass(effect2);

    /**
     * @description 画面リサイズ用関数
     */
    const windowResize = () => {
      renderer.setPixelRatio(window.devicePixelRatio);

      renderer.setSize(width, height);
      composer.setSize(width, height);
      // カメラのアスペクト比を正す。
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    windowResize();
  };

  

  const drawLight = () => {
    const directinalLight = new THREE.DirectionalLight(0xffffff);
    directinalLight.position.set(0, 0, 0);
    scene.add(directinalLight);

    point_light = new THREE.PointLight(0xffffff, 2, 1000, 1.0);
    point_light.position.set(0, 0, 500);
    scene.add(point_light);
  };
  
  const drawParticle = () => {
    buble_particle = new Particle.BaseBubleParticle(scene, 500);
    buble_particle.drawBaseBuble(object);
  };

  const renderAnimation = () => {
    buble_particle.stepBuble();

    renderer.render(scene, camera);
    requestAnimationFrame(renderAnimation);
  };

  const draw = () => {
    drawLight();
    drawParticle();
    renderAnimation();
  };
  init();
  draw();
});
