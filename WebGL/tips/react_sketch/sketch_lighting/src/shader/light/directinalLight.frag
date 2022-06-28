#version 300 es
precision highp float;
precision highp int;
uniform mat4 uInvertMatrix;
uniform vec3 uLightDirection;
// varying
in vec4 vColor;
in vec3 vNormal;
in vec2 vTexCoord;

// 最終的に出力される色
out vec4 fragColor;

const float PI2 = 6.28318530718;
const float TAU = PI2;

void main(void){

  // vec2 uv = vTexCoord;
  vec2 uv = vNormal.xy;

  vec3 invertLight = normalize(uInvertMatrix * vec4(uLightDirection, 0.0)).xyz;
  float diffuse = clamp(dot(vNormal, invertLight), 0.1, 1.0);
  
  vec4 bgColor = vec4(uv.x, uv.y, 1.0, 1.0);
  bgColor *= vec4(vec3(diffuse), 1.0);

  fragColor = bgColor;
}