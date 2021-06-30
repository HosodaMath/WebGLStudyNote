import * as THREE from "three";

export const drawSnowWorldNormal = (scene: THREE.Scene) => {
  const snowWorldGeometry = new THREE.BoxBufferGeometry(2000, 1, 2000);
  const snowWorldMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const snowWorld = new THREE.Mesh(snowWorldGeometry, snowWorldMaterial);
  snowWorld.position.set(0, 0, 0);
  scene.add(snowWorld);
};

export const drawSnowWorld = (scene: THREE.Scene) => {
  const snowLoader = new THREE.TextureLoader();
  const snowMap = snowLoader.load("texture/snow.jpg");
  const snowWorldGeometry = new THREE.BoxBufferGeometry(2000, 1, 2000);
  const snowWorldMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: snowMap,
    emissive: 0x000000,
    roughness: 0.0,
  });
  const snowWorld = new THREE.Mesh(snowWorldGeometry, snowWorldMaterial);
  snowWorld.position.set(0, 0, 0);
  scene.add(snowWorld);
};
