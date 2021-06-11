import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  setSpotLight1,
  setSpotLight2,
  setSpotLight3,
} from "./light/spot_light/spot_light";
import "sanitize.css";

window.addEventListener("DOMContentLoaded", () => {
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;
  let width: number;
  let height: number;

  const init = () => {
    initRenderer();
    initScene();
    const cameraPosition = new THREE.Vector3(160, 40, 10);
    initCamera(cameraPosition);

    // Spot Light
    setSpotLight1(scene);
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
    // 影を受け取る
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // torusジオメトリ
    const torusGeometry = new THREE.TorusKnotBufferGeometry(1.5, 0.5, 200, 16);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x438a53,
      roughness: 0.5,
      metalness: 0.0,
      transparent: true,
      opacity: 1.0,
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.name = "torusMesh";
    torusMesh.position.set(0, 5, 0);
    // 影を出力する
    torusMesh.castShadow = true;
    scene.add(torusMesh);

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
    // シャドウマップをonにする
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
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

  const animation = () => {
    controls.update();
    const time = Date.now() * 0.001;
    // torus animation
    const torusMesh = scene.getObjectByName("torusMesh");
    torusMesh.rotation.y = time;

    const spotLight1 = scene.getObjectByName("spotLight1");
    spotLight1.position.x = Math.cos(time) * 20;

    const spotLight2 = scene.getObjectByName("spotLight2");
    spotLight2.position.x = Math.cos(time) * 20;
    spotLight2.position.z = Math.sin(time) * 20;
    
    const spotLight3 = scene.getObjectByName("spotLight3");
    spotLight3.position.x = Math.cos(-1 * time) * 20;
    spotLight3.position.z = Math.sin(-1 * time) * 20;

    renderer.render(scene, camera);

    requestAnimationFrame(animation);
  };

  const draw = () => {
    animation();
  };

  init();
  draw();
});
