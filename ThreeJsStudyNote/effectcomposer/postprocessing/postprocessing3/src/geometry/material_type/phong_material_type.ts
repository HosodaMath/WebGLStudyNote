import * as THREE from "three";

export class PhongMaterialType {
  public color: THREE.Color | number | string;
  public emisive: THREE.Color | number | string;
  public specular: THREE.Color | number | string;
  public shininess: number;
  public transparent: boolean;
  public opacity: number;
  /**
   * 
   * @param color 
   * @param emisive 
   * @param specular 
   * @param shininess 
   * @param transparent 
   * @param opacity 
   */
  constructor(
    color: THREE.Color | number | string = 0xffffff,
    emisive: THREE.Color | number | string = 0x00000,
    specular: THREE.Color | number | string = 0x00000,
    shininess: number = 0,
    transparent: boolean = false,
    opacity: number = 1.0
  ) {
    this.color = color;
    this.emisive = emisive;
    this.specular = specular;
    this.shininess = shininess;
    this.transparent = transparent;
    this.opacity = opacity;
  }
}
