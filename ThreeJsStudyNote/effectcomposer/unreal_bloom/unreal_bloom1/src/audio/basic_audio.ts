import * as THREE from "three";
/**
 * @description BasicAudio
 * @param sound_file_name 
 * @returns 
 */
export const setBasicAudio = (sound_file_name: string) => {
  // オーディオリスナーを呼び出す
  const audioListener = new THREE.AudioListener();

  const audio = new THREE.Audio(audioListener);

  // オーディオローダーの設定
  const audioLoader = new THREE.AudioLoader();

  audioLoader.load(sound_file_name, function (buffer) {
    // バッファーを設定する
    audio.setBuffer(buffer);
    // オーディオ再生
    audio.play();
  });

  const audioAnalyzer = new THREE.AudioAnalyser(audio, 32);

  return audioAnalyzer;
};
