#version 300 es
precision highp float;
precision highp int;

// uniform
uniform sampler2D uColorTexture;

// varying
in vec4 vColor;
in vec3 vNormal;
in vec2 vTexCoord;

// result
out vec4 fragColor;

void main(void){

  // 
  vec4 color = texture(uColorTexture, vTexCoord);

  fragColor = color;
}