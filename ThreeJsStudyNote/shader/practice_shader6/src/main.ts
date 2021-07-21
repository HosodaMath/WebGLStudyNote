import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  setSpotLight1,
  setSpotLight2,
  setSpotLight3,
} from "./light/spot_light/spot_light";
import vertexShader from "./shader/shader.vert";
import fragmentShader from "./shader/shader.frag";
import floorImage from "./texture/texture1.png";
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
  let uniforms: {
    time: {
      value: number;
    };
  };
  const init = () => {
    // レンダラーの設定
    renderer = new THREE.WebGLRenderer({ antialias: true });
    document.body.appendChild(renderer.domElement);

    // 画面サイズ
    width = window.innerWidth;
    height = window.innerHeight;

    /// シーン
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0008);

    /// カメラ
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    const cameraPosition = new THREE.Vector3(0, 0, 50);
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    
    const directinalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    scene.add(directinalLight);

    // Spot Light
    setSpotLight1(scene);
    setSpotLight2(scene);
    setSpotLight3(scene);


    createShader();
    createFloor();

    const windowResize = () => {
      // 画面サイズ
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      // カメラのアスペクト比を正す。
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("keydown", (event) => {
      if (event.key === "f" || event.key === "F") {
        console.log("push f or F!!");
        const element = document.body;
        element.requestFullscreen();
      }
    });

    windowResize();
    window.addEventListener("resize", windowResize);
  };

  const createFloor = () => {
    // floorジオメトリ
    const loader = new THREE.TextureLoader();
    const texture = loader.load(floorImage);
    
    const floorGeometry = new THREE.BoxBufferGeometry(1000, 0.1, 2000);
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      color: 0xd8d8d8,
      roughness: 0.1,
      metalness: 0.0,
      transparent: true,
      opacity: 0.8,
    });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    scene.add(floorMesh);
  };

  /**
   * シェーダーの初期化
   * @todo シェーダーコードを外部から呼び出せるようにする
   */
  const createShader = () => {
    uniforms = {
      time: { value: 1.0 },
    };

    const boxGeometry = new THREE.BoxBufferGeometry(30, 30, 0.5);

    const boxMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.y = 15;
    scene.add(boxMesh);
  };

  /**
   * @description アニメーションの関する設定
   */
  const animation = () => {
    controls.update();
    // const time = Date.now() * 0.00005;
    const time = performance.now() * 0.001;
    uniforms["time"].value = time;

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
