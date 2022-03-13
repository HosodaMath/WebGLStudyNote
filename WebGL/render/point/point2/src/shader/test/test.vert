#version 300 es
precision highp float;
precision highp int;
uniform mat4 uModelViewProjectionMatrix;
// attribute
in vec3 aPosition;
in vec3 aNormal;
in vec2 aTexCoord;
// varying
out vec3 vNormal;
out vec2 vTexCoord;
void main(void){
  
  vNormal = aNormal;

  vTexCoord = aTexCoord;

  gl_Position = uModelViewProjectionMatrix * vec4(aPosition, 1.0);

}