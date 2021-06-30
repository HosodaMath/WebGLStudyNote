import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { setPointLight } from "./light/point_light/point_light";
import * as Snow from "./snow_world/snow";
import * as Forest from "./forest/forest";
import * as Audio from "./audio/audio";
import "sanitize.css";
import "./main.css";

const start_button = document.querySelector("#start_button");

start_button.addEventListener("click", async () => {
  const overlay = document.querySelector("#overlay");
  overlay.remove();

  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;
  let width: number;
  let height: number;
  let color: number[][];
  let point_material: Array<THREE.PointsMaterial> = [];
  let audio_data: THREE.AudioAnalyser;
  const init = () => {
    // レンダラーの作成
    initRenderer();

    // シーンの作成
    initScene();

    const cameraPosition = new THREE.Vector3(0, 0, 500);
    // カメラの作成
    initCamera(cameraPosition);

    // 点光源を描画
    const pointLight1 = new THREE.Vector3(0, 300, 0);
    setPointLight(scene, pointLight1);

    const pointLight2 = new THREE.Vector3(-300, 300, 0);
    setPointLight(scene, pointLight2);

    const pointLight3 = new THREE.Vector3(300, 300, 0);
    setPointLight(scene, pointLight3);

    /* 雪世界を構築 */

    // 雪平原を描画
    Snow.drawSnowWorld(scene);

    // 雪粉を描画
    color = Snow.drawSnowFlake(color, point_material, scene);
    
    // 3D Modelの木を描画
    const treePosition = new THREE.Vector3(0, 0, 0);
    const treeSize = new THREE.Vector3(80, 80, 80);
    const treePath = "assets/snowTree2.glb";
    Forest.drawTree(scene, treePosition, treeSize, treePath);

    // オーディオの設定
    const audioFile = "sounds/wind1.mp3";
    audio_data = Audio.setBasicAudio(audioFile);

    const windowResize = () => {
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      // カメラのアスペクト比を正す。
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    windowResize();
    window.addEventListener("resize", windowResize);
  };

  /**
   * @description レンダラーに関する設定
   */
  const initRenderer = () => {
    // レンダラーの設定
    renderer = new THREE.WebGLRenderer({ antialias: true });
    document.body.appendChild(renderer.domElement);
    // 画面サイズ
    width = window.innerWidth;
    height = window.innerHeight;
  };

  /**
   * @description シーンに関する設定
   */
  const initScene = () => {
    /// シーンの追加
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0008);
  };

  /**
   * @description カメラに関する設定
   */
  const initCamera = (cameraPosition: THREE.Vector3) => {
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);

    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
  };

  /**
   * @description アニメーションの関する設定
   */
  const animation = () => {
    controls.update();
    const time = Date.now() * 0.00005;

    [...Array(scene.children.length).keys()].forEach((count) => {
      const object = scene.children[count];

      if (object instanceof THREE.Points) {
        object.rotation.y = time * (count < 4 ? count + 1 : -(count + 1));
      }
    });

    [...Array(point_material.length).keys()].forEach((count) => {
      const color_data = color[count];
      const hue = ((360 * (color_data[0] + time)) % 360) / 360;
      point_material[count].color.setHSL(hue, color_data[1], color_data[2]);
    });

    console.log(audio_data.getAverageFrequency());

    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  };

  const draw = () => {
    animation();
  };

  init();
  draw();
});
