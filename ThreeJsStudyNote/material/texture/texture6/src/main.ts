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
  let width: number;
  let height: number;
  let width2: number;
  let height2: number;
  let render: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  //let mouseX: number;
  // let mouseY: number;
  let camera: THREE.PerspectiveCamera;
  let effect: AnaglyphEffect;
  let controls: OrbitControls;

  let point_light: THREE.PointLight;
  const spheres: THREE.Mesh[] = [];
  const sphere_radius: number[] = [];

  // マテリアルカラー
  const COLORS = [0x6699ff, 0x66ff99, 0xffff00];

  /**
   *  各種変数の初期化を行う
   *  必要なもの
   *  render - レンダラー
   *  scene  - シーン
   *  camera - カメラ
   *  width height - 画面サイズ
   *  width2 - height2 - 画面サイズ / 2
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
    render = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    /// canvasをbodyに追加する。
    document.body.appendChild(render.domElement);

    // シーンの追加
    scene = new THREE.Scene();

    setCamera();

    // バックグラウンドカラーの設定
    //scene.background = new THREE.Color(0xffffff);

    // 360°パノラマ画像
    const URL = [
      "imgs/Park3Med/px.jpg",
      "imgs/Park3Med/nx.jpg",
      "imgs/Park3Med/py.jpg",
      "imgs/Park3Med/ny.jpg",
      "imgs/Park3Med/pz.jpg",
      "imgs/Park3Med/nz.jpg",
    ];

    /// テクスチャキューブの設定
    const TEXTURE_CUBE = new THREE.CubeTextureLoader().load(URL);
    /// バックグラウンドにテクスチャキューブを設定
    scene.background = TEXTURE_CUBE;

    //spheresの設定
    /// ジオメトリー各種パラメーターの初期化
    const GEOMETRY = new THREE.SphereBufferGeometry(0.1, 32, 32);

    [...Array(200).keys()].forEach((_count) => {
      const CHOICE = Math.floor(Mathematics.random(0, COLORS.length));

      /// スタンダードマテリアルの設定
      const MATERIAL = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.4,
        metalness: 0.0,
        emissive: COLORS[CHOICE],
        opacity: 0.3,
        transparent: true,
        envMap: TEXTURE_CUBE,
      });
      const MESH = new THREE.Mesh(GEOMETRY, MATERIAL);
      MESH.position.x = Math.random() * 10 - 5;
      MESH.position.y = Math.random() * 10 - 5;
      MESH.position.z = Math.random() * 10 - 5;

      MESH.scale.x = MESH.scale.y = MESH.scale.z = Math.random() * 3 + 1;

      const MESH_RADIUS = Math.floor(Mathematics.random(1, 10));

      scene.add(MESH);

      sphere_radius.push(MESH_RADIUS);
      spheres.push(MESH);
    });

    setLight();

    const windowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      width2 = width / 2;
      height2 = height / 2.0;
      render.setPixelRatio(window.devicePixelRatio);
      /// レンダラーのサイズを決める(画面の大きさ)
      /// 必ずしも画面いっぱいである必要はない。

      // エフェクトの設定
      effect = new AnaglyphEffect(render);
      /// エフェクトにサイズを設定。
      effect.setSize(width, height);

      // カメラのアスペクト比を正す。
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    windowResize();
    window.addEventListener("resize", windowResize);
  };

  /**
   *  光源設定
   */
  const setLight = () => {
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

  /**
   *  カメラの設定
   */
  const setCamera = () => {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);

    /// カメラの位置を設定
    camera.position.set(0, 0, 10);

    controls = new OrbitControls(camera, render.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
  };

  /*
  const onMouseMove = (event: any) => {
    mouseX = (event.clientX - width2) / 100;
    mouseY = (event.clientY - height2) / 100;
  };
  */

  const draw = (): void => {
    //camera.position.x += (mouseX - camera.position.x) * 0.05;
    //camera.position.y += (mouseY - camera.position.y) * 0.05;

    controls.update();

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
        sphere_radius[count] * Math.sin(time * 0.0001 + count * 1.2111);
      SPHERE.position.z =
        sphere_radius[count] * Math.sin(time * 0.0001 + count * 1.1111);

      SPHERE.rotation.x = Math.cos(time * 0.0005);
      SPHERE.rotation.y = Math.sin(time * 0.0005);
    });

    // シーンとカメラを表示
    effect.render(scene, camera);

    requestAnimationFrame(draw);
  };
  //document.addEventListener("mousemove", onMouseMove, false);
  init();
  draw();
});
