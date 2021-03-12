import * as THREE from "three"

window.addEventListener("DOMContentLoaded", () => {
  
  // レンダラーの設定。
  const RENDER = new THREE.WebGLRenderer();

  /// レンダラーのサイズを決める(画面の大きさ)
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;

  /// サイズ設定
  RENDER.setSize(WIDTH, HEIGHT);

  /// canvasをbodyに追加する。
  document.body.appendChild(RENDER.domElement);

  // シーンの追加
  const SCENE = new THREE.Scene();
  
  // カメラの設定
  const CAMERA = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);
  
  /// カメラの位置を設定
  CAMERA.position.set(0, 0, 1000);

  // ジオメトリの作成(球体やボックスの作成など)
  const GEOMETRY = new THREE.SphereGeometry(200, 60, 60);


  // マテリアル設定 テクスチャを使う場合
  /// テクスチャに使う画像の読み込み
  const LOADER = new THREE.TextureLoader();
  const TEXTURE = LOADER.load("imgs/texture1.png");

  /// マテリアルの作成(テクスチャを使った)
  const MATERIAL = new THREE.MeshStandardMaterial({
    map: TEXTURE
  });
  
  // メッシュの設定
  /// メッシュの作成
  const MESH = new THREE.Mesh(GEOMETRY, MATERIAL);

  /// メッシュをシーンに追加
  SCENE.add(MESH);

  // 光源設定
  /// 平行光源の作成(光源の色を決める)
  const LIGHT = new THREE.DirectionalLight(0xffffff);
  
  /// 平行光源の位置を設定
  LIGHT.position.set(1, 1, 1);
  
  /// シーンにライトを追加
  SCENE.add(LIGHT);

  const draw = (): void => {
    requestAnimationFrame(draw);

    // メッシュの回転
    MESH.rotation.x += 0.005;
    MESH.rotation.y += 0.005;

    // シーンとカメラを表示
    RENDER.render(SCENE, CAMERA);
  }

  draw();
})