// sound material change4
/// 音データによって複数のマテリアルの色を変えたい
import * as THREE from "three";
import { MyMath } from "./math";
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
  SCENE.background = new THREE.Color(0x000000);

  // カメラの設定
  const CAMERA = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);

  /// カメラの位置を設定
  CAMERA.position.set(0, 0, 200);

  const COLORS = [0x6699ff, 0x66ff99, 0xff9966, 0x9966ff, 0x99ff66, 0xff6699];

  // ジオメトリの作成
  /// スピーカー用Dodecahedronジオメトリーの作成
  const Dodecahedron_GEOMETRY_Speaker = new THREE.DodecahedronBufferGeometry(
    10
  );
  /// スピーカー用Dodecahedronマテリアルの作成
  const Dodecahedron_MATERIAL_Speaker = new THREE.MeshStandardMaterial({
    color: 0x6699ff,
    roughness: 0.5,
    metalness: 1.0,
  });
  /// スピーカー用Dodecahedronメッシュの作成1
  const Dodecahedron_MESH_Speaker = new THREE.Mesh(
    Dodecahedron_GEOMETRY_Speaker,
    Dodecahedron_MATERIAL_Speaker
  );

  Dodecahedron_MESH_Speaker.position.set(0, 0, 50);

  SCENE.add(Dodecahedron_MESH_Speaker);

  // マテリアルチェンジ
  let mesh_material: THREE.MeshStandardMaterial[] = [];
  [...Array(50).keys()].forEach((_count) => {
    /// マテリアルチェンジ用ジオメトリの作成
    const INIT_VALUE = MyMath.random(5, 10);
    const Dodecahedron_GEOMETRY = new THREE.DodecahedronBufferGeometry(
      INIT_VALUE
    );

    let choice = Math.floor(MyMath.random(0, COLORS.length));
    const Dodecahedron_MATERIAL = new THREE.MeshStandardMaterial({
      color: COLORS[choice],
      roughness: 0.5,
      metalness: 1.0,
    });
    mesh_material.push(Dodecahedron_MATERIAL);

    const Dodecahedron_MESH = new THREE.Mesh(
      Dodecahedron_GEOMETRY,
      Dodecahedron_MATERIAL
    );

    SCENE.add(Dodecahedron_MESH);

    const POSITION = new THREE.Vector3(
      MyMath.random(-200, 200),
      MyMath.random(-200, 200),
      0
    );
    Dodecahedron_MESH.position.set(POSITION.x, POSITION.y, POSITION.z);
  });

  //  オーディオの設定
  /// リスナーの設定
  /// この音は誰が聞くか -> カメラから見ている人
  /// つまりリスナーをカメラに設定すれば良い。
  const LISTENER = new THREE.AudioListener();
  CAMERA.add(LISTENER);

  /// 再生しているかどうか判定。
  let isPlaying = false;

  /// 外部から音源を取り入れる。
  const audio_loader = new THREE.AudioLoader();

  /// オーディオの発信源を設定。
  const Sound = new THREE.PositionalAudio(LISTENER);

  let start = document.querySelector("#start_button");
  start.addEventListener("click", async () => {
    audio_loader.load("sounds/358232_j_s_song.ogg", function (buffer) {
      if (isPlaying == true) {
        return;
      }

      Sound.setBuffer(buffer);
      Sound.setRefDistance(20);
      Sound.play();
      isPlaying = true;
      console.log(isPlaying);
    });
  });

  let stop = document.querySelector("#stop_button");
  stop.addEventListener("click", async () => {
    Sound.stop();
    isPlaying = false;
    console.log(isPlaying);
  });

  /// オーディオの発信源をDodecahedronに設定
  Dodecahedron_MESH_Speaker.add(Sound);

  /// visualizationを行いたいのでアナライザーを定義する。
  /// visualizationの処理は動的に行う。
  const Analyzer = new THREE.AudioAnalyser(Sound, 32);

  // 光源設定
  // ライトの配置
  /// 平行光源の作成
  const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(0xffffff, 1);
  DIRECTIONAL_LIGHT.position.set(1, 1, 1);
  SCENE.add(DIRECTIONAL_LIGHT);

  /// 点光源の作成
  const POINT_LIGHT1 = new THREE.PointLight(0xffffff, 2, 1000);

  /// 球体点光源の座標(0, 0, 1000)に配置
  POINT_LIGHT1.position.set(0, 0, 1000);

  /// 球体点光源をシーンに追加
  SCENE.add(POINT_LIGHT1);

  const draw = (): void => {
    // シーンとカメラを表示
    RENDER.render(SCENE, CAMERA);
    const time = Date.now();

    POINT_LIGHT1.position.set(
      500 * Math.cos(time / 500),
      500 * Math.sin(time / 1000),
      500 * Math.sin(time / 500)
    );

    Dodecahedron_MATERIAL_Speaker.emissive.b =
      Analyzer.getAverageFrequency() / 256;

    [...Array(mesh_material.length).keys()].forEach((count) => {
      mesh_material[count].emissive.b = Analyzer.getAverageFrequency() / 256;
    });

    requestAnimationFrame(draw);
  };
  draw();
});
