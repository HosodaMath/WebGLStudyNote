#version 300 es
precision highp float;
precision highp int;
// world Matrix
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;

// attribute
in vec3 aPosition;
in vec3 aNormal;
// in vec2 aTexCoord;

// varying
out vec3 vNormal;
out vec3 vEyeVec;

void main(void){
  
  // 頂点ベクトル
  vec4 vertexVec = uModelViewMatrix * vec4(aPosition, 1.0);

  // 法線ベクトル
  vNormal = vec3(uNormalMatrix * vec4(aNormal, 1.0));

  // 視点ベクトル
  vEyeVec = -vec3(vertexVec.xyz);

  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}