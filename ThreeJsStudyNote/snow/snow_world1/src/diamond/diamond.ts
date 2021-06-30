import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
/**
 * @description GLTF形式で描画
 * @param scene
 * @param position
 * @param size
 * @param path
 */
export const drawDiamond = (
  scene: THREE.Scene,
  position: THREE.Vector3,
  size: THREE.Vector3,
  path: string
) => {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(path, function (gltf) {
    const diamond = gltf.scene;
    diamond.position.set(position.x, position.y, position.z);
    diamond.scale.set(size.x, size.y, size.z);

    scene.add(diamond);
  });
};
