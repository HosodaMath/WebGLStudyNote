import { GeometryParameter } from "./parameter";

/**
 *
 * @param row 分割数（縦）
 * @param column 分割数（横）
 * @param radius 半径
 * @param color 色のデータ
 * @returns
 */
export const sphere = (
  row: number,
  column: number,
  radius: number,
  color: number[]
) => {
  let i: number, j: number;
  const positionData: number[] = [],
    normalData: number[] = [],
    colorData: number[] = [],
    textureCoord: number[] = [],
    indicesData: number[] = [];
  for (i = 0; i <= row; i++) {
    const r = (Math.PI / row) * i;
    const ry = Math.cos(r);
    const rr = Math.sin(r);
    for (j = 0; j <= column; j++) {
      const tr = ((Math.PI * 2) / column) * j;
      const tx = rr * radius * Math.cos(tr);
      const ty = ry * radius;
      const tz = rr * radius * Math.sin(tr);
      const rx = rr * Math.cos(tr);
      const rz = rr * Math.sin(tr);
      positionData.push(tx, ty, tz);
      normalData.push(rx, ry, rz);
      colorData.push(color[0], color[1], color[2], color[3]);
      textureCoord.push(1 - (1 / column) * j, (1 / row) * i);
    }
  }
  for (i = 0; i < row; i++) {
    for (j = 0; j < column; j++) {
      let r = (column + 1) * i + j;
      indicesData.push(r, r + 1, r + column + 2);
      indicesData.push(r, r + column + 2, r + column + 1);
    }
  }

  const sphereData: GeometryParameter = {
    position: positionData,
    normal: normalData,
    color: colorData,
    textureCoord: textureCoord,
    indices: indicesData,
  };

  return sphereData;
};
