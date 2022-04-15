import { Torus, Sphere, vaoParameter } from "../webgl/webgl";

type createVaoParameter = {
  vaoData: vaoParameter;
  indices: number[];
};

export class GeometryVao {
  private attributeLocationIndex: number[];
  private commonAttributeSize: number[];
  constructor(attributeLocationIndex: number[], commonAttributeSize: number[]) {
    this.attributeLocationIndex = attributeLocationIndex;
    this.commonAttributeSize = commonAttributeSize;
  }

  torusVao() {
    const torusData = Torus.torus(64, 64, 0.2, 1.5, [1.0, 1.0, 1.0, 1.0]);
    const torusColor = torusData.color;
    const torusVertices = torusData.vertices;
    const torusNormal = torusData.normal;
    const torusTexCoord = torusData.textureCoord;
    const torusIndices = torusData.indices;

    const torusVaoData: vaoParameter = {
      attributeLocationIndex: this.attributeLocationIndex,
      attributeSize: this.commonAttributeSize,
      verticesData: [torusColor, torusVertices, torusNormal, torusTexCoord],
      indicesData: torusIndices,
    };

    const parameter: createVaoParameter = {
      vaoData: torusVaoData,
      indices: torusIndices,
    };

    return parameter;
  }

  sphereVao() {
    const sphereData = Sphere.sphere(64, 64, 1.0, [1.0, 1.0, 1.0, 1.0]);
    const sphereColor = sphereData.color;
    const sphereVertices = sphereData.vertices;
    const sphereNormal = sphereData.normal;
    const sphereTextureCoord = sphereData.textureCoord;
    const sphereIndices = sphereData.indices;

    const sphereVaoData: vaoParameter = {
      attributeLocationIndex: this.attributeLocationIndex,
      attributeSize: this.commonAttributeSize,
      verticesData: [
        sphereColor,
        sphereVertices,
        sphereNormal,
        sphereTextureCoord,
      ],
      indicesData: sphereIndices,
    };

    const parameter: createVaoParameter = {
      vaoData: sphereVaoData,
      indices: sphereIndices,
    };

    return parameter;
  }
}
