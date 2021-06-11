import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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

    // ジオメトリとポイント光源
    const sphereGeometry1 = new THREE.SphereBufferGeometry(0.5, 32, 32);
    const sphereMaterial1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const sphereMesh1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);
    const point_light1 = new THREE.PointLight(0xffffff, 2, 50);
    point_light1.add(sphereMesh1);
    point_light1.position.set(0, 10, 0);
    scene.add(point_light1);

    const sphereGeometry2 = new THREE.SphereBufferGeometry(0.5, 32, 32);
    const sphereMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
    });
    const sphereMesh2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
    const point_light2 = new THREE.PointLight(0x00ffff, 2, 50);
    point_light2.add(sphereMesh2);
    point_light2.position.set(5, 10, 0);
    scene.add(point_light2);

    const sphereGeometry3 = new THREE.SphereBufferGeometry(0.5, 32, 32);
    const sphereMaterial3 = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
    });
    const sphereMesh3 = new THREE.Mesh(sphereGeometry3, sphereMaterial3);
    const point_light3 = new THREE.PointLight(0x0000ff, 2, 50);
    point_light3.add(sphereMesh3);
    point_light3.position.set(-5, 10, 0);
    scene.add(point_light3);

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
      roughness: 0.5,
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
