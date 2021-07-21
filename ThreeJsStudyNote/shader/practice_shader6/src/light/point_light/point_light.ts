import * as THREE from "three";

/**
 *
 * @param scene 配置シーン
 * @param lightPosition 点光源の座標
 * @param object 点光源をジオメトリーで表現するか？ default false
 */
export const setPointLight = (
  scene: THREE.Scene,
  lightPosition: THREE.Vector3,
  object: boolean = false
) => {
  // pointLightGeometry1
  if (object == true) {
    const sphereGeometry1 = new THREE.SphereBufferGeometry(20, 32, 32);
    const sphereMaterial1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const sphereMesh1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight1.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
    pointLight1.name = "pointLight";
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
  } else {
    const pointLight1 = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight1.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
    // pointLight1.name = "pointLight";
    // スポットライトシャドウマップを設定
    /*
    pointLight1.castShadow = true;
    pointLight1.shadow.mapSize.width = 512;
    pointLight1.shadow.mapSize.height = 512;
    pointLight1.shadow.camera.near = 10;
    pointLight1.shadow.camera.far = 200;
    */
    scene.add(pointLight1);
  }
};
