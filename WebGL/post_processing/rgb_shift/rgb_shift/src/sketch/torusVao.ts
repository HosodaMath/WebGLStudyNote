import { Torus, vaoParameter } from "../webgl/webgl";

type createVaoParameter = {
  vaoData: vaoParameter;
  indices: number[];
};

export const createTorusVao = (
  attributeLocationIndex: number[],
  commonAttributeSize: number[]
) => {
  const torusData = Torus.torus(64, 64, 0.2, 1.5, [1.0, 1.0, 1.0, 1.0]);
  const torusColor = torusData.color;
  const torusVertices = torusData.vertices;
  const torusNormal = torusData.normal;
  const torusTexCoord = torusData.textureCoord;
  const torusIndices = torusData.indices;

  const torusVaoData: vaoParameter = {
    attributeLocationIndex: attributeLocationIndex,
    attributeSize: commonAttributeSize,
    verticesData: [torusColor, torusVertices, torusNormal, torusTexCoord],
    indicesData: torusIndices,
  };

  const parameter: createVaoParameter = {
    vaoData: torusVaoData,
    indices: torusIndices,
  };

  return parameter;
};
