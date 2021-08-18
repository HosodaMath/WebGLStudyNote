import * as THREE from "three";
import sinWaveDistortVertexShader from "./sinWaveDistort.vert";
import sinWaveDistortFragmentShader from "./sinWaveDistort.frag";
const windowSize = [window.innerWidth, window.innerHeight];
let uniformsCustom: {
  uTexture: { value: THREE.Texture };
  uResolution: { value: number[] };
  uTime: { value: number };
  uFrequency: { value: number };
  uAmplitude: { value: number };
};

export class SinWaveDistort {
  /**
   *
   * @param scene
   * @param image_Data
   * @returns
   */
  static rgbSplitProcessing = (
    scene: THREE.Scene,
    image_Data: string,
    uTime: number,
    uFrequency: number,
    uAmplitude: number
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
      uFrequency: {
        value: uFrequency,
      },
      uAmplitude: {
        value: uAmplitude,
      },
    };

    const planeGeometry = new THREE.PlaneBufferGeometry(200, 200, 200, 200);
    const planeMaterial = new THREE.ShaderMaterial({
      uniforms: uniformsCustom,
      vertexShader: sinWaveDistortVertexShader,
      fragmentShader: sinWaveDistortFragmentShader,
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
    uTime: number,
    uFrequency: number,
    uAmplitude: number
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
      uFrequency: {
        value: uFrequency,
      },
      uAmplitude: {
        value: uAmplitude,
      },
    };

    const sphereGeometry = new THREE.SphereBufferGeometry(50, 200, 200);
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: uniformsCustom,
      vertexShader: sinWaveDistortVertexShader,
      fragmentShader: sinWaveDistortFragmentShader,
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
    uTime: number,
    uFrequency: number,
    uAmplitude: number
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
      uFrequency: {
        value: uFrequency,
      },
      uAmplitude: {
        value: uAmplitude,
      },
    };

    const boxGeometry = new THREE.BoxBufferGeometry(100, 100, 100, 200, 200);
    const boxMaterial = new THREE.ShaderMaterial({
      uniforms: uniformsCustom,
      vertexShader: sinWaveDistortVertexShader,
      fragmentShader: sinWaveDistortFragmentShader,
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    return uniformsCustom;
  };
}
