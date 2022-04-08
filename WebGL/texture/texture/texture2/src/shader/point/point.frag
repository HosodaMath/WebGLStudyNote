#version 300 es
precision highp float;
precision highp int;

// varying
in vec3 vNormal;
in vec2 vTexCoord;

out vec4 fragColor;

void main(void){

  vec2 coord = vTexCoord;
  
  vec4 color = vec4(1.0, 1.0, 0.5, 1.0);
  // vec4 color = vec4(vNormal, 1.0);

  fragColor = color;
}