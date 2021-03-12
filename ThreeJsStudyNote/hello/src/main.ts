import * as THREE from "three"

window.addEventListener("DOMContentLoaded", () => {
  const RENDER = new THREE.WebGLRenderer();

  //レンダラーのサイズ設定
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  RENDER.setSize(WIDTH, HEIGHT);

  // canvas(いわゆるcanvasタグ)をbodyに追加する
  document.body.appendChild(RENDER.domElement);

  // シーンの追加
  const SCENE = new THREE.Scene();

  // カメラの追加
  const CAMERA = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);
  CAMERA.position.set(0, 0, 1000);

  
  // ジオメトリの作成
  const GEOMETRY = new THREE.BoxGeometry(150, 150, 150);
  
  // マテリアル設定
  const MATERIAL = new THREE.MeshPhongMaterial({color: 0xffff00});
  
  // ボックスの作成
  const BOX = new THREE.Mesh(GEOMETRY, MATERIAL);
  
  // ボックスのz座標を-5する
  BOX.position.z = -5;
  
  // ボックスをシーンに追加
  SCENE.add(BOX);

  // 平行光源の設置
  const LIGHT = new THREE.DirectionalLight(0xffffff);
  LIGHT.position.set(1, 1, 1);
  SCENE.add(LIGHT);

  const tick = (): void => {
    requestAnimationFrame(tick);

    BOX.rotation.x += 0.01;
    BOX.rotation.y += 0.01;

    RENDER.render(SCENE, CAMERA);
    
  }

  tick();

  console.log("hello Three.js");
})