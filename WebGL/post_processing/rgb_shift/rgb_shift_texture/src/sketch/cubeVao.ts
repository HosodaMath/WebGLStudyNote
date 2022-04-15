import { Cube, vaoParameter } from "../webgl/webgl";

type createVaoParameter = {
  vaoData: vaoParameter;
  indices: number[];
};

export const createCubeVao = (
  attributeLocationIndex: number[],
  commonAttributeSize: number[]
) => {
  const cubeData = Cube.cube(1.0, [1.0, 1.0, 0.5, 1.0]);
  const cubeColor = cubeData.color;
  const cubeVertices = cubeData.vertices;
  const cubeNormal = cubeData.normal;
  const cubeTextureCoord = cubeData.textureCoord;
  const cubeIndices = cubeData.indices;

  const cubeVaoData: vaoParameter = {
    attributeLocationIndex: attributeLocationIndex,
    attributeSize: commonAttributeSize,
    verticesData: [
      cubeColor,
      cubeVertices,
      cubeNormal,
      cubeTextureCoord,
    ],
    indicesData: cubeIndices,
  };

  const parameter: createVaoParameter = {
    vaoData: cubeVaoData,
    indices: cubeIndices,
  };

  return parameter;
};
