// Mesh Standard Material
/// 物理ベースのレンダリングマテリアル
/// Effect Anaglyph and Texture
import * as THREE from "three";
import { AnaglyphEffect } from "three/examples/jsm/effects/AnaglyphEffect";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Mathematics } from "./mathematics";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./main.css";

window.addEventListener("DOMContentLoaded", () => {
  let render: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.Camera;
  let controls: OrbitControls;
  let effect: AnaglyphEffect;

  let point_light: THREE.PointLight;
  const spheres: THREE.Mesh[] = [];
  const sphere_radius: number[] = [];

  /**
   *  各種変数の初期化を行う
   *  必要なもの
   *  render - レンダラー
   *  scene  - シーン
   *  camera - カメラ
   *
   *  基本的使うもの
   *  point_light - ポイントライト
   *  spheres[] - メッシュを複数作成
   *
   *  必要に応じて使うもの
   *  effect - エフェクト
   *  sphere_radius - メッシュを複数作成
   *  controls - 手軽にカメラ操作
   */
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

    // バックグラウンドカラーの設定
    //scene.background = new THREE.Color(0xffffff);

    const IMG_LOADER = new THREE.TextureLoader();
    const IMG = IMG_LOADER.load("imgs/texture1.png");
    
    // バックグラウンドの設定
    scene.background = IMG;

    //spheresの設定
    // テクスチャの設定
    /// テクスチャの画像を読み込み
    const LOADER = new THREE.TextureLoader();
    const TEXTURE = LOADER.load("imgs/texture4Blue.png");
    /// ジオメトリー各種パラメーターの初期化
    const GEOMETRY = new THREE.SphereBufferGeometry(0.1, 32, 32);

    [...Array(200).keys()].forEach((_count) => {
      /// スタンダードマテリアルの設定
      const MATERIAL = new THREE.MeshStandardMaterial({
        map: TEXTURE,
        roughness: 0.5,
        metalness: 0.0,
      });
      const MESH = new THREE.Mesh(GEOMETRY, MATERIAL);
      MESH.position.x = Math.random() * 10 - 5;
      MESH.position.y = Math.random() * 10 - 5;
      MESH.position.z = Math.random() * 10 - 5;

      MESH.scale.x = MESH.scale.y = MESH.scale.z = Math.random() * 3 + 1;

      const MESH_RADIUS = Math.floor(Mathematics.random(1, 8));

      scene.add(MESH);

      sphere_radius.push(MESH_RADIUS);
      spheres.push(MESH);
    });

    // カメラの設定
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);

    // OrbitControlの設定
    controls = new OrbitControls(camera, render.domElement);

    /// カメラの位置を設定
    camera.position.set(0, 0, 10);
    controls.update();

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
    const time = Date.now();
    point_light.position.set(
      100 * Math.cos(time / 500),
      100 * Math.sin(time / 1000),
      100 * Math.sin(time / 500)
    );

    [...Array(spheres.length).keys()].forEach((count) => {
      const SPHERE = spheres[count];

      SPHERE.position.x =
        sphere_radius[count] * Math.cos(time * 0.0001 + count);
      SPHERE.position.y =
        sphere_radius[count] * Math.sin(time * 0.0001 + count);
      SPHERE.position.z =
        sphere_radius[count] * Math.sin(time * 0.0001 + count * 1.1111);

      SPHERE.rotation.x = Math.cos(time * 0.0005);
      SPHERE.rotation.y = Math.sin(time * 0.0005);
    });

    controls.update();

    // シーンとカメラを表示
    effect.render(scene, camera);

    requestAnimationFrame(draw);
  };
  init();
  draw();
});
