import * as THREE from "three";
export const drawDodecahedron = (scene: THREE.Scene) => {
  [...Array(6).keys()].forEach((count) => {
    const dodecahedronGeometry = new THREE.DodecahedronBufferGeometry(6);
    const dodecahedronMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      emissive: 0x000000,
      roughness: 0.0,
      transparent: true,
      opacity: 1.0,
    });
    const dodecahedronMesh = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
    dodecahedronMesh.position.set(Math.cos(count) * 20, 10, Math.sin(count) * 20);
    dodecahedronMesh.name = `dodecahedronMesh${count}`;
    scene.add(dodecahedronMesh);
  });
};
