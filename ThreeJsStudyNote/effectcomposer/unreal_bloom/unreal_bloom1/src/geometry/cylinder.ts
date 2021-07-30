import * as THREE from "three";
export const drawCylinder1 = (scene: THREE.Scene) => {
  [...Array(6).keys()].forEach((count) => {
    const cylinderGeometry = new THREE.CylinderBufferGeometry(3, 3, 20, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      emissive: 0x000000,
      roughness: 0.0,
      transparent: true,
      opacity: 1.0,
    });
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinderMesh.position.set(Math.cos(count) * 20, 10, Math.sin(count) * 20);
    cylinderMesh.name = `cylinderMesh${count}`;
    scene.add(cylinderMesh);
  });
};
const colors = [
  0xe5ffd5, 0xccffaa, 0xb3ff80, 0x99ff55, 0x7fff2a, 0x66ff00, 0x55d400,
  0x44aa00, 0x338000, 0x225500,
];
//0xa05a2c
export const drawCylinder2 = (scene: THREE.Scene) => {
  [...Array(10).keys()].forEach((x) => {
    [...Array(6).keys()].forEach((y) => {
      const cylinderGeometry = new THREE.CylinderBufferGeometry(3, 3, 20, 32);
      const cylinderMaterial = new THREE.MeshStandardMaterial({
        color: colors[x],
        emissive: 0x000000,
        roughness: 0.0,
        transparent: true,
        opacity: 1.0,
      });
      const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
      cylinderMesh.position.set(
        Math.cos(y) * 20 * (x + 1),
        10,
        Math.sin(y) * 20 * (x + 1)
      );
      cylinderMesh.name = `cylinderMesh${x}${y}`;
      console.log(x, y);
      scene.add(cylinderMesh);
    });
  });
};
