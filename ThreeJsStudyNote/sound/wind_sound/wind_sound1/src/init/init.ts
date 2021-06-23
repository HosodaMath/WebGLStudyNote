import * as THREE from "three";
/**
   * @description レンダラーに関する設定
   */
 const initRenderer = () => {
  // レンダラーの設定
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  document.body.appendChild(renderer.domElement);
  // 画面サイズ
  const width = window.innerWidth;
  const height = window.innerHeight;

  return renderer;
};
