#version 300 es
precision highp float;
precision highp int;
in vec4 aColor;
in vec3 aPosition;
in vec3 aNormal;
in vec2 aTexCoord;
uniform mat4 uModelViewProjectionMatrix;
uniform mat4 uModelMatrix;
out vec4 vColor;
out vec3 vPosition;
out vec3 vNormal;
out vec2 vTexCoord;
void main(void){
  vColor = aColor;
  vPosition = (uModelMatrix * vec4(aPosition, 1.0)).xyz;
  vNormal = aNormal;
  vTexCoord = aTexCoord;

  gl_Position = uModelViewProjectionMatrix * vec4(aPosition, 1.0);
}