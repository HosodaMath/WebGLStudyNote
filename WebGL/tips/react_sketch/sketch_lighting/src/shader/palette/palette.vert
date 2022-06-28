#version 300 es
precision highp float;
precision highp int;
uniform mat4 uModelViewProjectionMatrix;
// attribute
layout (location = 0) in vec4 aColor;
layout (location = 1) in vec3 aPosition;
layout (location = 2) in vec3 aNormal;
layout (location = 3) in vec2 aTexCoord;

// uniform
uniform float uFrameCount; 

// varying
out vec4 vColor;
out vec3 vNormal;
out vec2 vTexCoord;
void main(void){
  
  vColor = aColor;

  vNormal = aNormal;

  vTexCoord = aTexCoord;

  gl_PointSize = 3.0;

  // ジオメトリの頂点を直接変形させる
  // 細かく変形するには別の方法が必要になる
  vec3 position = aPosition;
  float uFrequency = 20.0;
  float uAmplitude = 0.1;
  
  /*
    波の現象を確認したい場合はcosかsinを使うと良いと思います。
  */

  /*
  // x軸に対しての頂点変化
  float distortionX = cos(aPosition.x * uFrequency + uFrameCount * 0.05);
  position.x += distortionX * aNormal.x * uAmplitude;

  // y軸に対しての頂点変化
  float distortionY = sin(aPosition.y * uFrequency + uFrameCount * 0.05);
  position.y += distortionY * aNormal.y * uAmplitude;

  // z軸に対しての頂点変化
  float distortionZ = sin(aPosition.z * uFrequency + uFrameCount * 0.05);
  position.z += distortionZ * aNormal.z * uAmplitude;
  */

  const float slowScale = 0.05;

  // x軸に対しての頂点変化
  float cosWaveX = cos(aPosition.z * uFrequency + uFrameCount * slowScale);
  position.x += cosWaveX * aNormal.x * uAmplitude;
  
  // y軸に対しての頂点変化
  float sinWaveY = sin(aPosition.x * uFrequency + uFrameCount * slowScale);
  position.y += sinWaveY * aNormal.y * uAmplitude;

  // z軸に対しての頂点変化
  float sinWaveZ = sin(aPosition.y * uFrequency + uFrameCount * slowScale);
  position.z += sinWaveZ * aNormal.z * uAmplitude;

  gl_Position = uModelViewProjectionMatrix * vec4(position, 1.0);

}