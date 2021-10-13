import * as THREE from "three";
import * as Stage from "./Stage";
import VertexShader from "./shader/color/color.vert";
import FragmentShader from "./shader/color/color.frag";
export class Box {
  private stage: Stage.Stage;
  private boxMesh: THREE.Mesh;
  private uniforms: {
    uResolution: {
      value: THREE.Vector2;
    };
    uTime: {
      value: number;
    };
  };
  constructor(stage: Stage.Stage) {
    this.stage = stage;
    this.boxMesh = null;
    this.uniforms = {
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uTime: { value: 1.0 },
    };
  }

  drawBox() {
    this.setMesh();
  }

  private setMesh() {
    const sphereGeometry = new THREE.BoxBufferGeometry(
      0.5,
      0.5,
      0.01,
      32,
      32,
      32
    );

    const boxMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: VertexShader,
      fragmentShader: FragmentShader,
    });
    this.boxMesh = new THREE.Mesh(sphereGeometry, boxMaterial);
    this.boxMesh.position.set(0.0, 0, 0);
    this.stage.scene.add(this.boxMesh);
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
