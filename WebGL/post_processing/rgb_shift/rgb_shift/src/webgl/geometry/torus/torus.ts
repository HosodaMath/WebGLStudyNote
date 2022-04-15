import { GeometryParameter } from "../../parameter/parameter";
export class Torus {
  /**
   *
   * @param row 輪の分割数
   * @param column パイプ断面の分割数
   * @param irad パイプ断面の半径
   * @param orad パイプ断面全体の半径
   * @param color カラー配列
   * @returns
   */
  static torus = (
    row: number,
    column: number,
    irad: number,
    orad: number,
    color: number[]
  ) => {
    let i: number, j: number;
    const positionData: number[] = [],
      normalData: number[] = [],
      colorData: number[] = [],
      textureCoord: number[] = [],
      indicesData: number[] = [];
    for (i = 0; i <= row; i++) {
      let r = ((Math.PI * 2) / row) * i;
      let rr = Math.cos(r);
      let ry = Math.sin(r);
      for (j = 0; j <= column; j++) {
        let tr = ((Math.PI * 2) / column) * j;
        let tx = (rr * irad + orad) * Math.cos(tr);
        let ty = ry * irad;
        let tz = (rr * irad + orad) * Math.sin(tr);
        let rx = rr * Math.cos(tr);
        let rz = rr * Math.sin(tr);
        let rs = (1 / column) * j;
        let rt = (1 / row) * i + 0.5;
        if (rt > 1.0) {
          rt -= 1.0;
        }
        rt = 1.0 - rt;
        positionData.push(tx, ty, tz);
        normalData.push(rx, ry, rz);
        colorData.push(color[0], color[1], color[2], color[3]);
        textureCoord.push(rs, rt);
      }
    }
    for (i = 0; i < row; i++) {
      for (j = 0; j < column; j++) {
        let r = (column + 1) * i + j;
        indicesData.push(r, r + column + 1, r + 1);
        indicesData.push(r + column + 1, r + column + 2, r + 1);
      }
    }

    const torusData: GeometryParameter = {
      vertices: positionData,
      normal: normalData,
      color: colorData,
      textureCoord: textureCoord,
      indices: indicesData,
    };

    return torusData;
  };
}
