// Mesh Physical Material
/// 物理ベースのレンダリングマテリアル
import * as THREE from "three";
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
  const init = () => {
    // レンダラーの設定。
    render = new THREE.WebGLRenderer();

    /// canvasをbodyに追加する。
    document.body.appendChild(render.domElement);

    // シーンの追加
    scene = new THREE.Scene();

    // バックグラウンドカラーの設定
    scene.background = new THREE.Color(0x000000);

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
    camera.position.set(0, 0, 100);
  };

  /**
   * ジオメトリの設定
   */
  const setGeometry = () => {
    const sphereGeometry = new THREE.SphereBufferGeometry(10.0, 32, 32);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x6699ff,
      roughness: 0.5,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 1.0,
      reflectivity: 1.0,
    });

    const Mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(Mesh);
  };

  /**
   * 光源設定
   */
  const setLight = () => {
    // ライトの配置
    /// 平行光源の作成
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    /// 点光源の作成
    point_light = new THREE.PointLight(0xffffff, 2, 500);

    /// 点光源の座標(0, 0, 1000)に配置
    point_light.position.set(0, 0, 1000);

    /// 点光源をシーンに追加
    scene.add(point_light);
  };

  const draw = (): void => {
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
