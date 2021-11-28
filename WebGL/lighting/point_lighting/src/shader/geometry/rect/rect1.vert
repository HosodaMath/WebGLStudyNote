#version 300 es
precision highp float;
precision highp int;
uniform mat4 mvpMatrix;

in vec3 aVertexPosition;
void main(void){

  gl_Position = vec4(aVertexPosition, 1.0);
}
