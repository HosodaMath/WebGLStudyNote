import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Texture from "./texture/spark1.png";
import VertexShader from "./shader/point.vert?raw";
import FragmentShader from "./shader/point.frag?raw";
import "./style.css";

window.addEventListener("DOMContentLoaded", async () => {
  // itemSizeMax -> 通常Vector3やRGB、HSLなどは3それ以外半径などのスカラー値は1
  const itemSizeMax = 3;
  const particleMax = 100000;
  const radius = 200;

  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;
  let width = 0;
  let height = 0;
  let frameCount = 0;
  let particle_points: THREE.Points;
  let vertex: THREE.Vector3;
  let color: THREE.Color;
  let patricle_uniforms: {
    time: {
      value: number;
    };
    color: { value: THREE.Color };
    pointTexture: { value: THREE.Texture };
  };
  const init = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    // レンダラーの設定
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.toneMapping = THREE.ReinhardToneMapping;
    document.body.appendChild(renderer.domElement);

    // 画面サイズ
    width = window.innerWidth;
    height = window.innerHeight;

    /// シーン
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 300;
    scene.add(camera);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    // particleの初期化
    initParticle();

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

  const initParticle = () => {
    // x, y, z
    const particleLocation = new Float32Array(particleMax * itemSizeMax);
    const particleColors = new Float32Array(particleMax * itemSizeMax);
    const particleSize = new Float32Array(particleMax);

    // 頂点数
    vertex = new THREE.Vector3();
    // color
    color = new THREE.Color(0xffffff);

    patricle_uniforms = {
      time: { value: 1.0 },
      color: { value: new THREE.Color(0xffffff) },
      pointTexture: {
        value: new THREE.TextureLoader().load(Texture),
      },
    };

    [...Array(particleMax).keys()].forEach((count) => {
      // 頂点数を初期化
      vertex.x = (Math.random() * 2 - 1) * radius;
      vertex.y = (Math.random() * 2 - 1) * radius;
      vertex.z = (Math.random() * 2 - 1) * radius;
      vertex.toArray(particleLocation, count * itemSizeMax);

      if (vertex.x < 0 && vertex.y > 0) {
        color.setHSL(0.5 + 0.1 * (count / particleMax), 1.0, 0.5);
      } else if (vertex.x < 0 && vertex.y < 0) {
        color.setHSL(0.9 + 0.1 * (count / particleMax), 1.0, 0.5);
      } else if (vertex.x > 0 && vertex.y < 0) {
        color.setHSL(0.3 + 0.1 * (count / particleMax), 1.0, 0.5);
      } else {
        color.setHSL(0.0 + 0.1 * (count / particleMax), 1.0, 0.5);
      }

      color.toArray(particleColors, count * itemSizeMax);

      particleSize[count] = Math.random() * 10;
    });

    const particleGeometry = new THREE.BufferGeometry();
    // 頂点シェーダーに値を入れる
    // 入れる値はFloat32Arrayに変換した値とitemSize
    // 通常 Vector3やRGB、HSLなどは3それ以外半径はスカラー値なので1
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particleLocation, itemSizeMax)
    );

    particleGeometry.setAttribute(
      "customColor",
      new THREE.BufferAttribute(particleColors, itemSizeMax)
    );

    particleGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(particleSize, 1)
    );

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: patricle_uniforms,
      vertexShader: VertexShader,
      fragmentShader: FragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    particle_points = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particle_points);
  };

  const draw = () => {
    controls.update();
    const time = Date.now() * 0.01;
    const per_time = performance.now() * 0.0001;
    frameCount = frameCount + 1.0;

    particle_points.rotation.x = frameCount *0.005;

    const particleGeometry = particle_points.geometry;
    const particleAttribute = particleGeometry.attributes;

    patricle_uniforms["time"].value = per_time;

    [...Array(particleAttribute.size.array.length).keys()].forEach((count) => {
      // Errorが出るのでなんとかしたい
      particleAttribute.size.array[count] =
        14 + 13 * Math.cos(0.1 * count + time);
    });
    particleAttribute.size.needsUpdate = true;

    renderer.render(scene, camera);

    requestAnimationFrame(draw);
  };

  init();
  draw();
});
