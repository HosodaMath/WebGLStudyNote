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
  const BOX_MATERIAL = new THREE.MeshLambertMaterial({color: 0x00ffff});
  /// ボックスメッシュ
  const BOX_MESH = new THREE.Mesh(BOX_GEOMETRY, BOX_MATERIAL);
  BOX_MESH.position.set(0, 0, -100);
  /// シーンに追加
  SCENE.add(BOX_MESH);

  // テキストの配置
  const FONT_LOADER = new THREE.FontLoader();
  let text_mesh: THREE.Mesh;
  FONT_LOADER.load("fonts/helvetiker_regular.typeface.json", function(font) {
    const TEXT_GEOMETRY = new THREE.TextGeometry("Hello World", {
      font: font,
      size: 5,
      height: 1,
      curveSegments: 20,
    })

    const TEXT_MATERIAL = new THREE.MeshLambertMaterial({color: 0xffffff});
    text_mesh = new THREE.Mesh(TEXT_GEOMETRY, TEXT_MATERIAL);
    SCENE.add(text_mesh);
  })

  // 光源の設置
  /// 平行光源の設置
  const LIGHT = new THREE.DirectionalLight(0xFFFFFF, 1);
  LIGHT.position.set(1, 1, 1);
  SCENE.add(LIGHT);
  
  /// 点光源の設置
  const POINT_LIGHT = new THREE.PointLight(0xFFFFFF);
  POINT_LIGHT.position.set(0, 0, 100);
  SCENE.add(POINT_LIGHT);

  const draw = (): void => {
    requestAnimationFrame(draw);

    // シーンとカメラを表示
    RENDER.render(SCENE, CAMERA);

    const TIME = Date.now() * 0.005;
    text_mesh.position.x = Math.cos(TIME * 0.05) * 30;
    text_mesh.position.y = Math.sin(TIME * 0.05) * 30;
    text_mesh.position.z = Math.tan(TIME * 0.05) * 30;
    text_mesh.rotation.y = TIME * 0.05;
  };

  draw();
});
