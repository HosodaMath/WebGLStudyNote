#version 300 es
precision highp float;
precision highp int;
in vec4 aColor;
in vec3 aVertexPosition;
uniform mat4 mvpMatrix;
out vec4 vColor;

void main(void){

  vColor = aColor;

  gl_Position = vec4(aVertexPosition, 1.0);
}
