import * as THREE from "three";
export class BaseForest {
  private scene: THREE.Scene;
  /**
   *
   * @param scene
   */
  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   *
   */
  drawReaf = () => {
    const colors = [
      0xe5ffd5, 0xccffaa, 0xb3ff80, 0x99ff55, 0x7fff2a, 0x66ff00, 0x55d400,
      0x44aa00, 0x338000, 0x225500,
    ];
    [...Array(10).keys()].forEach((x) => {
      [...Array(6).keys()].forEach((y) => {
        const reafGeometry = new THREE.ConeBufferGeometry(7.5, 25, 64);
        const reafMaterial = new THREE.MeshStandardMaterial({
          color: colors[x],
          emissive: 0x000000,
          roughness: 0.0,
          transparent: true,
          opacity: 1.0,
        });
        const reafMesh1 = new THREE.Mesh(reafGeometry, reafMaterial);
        reafMesh1.position.set(
          Math.cos(y) * 20 * (x + 1),
          20,
          Math.sin(y) * 20 * (x + 1)
        );
        reafMesh1.name = `reafMesh1${x}${y}`;

        this.scene.add(reafMesh1);

        const reafMesh2 = new THREE.Mesh(reafGeometry, reafMaterial);
        reafMesh2.position.set(
          Math.cos(y) * 20 * (x + 1),
          28,
          Math.sin(y) * 20 * (x + 1)
        );
        reafMesh2.name = `reafMesh2${x}${y}`;

        this.scene.add(reafMesh2);
      });
    });
  };

  drawWood = () => {
    [...Array(10).keys()].forEach((x) => {
      [...Array(6).keys()].forEach((y) => {
        const woodGeometry = new THREE.CylinderBufferGeometry(3, 3, 20, 32);
        const woodMaterial = new THREE.MeshStandardMaterial({
          color: 0xa05a2c,
          emissive: 0x000000,
          roughness: 0.0,
          transparent: true,
          opacity: 1.0,
        });
        const woodMesh = new THREE.Mesh(woodGeometry, woodMaterial);
        woodMesh.position.set(
          Math.cos(y) * 20 * (x + 1),
          10,
          Math.sin(y) * 20 * (x + 1)
        );
        woodMesh.name = `woodMesh${x}${y}`;
        // console.log(x, y);
        this.scene.add(woodMesh);
      });
    });
  };
}
