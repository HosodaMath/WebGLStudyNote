import * as THREE from "three";

export class StandardMaterialType {
  public color: THREE.Color | number | string;
  public emisive: THREE.Color | number | string;
  public roughness: number;
  public metalness: number;
  public transparent: boolean;
  public opacity: number;
  constructor(
    color: THREE.Color | number | string = 0xffffff,
    emisive: THREE.Color | number | string = 0x00000,
    roughness: number = 0.5,
    metalness: number = 0.0,
    transparent: boolean = false,
    opacity: number = 1.0
  ) {
    this.color = color;
    this.emisive = emisive;
    this.roughness = roughness;
    this.metalness = metalness;
    this.transparent = transparent;
    this.opacity = opacity;
  }
}
