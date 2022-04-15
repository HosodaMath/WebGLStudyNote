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
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  // vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x ,uResolution.y);
  // vec2 uv = vTexCoord;

  // 反転させる場合
  // uv = 1.0 - uv;

  vec2 pixelSize = vec2(1.0) / uResolution;

  float frequency = 10.0;
  vec2 offset = vec2(pixelSize * frequency);

  vec4 red = texture(uTexture, uv - offset);
  vec4 green = texture(uTexture, uv);
  vec4 blue = texture(uTexture, uv + offset);

  vec4 color = vec4(red.r, green.g, blue.b, 1.0);
  // vec4 color = texture(uTexture, uv);

  fragColor = color;
}