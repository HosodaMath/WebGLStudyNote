import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
    setSpotLight();

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
      color: 0xffffff,
      roughness: 0.5,
      metalness: 0.0,
      transparent: true,
      opacity: 0.3,
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

  const setSpotLight = () => {
    // SpotLightGeometry
    const sphereGeometry1 = new THREE.SphereBufferGeometry(0.5, 32, 32);
    const sphereMaterial1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const sphereMesh1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);

    // SpotLight
    const intensity = 1;
    const distance = 200;
    const angle = Math.PI / 4.0;
    const penumbra = 1;
    const decay = 2;

    const spotLight1 = new THREE.SpotLight(
      0xffffff,
      intensity,
      distance,
      angle,
      penumbra,
      decay
    );
    spotLight1.position.set(15, 40, 35);
    spotLight1.name = "spotLight1";
    // スポットライトシャドウマップを設定
    spotLight1.castShadow = true;
    spotLight1.shadow.mapSize.width = 512;
    spotLight1.shadow.mapSize.height = 512;
    spotLight1.shadow.camera.near = 10;
    spotLight1.shadow.camera.far = 200;
    spotLight1.shadow.focus = 1;
    spotLight1.add(sphereMesh1);
    scene.add(spotLight1);
  };

  const animation = () => {
    controls.update();
    const time = Date.now() * 0.001;
    // torus animation
    const torusMesh = scene.getObjectByName("torusMesh");
    torusMesh.rotation.y = time;
    // SpotLight animation
    const spotLight1 = scene.getObjectByName("spotLight1");
    spotLight1.position.x = Math.cos(time) * 20;
    spotLight1.position.z = Math.sin(time) * 20;
    renderer.render(scene, camera);

    requestAnimationFrame(animation);
  };

  const draw = () => {
    animation();
  };

  init();
  draw();
});
