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

  vec4 color = texture(uTexture, uv).gbra;
  // vec4 color = vec4(vec3(uv, 1.0), 1.0);

  fragColor = color;
}