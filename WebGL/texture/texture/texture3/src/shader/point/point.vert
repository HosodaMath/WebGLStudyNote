#version 300 es
precision highp float;
precision highp int;
// uniform
uniform mat4 uModelViewProjectionMatrix;
uniform float uPointSize;
// attribute
// in vec4 aColor;
layout (location = 0) in vec3 aPosition;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoord;

// varying
out vec3 vNormal;
out vec2 vTexCoord;

void main(void){

  vNormal = aNormal;

  vTexCoord = aTexCoord;

  gl_PointSize = uPointSize;

  gl_Position = uModelViewProjectionMatrix * vec4(aPosition, 1.0);
}