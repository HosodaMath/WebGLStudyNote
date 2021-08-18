import * as THREE from "three";
import InvertVertexShader from "./invert.vert";
import InvertFragmentShader from "./invert.frag";
/**
 *
 * @param scene
 * @param image_Data
 * @returns
 */
export const invertProcessing = (scene: THREE.Scene, image_Data: string) => {
  const textureLoader = new THREE.TextureLoader().load(image_Data);
  let uniforms: {
    uTexture: { value: THREE.Texture };
  };

  uniforms = {
    uTexture: {
      value: textureLoader,
    },
  };

  const planeGeometry = new THREE.PlaneBufferGeometry(200, 200, 200, 200);
  const planeMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: InvertVertexShader,
    fragmentShader: InvertFragmentShader,
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
export const invertProcessingSphere = (
  scene: THREE.Scene,
  image_Data: string
) => {
  const textureLoader = new THREE.TextureLoader().load(image_Data);
  let uniforms: {
    uTexture: { value: THREE.Texture };
  };

  uniforms = {
    uTexture: {
      value: textureLoader,
    },
  };

  const sphereGeometry = new THREE.SphereBufferGeometry(50, 200, 200);
  const sphereMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: InvertVertexShader,
    fragmentShader: InvertFragmentShader,
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
export const invertProcessingBox = (scene: THREE.Scene, image_Data: string) => {
  const textureLoader = new THREE.TextureLoader().load(image_Data);
  let uniforms: {
    uTexture: { value: THREE.Texture };
  };

  uniforms = {
    uTexture: {
      value: textureLoader,
    },
  };

  const boxGeometry = new THREE.BoxBufferGeometry(100, 100, 100, 200, 200);
  const boxMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: InvertVertexShader,
    fragmentShader: InvertFragmentShader,
  });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(boxMesh);

  return uniforms;
};
