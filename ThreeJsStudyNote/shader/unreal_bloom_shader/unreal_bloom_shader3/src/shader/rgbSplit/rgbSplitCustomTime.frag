precision highp float;
precision highp sampler2D;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vTexCoord;

void main(){
  vec2 coord = vTexCoord;

  vec2 pixelSize = vec2(1.0) / uResolution;

  vec2 offset = pixelSize  * cos(uTime * 0.005) * 10.0;

  vec4 redTexture = texture2D(uTexture, coord - offset);
  vec4 greenTexture = texture2D(uTexture, coord);
  vec4 blueTexture = texture2D(uTexture, coord + offset);

  vec4 outTexture = vec4(redTexture.r, greenTexture.g, blueTexture.b, 1.0);

  gl_FragColor = outTexture;
}
