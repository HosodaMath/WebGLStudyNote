// Sound Material Change6
/// 物理ベースのレンダリングマテリアル
/// Effect Anaglyph and Standard Material
import * as THREE from "three";
import { AnaglyphEffect } from "three/examples/jsm/effects/AnaglyphEffect";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { set_sound } from "./set_audio";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./main.css";
/**
 *  各種グローバル変数の初期化を行う
 *  最低限必要なもの
 *  render - レンダラー 画面に描画する。
 *  scene  - シーン カメラやジオメトリーなどの配置に必要なもの。
 *  camera - カメラ 視点になる。
 *
 *  視覚に影響
 *  point_light - ポイントライト ライトがないとジオメトリーなどが見えなくなる。
 *  エフェクトはAnaglyphを使用する。
 *  effect - エフェクト 各種視覚効果を付与する。
 *
 *  聴覚に影響
 *  isPlaying - boolean 再生しているかどうかを判定する。2重再生を阻止するために必要。
 *  audio_analyzer - 音データの視覚化に必要。
 *  サウンド関連のソースコード分割
 * 
 *  3D - ジオメトリーとマテリアル関連
 *  ジオメトリーはスピーカーを除きすべてdodecahedronで作成
 *  すべて配列で作成する
 *  dodecahedron_standard_material - standard materialで設定。
 *  dodecahedron - メッシュを配列に格納する。
 */

window.addEventListener("DOMContentLoaded", () => {
  // render scene cameraの各変数
  let render: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.Camera;

  // light effect など 視覚に影響のある変数を宣言
  let point_light: THREE.PointLight;
  let effect: AnaglyphEffect;

  // ジオメトリー関連の変数を配列で宣言
  const dodecahedron_standard_material: THREE.MeshStandardMaterial[] = [];
  const dodecahedron: THREE.Mesh[] = [];

  // オーディオ周りの変数
  /// 再生しているかどうか判定
  let isPlaying = false;
  /// オーディオアナライザーに使う変数
  let audio_analyzer: THREE.AudioAnalyser;

  const init = () => {
    // レンダラーの設定。
    render = new THREE.WebGLRenderer();

    /// レンダラーのサイズを決める(画面の大きさ)
    /// 必ずしも画面いっぱいである必要はない。
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;

    // エフェクトの設定
    effect = new AnaglyphEffect(render);
    /// エフェクトにサイズを設定。
    effect.setSize(WIDTH, HEIGHT);

    /// canvasをbodyに追加する。
    document.body.appendChild(render.domElement);

    // シーンの追加
    scene = new THREE.Scene();

    // カメラの設定
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
    /// カメラの位置を設定
    camera.position.set(0, 0, 10);

    // バックグラウンドカラーの設定
    scene.background = new THREE.Color(0xffffff);

    //spheresの設定
    /// ジオメトリー各種パラメーターの初期化
    const GEOMETRY = new THREE.DodecahedronBufferGeometry(0.1);

    [...Array(100).keys()].forEach((_count) => {
      /// スタンダードマテリアルの設定
      const MATERIAL = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.5,
        metalness: 1.0,
      });

      const MESH = new THREE.Mesh(GEOMETRY, MATERIAL);

      MESH.position.x = Math.random() * 10 - 5;
      MESH.position.y = Math.random() * 10 - 5;
      MESH.position.z = Math.random() * 10 - 5;

      MESH.scale.x = MESH.scale.y = MESH.scale.z = Math.random() * 3 + 1;

      scene.add(MESH);

      dodecahedron_standard_material.push(MATERIAL);
      dodecahedron.push(MESH);
    });

    // オーディオの設定
    const AUDIO_FILE = "sounds/358232_j_s_song.mp3";

    audio_analyzer = set_sound(AUDIO_FILE, isPlaying, camera, scene);

    // 光源設定
    // ライトの配置
    /// 平行光源の作成
    const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(0xffffff, 1.2);
    DIRECTIONAL_LIGHT.position.set(1, 1, 0);
    scene.add(DIRECTIONAL_LIGHT);

    /// 点光源の作成
    point_light = new THREE.PointLight(0xffffff, 2, 1000);

    /// 球体点光源の座標(0, 0, 1000)に配置
    point_light.position.set(0, 0, 1000);

    /// 球体点光源をシーンに追加
    scene.add(point_light);
  };

  const draw = (): void => {
    const TIME = Date.now();
    point_light.position.set(
      100 * Math.cos(TIME / 500),
      100 * Math.sin(TIME / 1000),
      100 * Math.sin(TIME / 500)
    );

    [...Array(dodecahedron.length).keys()].forEach((count) => {
      const SPHERE = dodecahedron[count];

      SPHERE.position.x = 5 * Math.cos(TIME * 0.0001 + count);
      SPHERE.position.y = 5 * Math.sin(TIME * 0.0001 + count * 1.111);

      dodecahedron_standard_material[count].emissive.g =
        audio_analyzer.getAverageFrequency() / 256;
      dodecahedron_standard_material[count].emissive.b =
        audio_analyzer.getAverageFrequency() / 256;
    });

    // シーンとカメラを表示
    effect.render(scene, camera);

    requestAnimationFrame(draw);
  };
  init();
  draw();
});
