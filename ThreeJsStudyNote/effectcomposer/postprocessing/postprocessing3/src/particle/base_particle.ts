import * as THREE from "three";
import * as Geometry from "../geometry/geometry";
import * as Type from "../geometry/material_type/type";
import * as Mathematics from "../mathematics/mathematics";
export class BaseParticle {
  private scene: THREE.Scene;
  private position: THREE.Vector3;
  private size: number;
  /**
   *
   * @param scene
   */
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.position = new THREE.Vector3(0, 0, 0);
    this.size = 0;
  }

  /**
   *
   * @param max
   */
  drawNormalBaseParticle(max: number) {
    [...Array(max).keys()].forEach((_count) => {
      this.position = new THREE.Vector3(
        Mathematics.Random.random(-300, 300),
        Mathematics.Random.random(-300, 300),
        Mathematics.Random.random(-300, 300)
      );

      this.size = Mathematics.Random.random(5, 20);

      const particleSphere = new Geometry.Sphere(
        this.position,
        this.size,
        this.scene
      );

      particleSphere.drawNormal();
    });
  }

  /**
   *
   * @param max
   */
  drawPhongBaseParticle(max: number) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    const size = 0.2;
    const minX = -width * size;
    const maxX = width * size;
    const minY = -height * size;
    const maxY = height * size;
    const minZ = minX;
    const maxZ = maxX;
    const material = new Type.PhongMaterialType(0x49ef4, 0xe4949, 0x324672, 30);
    [...Array(max).keys()].forEach((_count) => {
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

      particleSphere.drawPhong(material);
    });
  }

  /**
   *
   * @param max
   */
  drawStandardBaseParticle(max: number) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    const size = 0.2;
    const minX = -width * size;
    const maxX = width * size;
    const minY = -height * size;
    const maxY = height * size;
    const minZ = minX;
    const maxZ = maxX;
    const colorPallet = [0x49ef4, 0x8efa7, 0x50d2ef];
    [...Array(max).keys()].forEach((_count) => {
      const colors = Math.floor(
        Mathematics.Random.random(0, colorPallet.length)
      );
      const material = new Type.StandardMaterialType(
        colorPallet[colors],
        0xe4949,
        1.0
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

      particleSphere.drawStandard(material);
    });
  }
}
