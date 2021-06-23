import * as THREE from "three";
export const drawCylinder = (scene: THREE.Scene) => {
  [...Array(6).keys()].forEach((count) => {
    const cylinderGeometry = new THREE.CylinderBufferGeometry(3, 3, 20, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      emissive: 0x000000,
      roughness: 0.0,
      transparent: true,
      opacity: 0.5,
    });
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinderMesh.position.set(Math.cos(count) * 20, 10, Math.sin(count) * 20);
    cylinderMesh.name = `cylinderMesh${count}`;
    scene.add(cylinderMesh);
  });
};
