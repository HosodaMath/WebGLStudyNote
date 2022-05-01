import { vaoParameter, Plane } from "../webgl/webgl";

type createVaoParameter = {
  vaoData: vaoParameter;
  indices: number[];
};

export const createPlaneVao = (
  attributeLocationIndex: number[],
  commonAttributeSize: number[]
) => {
  const planeData = Plane.plane(1.0, 1.0, [1.0, 1.0, 0.5, 1.0]);
  const planeColor = planeData.color;
  const planeVertices = planeData.vertices;
  const planeNormal = planeData.normal;
  const planeTextureCoord = planeData.textureCoord;
  const planeIndices = planeData.indices;

  const planeVaoData: vaoParameter = {
    attributeLocationIndex: attributeLocationIndex,
    attributeSize: commonAttributeSize,
    verticesData: [planeColor, planeVertices, planeNormal, planeTextureCoord],
    indicesData: planeIndices,
  };

  const parameter: createVaoParameter = {
    vaoData: planeVaoData,
    indices: planeIndices,
  };

  return parameter;
};
