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


  // 背景ジオメトリの設置
  /// ボックスジオメトリ
  const BOX_GEOMETRY = new THREE.BoxBufferGeometry(WIDTH, HEIGHT, 10);
  /// ボックスマテリアル
  const TEXTURE_LOADER = new THREE.TextureLoader();
  const TEXTURE = TEXTURE_LOADER.load("imgs/texture2.png");
  const BOX_MATERIAL = new THREE.MeshStandardMaterial(
    {
      map: TEXTURE
    });
  /// ボックスメッシュ
  const BOX_MESH = new THREE.Mesh(BOX_GEOMETRY, BOX_MATERIAL);
  BOX_MESH.position.set(0, 0, -100);
  /// シーンに追加
  SCENE.add(BOX_MESH);

  // テキストの配置
  const FONT_LOADER = new THREE.FontLoader();
  let text_mesh1: THREE.Mesh;
  let text_mesh2: THREE.Mesh;
  let text_mesh3: THREE.Mesh;
  FONT_LOADER.load("fonts/helvetiker_regular.typeface.json", function(font) {
    const TEXT_GEOMETRY1 = new THREE.TextGeometry("Hello World", {
      font: font,
      size: 5,
      height: 1,
      curveSegments: 20,
    })

    const TEXT_MATERIAL1 = new THREE.MeshLambertMaterial({color: 0xe6f7f7});
    text_mesh1 = new THREE.Mesh(TEXT_GEOMETRY1, TEXT_MATERIAL1);
    SCENE.add(text_mesh1);

    const TEXT_GEOMETRY2 = new THREE.TextGeometry("Infinity Librlay", {
      font: font,
      size: 5,
      height: 1,
      curveSegments: 20,
    })

    const TEXT_MATERIAL2 = new THREE.MeshLambertMaterial({color: 0xede8ff});
    text_mesh2 = new THREE.Mesh(TEXT_GEOMETRY2, TEXT_MATERIAL2);
    SCENE.add(text_mesh2);

    const TEXT_GEOMETRY3 = new THREE.TextGeometry("(-v-) (^_^) (#_#) (Y~Y)", {
      font: font,
      size: 5,
      height: 1,
      curveSegments: 20,
    })

    const TEXT_MATERIAL3 = new THREE.MeshLambertMaterial({color: 0xd1fff2});
    text_mesh3 = new THREE.Mesh(TEXT_GEOMETRY3, TEXT_MATERIAL3);
    SCENE.add(text_mesh3);
  })

  // 光源の設置
  /// 平行光源の設置
  const LIGHT = new THREE.DirectionalLight(0xFFFFFF, 1);
  LIGHT.position.set(1, 1, 1);
  SCENE.add(LIGHT);
  
  /// 点光源の設置
  const POINT_LIGHT = new THREE.PointLight(0xE6E6E6);
  POINT_LIGHT.position.set(0, 0, 500);
  SCENE.add(POINT_LIGHT);

  const draw = (): void => {
    requestAnimationFrame(draw);

    // シーンとカメラを表示
    RENDER.render(SCENE, CAMERA);

    const TIME = Date.now() * 0.005;
    text_mesh1.position.x = Math.cos(TIME * 0.05) * 30;
    text_mesh1.position.y = Math.sin(TIME * 0.05) * 30;
    text_mesh1.position.z = Math.tan(TIME * 0.05) * 30;
    text_mesh1.rotation.y = TIME * 0.05;

    text_mesh2.position.x = Math.cos(TIME * 0.03) * 35;
    text_mesh2.position.y = Math.sin(TIME * 0.03) * 30;
    text_mesh2.rotation.x = TIME * 0.05;
    text_mesh2.rotation.y = TIME * 0.04;

    text_mesh3.position.x = Math.cos(TIME * 0.02) * 40;
    text_mesh3.position.y = Math.sin(TIME * 0.03) * 50;
    text_mesh3.rotation.x = TIME * 0.01;
    text_mesh3.rotation.y = TIME * 0.01;
  };

  draw();
});
