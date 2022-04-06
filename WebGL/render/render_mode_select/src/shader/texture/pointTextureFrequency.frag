#version 300 es
precision highp float;
precision highp int;

// uniform 
uniform bool isTexture;
uniform sampler2D uTexture0;
uniform sampler2D uTexture1;

// varying
in vec3 vNormal;
in vec2 vTexCoord;

out vec4 fragColor;

void main(void){
  vec2 coord = vTexCoord;

  vec4 color = vec4(vec3(0.0), 1.0);

  if(isTexture == true){
    vec4 color0 = texture(uTexture0, coord);
    vec4 color1 = texture(uTexture1, coord);
    color = color0 * color1;
  } else {
    color = vec4(1.0, 1.0, 0.5, 1.0);
  }

  fragColor = color;
}