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
  /// 平行光源の設置
  const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(0xffffff);
  DIRECTIONAL_LIGHT.position.set(1, 1, 1);
  SCENE.add(DIRECTIONAL_LIGHT);

  /// 点光源の設置
  const POINT_LIGHT = new THREE.PointLight(0xffffff, 2, 1000);
  SCENE.add(POINT_LIGHT);

  const draw = (): void => {
    requestAnimationFrame(draw);

    // シーンとカメラを表示
    RENDER.render(SCENE, CAMERA);
  };

  draw();
});