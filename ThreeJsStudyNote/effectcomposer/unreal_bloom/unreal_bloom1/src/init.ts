import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
/**
 * @description レンダラーに関する設定
 */
export const initRenderer = (
  renderer: THREE.WebGLRenderer,
  width: number,
  height: number
) => {
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
export const initScene = (scene: THREE.Scene) => {
  /// シーンの追加
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0008);
};

/**
 * @description カメラに関する設定
 */
export const initCamera = (
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  cameraPosition: THREE.Vector3,
  controls: OrbitControls
) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);

  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
};
