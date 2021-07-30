precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
varying vec2 vTexCoord;
#define PI2 6.28318530718

void main(){
  vec2 coord = vTexCoord;
  // vec2 coord = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);

  vec3 color = vec3(0.1, abs(cos(time)), abs(sin(time)));
  
  gl_FragColor = vec4(color, 1.0);
}