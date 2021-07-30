import * as THREE from "three";
export const drawCone1 = (scene: THREE.Scene) => {
  [...Array(6).keys()].forEach((count) => {
    const coneGeometry = new THREE.ConeBufferGeometry(5, 20, 64);
    const coneMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      emissive: 0x000000,
      roughness: 0.0,
      transparent: true,
      opacity: 1.0,
    });
    const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
    coneMesh.position.set(Math.cos(count) * 20, 10, Math.sin(count) * 20);
    coneMesh.name = `coneMesh${count}`;
    scene.add(coneMesh);
  });
};
const colors = [
  0xe5ffd5, 0xccffaa, 0xb3ff80, 0x99ff55, 0x7fff2a, 0x66ff00, 0x55d400,
  0x44aa00, 0x338000, 0x225500,
];
//0xa05a2c
export const drawCone2 = (scene: THREE.Scene) => {
  [...Array(10).keys()].forEach((x) => {
    [...Array(6).keys()].forEach((y) => {
      const coneGeometry = new THREE.ConeBufferGeometry(5, 20, 64);
      const coneMaterial = new THREE.MeshStandardMaterial({
        color: colors[x],
        emissive: 0x000000,
        roughness: 0.0,
        transparent: true,
        opacity: 1.0,
      });
      const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
      coneMesh.position.set(
        Math.cos(y) * 20 * (x + 1),
        10,
        Math.sin(y) * 20 * (x + 1)
      );
      coneMesh.name = `coneMesh${x}${y}`;
      console.log(x, y);
      scene.add(coneMesh);
    });
  });
};
