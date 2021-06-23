import * as THREE from "three";

export const setPointLight1 = (scene: THREE.Scene) => {
  // pointLightGeometry1
  const sphereGeometry1 = new THREE.SphereBufferGeometry(0.5, 32, 32);
  const sphereMaterial1 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });
  const sphereMesh1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);

  const pointLight1 = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight1.position.set(0, 40, 0);
  pointLight1.name = "pointLight1";
  // スポットライトシャドウマップを設定
  /*
  pointLight1.castShadow = true;
  pointLight1.shadow.mapSize.width = 512;
  pointLight1.shadow.mapSize.height = 512;
  pointLight1.shadow.camera.near = 10;
  pointLight1.shadow.camera.far = 200;
  */
  pointLight1.add(sphereMesh1);
  scene.add(pointLight1);
};
