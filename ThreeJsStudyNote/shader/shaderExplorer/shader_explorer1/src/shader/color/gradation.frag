precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vTexCoord;

vec4 gradation(vec2 coord){
  
  float time = abs(sin(uTime));
  float b = clamp(time, 0.3, 1.0);
  vec4 color = vec4(coord.x, coord.y, b, 1.0);

  return color;
}

void main(){
  vec2 coord = vTexCoord;

  gl_FragColor = gradation(coord);
}