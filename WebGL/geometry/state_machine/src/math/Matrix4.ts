import { Vector3 } from "./Vector3";
export class Matrix4 {
  /**
   *
   * @returns
   */
  static init() {
    return new Float32Array(16);
  }

  /**
   *
   * @param matrix
   * @returns
   */
  static identity(matrix: Float32Array) {
    let out = matrix;
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
  }

  /**
   *
   * @param matrixA
   * @param matrixB
   * @param matrix
   * @returns
   */
  static multiply(
    matrixA: Float32Array,
    matrixB: Float32Array,
    matrix: Float32Array
  ) {
    let out = matrix;
    let A11 = matrixA[0],
      A12 = matrixA[1],
      A13 = matrixA[2],
      A14 = matrixA[3],
      A21 = matrixA[4],
      A22 = matrixA[5],
      A23 = matrixA[6],
      A24 = matrixA[7],
      A31 = matrixA[8],
      A32 = matrixA[9],
      A33 = matrixA[10],
      A34 = matrixA[11],
      A41 = matrixA[12],
      A42 = matrixA[13],
      A43 = matrixA[14],
      A44 = matrixA[15],
      B11 = matrixB[0],
      B12 = matrixB[1],
      B13 = matrixB[2],
      B14 = matrixB[3],
      B21 = matrixB[4],
      B22 = matrixB[5],
      B23 = matrixB[6],
      B24 = matrixB[7],
      B31 = matrixB[8],
      B32 = matrixB[9],
      B33 = matrixB[10],
      B34 = matrixB[11],
      B41 = matrixB[12],
      B42 = matrixB[13],
      B43 = matrixB[14],
      B44 = matrixB[15];
    out[0] = B11 * A11 + B12 * A21 + B13 * A31 + B14 * A41;
    out[1] = B11 * A12 + B12 * A22 + B13 * A32 + B14 * A42;
    out[2] = B11 * A13 + B12 * A23 + B13 * A33 + B14 * A43;
    out[3] = B11 * A14 + B12 * A24 + B13 * A34 + B14 * A44;
    out[4] = B21 * A11 + B22 * A21 + B23 * A31 + B24 * A41;
    out[5] = B21 * A12 + B22 * A22 + B23 * A32 + B24 * A42;
    out[6] = B21 * A13 + B22 * A23 + B23 * A33 + B24 * A43;
    out[7] = B21 * A14 + B22 * A24 + B23 * A34 + B24 * A44;
    out[8] = B31 * A11 + B32 * A21 + B33 * A31 + B34 * A41;
    out[9] = B31 * A12 + B32 * A22 + B33 * A32 + B34 * A42;
    out[10] = B31 * A13 + B32 * A23 + B33 * A33 + B34 * A43;
    out[11] = B31 * A14 + B32 * A24 + B33 * A34 + B34 * A44;
    out[12] = B41 * A11 + B42 * A21 + B43 * A31 + B44 * A41;
    out[13] = B41 * A12 + B42 * A22 + B43 * A32 + B44 * A42;
    out[14] = B41 * A13 + B42 * A23 + B43 * A33 + B44 * A43;
    out[15] = B41 * A14 + B42 * A24 + B43 * A34 + B44 * A44;
    return out;
  }

  /**
   *
   * @param mat
   * @param vec
   * @param source
   * @returns
   */
  static translate(mat: Float32Array, vec: Float32Array, source: Float32Array) {
    let out = source;

    out[0] = mat[0];
    out[1] = mat[1];
    out[2] = mat[2];
    out[3] = mat[3];
    out[4] = mat[4];
    out[5] = mat[5];
    out[6] = mat[6];
    out[7] = mat[7];
    out[8] = mat[8];
    out[9] = mat[9];
    out[10] = mat[10];
    out[11] = mat[11];
    out[12] = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2] + mat[12];
    out[13] = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2] + mat[13];
    out[14] = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2] + mat[14];
    out[15] = mat[3] * vec[0] + mat[7] * vec[1] + mat[11] * vec[2] + mat[15];
    return out;
  }

  /**
   * 
   * @param fovy 
   * @param aspect 
   * @param near 
   * @param far 
   * @param matrix 
   * @returns 
   */
  static perspective(
    fovy: number,
    aspect: number,
    near: number,
    far: number,
    matrix: Float32Array
  ) {
    let out = matrix;
    let t = near * Math.tan((fovy * Math.PI) / 360);
    let r = t * aspect;
    let a = r * 2,
      b = t * 2,
      c = far - near;
    out[0] = (near * 2) / a;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) / b;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = -(far + near) / c;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = -(far * near * 2) / c;
    out[15] = 0;
    return out;
  }
}
