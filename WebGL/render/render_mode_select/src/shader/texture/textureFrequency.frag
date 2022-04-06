#version 300 es
precision highp float;
precision highp int;

// uniform 
uniform mat4 uNormalInvertMatrix;
uniform vec4 uAmbientMaterial;
uniform vec3 uDirectionalLight;
uniform vec3 uEyeDirection;
uniform bool uIsTexture;
uniform sampler2D uTexture0;
uniform sampler2D uTexture1;

// varying
in vec3 vNormal;
in vec2 vTexCoord;

out vec4 fragColor;

void main(void){
  vec2 coord = vTexCoord;

  vec3 invertLightVec = normalize(uNormalInvertMatrix * vec4(uDirectionalLight, 0.0)).xyz;
  
  vec3 invertEyeVec = normalize(uNormalInvertMatrix * vec4(uEyeDirection, 0.0)).xyz;

  vec3 lightEye = normalize(invertLightVec + invertEyeVec);
  
  float diffuse = clamp(dot(vNormal, invertLightVec) ,0.0, 1.0);

  float specular = pow(clamp(dot(vNormal, lightEye) ,0.0, 1.0), 50.0);

  vec4 diffuseVec = vec4(vec3(diffuse), 1.0);

  vec4 specularVec = vec4(vec3(specular), 1.0);

  vec4 color = vec4(vec3(0.0), 1.0);

  if(uIsTexture == true){
    vec4 color0 = texture(uTexture0, coord);
    vec4 color1 = texture(uTexture1, coord);
    color = color0 * color1 * diffuseVec + specularVec;
  } else {
    color = vec4(vec3(vNormal), 1.0) * diffuseVec + specularVec;
  }

  fragColor = color + uAmbientMaterial;
}