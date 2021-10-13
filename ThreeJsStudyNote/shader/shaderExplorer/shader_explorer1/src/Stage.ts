import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
interface RenderParameter {
  clearColor: number;
  width: number;
  height: number;
}

interface CameraParameter {
  fov: number;
  near: number;
  far: number;
  lookAt: THREE.Vector3;
  x: number;
  y: number;
  z: number;
}

export class Stage {
  private renderParameter: RenderParameter;
  private cameraParameter: CameraParameter;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private initlized: boolean;
  private orbitControls: OrbitControls;
  private isUtility: boolean;

  public scene: THREE.Scene;

  constructor() {
    this.renderParameter = {
      clearColor: 0x000000,
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.cameraParameter = {
      fov: 45,
      near: 0.1,
      far: 100,
      lookAt: new THREE.Vector3(0, 0, 0),
      x: 0,
      y: 0,
      z: 1.0,
    };

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.initlized = false;
    this.orbitControls = null;
    this.isUtility = false;
  }

  public initStage() {
    this.setScene();
    this.setRenderer();
    this.setCamera();
    this.setUtilityLibraly();
  }

  private setScene() {
    this.scene = new THREE.Scene();
  }

  private setRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(
      new THREE.Color(this.renderParameter.clearColor)
    );
    this.renderer.setSize(
      this.renderParameter.width,
      this.renderParameter.height
    );

    const canvas = document.querySelector(".canvas");
    if (!(canvas instanceof HTMLDivElement)) {
      throw new Error("Error");
    }

    canvas.appendChild(this.renderer.domElement);
  }

  private setCamera() {
    if (!this.initlized) {
      this.camera = new THREE.PerspectiveCamera(
        0,
        0,
        this.cameraParameter.near,
        this.cameraParameter.far
      );

      this.camera.position.set(
        this.cameraParameter.x,
        this.cameraParameter.y,
        this.cameraParameter.z
      );

      this.camera.lookAt(this.cameraParameter.lookAt);

      this.initlized = true;
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    this.camera.aspect = windowWidth / windowHeight;
    this.camera.fov = this.cameraParameter.fov;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(windowWidth, windowHeight);
  }

  private setUtilityLibraly() {
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    this.orbitControls.enableDamping = true;

    this.isUtility = true;
  }

  private initRender(){
    this.renderer.render(this.scene, this.camera);
    if(this.isUtility){
      this.orbitControls.update();
    }
  }

  public useResize(){
    this.setCamera();
  }

  public useAnimation(){
    this.initRender();
  }
}
