import * as THREE from "three";

export const test_light = (scene: THREE.Scene) => {
  const directinalLight = new THREE.DirectionalLight(0xffffff);
  directinalLight.position.set(0, 0, 0);
  scene.add(directinalLight);

  const pointLight = new THREE.PointLight(0xffffff, 2, 1000, 1.0);
  pointLight.position.set(0, 0, 500);
  scene.add(pointLight);
};
