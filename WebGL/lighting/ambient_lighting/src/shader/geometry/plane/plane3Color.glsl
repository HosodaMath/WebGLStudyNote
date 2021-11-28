precision highp float;
precision highp int;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;


void main(void){

  vec2 coord = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y); 

  vec4 color = vec4(coord.x, coord.y, 0.4, 1.0);

  gl_FragColor = color;
}