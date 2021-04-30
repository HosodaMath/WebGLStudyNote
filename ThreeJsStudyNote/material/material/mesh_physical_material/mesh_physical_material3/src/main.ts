// Mesh Physical Material
/// 物理ベースのレンダリングマテリアル
import * as THREE from "three";
import { Mathematics } from "./mathematics";
import { Sphere } from "./sphere";
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
  let point_light_mesh: THREE.Mesh;

  let sphere_position: THREE.Vector3[] = [];
  let sphere_velocity: THREE.Vector3[] = [];
  let sphere_mesh: THREE.Mesh[] = [];

  const init = () => {
    // レンダラーの設定。
    render = new THREE.WebGLRenderer({ antialias: true });

    /// canvasをbodyに追加する。
    document.body.appendChild(render.domElement);

    // 画面サイズを決定する。
    width = window.innerWidth;
    height = window.innerHeight;

    // シーンの追加
    scene = new THREE.Scene();

    // バックグラウンドカラーの設定
    scene.background = new THREE.Color(0xffa257);

    setCamera();
    setGeometry();
    setLight();

    /**
     * リサイズ用関数
     */
    const windowResize = () => {
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

    controls = new OrbitControls(camera, render.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
  };

  /**
   * 座標の設定
   */
  const setPosition = (max: number) => {
    const v3Position: THREE.Vector3[] = [];
    [...Array(max).keys()].forEach((count) => {
      v3Position[count] = new THREE.Vector3(
        Mathematics.random(-300, 300),
        Mathematics.random(-300, 300),
        Mathematics.random(-300, 300)
      );
    });

    return v3Position;
  };

  const setVelocity = (max: number) => {
    const v3Velocity: THREE.Vector3[] = [];
    [...Array(max).keys()].forEach((count) => {
      v3Velocity[count] = new THREE.Vector3(
        Mathematics.random(0.0005, 0.0008),
        Mathematics.random(0.0005, 0.0008),
        0
      );
    });

    return v3Velocity;
  };

  /**
   * ジオメトリの設定
   */
  const setGeometry = () => {
    const sphereSize = width * 0.025;
    const spherePosition = setPosition(10);
    const sphere = new Sphere(spherePosition, sphereSize);
    sphere_mesh = sphere.draw(0xffff00, scene);
    sphere_position = setPosition(10);
    sphere_velocity = setVelocity(10);
  };

  /**
   * 光源設定
   */
  const setLight = () => {
    // ライトの配置
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    /// 平行光源の作成
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 1).normalize();
    scene.add(directionalLight);

    const pointLightGeometrySize = width * 0.01;

    /// 点光源用ジオメトリの作成
    const pointLightGeometry = new THREE.SphereBufferGeometry(
      pointLightGeometrySize,
      32,
      32
    );

    /// 点光源用ジオメトリのマテリアル
    const pointLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    /// 点光源用ジオメトリのメッシュ
    point_light_mesh = new THREE.Mesh(pointLightGeometry, pointLightMaterial);

    scene.add(point_light_mesh);

    /// 点光源の作成
    point_light = new THREE.PointLight(0xffffff, 2, 8100);

    /// 点光源の座標(0, 0, 1000)に配置
    //point_light.position.set(0, 0, 1000);

    /// 点光源をシーンに追加
    ///scene.add(point_light);

    point_light_mesh.add(point_light);
  };

  const draw = (): void => {
    controls.update();
    
    let time = Date.now();
    point_light_mesh.position.set(
      600 * Math.cos(time / 500),
      800 * Math.sin(time / 1000),
      600 * Math.sin(time / 500)
    );

    [...Array(sphere_mesh.length).keys()].forEach((count) => {
      sphere_mesh[count].position.x =
        sphere_position[count].x +
        Math.cos(time * sphere_velocity[count].x) * 300;
      sphere_mesh[count].position.y =
        sphere_position[count].y +
        Math.sin(time * sphere_velocity[count].y) * 300;
    });

    // シーンとカメラを表示
    render.render(scene, camera);

    requestAnimationFrame(draw);
  };
  init();
  draw();
});
