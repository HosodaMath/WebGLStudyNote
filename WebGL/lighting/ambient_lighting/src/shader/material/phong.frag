#version 300 es
precision highp float;
precision highp int;
uniform mat4 uInvertMatrix;
uniform vec4 uAmbientColor;
uniform vec3 uLightDirecton;
uniform vec3 uEyeDirection;
uniform vec2 uResolution;
uniform float uTime;

in vec4 vColor;
in vec3 vNormal;
in vec2 vTexCoord;

out vec4 fragColor;

void main(void){

  vec2 coord = vTexCoord;
  // coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y); 
  
  vec3 invertLight = normalize(uInvertMatrix * vec4(uLightDirecton, 0.0)).xyz;
  vec3 invertEye = normalize(uInvertMatrix * vec4(uEyeDirection, 0.0)).xyz;
  vec3 invertLightEye = normalize(invertLight + invertEye);
  float diffuse = clamp(dot(vNormal, invertLight), 0.0, 1.0);
  float specular = pow(clamp(dot(vNormal, invertLightEye), 0.0, 1.0), 50.0);
  vec4 color = vColor * vec4(vec3(diffuse), 1.0) + vec4(vec3(specular), 1.0) * uAmbientColor;  
  fragColor = color;

}