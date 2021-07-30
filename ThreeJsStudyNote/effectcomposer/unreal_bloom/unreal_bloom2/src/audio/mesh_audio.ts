import * as THREE from "three";

/**
 * @description Meshをaudioに設定
 * @param sound_file_name サウンドファイル名
 * @param camera カメラ(AudioListenerの設定に必要)
 * @param scene 使うシーンを入れる
 */
export const setMeshAudio = (
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
    // オーディオ再生
    audioPositional.play();
  });

  // speakerジオメトリ
  const speakerGeometry = new THREE.DodecahedronBufferGeometry(6);

  // speakerマテリアル
  const speakerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  // speakerメッシュ
  const speakerMesh = new THREE.Mesh(speakerGeometry, speakerMaterial);

  speakerMesh.name = "speakerMesh";
  speakerMesh.position.set(0, 20, 0);

  // speakerメッシュをオーディオの発信源にする
  speakerMesh.add(audioPositional);
  scene.add(speakerMesh);

  const audioAnalyzer = new THREE.AudioAnalyser(audioPositional, 32);

  return audioAnalyzer;
};
