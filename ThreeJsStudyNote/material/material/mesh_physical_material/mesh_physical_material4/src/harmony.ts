import * as THREE from "three";
/**
 *
 */
class Harmony {
  private v3Position: THREE.Vector3[];
  private sphereSize: number;
  constructor(init_v3Positon: THREE.Vector3[], init_sphereSize: number) {
    this.v3Position = init_v3Positon;
    this.sphereSize = init_sphereSize;
  }

  /**
   *
   * @param materialColor
   * @param scene
   * @returns
   */
  drawRGB = (
    materialColor: THREE.Color | string | number,
    scene: THREE.Scene
  ) => {
    const sphereMeshData: THREE.Mesh[] = [];

    const sphereGeometry = new THREE.SphereBufferGeometry(
      this.sphereSize,
      32,
      32
    );

    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: materialColor,
      roughness: 0.5,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      reflectivity: 1.0,
    });

    [...Array(this.v3Position.length).keys()].forEach((count) => {
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      // 座標の初期化
      sphereMesh.position.x = this.v3Position[count].x;
      sphereMesh.position.y = this.v3Position[count].y;
      sphereMesh.position.z = this.v3Position[count].z;
      scene.add(sphereMesh);
      sphereMeshData.push(sphereMesh);
    });

    return sphereMeshData;
  };

  /**
   *
   * @param scene
   * @returns
   */
  drawHSL = (scene: THREE.Scene) => {
    const sphereMeshData: THREE.Mesh[] = [];
    
    [...Array(this.v3Position.length).keys()].forEach((count) => {
      const sphereGeometry = new THREE.SphereBufferGeometry(
        this.sphereSize,
        32,
        32
      );
      
      const color: number = count * 2;
      const sphereMaterialColor: THREE.Color = new THREE.Color(
        `hsl(${color}, 100%, 50%)`
      );
      const sphereMaterial = new THREE.MeshPhysicalMaterial({
        color: sphereMaterialColor,
        roughness: 0.5,
        metalness: 0.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        reflectivity: 1.0,
      });

      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      // 座標の初期化
      sphereMesh.position.x = this.v3Position[count].x;
      sphereMesh.position.y = this.v3Position[count].y;
      sphereMesh.position.z = this.v3Position[count].z;
      scene.add(sphereMesh);
      sphereMeshData.push(sphereMesh);
    });

    return sphereMeshData;
  };
}

export { Harmony };
