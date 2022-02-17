import { GeometryParameter } from "./geometryParameter";
export const plane = (w: number, h: number, color: number[]) => {
  const verticesData = [-w, h, 0.0, -w, -h, 0.0, w, -h, 0.0, w, h, 0.0];

  const normalData = [
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
  ];

  const colorData = [
    color[0],
    color[1],
    color[2],
    color[3],
    color[0],
    color[1],
    color[2],
    color[3],
    color[0],
    color[1],
    color[2],
    color[3],
    color[0],
    color[1],
    color[2],
    color[3],
  ];

  const textureCoord = [1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0];

  const indicesData = [0, 1, 2, 0, 2, 3];

  const data: GeometryParameter = {
    verticesData: verticesData,
    normalData: normalData,
    colorData: colorData,
    textureCoord: textureCoord,
    indicesData: indicesData,
  };

  return data;
};

export const planeColor = (w: number, h: number) => {
  const verticesData = [-w, h, 0.0, -w, -h, 0.0, w, -h, 0.0, w, h, 0.0];

  const normalData = [
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
  ];

  const colorData = [
    1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,
    1.0,
  ];

  const textureCoord = [1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0];

  const indicesData = [0, 1, 2, 0, 2, 3];

  const data: GeometryParameter = {
    verticesData: verticesData,
    normalData: normalData,
    colorData: colorData,
    textureCoord: textureCoord,
    indicesData: indicesData,
  };

  return data;
};
