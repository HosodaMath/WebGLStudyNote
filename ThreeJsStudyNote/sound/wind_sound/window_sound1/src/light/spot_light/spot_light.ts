import * as THREE from "three";

export const setSpotLight1 = (scene: THREE.Scene) => {
  // SpotLightGeometry1
  const sphereGeometry1 = new THREE.SphereBufferGeometry(0.5, 32, 32);
  const sphereMaterial1 = new THREE.MeshBasicMaterial({
    color: 0x438a53,
  });
  const sphereMesh1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);

  // SpotLight1
  const intensity = 1;
  const distance = 200;
  const angle = Math.PI / 4.0;
  const penumbra = 1;
  const decay = 2;

  const spotLight1 = new THREE.SpotLight(
    0x438a53,
    intensity,
    distance,
    angle,
    penumbra,
    decay
  );
  spotLight1.position.set(0, 40, 0);
  spotLight1.name = "spotLight1";
  // スポットライトシャドウマップを設定
  /*
  spotLight1.castShadow = true;
  spotLight1.shadow.mapSize.width = 512;
  spotLight1.shadow.mapSize.height = 512;
  spotLight1.shadow.camera.near = 10;
  spotLight1.shadow.camera.far = 200;
  spotLight1.shadow.focus = 1;
  */
  spotLight1.add(sphereMesh1);
  scene.add(spotLight1);
};

export const setSpotLight2 = (scene: THREE.Scene) => {
  // SpotLightGeometry2
  const sphereGeometry2 = new THREE.SphereBufferGeometry(0.5, 32, 32);
  const sphereMaterial2 = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
  });
  const sphereMesh2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);

  // SpotLight2
  const intensity = 1;
  const distance = 200;
  const angle = Math.PI / 4.0;
  const penumbra = 1;
  const decay = 2;

  const spotLight2 = new THREE.SpotLight(
    0x00ffff,
    intensity,
    distance,
    angle,
    penumbra,
    decay
  );
  spotLight2.position.set(15, 40, 0);
  spotLight2.name = "spotLight2";
  // スポットライトシャドウマップを設定
  /*
  spotLight2.castShadow = true;
  spotLight2.shadow.mapSize.width = 512;
  spotLight2.shadow.mapSize.height = 512;
  spotLight2.shadow.camera.near = 10;
  spotLight2.shadow.camera.far = 200;
  spotLight2.shadow.focus = 1;
  */
  spotLight2.add(sphereMesh2);
  scene.add(spotLight2);
};

export const setSpotLight3 = (scene: THREE.Scene) => {
  // SpotLightGeometry3
  const sphereGeometry3 = new THREE.SphereBufferGeometry(0.5, 32, 32);
  const sphereMaterial3 = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
  });
  const sphereMesh3 = new THREE.Mesh(sphereGeometry3, sphereMaterial3);
  // SpotLight2
  const intensity = 1;
  const distance = 200;
  const angle = Math.PI / 4.0;
  const penumbra = 1;
  const decay = 2;

  const spotLight3 = new THREE.SpotLight(
    0x00ffff,
    intensity,
    distance,
    angle,
    penumbra,
    decay
  );
  spotLight3.position.set(-15, 40, 0);
  spotLight3.name = "spotLight3";
  // スポットライトシャドウマップを設定
  /*
  spotLight3.castShadow = true;
  spotLight3.shadow.mapSize.width = 512;
  spotLight3.shadow.mapSize.height = 512;
  spotLight3.shadow.camera.near = 10;
  spotLight3.shadow.camera.far = 200;
  spotLight3.shadow.focus = 1;
  */
  spotLight3.add(sphereMesh3);
  scene.add(spotLight3);
};
