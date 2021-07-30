import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/**
 * @description 3D Modelの木をaudioに設定
 * @param sound_file_name サウンドファイル名
 * @param camera カメラ(AudioListenerの設定に必要)
 * @param scene 使うシーンを入れる
 */
export const setGLTFAudio = (
  sound_file_name: string,
  camera: THREE.Camera,
  scene: THREE.Scene
) => {
  // オーディオリスナーを呼び出す
  const audioListener = new THREE.AudioListener();
  // カメラをオーディオリスナーに設定
  camera.add(audioListener);

  // オーディオローダーの設定
  const audioLoader = new THREE.AudioLoader();

  // オーディオ位置をオーディオリスナー(カメラ)に設定
  const audioPositional = new THREE.PositionalAudio(audioListener);

  audioLoader.load(sound_file_name, function (buffer) {
    // バッファーを設定する
    audioPositional.setBuffer(buffer);
    audioPositional.setRefDistance(20);
    
    // ループ再生
    audioPositional.setLoop(true);
    
    // オーディオ再生
    audioPositional.play();
  });

  const position = new THREE.Vector3(0, 0, 0);
  const size = new THREE.Vector3(80, 80, 80);
  const path = "assets/snowTree2.glb";

  const gltfLoader = new GLTFLoader();
  gltfLoader.load(path, function (gltf) {
    const treeAudio = gltf.scene;
    treeAudio.position.set(position.x, position.y, position.z);
    treeAudio.scale.set(size.x, size.y, size.z);
    treeAudio.add(audioPositional);
    scene.add(treeAudio);
  });

  const audioAnalyzer = new THREE.AudioAnalyser(audioPositional, 32);

  return audioAnalyzer;
};
