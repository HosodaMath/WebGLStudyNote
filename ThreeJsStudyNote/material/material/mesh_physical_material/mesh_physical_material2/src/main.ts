// Mesh Physical Material
/// 物理ベースのレンダリングマテリアル
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./main.css";

window.addEventListener("DOMContentLoaded", () => {
  let width: number;
  let height: number;
  let render: THREE.WebGLRenderer;
  let point_light: THREE.PointLight;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;

  const init = () => {
    // レンダラーの設定。
    render = new THREE.WebGLRenderer({ antialias: true });

    /// canvasをbodyに追加する。
    document.body.appendChild(render.domElement);

    // シーンの追加
    scene = new THREE.Scene();

    // バックグラウンドカラーの設定
    scene.background = new THREE.Color(0xffffff);

    setCamera();
    setGeometry();
    setLight();

    /**
     * リサイズ用関数
     */
    const windowResize = () => {
      /// レンダラーのサイズを決める(画面の大きさ)
      /// 必ずしも画面いっぱいである必要はない。
      width = window.innerWidth;
      height = window.innerHeight;
      render.setPixelRatio(window.devicePixelRatio);

      render.setSize(width, height);

      // カメラのアスペクト比を正す。
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    windowResize();
    window.addEventListener("resize", windowResize);
  };

  /**
   * カメラの設定
   */
  const setCamera = () => {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);

    /// カメラの位置を設定
    camera.position.set(0, 0, 700);

    /*
    controls = new OrbitControls(camera, render.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    */
  };

  /**
   * ジオメトリの設定
   */
  const setGeometry = () => {
    const cubeWidth = 400;
    const numberOfSphersPerSide = 5;
    const sphereRadius = (cubeWidth / numberOfSphersPerSide) * 0.8 * 0.5;
    const stepSize = 1.0 / numberOfSphersPerSide;
    const sphereGeometry = new THREE.SphereBufferGeometry(sphereRadius, 32, 32);
    for (let x = 0; x <= 1; x += stepSize) {
      for (let y = 0; y <= 1; y += stepSize) {
        const sphereMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x6699ff,
          roughness: 0.5,
          metalness: 0.0,
          clearcoat: 1.0 - x,
          clearcoatRoughness: 1.0 - y,
          reflectivity: 1.0,
        });
        console.log(x, y);
        const Mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        Mesh.position.x = x * 400 - 200;
        Mesh.position.y = y * 400 - 200;
        Mesh.position.z = 0.0;
        scene.add(Mesh);
      }
    }
  };

  /**
   * 光源設定
   */
  const setLight = () => {
    // ライトの配置
    /// 平行光源の作成
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    /// 点光源の作成
    point_light = new THREE.PointLight(0xffffff, 2, 500);

    /// 点光源の座標(0, 0, 1000)に配置
    point_light.position.set(0, 0, 1000);

    /// 点光源をシーンに追加
    scene.add(point_light);
  };

  const draw = (): void => {
    //controls.update();

    point_light.position.set(
      200 * Math.cos(Date.now() / 500),
      200 * Math.sin(Date.now() / 1000),
      200 * Math.sin(Date.now() / 500)
    );

    // シーンとカメラを表示
    render.render(scene, camera);

    requestAnimationFrame(draw);
  };
  init();
  draw();
});
