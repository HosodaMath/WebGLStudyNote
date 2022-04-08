import { Sphere, vaoParameter } from "../webgl/webgl";

type createVaoParameter = {
  vaoData: vaoParameter;
  indices: number[];
};

export const createSphereVao = (
  attributeLocationIndex: number[],
  commonAttributeSize: number[]
) => {
  const sphereData = Sphere.sphere(128, 128, 0.5, [1.0, 1.0, 1.0, 1.0]);
  const sphereColor = sphereData.color;
  const sphereVertices = sphereData.vertices;
  const sphereNormal = sphereData.normal;
  const sphereTextureCoord = sphereData.textureCoord;
  const sphereIndices = sphereData.indices;

  const sphereVaoData: vaoParameter = {
    attributeLocationIndex: attributeLocationIndex,
    attributeSize: commonAttributeSize,
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
};
