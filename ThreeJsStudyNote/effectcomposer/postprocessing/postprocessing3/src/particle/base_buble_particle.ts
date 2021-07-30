import * as THREE from "three";
import * as Geometry from "../geometry/geometry";
import * as Type from "../geometry/material_type/type";
import * as Mathematics from "../mathematics/mathematics";
export class BaseBubleParticle {
  private scene: THREE.Scene;
  private mesh: THREE.Mesh[];
  private position: THREE.Vector3;
  private velocity: THREE.Vector3;
  private size: number;
  private max: number;
  /**
   *
   * @param scene
   * @param max
   */
  constructor(scene: THREE.Scene, max: number) {
    this.scene = scene;
    this.position = new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3(0, 0.8, 0);
    this.size = 0;
    this.max = max;
    this.mesh = [];
  }

  drawBaseBuble = (object: THREE.Object3D) => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    const size = 0.3;
    const minX = -width * size;
    const maxX = width * size;
    const minY = -height * size;
    const maxY = height * size;
    const minZ = minX;
    const maxZ = maxX;
    const colorPallet = [0x49ef4, 0x8efa7, 0x50d2ef];
    [...Array(this.max).keys()].forEach((count) => {
      const colors = Math.floor(
        Mathematics.Random.random(0, colorPallet.length)
      );
      const material = new Type.StandardMaterialType(
        colorPallet[colors],
        0xe4949,
        1.0,
        0.0,
        true,
        0.2
      );
      this.position = new THREE.Vector3(
        Mathematics.Random.random(minX, maxX),
        Mathematics.Random.random(minY, maxY),
        Mathematics.Random.random(minZ, maxZ)
      );

      this.size = Mathematics.Random.random(height * 0.008, height * 0.01);
      const particleSphere = new Geometry.Sphere(
        this.position,
        this.size,
        this.scene
      );

      this.mesh[count] = particleSphere.drawStandard(material);
      // console.log(this.mesh);
      object.add(this.mesh[count]);
    });
  };

  stepBuble = () => {
    let width = window.innerWidth;
    // let height = window.innerHeight;
    const size = 0.2;
    const minX = -width * size;
    const maxX = width * size;
    [...Array(this.mesh.length).keys()].forEach((count) => {
      this.mesh[count].position.x += Math.sin(
        Mathematics.Random.random(-0.5, 0.5)
      );
      this.mesh[count].position.y += this.velocity.y;

      if (this.mesh[count].position.y > 200) {
        this.mesh[count].position.y = -300;
        this.mesh[count].position.x = Mathematics.Random.random(minX, maxX);
      }
    });
  };
}
