import { GeometryParameter } from "./parameter";
/**
 * @description planeデータの生成
 * @param width
 * @param height
 * @param color
 * @returns
 */
export const plane = (width: number, height: number, color: number[]) => {
  const w = width * 0.5;
  const h = height * 0.5;
  const positionData = [-w, h, 0.0, -w, -h, 0.0, w, -h, 0.0, w, h, 0.0];

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

  const indicesPlaneData = [0, 1, 2, 0, 2, 3];

  const planeData: GeometryParameter = {
    position: positionData,
    normal: normalData,
    color: colorData,
    textureCoord: textureCoord,
    indices: indicesPlaneData,
  };

  return planeData;
};
