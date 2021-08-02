attribute float size;
attribute vec3 customColor;

varying vec2 vTexCoord;
varying vec3 vColor;

void main(){
  
  vTexCoord = uv;

  vColor = customColor;

  vec4 modelVeiwPosition = modelViewMatrix * vec4(position, 1.0);

  gl_PointSize = size * (300.0 / -modelVeiwPosition.z);

  gl_Position =  projectionMatrix * modelVeiwPosition;
}