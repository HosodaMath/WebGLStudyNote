import * as THREE from "three";
import * as Stage from "./Stage";
import VertexShader from "./shader/color/test.vert";
import FragmentShader from "./shader/color/test.frag";
export class Sphere {
  private stage: Stage.Stage;
  private sphereMesh: THREE.Mesh;
  private uniforms: {
    uTime: {
      value: number;
    };
  };
  constructor(stage: Stage.Stage) {
    this.stage = stage;
    this.sphereMesh = null;
    this.uniforms = { uTime: { value: 1.0 } };
  }

  public drawSphere() {
    this.setMesh();
  }

  private setMesh() {
    const sphereGeometry = new THREE.SphereBufferGeometry(0.2, 32, 32);
    const sphereMaterial = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: VertexShader,
      fragmentShader: FragmentShader,
    });
    this.sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.sphereMesh.position.set(-0.5, 0, 0);
    this.stage.scene.add(this.sphereMesh);
  }

  private initRender() {
    //
  }

  public useResize() {
    //
  }

  public useAnimation(uTime: number) {
    this.initRender();
    this.uniforms["uTime"].value = uTime * 0.01;
  }
}
