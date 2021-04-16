import * as THREE from "three";
// オーディオの設定
export const set_sound = (
  sound_file_name: string,
  isPlaying: boolean,
  camera: THREE.Camera,
  scene: THREE.Scene
) => {
  /// リスナーの設定
  const LISTEINER = new THREE.AudioListener();
  camera.add(LISTEINER);

  /// オーディオローダーの作成
  const AUDIO_LOADER = new THREE.AudioLoader();

  /// オーディオの位置を設定
  const AUDIO_POSITIONAL = new THREE.PositionalAudio(LISTEINER);

  // オーディオイベントの設定
  /// オーディオ再生イベントの設定
  const START = document.querySelector("#start_button");
  START.addEventListener("click", async () => {
    /// オーディオファイルの読み込みとバッファーの作成
    AUDIO_LOADER.load(sound_file_name, function (buffer) {
      /// 2重再生を阻止する。
      if (isPlaying == true) {
        return;
      }

      /// バッファーをセットする。
      AUDIO_POSITIONAL.setBuffer(buffer);
      AUDIO_POSITIONAL.setRefDistance(20);
      /// オーディオ再生
      AUDIO_POSITIONAL.play();
      /// オーディオの再生を行うのでtrueにする。
      isPlaying = true;
    });
  });

  /// オーディオ停止イベントの作成
  const STOP = document.querySelector("#stop_button");
  STOP.addEventListener("click", async () => {
    AUDIO_POSITIONAL.stop();
    isPlaying = false;
  });

  // オーディオ再生で重要なスピーカーを作成する。
  /// スピーカージオメトリーの作成
  const SPEAKER_GEOMETRY = new THREE.BoxBufferGeometry(1, 2, 1);
  /// スピーカーマテリアルの設定
  const SPEAKER_MATERIAL = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.5,
    metalness: 1.0,
  });
  /// スピーカーメッシュの作成
  const SPEAKER = new THREE.Mesh(SPEAKER_GEOMETRY, SPEAKER_MATERIAL);

  /// スピーカーメッシュからスピーカーを作成
  SPEAKER.add(AUDIO_POSITIONAL);

  /// シーンに追加
  scene.add(SPEAKER);

  /// スピーカーに位置を初期化
  SPEAKER.position.set(0, 0, 0);

  const AUDIO_ANALYZER = new THREE.AudioAnalyser(AUDIO_POSITIONAL, 32);

  return AUDIO_ANALYZER;
};
