precision highp float;
precision highp sampler2D;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vTexCoord;

void main(){
  vec2 coord = vTexCoord;

  vec4 outTexture = texture2D(uTexture, coord);

  outTexture.rgb = 1.0 - outTexture.rgb;

  gl_FragColor = outTexture;
}
