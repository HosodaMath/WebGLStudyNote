precision highp float;
uniform float time;

varying vec2 vTexCoord;

void main( void ) {
  vec2 position = vTexCoord;
  vec3 color = vec3(abs(cos(time)), position.x, position.y);
  gl_FragColor = vec4(color , 1.0 );
}