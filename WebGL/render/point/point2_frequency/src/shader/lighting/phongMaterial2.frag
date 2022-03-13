#version 300 es
precision highp float;
precision highp int;

// Lighing Shader
uniform vec4 uAmbientLight;
uniform vec4 uDiffuseLight;
uniform vec4 uSpecularLight;
uniform vec3 uDirectionLight;
// Materials
uniform vec4 uAmbientMaterial;
uniform vec4 uDiffuseMaterial;
uniform vec4 uSpecularMaterial;
uniform float uShininess;

// varying
in vec3 vNormal;
in vec3 vEyeVec;

out vec4 fragColor;

void main(void){
  
  vec3 L = normalize(uDirectionLight);

  vec3 N = normalize(vNormal);

  float lambert = dot(N, -L);

  vec4 ambientVec = uAmbientLight * uAmbientMaterial;

  vec4 diffuseVec = vec4(0.0, 0.0, 0.0 ,1.0);

  vec4 specularVec = vec4(0.0, 0.0, 0.0, 1.0);

  if(lambert > 0.0){
    diffuseVec = uDiffuseLight * uDiffuseMaterial * lambert;

    vec3 E = normalize(vEyeVec);

    vec3 R = reflect(L, N);

    float specular = pow(max(dot(R, E), 0.0), uShininess);

    specularVec = uSpecularLight * uSpecularMaterial * specular;
  }

  fragColor = vec4(vec3(ambientVec + diffuseVec + specularVec), 1.0);

}