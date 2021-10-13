attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vTexCoord;

//#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

void main(){
  mat4 projectionModelViewMatrix = projectionMatrix * modelViewMatrix;

  gl_Position = projectionModelViewMatrix * vec4(position, 1.0);
}