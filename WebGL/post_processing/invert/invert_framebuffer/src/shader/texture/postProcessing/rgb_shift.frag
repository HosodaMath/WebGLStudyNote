#version 300 es
precision highp float;
precision highp int;

// uniform 
uniform vec2 uResolution;
uniform vec2 uMouse;
// uniform float uTime;
uniform sampler2D uTexture;

// varying
in vec3 vNormal;
in vec2 vTexCoord;

out vec4 fragColor;

void main(void){
  // Standardに貼り付ける場合
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  // 繰り返し処理したい場合もしくは画面中心を原点としたい場合
  // vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x ,uResolution.y);
  // おかしくなる -> オススメしない
  // vec2 uv = vTexCoord;

  // テクスチャが逆にならないようにする
  // uv = 1.0 - uv;

  vec2 pixelSize = vec2(1.0) / uResolution;
  vec2 frequency = uMouse;
  vec2 offset = vec2(pixelSize.x * frequency.x, pixelSize.y * frequency.y);

  /*
  vec2 uShift = vec2(0.0, 0.0);
  vec4 red = texture(uTexture, vec2(uv.x - uShift.x, uv.y - uShift.y));
  vec4 green = texture(uTexture, vec2(uv.x, uv.y));
  vec4 blue = texture(uTexture, vec2(uv.x + uShift.x, uv.y + uShift.y));
  */

  vec4 red = texture(uTexture, vec2(uv.x - offset.x, uv.y - offset.y));
  vec4 green = texture(uTexture,vec2(uv.x, uv.y));
  vec4 blue = texture(uTexture, vec2(uv.x + offset.x, uv.y + offset.y));

  vec4 color = vec4(red.r, green.g, blue.b, 1.0);
  // vec4 color = texture(uTexture, uv);

  fragColor = color;
}