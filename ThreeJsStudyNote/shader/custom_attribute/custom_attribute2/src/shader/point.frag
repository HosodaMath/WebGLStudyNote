precision highp float;

uniform float time;
uniform vec3 color;
uniform sampler2D pointTexture;

varying vec2 vTexCoord;
varying vec3 vColor;

void main(){
  vec2 coord = vTexCoord; 

  vec2 pointCoord = gl_PointCoord;

  vec3 colorHSL = vColor;

  colorHSL.b = abs(cos(time));

  gl_FragColor = vec4(color * colorHSL, 1.0);

  gl_FragColor = gl_FragColor * texture2D(pointTexture, pointCoord);
}