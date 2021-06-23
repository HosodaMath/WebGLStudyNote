import * as THREE from "three";
import * as Geo from "./geometry/geometry";
import { Tree } from "./tree";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { setSpotLight2, setSpotLight3 } from "./light/spot_light/spot_light";
import { setPointLight1 } from "./light/point_light/point_light";
import { setBasicAudio } from "./audio";
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
  let audio_analyzer: THREE.AudioAnalyser;
  const init = () => {
    // レンダラーの作成
    initRenderer();
    // シーンの作成
    initScene();
    const cameraPosition = new THREE.Vector3(160, 40, 10);
    // カメラの作成
    initCamera(cameraPosition);

    // オーディオの設定
    const audioFile = "sounds/wind1.mp3";
    audio_analyzer = setBasicAudio(audioFile, camera, scene);

    // Point Light
    setPointLight1(scene);

    // Spot Light
    setSpotLight2(scene);
    setSpotLight3(scene);

    // floorジオメトリ
    const floorGeometry = new THREE.BoxBufferGeometry(1000, 0.1, 2000);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      roughness: 0.1,
      metalness: 0.0,
    });

    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    scene.add(floorMesh);

    const tree = new Tree(scene);
    tree.drawReaf();
    tree.drawWood();

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
    /// バックグラウンドに関する設定
    const color = 0x000000;
    scene.background = new THREE.Color(color);
  };

  /**
   * @description カメラに関する設定
   */
  const initCamera = (camera_position: THREE.Vector3) => {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);

    camera.position.set(
      camera_position.x,
      camera_position.y,
      camera_position.z
    );

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
  };

  /**
   * @description アニメーションの関する設定
   */
  const animation = () => {
    controls.update();
    const time = Date.now() * 0.001;

    const pointLight1 = scene.getObjectByName("pointLight1");
    pointLight1.position.z = Math.cos(time) * 50;

    const spotLight2 = scene.getObjectByName("spotLight2");
    spotLight2.position.x = Math.cos(time) * 50;
    spotLight2.position.z = Math.sin(time) * 50;

    const spotLight3 = scene.getObjectByName("spotLight3");
    spotLight3.position.x = Math.cos(-1 * time) * 50;
    spotLight3.position.z = Math.sin(-1 * time) * 50;

    [...Array(10).keys()].forEach((x) => {
      [...Array(6).keys()].forEach((y) => {
        const reafMesh1 = scene.getObjectByName(`reafMesh1${x}${y}`);
        reafMesh1.scale.set(
          1.0,
          (audio_analyzer.getAverageFrequency() / 5) * 0.1,
          1.0
        );

        const reafMesh2 = scene.getObjectByName(`reafMesh2${x}${y}`);
        reafMesh2.scale.set(
          1.0,
          (audio_analyzer.getAverageFrequency() / 5) * 0.1,
          1.0
        );

        const woodMesh = scene.getObjectByName(`woodMesh${x}${y}`);
        woodMesh.scale.set(1.0, 1.0, 1.0);
      });
    });

    // camera.position.set(Math.cos(time) * 100, 20, Math.sin(time) * 100);
    // camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  };

  const draw = () => {
    animation();
  };

  init();
  draw();
});
