import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shader/shader.vert";
import fragmentShader from "./shader/shader.frag";
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

    createShader();

    const windowResize = () => {
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      // カメラのアスペクト比を正す。
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    windowResize();
    window.addEventListener("resize", windowResize);

    window.addEventListener("keydown", (event) => {
      if (event.key === "f" || event.key === "F") {
        console.log("push f or F!!");
        const element = document.body;
        element.requestFullscreen();
      }
    });
  };

  /**
   * シェーダーの初期化
   * @todo シェーダーコードを外部から呼び出せるようにする
   */
  const createShader = () => {
    

    uniforms = {
      time: { value: 1.0 },
    };

    const boxGeometry = new THREE.BoxBufferGeometry(20, 20, 10);

    const boxMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
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

    [...Array(scene.children.length).keys()].forEach((count) => {
      const object = scene.children[count];
      object.rotation.y = time;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  };

  const draw = () => {
    animation();
  };

  init();
  draw();
});
