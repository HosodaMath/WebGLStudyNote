import * as THREE from "three";
import * as Type from "./material_type/type";
export class Sphere {
  private position: THREE.Vector3;
  private size: number;
  private scene: THREE.Scene;
  constructor(position: THREE.Vector3, size: number, mesh: THREE.Scene) {
    this.position = position;
    this.size = size;
    this.scene = mesh;
  }

  drawNormal = () => {
    let geometry = new THREE.SphereBufferGeometry(this.size, 32, 32);
    let material = new THREE.MeshNormalMaterial();
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.scene.add(mesh);

    return mesh;
  };

  drawPhong = (material_type: Type.PhongMaterialType) => {
    let geometry = new THREE.SphereBufferGeometry(this.size, 32, 32);
    let material = new THREE.MeshPhongMaterial({
      color: material_type.color,
      emissive: material_type.emisive,
      specular: material_type.specular,
      shininess: material_type.shininess,
      transparent: material_type.transparent,
      opacity: material_type.opacity,
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.scene.add(mesh);

    return mesh;
  };

  drawStandard = (material_type: Type.StandardMaterialType) => {
    let geometry = new THREE.SphereBufferGeometry(this.size, 32, 32);
    let material = new THREE.MeshStandardMaterial({
      color: material_type.color,
      emissive: material_type.emisive,
      roughness: material_type.roughness,
      metalness: material_type.metalness,
      transparent: material_type.transparent,
      opacity: material_type.opacity,
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.scene.add(mesh);

    return mesh;
  };
}
