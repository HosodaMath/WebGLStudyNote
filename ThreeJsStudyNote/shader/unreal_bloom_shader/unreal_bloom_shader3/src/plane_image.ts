import * as THREE from "three";
import ImageVertexShader from "./shader/imageProcessing/image.vert";
import ImageFragmentShader from "./shader/imageProcessing/image.frag";
import NoiseTexture from "./image/noise.png";
export const drawImagePlane = (scene: THREE.Scene) => {
  const textureLoader = new THREE.TextureLoader().load(NoiseTexture);
  let uniforms: {
    uTexture: { value: THREE.Texture };
  };

  uniforms = {
    uTexture: {
      value: textureLoader,
    },
  };

  const planeGeometry = new THREE.PlaneBufferGeometry(100, 100, 200, 200);
  const planeMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: ImageVertexShader,
    fragmentShader: ImageFragmentShader,
  });
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(planeMesh);

  return uniforms;
};
