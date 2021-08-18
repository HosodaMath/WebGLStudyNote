import * as THREE from "three";
import rgbSplitVertexShader from "./rgbSplit.vert";
import rgbSplitFragmentShader from "./rgbSplit.frag";
const windowSize = [window.innerWidth, window.innerHeight];

export class RGBSplit {
  /**
   * 
   * @param scene 
   * @param image_Data 
   * @returns 
   */
  static rgbSplitProcessing = (scene: THREE.Scene, image_Data: string) => {
    const textureLoader = new THREE.TextureLoader().load(image_Data);

    let uniforms: {
      uTexture: { value: THREE.Texture };
      uResolution: { value: number[] };
    };

    uniforms = {
      uTexture: {
        value: textureLoader,
      },
      uResolution: {
        value: windowSize,
      },
    };

    const planeGeometry = new THREE.PlaneBufferGeometry(200, 200, 200, 200);
    const planeMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: rgbSplitVertexShader,
      fragmentShader: rgbSplitFragmentShader,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);

    return uniforms;
  };

  /**
   * 
   * @param scene 
   * @param image_Data 
   * @returns 
   */
  static rgbSplitProcessingSphere = (
    scene: THREE.Scene,
    image_Data: string
  ) => {
    const textureLoader = new THREE.TextureLoader().load(image_Data);

    let uniforms: {
      uTexture: { value: THREE.Texture };
      uResolution: { value: number[] };
    };

    uniforms = {
      uTexture: {
        value: textureLoader,
      },
      uResolution: {
        value: windowSize,
      },
    };

    const sphereGeometry = new THREE.SphereBufferGeometry(50, 200, 200);
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: rgbSplitVertexShader,
      fragmentShader: rgbSplitFragmentShader,
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereMesh);

    return uniforms;
  };

  /**
   * 
   * @param scene 
   * @param image_Data 
   * @returns 
   */
  static rgbSplitProcessingBox = (scene: THREE.Scene, image_Data: string) => {
    const textureLoader = new THREE.TextureLoader().load(image_Data);

    let uniforms: {
      uTexture: { value: THREE.Texture };
      uResolution: { value: number[] };
    };

    uniforms = {
      uTexture: {
        value: textureLoader,
      },
      uResolution: {
        value: windowSize,
      },
    };

    const boxGeometry = new THREE.BoxBufferGeometry(100, 100, 100, 200, 200);
    const boxMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: rgbSplitVertexShader,
      fragmentShader: rgbSplitFragmentShader,
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    return uniforms;
  };
}
