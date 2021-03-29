// Mesh Lambert Material
/// フォンマテリアもしくはフォンシェーディングとも言う。
/// ランバートシェーディングとは違い反射を考慮されているマテリアルになるため光沢感のある質感になる。
/// ランバートシェーディングと同じで光源が必要になる。
import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./main.css";
import { Mesh } from "three";
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
  const BOX_GEOMETRY = new THREE.BoxBufferGeometry(50.0, 50.0, 50.0);
  /// ボックスマテリアルの作成 MeshPhongMaterialを使用
  const BOX_MATERIAL = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  /// ボックスメッシュの作成
  const BOX_MESH = new THREE.Mesh(BOX_GEOMETRY, BOX_MATERIAL);
  /// 座標(0, 0, -100)に配置
  BOX_MESH.position.set(0, 0, -100);
  /// ボックスメッシュをシーンに追加
  SCENE.add(BOX_MESH);

  // ライトの配置
  /// 平行光源の作成
  const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(0xffffff, 1);
  DIRECTIONAL_LIGHT.position.set(1, 1, 1);
  SCENE.add(DIRECTIONAL_LIGHT);

  // 球体と点光源を作成
  /// 光源のもととなる球体の作成
  const SPHERE_GEOMETRY = new THREE.SphereBufferGeometry(1.5, 20, 10);
  const SPHERE_MATERIAL = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const SPHERE_MESH = new THREE.Mesh(SPHERE_GEOMETRY, SPHERE_MATERIAL);

  /// 点光源の作成
  const POINT_LIGHT = new THREE.PointLight(0xffffff, 2, 1000);

  /// 球体の点光源を作成(球体と点光源を組み合わせる)
  POINT_LIGHT.add(SPHERE_MESH);

  /// 球体点光源の座標(0, 0, 1000)に配置
  POINT_LIGHT.position.set(0, 0, 1000);

  /// 球体点光源をシーンに追加
  SCENE.add(POINT_LIGHT);

  const draw = (): void => {
    requestAnimationFrame(draw);

    BOX_MESH.rotation.x += 0.01;
    BOX_MESH.rotation.y += 0.01;

    POINT_LIGHT.position.set(
      200 * Math.sin(Date.now() / 500),
      200 * Math.sin(Date.now() / 1000),
      200 * Math.cos(Date.now() / 500)
    );

    // シーンとカメラを表示
    RENDER.render(SCENE, CAMERA);
  };

  draw();
});
