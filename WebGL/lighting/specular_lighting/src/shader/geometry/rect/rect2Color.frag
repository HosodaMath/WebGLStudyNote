#version 300 es
precision highp float;
precision highp int;

out vec4 fragColor;
in vec4 vColor;

void main(void){
  fragColor = vColor;
}