import { GeometryParameter } from "../../parameter/parameter";
import { Calculator } from "../../../math/mathematics";
export class Circle {
  static circle1(radius: number, split: number, color: number[]) {
    const verticesData: number[] = [];
    const normalData: number[] = [];
    const colorData: number[] = [];
    const textureCoordData: number[] = [];
    const indicesData: number[] = [];

    verticesData.push(0.0, 0.0, 0.0);
    normalData.push(0.0, 0.0, 1.0);
    colorData.push(color[0], color[1], color[2], color[3]);
    textureCoordData.push(0.5, 0.5);
    let count = 0;
    [...Array(split).keys()].forEach((theta) => {
      const radian = (Calculator.radians(360) / split) * theta;
      const x = Math.cos(radian);
      const y = Math.sin(radian);
      verticesData.push(x * radius, y * radius, 0.0);
      normalData.push(0.0, 0.0, 1.0);
      colorData.push(color[0], color[1], color[2], color[3]);
      textureCoordData.push((x + 1.0) * 0.5, 1.0 - (y + 1.0) * 0.5);
      if (theta === split - 1.0) {
        indicesData.push(0.0, count + 1.0, 1.0);
      } else {
        indicesData.push(0.0, count + 1.0, count + 2.0);
      }
      count++;
    });

    const data: GeometryParameter = {
      vertices: verticesData,
      normal: normalData,
      color: colorData,
      textureCoord: textureCoordData,
      indices: indicesData,
    };

    return data;
  }

  static circle2(radius: number, split: number, color: number[]) {
    const verticesData: number[] = [];
    const normalData: number[] = [];
    const colorData: number[] = [];
    const textureCoordData: number[] = [];
    const indicesData: number[] = [];

    verticesData.push(0.0, 0.0, 0.0);
    normalData.push(0.0, 0.0, 1.0);
    colorData.push(color[0], color[1], color[2], color[3]);
    textureCoordData.push(0.5, 0.5);
    let count = 0;
    [...Array(split).keys()].forEach((theta) => {
      const radian = Calculator.radians((360 / split) * theta);
      const x = Math.cos(radian);
      const y = Math.sin(radian);
      const z = 0.0
      const u = (x + 1.0) * 0.5;
      const v = 1.0 - (y + 1.0) * 0.5;
      verticesData.push(x * radius, y * radius, z);
      normalData.push(0.0, 0.0, 1.0);
      colorData.push(color[0], color[1], color[2], color[3]);
      textureCoordData.push(u, v);
      if (theta === split - 1.0) {
        indicesData.push(0.0, count + 1.0, 1.0);
      } else {
        indicesData.push(0.0, count + 1.0, count + 2.0);
      }
      count++;
    });

    const data: GeometryParameter = {
      vertices: verticesData,
      normal: normalData,
      color: colorData,
      textureCoord: textureCoordData,
      indices: indicesData,
    };

    return data;
  }
}
