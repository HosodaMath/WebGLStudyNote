export class Vector3 {
  static initArray = (len: number, maxValue: number = 1) => {
    return new Float32Array(len * maxValue);
  };
}
