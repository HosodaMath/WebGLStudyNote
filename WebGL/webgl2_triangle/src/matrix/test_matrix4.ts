import { Vector3 } from "./vector3";
import { Matrix4 } from "./matrix4";
/**
 * @class
 * @description 4x4行列のテストクラスメソッドは全て静的メソッド
 */
export class TestMatrix4 {
  /**
   * @static
   * @description ゼロ行列の生成
   * Test1 デフォルトコンストラクタでZero行列を出力
   * Test2 コンストラクタを単位行列で初期化してゼロ行列に変換をおこない出力
   */
  static testZero() {
    const matrix1 = new Matrix4();
    console.log(matrix1.zero());
    const init_matrix = new Matrix4();
    const identity = init_matrix.identity();
    console.log(identity);
    const matrix2 = new Matrix4(identity);
    console.log(matrix2.zero());
  }

  /**
   * @static
   * @description 4x4行列の作成
   */
  static testCreate() {
    const initMatrix = new Matrix4();
    const newMatrix = initMatrix.create(
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    );
    console.log(newMatrix);
  }

  /**
   * @static
   * @description 行列の相等
   */
  static testEqual() {
    const initMatrix1_1 = new Matrix4();
    const initMatrix1_2 = new Matrix4();
    const zeroMatrix1_1 = initMatrix1_1.zero();
    const zeroMatrix1_2 = initMatrix1_2.zero();

    console.log(zeroMatrix1_1);
    console.log(zeroMatrix1_2);
    const matrix1 = new Matrix4(zeroMatrix1_1);
    console.log(matrix1.equal(zeroMatrix1_2));

    const initMatrix2_1 = new Matrix4();
    const newMatrix2_1 = initMatrix2_1.create(
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    );

    const initMatrix2_2 = new Matrix4();
    const newMatrix2_2 = initMatrix2_2.create(
      1,
      2,
      3,
      4,
      5,
      6,
      0,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    );
    const matrix2 = new Matrix4(newMatrix2_1);
    console.log(newMatrix2_1);
    console.log(newMatrix2_2);
    console.log(matrix2.equal(newMatrix2_2));
  }

  /**
   * @static
   * @description 4x4単位行列の作成
   */
  static testIdentity() {
    const matrix = new Matrix4();
    console.log(matrix.identity());
  }

  /**
   * オリジナルglMatrixとMDNのWebGLコードで確認
   * @static
   * @description 4x4変換行列(平行移動)
   * オリジナルの結果
   * true
   * [
   *  1, 0,  0, 0,
   *  0, 1,  0, 0,
   *  0, 0,  1, 0,
   *  0, 0, -6, 1
   * ]
   * 実際の結果
   * [
   *  1, 0,  0, 0,
   *  0, 1,  0, 0,
   *  0, 0,  1, 0,
   *  0, 0, -6, 1
   * ]
   */
  static testTranslate = () => {
    const matrix = new Matrix4();
    const modelViewMatrix = matrix.identity();
    const translate = new Matrix4(modelViewMatrix);
    const vector = new Vector3(-0.0, 0.0, -6.0);
    console.log(translate.translate(modelViewMatrix, vector));
  };

  /**
   * @static
   * @description
   * オリジナルの結果
   * [
   *  2.4142136573791504, 0, 0, 0,
   *  0, 2.4142136573791504, 0, 0,
   *  0, 0, -1.0020020008087158, -1,
   *  0, 0, -0.20020020008087158, 0
   * ]
   * 実際の結果
   * [
   *  2.4142136573791504, 0, 0, 0,
   *  0, 2.4142136573791504, 0, 0,
   *  0, 0, -1.0020020008087158, -1,
   *  0, 0, -0.20020020008087158, 0
   * ]
   */
  static testPersective = () => {
    const fieldOfView = (45 * Math.PI) / 180;
    const aspect = 512 / 512; // gl.canvas.width / gl.canvas.height
    const near = 0.1;
    const far = 100.0;
    const matrix = new Matrix4();
    const projectionMatrix = matrix.identity();
    const persective = new Matrix4(projectionMatrix);
    console.log(persective.persective(fieldOfView, aspect, near, far));
  };
}

/**
  const basicTest = () => {
  console.log("Basic Matrix Test");
  Test.TestMatrix4.testZero();
  Test.TestMatrix4.testCreate();
  Test.TestMatrix4.testEqual();
  Test.TestMatrix4.testIdentity();
};

const transformationTest = () => {
  console.log("Transformation Test");
  Test.TestMatrix4.testTranslate();
};

const cameraTest = () => {
  console.log("Camera Test");
  Test.TestMatrix4.testPersective();
};

 * 
 * 
 */
