#version 300 es
precision highp float;
precision highp int;
// uniform
uniform mat4 uModelViewProjectionMatrix;
uniform float uFrameCount;
uniform float uFrequency;
uniform float uAmplitude;
uniform float uPointSize;
// attribute
layout (location = 0) in vec4 aColor;
layout (location = 1) in vec3 aPosition;
layout (location = 2) in vec3 aNormal;
layout (location = 3) in vec2 aTexCoord;

// varying
out vec3 vNormal;
out vec2 vTexCoord;

void main(void){

  vNormal = aNormal;

  vTexCoord = aTexCoord;

  gl_PointSize = uPointSize;

  vec4 cPosition = vec4(aPosition, 1.0);

  const float slow = 0.1;
  float waveX = cos(cPosition.x * uFrequency + uFrameCount * slow);
  cPosition.x += waveX * aNormal.x * uAmplitude;

  float waveY = sin(cPosition.y * uFrequency + uFrameCount * slow);
  cPosition.y += waveY * aNormal.y * uAmplitude;

  gl_Position = uModelViewProjectionMatrix * cPosition;
}