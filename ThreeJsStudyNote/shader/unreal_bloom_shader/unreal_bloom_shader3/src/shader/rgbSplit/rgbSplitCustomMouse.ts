import * as THREE from "three";
import rgbSplitCustomMouseVertexShader from "./rgbSplitCustomMouse.vert";
import rgbSplitCustomMouseFragmentShader from "./rgbSplitCustomMouse.frag";
const windowSize = [window.innerWidth, window.innerHeight];
let uniformsCustom: {
  uTexture: { value: THREE.Texture };
  uResolution: { value: number[] };
  uMouse: { value: number[] };
};

export class RGBSplitCustomMouse {
  /**
   *
   * @param scene
   * @param image_Data
   * @returns
   */
  static rgbSplitProcessing = (
    scene: THREE.Scene,
    image_Data: string,
    uMouse: number[]
  ) => {
    const textureLoader = new THREE.TextureLoader().load(image_Data);

    uniformsCustom = {
      uTexture: {
        value: textureLoader,
      },
      uResolution: {
        value: windowSize,
      },
      uMouse: {
        value: uMouse,
      },
    };

    const planeGeometry = new THREE.PlaneBufferGeometry(200, 200, 200, 200);
    const planeMaterial = new THREE.ShaderMaterial({
      uniforms: uniformsCustom,
      vertexShader: rgbSplitCustomMouseVertexShader,
      fragmentShader: rgbSplitCustomMouseFragmentShader,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);

    return uniformsCustom;
  };

  /**
   *
   * @param scene
   * @param image_Data
   * @returns
   */
  static rgbSplitProcessingSphere = (
    scene: THREE.Scene,
    image_Data: string,
    uMouse: number[]
  ) => {
    const textureLoader = new THREE.TextureLoader().load(image_Data);

    uniformsCustom = {
      uTexture: {
        value: textureLoader,
      },
      uResolution: {
        value: windowSize,
      },
      uMouse: {
        value: uMouse,
      },
    };

    const sphereGeometry = new THREE.SphereBufferGeometry(50, 200, 200);
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: uniformsCustom,
      vertexShader: rgbSplitCustomMouseVertexShader,
      fragmentShader: rgbSplitCustomMouseFragmentShader,
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereMesh);

    return uniformsCustom;
  };

  /**
   *
   * @param scene
   * @param image_Data
   * @returns
   */
  static rgbSplitProcessingBox = (
    scene: THREE.Scene,
    image_Data: string,
    uMouse: number[]
  ) => {
    const textureLoader = new THREE.TextureLoader().load(image_Data);

    uniformsCustom = {
      uTexture: {
        value: textureLoader,
      },
      uResolution: {
        value: windowSize,
      },
      uMouse: {
        value: uMouse,
      },
    };

    const boxGeometry = new THREE.BoxBufferGeometry(100, 100, 100, 200, 200);
    const boxMaterial = new THREE.ShaderMaterial({
      uniforms: uniformsCustom,
      vertexShader: rgbSplitCustomMouseVertexShader,
      fragmentShader: rgbSplitCustomMouseFragmentShader,
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    return uniformsCustom;
  };
}
