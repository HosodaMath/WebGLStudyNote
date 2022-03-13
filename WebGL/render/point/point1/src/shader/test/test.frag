#version 300 es
precision highp float;
precision highp int;

uniform vec4 uMaterialColor;

// varying
in vec3 vNormal;
in vec2 vTexCoord;

// result
out vec4 fragColor;

void main(void){
  
  fragColor = uMaterialColor;
}