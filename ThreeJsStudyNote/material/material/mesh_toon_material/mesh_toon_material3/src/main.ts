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

  
  /// 球体メッシュの作成
  let sphere_mesh: THREE.Mesh[] = [];
  [...Array(100).keys()].forEach((_count) => {
    // ジオメトリの作成
    /// 球体ジオメトリの作成
    const SPHERE_GEOMETRY_SIZE = Math.random() * 3.0;
    const SPHERE = new THREE.SphereBufferGeometry(SPHERE_GEOMETRY_SIZE, 20, 10);
    // カラーパレットからデータの抽出をおこなう。
    /// データの選定を行うために適切な数字を抽出する。
    const CHOICE = Math.floor(Math.random() * COLOR_DATA.length);
    /// 抽出したカラーデータをColor型にセット
    const COLOR = new THREE.Color(COLOR_DATA[CHOICE]);
    /// 球体マテリアルの作成 MeshToonMaterialを使用
    const SPHERE_MATERIAL = new THREE.MeshToonMaterial({ color: COLOR });
    const SPHERE_MESH = new THREE.Mesh(SPHERE, SPHERE_MATERIAL);
    /// 球体の位置を設定
    SPHERE_MESH.position.x = 100 * (0.5 - Math.random());
    SPHERE_MESH.position.y = 100 * (0.5 - Math.random()) + 25;
    SPHERE_MESH.position.z = 100 * (0.5 - Math.random());
    console.log(SPHERE_MESH.position.x, SPHERE_MESH.position.y, SPHERE_MESH.position.z);
    // SPHERE_MESH.matrixAutoUpdate = false;
    // SPHERE_MESH.updateMatrix();
    /// シーンに追加する
    SCENE.add(SPHERE_MESH);

    sphere_mesh.push(SPHERE_MESH);
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
  SCENE.add(POINT_LIGHT1);

  const draw = (): void => {
    requestAnimationFrame(draw);

    POINT_LIGHT1.position.set(
      200 * Math.cos(Date.now() / 500),
      200 * Math.sin(Date.now() / 1000),
      200 * Math.sin(Date.now() / 500)
    );
    let time = Date.now() * 0.0001;
    [...Array(sphere_mesh.length).keys()].forEach((count) => {
      const SPHERE_TMP = sphere_mesh[count];
      SPHERE_TMP.position.x =  20 * Math.cos(time + count * 2.1);
      SPHERE_TMP.position.y =  20 * Math.sin(time + count * 1.5);
    })

    // シーンとカメラを表示
    RENDER.render(SCENE, CAMERA);
  };

  draw();
});
