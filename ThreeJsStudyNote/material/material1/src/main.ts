import * as THREE from "three"

window.addEventListener("DOMContentLoaded", () => {
  const RENDER = new THREE.WebGLRenderer();

  //レンダラーのサイズ設定
  const WIDTH = 800;
  const HEIGHT = 800;
  RENDER.setSize(WIDTH, HEIGHT);

  // canvas(いわゆるcanvasタグ)をbodyに追加する
  document.body.appendChild(RENDER.domElement);

  // シーンの追加
  const SCENE = new THREE.Scene();

  // カメラの追加
  const CAMERA = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);
  CAMERA.position.set(0, 0, 1000);

  
  // ジオメトリの作成(球体)
  const GEOMETRY = new THREE.SphereGeometry(300, 60, 60);
  
  // マテリアル設定(スタンダードマテリル)
  const MATERIAL = new THREE.MeshStandardMaterial({color: 0x00ffff});
  
  // メッシュの作成
  const MESH = new THREE.Mesh(GEOMETRY, MATERIAL);
  
  // メッシュをシーンに追加
  SCENE.add(MESH);

  // 平行光源の設置
  const LIGHT = new THREE.DirectionalLight(0xffffff);
  LIGHT.position.set(1, 1, 1);
  SCENE.add(LIGHT);

  const tick = (): void => {
    requestAnimationFrame(tick);

    MESH.rotation.x += 0.005;
    MESH.rotation.y += 0.005;

    RENDER.render(SCENE, CAMERA);
    
  }

  tick();

  console.log("hello Three.js");
})