import * as THREE from "three";

export const test_sphere = (scene: THREE.Scene) => {
  const geometry = new THREE.SphereBufferGeometry(100, 32, 32);
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
};
