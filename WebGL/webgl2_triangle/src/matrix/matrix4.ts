import { Vector3 } from "./vector3";
/**
 * @description convert TypeScript by glMatrix
 * @todo オリジナルに置き換える
 * @todo コメントを英語に翻訳する
 */
export class Matrix4 {
  public matrix1: Float32Array;
  /**
   * @constructor Matrix4
   * @description 4x4行列を初期化 成分は16個必要
   * @param matrix matrix1の初期化値
   * @example
   * const matrix1 = new Matrix4();
   *
   * const init_matrix = new Matrix4();
   * const identity = init_matrix.identity();
   * const matrix2 = new Matrix4(identity);
   */
  constructor(matrix = new Float32Array(16)) {
    this.matrix1 = matrix;
  }

  /**
   * 初期化用単位行列の作成
   * @method Matrix4
   * @description 4x4のクラス内部初期化用単位行列を作成
   * @returns this.matrix1 -> -> 16個の型付き配列を生成
   */
  private init = () => {
    this.matrix1[0] = 1;
    this.matrix1[5] = 1;
    this.matrix1[10] = 1;
    this.matrix1[15] = 1;

    return this.matrix1;
  };

  /**
   * 4x4行列の作成
   * @method Matrix4
   * @description 新しい4x4行列の作成
   * @param a11 Component1 of matrix
   * @param a12 Component2 of matrix
   * @param a13 Component3 of matrix
   * @param a14 Component4 of matrix
   * @param a21 Component5 of matrix
   * @param a22 Component6 of matrix
   * @param a23 Component7 of matrix
   * @param a24 Component8 of matrix
   * @param a31 Component9 of matrix
   * @param a32 Component10 of matrix
   * @param a33 Component11 of matrix
   * @param a34 Component12 of matrix
   * @param a41 Component13 of matrix
   * @param a42 Component14 of matrix
   * @param a43 Component15 of matrix
   * @param a44 Component16 of matrix
   * @returns this.matrix1 -> 16個の型付き配列を生成
   * @example
   * const initMatrix = new Matrix4();
   * const newMatrix = matrix.create(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
   * console.log(newMatrix);
   */
  create = (
    a11: number,
    a12: number,
    a13: number,
    a14: number,
    a21: number,
    a22: number,
    a23: number,
    a24: number,
    a31: number,
    a32: number,
    a33: number,
    a34: number,
    a41: number,
    a42: number,
    a43: number,
    a44: number
  ) => {
    this.matrix1[0] = a11;
    this.matrix1[1] = a12;
    this.matrix1[2] = a13;
    this.matrix1[3] = a14;
    this.matrix1[4] = a21;
    this.matrix1[5] = a22;
    this.matrix1[6] = a23;
    this.matrix1[7] = a24;
    this.matrix1[8] = a31;
    this.matrix1[9] = a32;
    this.matrix1[10] = a33;
    this.matrix1[11] = a34;
    this.matrix1[12] = a41;
    this.matrix1[13] = a42;
    this.matrix1[14] = a43;
    this.matrix1[15] = a44;

    return this.matrix1;
  };

  /**
   * 行列の相等
   * @method Matrix4
   * @description 行列の成分がすべて等しいかブーリアンで値を返す
   * @param matrix2 第2行列
   * @returns flag -> true or false
   * @example
   * const initMatrix1 = new Matrix4();
   * const newMatrix1 = matrix.create(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
   * const initMatrix2 = new Matrix4();
   * const newMatrix2 = matrix.create(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
   * const matrix2 = new Matrix4(newMatrix1);
   * matrix2.equal(newMatrix2_2)
   */
  equal = (matrix2: Float32Array) => {
    let flag = false;
    let sum = 0;
    if (this.matrix1.length === matrix2.length) {
      [...Array(this.matrix1.length).keys()].forEach((count) => {
        if (this.matrix1[count] === matrix2[count]) {
          sum += 1;
          console.log(sum);
        }
      });
    } else {
      throw new Error("Error matrix1とmatrix2の長さが等しくありません");
    }

    if (sum === 16) {
      flag = true;
      return flag;
    }

    return flag;
  };

  /**
   * ゼロ行列の作成
   * @method Matrix4
   * @description 4x4のゼロ行列を生成
   * @returns this.matrix -> 成分がすべて0かつ16個の型付き配列を生成
   * @example
   * const matrix1 = new Matrix4();
   * matrix1.zero()
   */
  zero = () => {
    // すべて値をゼロで満たす
    [...Array(this.matrix1.length).keys()].forEach((count) => {
      this.matrix1[count] = 0;
    });

    return this.matrix1;
  };

  /**
   * 単位行列の作成
   * @description 4x4の単位行列を生成
   * @returns this.matrix -> 16個の型付き配列を生成
   * @example
   * const matrix = new Matrix4();
   * matrix.identity()
   */
  identity = () => {
    return this.init();
  };

  /**
   * 変換行列(平行移動)
   * @description 変換行列(平行移動)
   * @param matrix2 第2行列
   * @param vector 3次元ベクトル
   * @returns this.matrix -> 16個の型付き配列を生成
   * @example
   * const matrix = new Matrix4();
   * const modelViewMatrix = matrix.identity();
   * const translate = new Matrix4(modelViewMatrix);
   * const vector = new Vector3(-0.0, 0.0, -6.0);
   * translate.translate(modelViewMatrix, vector);
   */
  translate = (matrix2: Float32Array, vector: Vector3) => {
    const x = vector.x;
    const y = vector.y;
    const z = vector.z;
    this.matrix1 = this.init();
    let a00 = 0,
      a01 = 0,
      a02 = 0,
      a03 = 0;
    let a10 = 0,
      a11 = 0,
      a12 = 0,
      a13 = 0;
    let a20 = 0,
      a21 = 0,
      a22 = 0,
      a23 = 0;
    console.log(matrix2 === this.matrix1);
    if (matrix2 === this.matrix1) {
      this.matrix1[12] =
        matrix2[0] * x + matrix2[4] * y + matrix2[8] * z + matrix2[12];
      this.matrix1[13] =
        matrix2[1] * x + matrix2[5] * y + matrix2[9] * z + matrix2[13];
      this.matrix1[14] =
        matrix2[2] * x + matrix2[6] * y + matrix2[10] * z + matrix2[14];
      this.matrix1[15] =
        matrix2[3] * x + matrix2[7] * y + matrix2[11] * z + matrix2[15];
    } else {
      a00 = matrix2[0];
      a01 = matrix2[1];
      a02 = matrix2[2];
      a03 = matrix2[3];
      a10 = matrix2[4];
      a11 = matrix2[5];
      a12 = matrix2[6];
      a13 = matrix2[7];
      a20 = matrix2[8];
      a21 = matrix2[9];
      a22 = matrix2[10];
      a23 = matrix2[11];

      this.matrix1[0] = a00;
      this.matrix1[1] = a01;
      this.matrix1[2] = a02;
      this.matrix1[3] = a03;
      this.matrix1[4] = a10;
      this.matrix1[5] = a11;
      this.matrix1[6] = a12;
      this.matrix1[7] = a13;
      this.matrix1[8] = a20;
      this.matrix1[9] = a21;
      this.matrix1[10] = a22;
      this.matrix1[11] = a23;

      this.matrix1[12] = a00 * x + a10 * y + a20 * z + matrix2[12];
      this.matrix1[13] = a01 * x + a11 * y + a21 * z + matrix2[13];
      this.matrix1[14] = a02 * x + a12 * y + a22 * z + matrix2[14];
      this.matrix1[15] = a03 * x + a13 * y + a23 * z + matrix2[15];
    }

    return this.matrix1;
  };

  /**
   * パースペクティブ射影変換行列
   * @description 4x4のパースペクティブ射影変換行列を生成
   * @param fovy
   * @param aspect
   * @param near
   * @returns this.matrix -> 16個の型付き配列を生成
   * @example
   * const fieldOfView = (45 * Math.PI) / 180;
   * const aspect = 512 / 512; // gl.canvas.width / gl.canvas.height
   * const near = 0.1;
   * const far = 100.0;
   * const matrix = new Matrix4();
   * const projectionMatrix = matrix.identity();
   * const persective = new Matrix4(projectionMatrix);
   * persective.persective(fieldOfView, aspect, near, far);
   */
  persective = (fovy: number, aspect: number, near: number, far: number) => {
    this.matrix1 = this.init();

    const f = 1.0 / Math.tan(fovy / 2);
    this.matrix1[0] = f / aspect;
    this.matrix1[1] = 0;
    this.matrix1[2] = 0;
    this.matrix1[3] = 0;
    this.matrix1[4] = 0;
    this.matrix1[5] = f;
    this.matrix1[6] = 0;
    this.matrix1[7] = 0;
    this.matrix1[8] = 0;
    this.matrix1[9] = 0;
    this.matrix1[11] = -1;
    this.matrix1[12] = 0;
    this.matrix1[13] = 0;
    this.matrix1[15] = 0;
    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      this.matrix1[10] = (far + near) * nf;
      this.matrix1[14] = 2 * far * near * nf;
    } else {
      this.matrix1[10] = -1;
      this.matrix1[14] = -2 * near;
    }
    return this.matrix1;
  };
}
