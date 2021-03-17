import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./main.css";
window.addEventListener("DOMContentLoaded", () => {
  // レンダラーの設定。
  const RENDER = new THREE.WebGLRenderer();

  /// レンダラーのサイズを決める(画面の大きさ)
  /// 必ずしも画面いっぱいである必要はない。
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;

  /// レンダラーにサイズを設定。
  RENDER.setSize(WIDTH, HEIGHT);

  /// canvasをbodyに追加する。
  document.body.appendChild(RENDER.domElement);

  // シーンの追加
  const SCENE = new THREE.Scene();

  // カメラの設定
  const CAMERA = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);

  /// カメラの位置を設定
  CAMERA.position.set(0, 0, 100);

  // ジオメトリの作成(球体やボックスの作成など)
  const GEOMETRY = new THREE.SphereBufferGeometry(1.5, 20, 10);

  // マテリアル設定 テクスチャを使う場合
  /// テクスチャに使う画像の読み込み
  const LOADER = new THREE.TextureLoader();
  const TEXTURE = LOADER.load("imgs/texture1.png");

  /// マテリアルの作成(テクスチャを使った)
  const MATERIAL = new THREE.MeshStandardMaterial({
    map: TEXTURE,
  });

  // メッシュの設定
  /// メッシュの作成
  [...Array(3000).keys()].forEach((_count) => {
    const MESH = new THREE.Mesh(GEOMETRY, MATERIAL);
    MESH.position.x = 300 * (0.5 - Math.random());
    MESH.position.y = 100 * (0.5 - Math.random()) + 25;
    MESH.position.z = 200 * (0.5 - Math.random());

    MESH.matrixAutoUpdate = false;
    MESH.updateMatrix();

    /// メッシュをシーンに追加
    SCENE.add(MESH);
  });

  // 妖精の作成
  const FAIRY = new THREE.SphereBufferGeometry(1.5, 20, 10);

  /// 光源と球体の組み合わせ
  let sphereFairy1 = new THREE.PointLight(0x00ff00, 2, 50);
  sphereFairy1.add(
    new THREE.Mesh(FAIRY, new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
  );
  /// 光源となる球体をシーンに追加
  SCENE.add(sphereFairy1);

  /// 光源と球体の組み合わせ
  let sphereFairy2 = new THREE.PointLight(0x00ff00, 2, 50);
  sphereFairy2.add(
    new THREE.Mesh(FAIRY, new THREE.MeshBasicMaterial({ color: 0x009600 }))
  );
  /// 光源となる球体をシーンに追加
  SCENE.add(sphereFairy2);

  /// 光源と球体の組み合わせ
  let sphereFairy3 = new THREE.PointLight(0x00ff00, 2, 50);
  sphereFairy3.add(
    new THREE.Mesh(FAIRY, new THREE.MeshBasicMaterial({ color: 0x003200 }))
  );
  /// 光源となる球体をシーンに追加
  SCENE.add(sphereFairy3);

  const draw = (): void => {
    requestAnimationFrame(draw);

    const TIME = Date.now() * 0.005;

    sphereFairy1.position.x = Math.cos(TIME * 0.05) * 30;
    sphereFairy1.position.z = Math.sin(TIME * 0.05) * 30;

    sphereFairy2.position.x = Math.cos(TIME * 0.05) * 30;
    sphereFairy2.position.y = Math.sin(TIME * 0.05) * 30;

    sphereFairy3.position.x = Math.cos(TIME * 0.05) * 30;
    sphereFairy3.position.y = Math.sin(TIME * 0.03) * 30;
    sphereFairy3.position.z = Math.sin(TIME * 0.05) * 30;

    // シーンとカメラを表示
    RENDER.render(SCENE, CAMERA);
  };

  draw();
});
