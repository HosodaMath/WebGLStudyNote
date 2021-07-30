import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { UnrealBloomType } from "./postprocessing/unreal_bloom_type";
import * as Random from "./math/random";
import OctahedronVertexShader from "./shader/octahedron.vert";
import OctahedronFragmentShader from "./shader/octahedron.frag";
import NoiseTexture from "./texture/noise.png";
import "sanitize.css";
import "./main.css";

window.addEventListener("DOMContentLoaded", async () => {
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;
  let width: number;
  let height: number;
  let composer: EffectComposer;
  // SphereFragmentShader or SphereVertexShaderのuniform
  let octahedron_uniforms: {
    time: {
      value: number;
    };
  };

  const octahedronMax = 300;

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
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
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

    drawOctahedron();

    drawFloor();

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

  const drawFloor = () => {
    // テクスチャの読み込み
    const textureLoader = new THREE.TextureLoader();
    const noiseTexture = textureLoader.load(NoiseTexture);

    const floorGeometry = new THREE.BoxBufferGeometry(500, 0.1, 500);
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: noiseTexture,
      roughness: 0.5,
      metalness: 0.0,
      transparent: true,
      opacity: 1.0,
    });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    scene.add(floorMesh);
  };

  const drawOctahedron = () => {
    octahedron_uniforms = {
      time: { value: 1.0 },
    };

    [...Array(octahedronMax).keys()].forEach((count) => {
      const octahedronSize = 3;
      const octahedronRadius = 50;
      const octahedronGeometry = new THREE.OctahedronBufferGeometry(
        octahedronSize,
        0
      );
      const octahedronMaterial = new THREE.ShaderMaterial({
        uniforms: octahedron_uniforms,
        vertexShader: OctahedronVertexShader,
        fragmentShader: OctahedronFragmentShader,
      });

      const octahedronMesh = new THREE.Mesh(
        octahedronGeometry,
        octahedronMaterial
      );
      octahedronMesh.position.set(
        Math.cos(count) * octahedronRadius,
        count * 2,
        Math.sin(count) * octahedronRadius
      );
      scene.add(octahedronMesh);
    });
  };

  /**
   * @description アニメーションの関する設定
   */
  const animation = () => {
    controls.update();

    //const time = Date.now() * 0.05;
    const time = performance.now() * 0.0001;
    let frameCount = 0;
    frameCount += 1;

    octahedron_uniforms["time"].value = time;

    // renderer.render(scene, camera);
    composer.render();

    requestAnimationFrame(animation);
  };

  const draw = () => {
    animation();
  };

  init();
  draw();
});
