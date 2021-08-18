import * as THREE from "three";
import rgbSplitCustomTimeVertexShader from "./rgbSplitCustomTime.vert";
import rgbSplitCustomTimeFragmentShader from "./rgbSplitCustomTime.frag";
const windowSize = [window.innerWidth, window.innerHeight];
let uniformsCustom: {
  uTexture: { value: THREE.Texture };
  uResolution: { value: number[] };
  uTime: { value: number };
};

export class RGBSplitCustom {
  /**
   *
   * @param scene
   * @param image_Data
   * @returns
   */
  static rgbSplitProcessing = (
    scene: THREE.Scene,
    image_Data: string,
    uTime: number
  ) => {
    const textureLoader = new THREE.TextureLoader().load(image_Data);

    uniformsCustom = {
      uTexture: {
        value: textureLoader,
      },
      uResolution: {
        value: windowSize,
      },
      uTime: {
        value: uTime,
      },
    };

    const planeGeometry = new THREE.PlaneBufferGeometry(200, 200, 200, 200);
    const planeMaterial = new THREE.ShaderMaterial({
      uniforms: uniformsCustom,
      vertexShader: rgbSplitCustomTimeVertexShader,
      fragmentShader: rgbSplitCustomTimeFragmentShader,
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
    uTime: number
  ) => {
    const textureLoader = new THREE.TextureLoader().load(image_Data);

    uniformsCustom = {
      uTexture: {
        value: textureLoader,
      },
      uResolution: {
        value: windowSize,
      },
      uTime: {
        value: uTime,
      },
    };

    const sphereGeometry = new THREE.SphereBufferGeometry(50, 200, 200);
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: uniformsCustom,
      vertexShader: rgbSplitCustomTimeVertexShader,
      fragmentShader: rgbSplitCustomTimeFragmentShader,
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
    uTime: number
  ) => {
    const textureLoader = new THREE.TextureLoader().load(image_Data);

    uniformsCustom = {
      uTexture: {
        value: textureLoader,
      },
      uResolution: {
        value: windowSize,
      },
      uTime: {
        value: uTime,
      },
    };

    const boxGeometry = new THREE.BoxBufferGeometry(100, 100, 100, 200, 200);
    const boxMaterial = new THREE.ShaderMaterial({
      uniforms: uniformsCustom,
      vertexShader: rgbSplitCustomTimeVertexShader,
      fragmentShader: rgbSplitCustomTimeFragmentShader,
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    return uniformsCustom;
  };
}
