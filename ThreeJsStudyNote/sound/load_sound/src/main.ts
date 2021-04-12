// Mesh Standard Material
/// 物理ベースのレンダリングマテリアル
import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./main.css";

window.addEventListener("DOMContentLoaded", () => {
  // レンダラーの設定。
  const RENDER = new THREE.WebGLRenderer({
    preserveDrawingBuffer: true,
    alpha: true,
  });

  RENDER.autoClearColor = false;

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
  SCENE.background = new THREE.Color(0xffffff);

  // カメラの設定
  const CAMERA = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);

  /// カメラの位置を設定
  CAMERA.position.set(0, 0, 100);

  // ジオメトリの作成
  /// Dodecahedronジオメトリーの作成
  const Dodecahedron_GEOMETRY = new THREE.DodecahedronBufferGeometry(20);
  /// Dodecahedronマテリアルの作成
  const Dodecahedron_MATERIAL = new THREE.MeshStandardMaterial({
    color: 0x66ff99,
    roughness: 0.5,
    metalness: 1.0,
  });
  /// Dodecahedronメッシュの作成
  const Dodecahedron_MESH = new THREE.Mesh(
    Dodecahedron_GEOMETRY,
    Dodecahedron_MATERIAL
  );

  Dodecahedron_MESH.position.set(0, 0, 0);

  SCENE.add(Dodecahedron_MESH);

  //  オーディオの設定
  /// リスナーの設定
  /// この音は誰が聞くか -> カメラから見ている人
  const LISTENER = new THREE.AudioListener();
  CAMERA.add(LISTENER);
  
  /// 外部から音源を取り入れる。
  const audio_loader = new THREE.AudioLoader();
  /// オーディオの発信源を設定
  const SOUND1 = new THREE.PositionalAudio(LISTENER);
  audio_loader.load("sounds/358232_j_s_song.ogg", function (buffer) {
    SOUND1.setBuffer(buffer);
    SOUND1.setRefDistance(20);
    SOUND1.play();
  });

  Dodecahedron_MESH.add(SOUND1);

  // 光源設定
  // ライトの配置
  /// 平行光源の作成
  const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(0xffffff, 1);
  DIRECTIONAL_LIGHT.position.set(1, 1, 1);
  SCENE.add(DIRECTIONAL_LIGHT);

  // 球体と点光源を作成
  /// 光源のもととなる球体の作成
  const SPHERE_GEOMETRY_LIGHT = new THREE.SphereBufferGeometry(1.5, 20, 10);
  const SPHERE_MATERIAL_LIGHT = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });
  const SPHERE_MESH_LIGHT = new THREE.Mesh(
    SPHERE_GEOMETRY_LIGHT,
    SPHERE_MATERIAL_LIGHT
  );

  /// 点光源の作成
  const POINT_LIGHT1 = new THREE.PointLight(0xffffff, 2, 1000);

  /// 球体の点光源を作成(球体と点光源を組み合わせる)
  POINT_LIGHT1.add(SPHERE_MESH_LIGHT);

  /// 球体点光源の座標(0, 0, 1000)に配置
  POINT_LIGHT1.position.set(0, 0, 1000);

  /// 球体点光源をシーンに追加
  SCENE.add(POINT_LIGHT1);

  const draw = (): void => {
    // シーンとカメラを表示
    RENDER.render(SCENE, CAMERA);

    requestAnimationFrame(draw);
  };

  draw();
});
