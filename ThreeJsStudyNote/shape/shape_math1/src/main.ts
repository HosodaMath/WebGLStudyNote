// Mesh Standard Material
/// 物理ベースのレンダリングマテリアル
/// Math Shape
import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./main.css";

window.addEventListener("DOMContentLoaded", () => {
  let render: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.Camera;

  let point_light1: THREE.PointLight;
  let point_light2: THREE.PointLight;

  const init = () => {
    // レンダラーの設定。
    render = new THREE.WebGLRenderer();

    /// レンダラーのサイズを決める(画面の大きさ)
    /// 必ずしも画面いっぱいである必要はない。
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;

    /// レンダラーにサイズを設定。
    render.setSize(WIDTH, HEIGHT);

    /// canvasをbodyに追加する。
    document.body.appendChild(render.domElement);

    // シーンの追加
    scene = new THREE.Scene();

    // バックグラウンドカラーの設定
    scene.background = new THREE.Color(0x000000);

    // カメラの設定
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);

    /// カメラの位置を設定
    camera.position.set(0, 0, 500);

    // シェイプの作成
    create_shape(0x6699ff);

    // 光源の作成
    create_light();
  };

  // フラットシェイプで作成
  const create_shape = (
    shape_color: THREE.Color | number | string,
    circle_resolution: number = 6,
    radius: number = 10
  ) => {
    const ANGLE = (Math.PI * 2) / circle_resolution;
    const math_shape = new THREE.Shape();
    [...Array(circle_resolution + 1).keys()].forEach((count) => {
      const X = Math.cos(ANGLE * count) * radius;
      const Y = Math.sin(ANGLE * count) * radius;
      if (count === 0) {
        math_shape.moveTo(X, Y);
      } else {
        math_shape.lineTo(X, Y);
      }
    });

    /// 中心に配置
    const position = new THREE.Vector3(0, 0, 0);
    /// 回転しない
    const rotation = new THREE.Vector3(0, 0, 0);
    /// 大きさは1
    const scale = new THREE.Vector3(1, 1, 1);

    //シェイプ用ジオメトリーの作成
    /// ジオメトリーの作成
    const GEOMETRY = new THREE.ShapeBufferGeometry(math_shape);
    /// マテリアルの作成
    const MATERIAL = new THREE.MeshStandardMaterial({
      color: shape_color,
      roughness: 0.5,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });

    const MESH = new THREE.Mesh(GEOMETRY, MATERIAL);

    scene.add(MESH);

    MESH.position.set(position.x, position.y, position.z);
    MESH.rotation.set(rotation.x, rotation.y, rotation.z);
    MESH.scale.set(scale.x, scale.y, scale.z);
  };

  // 光源設定
  const create_light = () => {
    // ライトの配置
    /// 平行光源の作成
    const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(0xffffff, 1.2);
    DIRECTIONAL_LIGHT.position.set(1, 1, 0);
    scene.add(DIRECTIONAL_LIGHT);

    /// 点光源の作成
    point_light1 = new THREE.PointLight(0xffffff, 2, 1000);

    /// 点光源の座標(0, 0, 1000)に配置
    point_light1.position.set(0, 0, 1000);

    /// 点光源をシーンに追加
    scene.add(point_light1);

    /// 点光源の作成
    point_light2 = new THREE.PointLight(0xffffff, 2, 1000);

    /// 点光源の座標(0, 0, 1000)に配置
    point_light2.position.set(0, 0, 1000);

    /// 点光源をシーンに追加
    scene.add(point_light2);
  };

  const draw = (): void => {
    const time = Date.now();
    point_light1.position.set(
      500 * Math.cos(time / 500),
      500 * Math.sin(time / 1000),
      500 * Math.sin(time / 500)
    );

    point_light2.position.set(
      500 * Math.cos(time / 500),
      500 * Math.sin(time / 1000),
      0
    );

    // シーンとカメラを表示
    render.render(scene, camera);

    requestAnimationFrame(draw);
  };
  init();
  draw();
});
