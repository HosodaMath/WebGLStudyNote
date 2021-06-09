import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import Stats from "three/examples/jsm/libs/stats.module";
import "sanitize.css";

window.addEventListener("DOMContentLoaded", () => {
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;
  let stats: Stats;
  let width: number;
  let height: number;
  const init = () => {
    initRenderer();
    initScene();
    const cameraPosition = new THREE.Vector3(0, 0, -15);
    initCamera(cameraPosition);

    // Rectangleライト
    RectAreaLightUniformsLib.init();
    const rectGeometry1 = new THREE.BoxBufferGeometry(4, 10, 0.2);
    const rectMaterial1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const rectMesh1 = new THREE.Mesh(rectGeometry1, rectMaterial1);
    const rectLight1 = new THREE.RectAreaLight(0xffffff, 5, 4, 10);
    rectLight1.position.set(0, 5, 5);
    rectLight1.add(rectMesh1);
    scene.add(rectLight1);

    const rectGeometry2 = new THREE.BoxBufferGeometry(4, 10, 0.2);
    const rectMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
    });
    const rectMesh2 = new THREE.Mesh(rectGeometry2, rectMaterial2);
    const rectLight2 = new THREE.RectAreaLight(0x00ffff, 5, 4, 10);
    rectLight2.position.set(5, 5, 5);
    rectLight2.add(rectMesh2);
    scene.add(rectLight2);

    const rectGeometry3 = new THREE.BoxBufferGeometry(4, 10, 0.2);
    const rectMaterial3 = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
    });
    const rectMesh3 = new THREE.Mesh(rectGeometry3, rectMaterial3);
    const rectLight3 = new THREE.RectAreaLight(0x0000ff, 5, 4, 10);
    rectLight3.position.set(-5, 5, 5);
    rectLight3.add(rectMesh3);
    scene.add(rectLight3);

    // floorジオメトリ
    const floorGeometry = new THREE.BoxBufferGeometry(1000, 0.1, 2000);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      roughness: 0.1,
      metalness: 0.0,
    });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    scene.add(floorMesh);

    // torusジオメトリ
    const torusGeometry = new THREE.TorusKnotBufferGeometry(1.5, 0.5, 200, 16);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.0,
      metalness: 1.0,
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.name = "torusMesh";
    torusMesh.position.set(0, 5, 0);
    scene.add(torusMesh);

    const windowResize = () => {
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.setAnimationLoop(animation);
      renderer.outputEncoding = THREE.sRGBEncoding;
      // カメラのアスペクト比を正す。
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    windowResize();
    window.addEventListener("resize", windowResize);

    stats = Stats();
    document.body.appendChild(stats.dom);
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

  const animation = () => {
    controls.update();
    const time = Date.now() * 0.001;
    const torusMesh = scene.getObjectByName("torusMesh");
    torusMesh.rotation.y = time;
    renderer.render(scene, camera);
    stats.update();
  };

  const draw = () => {
    animation();
  };

  init();
  draw();
});
