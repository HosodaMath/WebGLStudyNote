#version 300 es
precision highp float;
precision highp int;

// uniform 
uniform vec2 uResolution;
// uniform float uTime;
uniform sampler2D uTexture;

// varying
in vec3 vNormal;
in vec2 vTexCoord;

out vec4 fragColor;

void main(void){
  // Standardに貼り付ける場合
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  // 繰り返し処理
  // vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x ,uResolution.y);
  // おかしくなる -> オススメしない
  // vec2 uv = vTexCoord;

  // テクスチャが逆にならないようにする
  uv = 1.0 - uv;

  vec4 color = texture(uTexture, uv);

  // rgbごとに異なる減算を行うに
  color.r = 1.0 - color.r;
  color.g = 1.0 - color.g;
  color.b = 1.0 - color.b;

  fragColor = color;
}