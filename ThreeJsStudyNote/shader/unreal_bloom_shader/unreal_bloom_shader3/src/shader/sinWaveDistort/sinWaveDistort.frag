precision highp float;
precision highp sampler2D;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;
uniform sampler2D uTexture;

varying vec2 vTexCoord;

void main(){
  
  vec2 coord = vTexCoord;

  float sinWave = sin(coord.y * uFrequency + uTime * 0.005) * uAmplitude;

  vec2 distort = vec2(sinWave, 0.0);
  
  vec4 outTexture = texture2D(uTexture, coord + distort);

  gl_FragColor = outTexture;
}
