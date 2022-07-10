#version 300 es
precision highp float;
precision highp int;
// uniform
uniform mat4 uModelViewProjectionMatrix;
uniform vec2 uFrequency;
uniform vec2 uAmplitude;
uniform float uTime;
uniform float uPointSize;
// attribute
layout (location = 0) in vec4 aColor;
layout (location = 1) in vec3 aPosition;
layout (location = 2) in vec3 aNormal;
layout (location = 3) in vec2 aTexCoord;
// varying
out vec4 vColor;
out vec3 vNormal;
out vec2 vTexCoord;
out float vTime;
void main(void){
  
  vColor = aColor;

  vNormal = aNormal;

  vTexCoord = aTexCoord;

  gl_PointSize = uPointSize;

  vTime = uTime;

  vec3 wavePosition = aPosition;
  float cosWave = cos(wavePosition.y * uFrequency.x + uTime * 0.05) * uAmplitude.x;
  float sinWave = sin(wavePosition.x * uFrequency.y + uTime * 0.05) * uAmplitude.y;
  wavePosition.x = wavePosition.x + cosWave;
  wavePosition.y = wavePosition.y + sinWave;

  gl_Position = uModelViewProjectionMatrix * vec4(wavePosition, 1.0);

}