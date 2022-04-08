#version 300 es
precision highp float;
precision highp int;

// uniform 
uniform sampler2D uTexture0;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

// varying
in vec3 vNormal;
in vec2 vTexCoord;

out vec4 fragColor;

void main(void){
  vec2 coord = vTexCoord;

  vec4 color0 = texture(uTexture0, coord);
  vec4 color1 = texture(uTexture1, coord);
  vec4 color2 = texture(uTexture2, coord);

  vec4 color = color0 * color1 * color2;

  fragColor = color;
}