#version 300 es
precision highp float;
precision highp int;
// varying
in vec4 vColor;
in vec3 vNormal;
in vec2 vTexCoord;

// 最終的に出力される色
out vec4 fragColor;

const float PI2 = 6.28318530718;
const float TAU = PI2;

void main(void){

  //vec2 uv = vTexCoord;
  vec2 uv = vNormal.xy;
  
  vec4 bgColor = vec4(uv.x, uv.y, 1.0, 1.0);

  fragColor = bgColor;
}