#version 300 es
precision highp float;
precision highp int;

// uniform 
uniform sampler2D uTexture;

// varying
in vec3 vNormal;
in vec2 vTexCoord;

out vec4 fragColor;

void main(void){
  vec2 coord = vTexCoord;

  vec4 color = texture(uTexture, coord);

  fragColor = color;
}