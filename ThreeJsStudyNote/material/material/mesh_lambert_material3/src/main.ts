// Mesh Lambert Material
/// ランバートマテリアルもしくはランバートシェーディングとも言う。
/// Specularつまり反射を考慮しないマテリアルになる、反射しないため光沢感はないマットな質感になる。
/// 陰影が必要なため、光源を置く必要がる。
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

  // ジオメトリの作成

  /// ボックスジオメトリの作成
  const BOX_GEOMETRY = new THREE.BoxBufferGeometry(10.0, 10.0, 10.0);
  /// ボックスマテリアルの作成 LambertMaterialを使用
  const BOX_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
  /// ボックスメッシュの作成
  [...Array(300).keys()].forEach((_count) => {
    const BOX_MESH = new THREE.Mesh(BOX_GEOMETRY, BOX_MATERIAL);
    /// ボックスの位置を設定
    BOX_MESH.position.x = 300 * (0.5 - Math.random());
    BOX_MESH.position.y = 300 * (0.5 - Math.random()) + 25;
    BOX_MESH.position.z = 300 * (0.5 - Math.random());
    BOX_MESH.rotation.x += Math.cos(Math.random());
    BOX_MESH.rotation.y += Math.cos(Math.random());
    console.log(BOX_MESH.position.x, BOX_MESH.position.y, BOX_MESH.position.z);
    BOX_MESH.matrixAutoUpdate = false;
    BOX_MESH.updateMatrix();
    /// シーンに追加する
    SCENE.add(BOX_MESH);
  });

  // ライトの配置
  const SPHERE_GEOMETRY = new THREE.SphereBufferGeometry(1.5, 20, 10);
  let sphereLight1 = new THREE.PointLight(0xffffff, 2, 50);
  sphereLight1.add(
    new THREE.Mesh(
      SPHERE_GEOMETRY,
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    )
  );
  /// 光源となる球体をシーンに追加
  SCENE.add(sphereLight1);

  const draw = (): void => {
    requestAnimationFrame(draw);

    // 時間
    const TIME = Date.now() * 0.005;
    // 
    sphereLight1.position.x = Math.cos(TIME * 0.05) * 30;
    sphereLight1.position.y = Math.sin(TIME * 0.05) * 30;
    console.log(sphereLight1.position.x, sphereLight1.position.y);

    // シーンとカメラを表示
    RENDER.render(SCENE, CAMERA);
  };

  draw();
});
