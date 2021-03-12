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

  
  // ジオメトリの作成(球体)
  const GEOMETRY = new THREE.SphereGeometry(200, 60, 60);

  // テクスチャに使う画像の読み込み
  const LOADER = new THREE.TextureLoader();
  const TEXTURE = LOADER.load("imgs/sunmap.jpg");

  
  // マテリアル設定(テクスチャ)
  const MATERIAL = new THREE.MeshStandardMaterial({
    map: TEXTURE
  });
  
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
})