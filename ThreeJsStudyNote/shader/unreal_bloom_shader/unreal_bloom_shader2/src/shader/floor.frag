precision highp float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
varying vec2 vTexCoord;
#define PI2 6.28318530718

void main(){
  vec2 coord = vTexCoord;

  vec3 color = vNoise;
  
  gl_FragColor = vec4(vNoise, 1.0);
}