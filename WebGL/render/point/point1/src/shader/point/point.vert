#version 300 es
precision highp float;
precision highp int;
// uniform
uniform mat4 uModelViewProjectionMatrix;
uniform float uPointSize;
// attribute
// in vec4 aColor;
layout (location = 0) in vec3 aPosition;
// in vec3 aNormal;
// in vec2 aTexCoord;


void main(void){
  gl_PointSize = uPointSize;

  gl_Position = uModelViewProjectionMatrix * vec4(aPosition, 1.0);
}