#version 300 es
precision highp float;
precision highp int;

uniform mat4 uNormalInvertMatrix;
uniform vec4 uMaterialColor;
uniform vec4 uAmbientColor;
uniform vec3 uDirectionalLight;
uniform vec3 uDirectionalEye;

// varying
in vec3 vNormal;
in vec2 vTexCoord;

// result
out vec4 fragColor;

void main(void){

  vec3 invertLightVec = normalize(uNormalInvertMatrix * vec4(uDirectionalLight, 0.0)).xyz;
  
  vec3 invertEyeVec = normalize(uNormalInvertMatrix * vec4(uDirectionalEye, 0.0)).xyz;

  vec3 lightEye = normalize(invertLightVec + invertEyeVec);

  float diffuse = clamp(dot(vNormal, invertLightVec) ,0.0, 1.0);

  float specular = pow(clamp(dot(vNormal, lightEye), 0.0, 1.0), 50.0);
  
  vec4 diffuseVec = vec4(vec3(diffuse), 1.0);
  
  vec4 specularVec = vec4(vec3(specular), 1.0);
  
  vec4 color = uMaterialColor * diffuseVec + specularVec + uAmbientColor;

  fragColor = color;
}