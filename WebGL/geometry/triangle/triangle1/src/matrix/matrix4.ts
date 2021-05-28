/**
 * @description Base minMatrix.js
 * @Copyright minMatrix.js doxas
 * @license
 * @author ShingoHosoda
 */
import { Vector3 } from "./vector3";

/**
 * @description create()
 * @returns
 */
export const create = () => {
  return new Float32Array(16);
};

export const identity = (dest: Float32Array) => {
  dest[0] = 1;
  dest[1] = 0;
  dest[2] = 0;
  dest[3] = 0;
  dest[4] = 0;
  dest[5] = 1;
  dest[6] = 0;
  dest[7] = 0;
  dest[8] = 0;
  dest[9] = 0;
  dest[10] = 1;
  dest[11] = 0;
  dest[12] = 0;
  dest[13] = 0;
  dest[14] = 0;
  dest[15] = 1;
  return dest;
};

export const multiply = (
  matrixA: Float32Array,
  matrixB: Float32Array,
  dest: Float32Array
) => {
  let a = matrixA[0],
    b = matrixA[1],
    c = matrixA[2],
    d = matrixA[3],
    e = matrixA[4],
    f = matrixA[5],
    g = matrixA[6],
    h = matrixA[7],
    i = matrixA[8],
    j = matrixA[9],
    k = matrixA[10],
    l = matrixA[11],
    m = matrixA[12],
    n = matrixA[13],
    o = matrixA[14],
    p = matrixA[15],
    A = matrixB[0],
    B = matrixB[1],
    C = matrixB[2],
    D = matrixB[3],
    E = matrixB[4],
    F = matrixB[5],
    G = matrixB[6],
    H = matrixB[7],
    I = matrixB[8],
    J = matrixB[9],
    K = matrixB[10],
    L = matrixB[11],
    M = matrixB[12],
    N = matrixB[13],
    O = matrixB[14],
    P = matrixB[15];
  dest[0] = A * a + B * e + C * i + D * m;
  dest[1] = A * b + B * f + C * j + D * n;
  dest[2] = A * c + B * g + C * k + D * o;
  dest[3] = A * d + B * h + C * l + D * p;
  dest[4] = E * a + F * e + G * i + H * m;
  dest[5] = E * b + F * f + G * j + H * n;
  dest[6] = E * c + F * g + G * k + H * o;
  dest[7] = E * d + F * h + G * l + H * p;
  dest[8] = I * a + J * e + K * i + L * m;
  dest[9] = I * b + J * f + K * j + L * n;
  dest[10] = I * c + J * g + K * k + L * o;
  dest[11] = I * d + J * h + K * l + L * p;
  dest[12] = M * a + N * e + O * i + P * m;
  dest[13] = M * b + N * f + O * j + P * n;
  dest[14] = M * c + N * g + O * k + P * o;
  dest[15] = M * d + N * h + O * l + P * p;
  return dest;
};

export const scale = (
  matrixA: Float32Array,
  vector: Vector3,
  dest: Float32Array
) => {
  dest[0] = matrixA[0] * vector.x;
  dest[1] = matrixA[1] * vector.x;
  dest[2] = matrixA[2] * vector.x;
  dest[3] = matrixA[3] * vector.x;
  dest[4] = matrixA[4] * vector.y;
  dest[5] = matrixA[5] * vector.y;
  dest[6] = matrixA[6] * vector.y;
  dest[7] = matrixA[7] * vector.y;
  dest[8] = matrixA[8] * vector.z;
  dest[9] = matrixA[9] * vector.z;
  dest[10] = matrixA[10] * vector.z;
  dest[11] = matrixA[11] * vector.z;
  dest[12] = matrixA[12];
  dest[13] = matrixA[13];
  dest[14] = matrixA[14];
  dest[15] = matrixA[15];
  return dest;
};

export const translate = (
  matrix: Float32Array,
  vector: Vector3,
  dest: Float32Array
) => {
  dest[0] = matrix[0];
  dest[1] = matrix[1];
  dest[2] = matrix[2];
  dest[3] = matrix[3];
  dest[4] = matrix[4];
  dest[5] = matrix[5];
  dest[6] = matrix[6];
  dest[7] = matrix[7];
  dest[8] = matrix[8];
  dest[9] = matrix[9];
  dest[10] = matrix[10];
  dest[11] = matrix[11];
  dest[12] =
    matrix[0] * vector.x +
    matrix[4] * vector.y +
    matrix[8] * vector.z +
    matrix[12];
  dest[13] =
    matrix[1] * vector.x +
    matrix[5] * vector.y +
    matrix[9] * vector.z +
    matrix[13];
  dest[14] =
    matrix[2] * vector.x +
    matrix[6] * vector.y +
    matrix[10] * vector.z +
    matrix[14];
  dest[15] =
    matrix[3] * vector.x +
    matrix[7] * vector.y +
    matrix[11] * vector.z +
    matrix[15];
  return dest;
};

export const rotate = (
  mat: Float32Array,
  angle: number,
  axis: Vector3,
  dest: Float32Array
) => {
  let sq = Math.sqrt(axis.x * axis.x + axis.y * axis.y + axis.z * axis.z);
  if (!sq) {
    return null;
  }
  let a = axis.x,
    b = axis.y,
    c = axis.z;
  if (sq != 1) {
    sq = 1 / sq;
    a *= sq;
    b *= sq;
    c *= sq;
  }
  let d = Math.sin(angle),
    e = Math.cos(angle),
    f = 1 - e,
    g = mat[0],
    h = mat[1],
    i = mat[2],
    j = mat[3],
    k = mat[4],
    l = mat[5],
    m = mat[6],
    n = mat[7],
    o = mat[8],
    p = mat[9],
    q = mat[10],
    r = mat[11],
    s = a * a * f + e,
    t = b * a * f + c * d,
    u = c * a * f - b * d,
    v = a * b * f - c * d,
    w = b * b * f + e,
    x = c * b * f + a * d,
    y = a * c * f + b * d,
    z = b * c * f - a * d,
    A = c * c * f + e;
  if (angle) {
    if (mat != dest) {
      dest[12] = mat[12];
      dest[13] = mat[13];
      dest[14] = mat[14];
      dest[15] = mat[15];
    }
  } else {
    dest = mat;
  }
  dest[0] = g * s + k * t + o * u;
  dest[1] = h * s + l * t + p * u;
  dest[2] = i * s + m * t + q * u;
  dest[3] = j * s + n * t + r * u;
  dest[4] = g * v + k * w + o * x;
  dest[5] = h * v + l * w + p * x;
  dest[6] = i * v + m * w + q * x;
  dest[7] = j * v + n * w + r * x;
  dest[8] = g * y + k * z + o * A;
  dest[9] = h * y + l * z + p * A;
  dest[10] = i * y + m * z + q * A;
  dest[11] = j * y + n * z + r * A;
  return dest;
};

export const lookAt = (
  eye: Vector3,
  center: Vector3,
  up: Vector3,
  dest: Float32Array
) => {
  let eyeX = eye.x,
    eyeY = eye.y,
    eyeZ = eye.z,
    upX = up.x,
    upY = up.y,
    upZ = up.z,
    centerX = center.x,
    centerY = center.y,
    centerZ = center.z;
  if (eyeX == centerX && eyeY == centerY && eyeZ == centerZ) {
    return identity(dest);
  }

  let x0, x1, x2, y0, y1, y2, z0, z1, z2, l;
  z0 = eyeX - center.x;
  z1 = eyeY - center.y;
  z2 = eyeZ - center.z;
  l = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  z0 *= l;
  z1 *= l;
  z2 *= l;
  x0 = upY * z2 - upZ * z1;
  x1 = upZ * z0 - upX * z2;
  x2 = upX * z1 - upY * z0;
  l = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
  if (!l) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    l = 1 / l;
    x0 *= l;
    x1 *= l;
    x2 *= l;
  }
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  l = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
  if (!l) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    l = 1 / l;
    y0 *= l;
    y1 *= l;
    y2 *= l;
  }
  dest[0] = x0;
  dest[1] = y0;
  dest[2] = z0;
  dest[3] = 0;
  dest[4] = x1;
  dest[5] = y1;
  dest[6] = z1;
  dest[7] = 0;
  dest[8] = x2;
  dest[9] = y2;
  dest[10] = z2;
  dest[11] = 0;
  dest[12] = -(x0 * eyeX + x1 * eyeY + x2 * eyeZ);
  dest[13] = -(y0 * eyeX + y1 * eyeY + y2 * eyeZ);
  dest[14] = -(z0 * eyeX + z1 * eyeY + z2 * eyeZ);
  dest[15] = 1;
  return dest;
};

export const perspective = (
  fovy: number,
  aspect: number,
  near: number,
  far: number,
  dest: Float32Array
) => {
  let t = near * Math.tan((fovy * Math.PI) / 360);
  let r = t * aspect;
  let a = r * 2,
    b = t * 2,
    c = far - near;
  dest[0] = (near * 2) / a;
  dest[1] = 0;
  dest[2] = 0;
  dest[3] = 0;
  dest[4] = 0;
  dest[5] = (near * 2) / b;
  dest[6] = 0;
  dest[7] = 0;
  dest[8] = 0;
  dest[9] = 0;
  dest[10] = -(far + near) / c;
  dest[11] = -1;
  dest[12] = 0;
  dest[13] = 0;
  dest[14] = -(far * near * 2) / c;
  dest[15] = 0;
  return dest;
};

export const transpose = (matrix: Float32Array, dest: Float32Array) => {
  dest[0] = matrix[0];
  dest[1] = matrix[4];
  dest[2] = matrix[8];
  dest[3] = matrix[12];
  dest[4] = matrix[1];
  dest[5] = matrix[5];
  dest[6] = matrix[9];
  dest[7] = matrix[13];
  dest[8] = matrix[2];
  dest[9] = matrix[6];
  dest[10] = matrix[10];
  dest[11] = matrix[14];
  dest[12] = matrix[3];
  dest[13] = matrix[7];
  dest[14] = matrix[11];
  dest[15] = matrix[15];
  return dest;
};

export const inverse = (matrix: Float32Array, dest: Float32Array) => {
  let a = matrix[0],
    b = matrix[1],
    c = matrix[2],
    d = matrix[3],
    e = matrix[4],
    f = matrix[5],
    g = matrix[6],
    h = matrix[7],
    i = matrix[8],
    j = matrix[9],
    k = matrix[10],
    l = matrix[11],
    m = matrix[12],
    n = matrix[13],
    o = matrix[14],
    p = matrix[15],
    q = a * f - b * e,
    r = a * g - c * e,
    s = a * h - d * e,
    t = b * g - c * f,
    u = b * h - d * f,
    v = c * h - d * g,
    w = i * n - j * m,
    x = i * o - k * m,
    y = i * p - l * m,
    z = j * o - k * n,
    A = j * p - l * n,
    B = k * p - l * o,
    ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
  dest[0] = (f * B - g * A + h * z) * ivd;
  dest[1] = (-b * B + c * A - d * z) * ivd;
  dest[2] = (n * v - o * u + p * t) * ivd;
  dest[3] = (-j * v + k * u - l * t) * ivd;
  dest[4] = (-e * B + g * y - h * x) * ivd;
  dest[5] = (a * B - c * y + d * x) * ivd;
  dest[6] = (-m * v + o * s - p * r) * ivd;
  dest[7] = (i * v - k * s + l * r) * ivd;
  dest[8] = (e * A - f * y + h * w) * ivd;
  dest[9] = (-a * A + b * y - d * w) * ivd;
  dest[10] = (m * u - n * s + p * q) * ivd;
  dest[11] = (-i * u + j * s - l * q) * ivd;
  dest[12] = (-e * z + f * x - g * w) * ivd;
  dest[13] = (a * z - b * x + c * w) * ivd;
  dest[14] = (-m * t + n * r - o * q) * ivd;
  dest[15] = (i * t - j * r + k * q) * ivd;
  return dest;
};
