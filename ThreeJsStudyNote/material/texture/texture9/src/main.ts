import * as THREE from "three";
import * as Draw from "./draw/draw";
import * as Particle from "./particle/particle";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./main.css";

window.addEventListener("DOMContentLoaded", () => {
  /// レンダラー
  let renderer: THREE.WebGLRenderer;
  /// シーン
  let scene: THREE.Scene;
  /// カメラ
  let camera: THREE.PerspectiveCamera;
  /// 画面サイズ
  let width: number;
  let height: number;

  let buble_particle: Particle.BaseBubleParticle;
  let point_light: THREE.PointLight;

  const init = () => {
    createRender();
    createScene();
    createCamera();

    /**
     * @description 画面リサイズ用関数
     */
    const windowResize = () => {
      renderer.setPixelRatio(window.devicePixelRatio);

      renderer.setSize(width, height);

      // カメラのアスペクト比を正す。
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    windowResize();
  };

  /**
   * @description レンダラーに関する設定
   */
  const createRender = () => {
    // レンダラーの設定
    renderer = new THREE.WebGLRenderer({ antialias: true });
    document.body.appendChild(renderer.domElement);
    // 画面サイズ
    width = window.innerWidth;
    height = window.innerHeight;
  };

  /**
   * @description シーンに関する設定
   */
  const createScene = () => {
    /// シーンの追加
    scene = new THREE.Scene();
    /// バックグラウンドに関する設定
    const color = 0x000000;
    scene.background = new THREE.Color(color);
  };

  /**
   * @description カメラに関する設定
   */
  const createCamera = () => {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 0, 500);
  };

  /**
   * canvasをテクスチャとして扱う
   */
  const createCanvasTexture = () => {
    const canvas = document.createElement("canvas");
    const canvasSize = new THREE.Vector2(width, height);
    canvas.width = canvasSize.x;
    canvas.height = canvasSize.y;
    const gl = canvas.getContext("2d");

    const grad = gl.createRadialGradient(
      canvasSize.x / 2.0,
      canvasSize.y / 2.0,
      0,
      canvasSize.x / 2.0,
      canvasSize.y / 2.0,
      canvasSize.x / 2.0
    );

    grad.addColorStop(0.0, "rgba(0, 0, 5, 1.0)");
    grad.addColorStop(0.5, "rgba(0, 0, 20, 1.0)");
    grad.addColorStop(1.0, "rgba(0, 0, 50, 1.0)");

    const rectStart = new Draw.Vector2(0, 0);
    const rectPosition = new Draw.Vector2(canvasSize.x, canvasSize.y);
    const rect = new Draw.Rectangle(gl, rectStart, rectPosition);
    rect.draw_fill(grad);

    const mapBackground = new THREE.CanvasTexture(canvas);

    const geometryBackground = new THREE.PlaneBufferGeometry(
      canvasSize.x,
      canvasSize.y
    );
    const materialBackground = new THREE.MeshBasicMaterial({
      map: mapBackground,
    });

    const meshBackground = new THREE.Mesh(
      geometryBackground,
      materialBackground
    );
    meshBackground.position.set(0, 0, -400);

    scene.add(meshBackground);
  };

  const drawLight = () => {
    const directinalLight = new THREE.DirectionalLight(0xffffff);
    directinalLight.position.set(0, 0, 0);
    scene.add(directinalLight);

    point_light = new THREE.PointLight(0xffffff, 2, 1000, 1.0);
    point_light.position.set(0, 0, 500);
    scene.add(point_light);
  };

  const drawParticle = () => {
    buble_particle = new Particle.BaseBubleParticle(scene, 200);
    buble_particle.drawBaseBuble();
  };

  const renderAnimation = () => {
    buble_particle.stepBuble();

    renderer.render(scene, camera);
    requestAnimationFrame(renderAnimation);
  };

  const render = () => {
    createCanvasTexture();
    drawLight();
    drawParticle();

    renderAnimation();
    //renderer.render(scene, camera);
  };

  init();
  render();
});
