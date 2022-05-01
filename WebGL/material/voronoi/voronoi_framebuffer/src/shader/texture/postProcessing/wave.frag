#version 300 es
precision highp float;
precision highp int;

// uniform 
uniform vec2 uResolution;
uniform vec2 uFrequency;
uniform vec2 uAmplitude;
uniform float uTime;
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

  float cosWave = cos(uv.y * uFrequency.x + uTime) * uAmplitude.x;
  float sinWave = sin(uv.x * uFrequency.y + uTime) * uAmplitude.y;

  uv.x = uv.x + cosWave;
  uv.y = uv.y + sinWave;

  vec4 mainColor = texture(uTexture, uv);

  fragColor = mainColor;
}