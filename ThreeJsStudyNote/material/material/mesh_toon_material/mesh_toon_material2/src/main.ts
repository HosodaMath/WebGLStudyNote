// Mesh Toon Material
/// トゥーンシェーダーともいい、アニメの用な感じが出ます。
/// MeshPhongMaterialの拡張です。
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

  // バックグラウンドカラーの設定
  SCENE.background = new THREE.Color(0xffaa00);

  // カメラの設定
  const CAMERA = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);

  /// カメラの位置を設定
  CAMERA.position.set(0, 0, 100);

  /// カラーパレットの作成
  const COLOR_DATA = [0x444488, 0x4C8688, 0x488853, 0xA27360, 0xA29D64];

  /// ボックスメッシュの作成
  [...Array(300).keys()].forEach((_count) => {
    // ジオメトリの作成
    /// ボックスジオメトリの作成
    const BOX_GEOMETRY_SIZE = Math.random() * 10.0;
    const BOX_GEOMETRY = new THREE.BoxBufferGeometry(
      BOX_GEOMETRY_SIZE,
      BOX_GEOMETRY_SIZE,
      BOX_GEOMETRY_SIZE
    );
    // カラーパレットからデータの抽出をおこなう。
    /// データの選定を行うために適切な数字を抽出する。
    const CHOICE = Math.floor(Math.random() * COLOR_DATA.length);
    /// 抽出したカラーデータをColor型にセット
    const COLOR = new THREE.Color(COLOR_DATA[CHOICE]);
    /// ボックスマテリアルの作成 MeshToonMaterialを使用
    const BOX_MATERIAL = new THREE.MeshToonMaterial({ color: COLOR });
    const BOX_MESH = new THREE.Mesh(BOX_GEOMETRY, BOX_MATERIAL);
    /// ボックスの位置を設定
    BOX_MESH.position.x = 300 * (0.5 - Math.random());
    BOX_MESH.position.y = 300 * (0.5 - Math.random()) + 25;
    BOX_MESH.position.z = 300 * (0.5 - Math.random());
    BOX_MESH.rotation.x += Math.cos(Math.random());
    BOX_MESH.rotation.y += Math.cos(Math.random());
    /// console.log(BOX_MESH.position.x, BOX_MESH.position.y, BOX_MESH.position.z);
    BOX_MESH.matrixAutoUpdate = false;
    BOX_MESH.updateMatrix();
    /// シーンに追加する
    SCENE.add(BOX_MESH);
  });

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

  /// 点光源1の作成
  const POINT_LIGHT1 = new THREE.PointLight(0xffffff, 2, 1000);
  /// 球体の点光源1を作成(球体と点光源を組み合わせる)
  POINT_LIGHT1.add(SPHERE_MESH);
  /// 球体点光源1の座標(0, 0, 1000)に配置
  POINT_LIGHT1.position.set(0, 0, 1000);
  /// 球体点光源1をシーンに追加
  // SCENE.add(POINT_LIGHT1);

  /// 点光源2の作成
  const POINT_LIGHT2 = new THREE.PointLight(0xffffff, 2, 1000);
  /// 球体の点光源2を作成(球体と点光源を組み合わせる)
  POINT_LIGHT2.add(SPHERE_MESH);
  /// 球体点光源2の座標(0, 0, 1000)に配置
  POINT_LIGHT2.position.set(0, 0, 1000);
  /// 球体点光源2をシーンに追加
  //SCENE.add(POINT_LIGHT2);

  /// 点光源3の作成
  const POINT_LIGHT3 = new THREE.PointLight(0xffffff, 2, 1000);
  /// 球体の点光源3を作成(球体と点光源を組み合わせる)
  POINT_LIGHT3.add(SPHERE_MESH);
  /// 球体点光源3の座標(0, 0, 1000)に配置
  POINT_LIGHT3.position.set(0, 0, 1000);
  /// 球体点光源3をシーンに追加
  SCENE.add(POINT_LIGHT3);

  const draw = (): void => {
    requestAnimationFrame(draw);

    //BOX_MESH.rotation.x += 0.01;
    //BOX_MESH.rotation.y += 0.01;

    POINT_LIGHT1.position.set(
      200 * Math.cos(Date.now() / 500),
      200 * Math.sin(Date.now() / 1000),
      0.0
    );

    POINT_LIGHT2.position.set(
      0.0,
      200 * Math.sin(Date.now() / 1000),
      200 * Math.cos(Date.now() / 500)
    );

    POINT_LIGHT3.position.set(
      200 * Math.cos(Date.now() / 500),
      200 * Math.sin(Date.now() / 1000),
      200 * Math.sin(Date.now() / 500)
    );

    // シーンとカメラを表示
    RENDER.render(SCENE, CAMERA);
  };

  draw();
});
