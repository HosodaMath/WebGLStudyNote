/**
 * @class Vector3
 * @exports Vector3
 * @description
 * @version 0.0.1
 * @license MIT
 * @author ShingoHosoda
 * @copyright ShingoHosoda
 * 
 */
 export class Vector3 {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;
  /**
   * @constructor Vector3
   * @param x
   * @param y
   * @param z
   * @example 
   * const vector = new Vector3(x, y, z);
   */
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * @method Vector3
   * @param x x component of the vector
   * @param y y component of the vector
   * @param z z component of the vector
   * @returns this
   * @example 
   * const vector = newVector3(x, y, z);
   * vector.set(x, y, z)
   */
  set = (x: number, y: number, z: number) => {
    this.x = x;
    this.y = y;
    this.z = z;

    return this;
  };

  /**
   * @method Vector3
   * @returns cloneVector
   * @example
   * const vector = new Vector3(x, y, z);
   * let clone_vector = new Vector3(0, 0, 0);
   * clone_vector = vector.clone();
   */
  clone = () => {
    const cloneVector = new Vector3(this.x, this.y, this.z);
    return cloneVector
  };

  /**
   * @method Vector3
   * @param vector 
   * @returns copyVector
   * @example
   * const vector = new Vector3(x, y, z);
   * const copy_vector = new Vector3(10, 50 ,100);
   * const new_vector = vector.copy(copy_vector);
   */
  copy = (vector: Vector3) => {
    this.x = vector.x;
    this.y = vector.y;
    this.z = vector.z;
    const copyVector = new Vector3(this.x, this.y, this.z);
    return copyVector;
  };

  /**
   * @method Vector3
   * @param vector
   * @returns new Vector3(this.x, this.y, this.z);
   * @example
   * const Vector1 = new Vector3(90, 50, 0);
   * const Vector2 = new Vector3(10, 50, 100);
   * vector1.add(vector2);
   */
  add = (vector: Vector3) => {
    this.x = this.x + vector.x;
    this.y = this.y + vector.y;
    this.z = this.z + vector.z;

    return new Vector3(this.x, this.y, this.z);
  };

  /**
   * @method Vector3
   * @param vector
   * @returns new Vector3(this.x, this.y, this.z);
   * @example
   * const Vector1 = new Vector3(10, 50, 0);
   * const Vector2 = new Vector3(110, 150, 100);
   * vector1.sub(vector2)
   */
  sub = (vector: Vector3) => {
    this.x = this.x - vector.x;
    this.y = this.y - vector.y;
    this.z = this.z - vector.z;

    return new Vector3(this.x, this.y, this.z);
  };

  /**
   * @method Vector3
   * @param value
   * @returns  new Vector3(this.x, this.y, this.z);
   * @example
   * const vector = new Vector3(50, 100, 150);
   * const scalar_value = 2;
   * vector.multi(scalar_value);
   */
  multi = (value: number) => {
    this.x = this.x * value;
    this.y = this.y * value;
    this.z = this.z * value;

    return new Vector3(this.x, this.y, this.z);
  };

  /**
   * @method Vector3
   * @param value
   * @returns  new Vector3(this.x, this.y, this.z);
   * @example
   * 
   */
  div = (value: number) => {
    this.x = this.x / value;
    this.y = this.y / value;
    this.z = this.z / value;

    return new Vector3(this.x, this.y, this.z);
  };
}


