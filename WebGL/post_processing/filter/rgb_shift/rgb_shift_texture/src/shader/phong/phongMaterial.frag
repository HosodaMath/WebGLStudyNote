#version 300 es
precision highp float;
precision highp int;

uniform mat4 uNormalInvertMatrix;
uniform vec4 uAmbientMaterial;
uniform vec3 uDirectionalLight;
uniform vec3 uEyeDirection;
uniform bool isTexture;
uniform sampler2D uTexture;

// varying
in vec4 vColor;
in vec3 vNormal;
in vec2 vTexCoord;

// result
out vec4 fragColor;

void main(void){

  vec3 invertLightVec = normalize(uNormalInvertMatrix * vec4(uDirectionalLight, 0.0)).xyz;
  
  vec3 invertEyeVec = normalize(uNormalInvertMatrix * vec4(uEyeDirection, 0.0)).xyz;

  vec3 lightEye = normalize(invertLightVec + invertEyeVec);
  
  float diffuse = clamp(dot(vNormal, invertLightVec) ,0.0, 1.0);

  float specular = pow(clamp(dot(vNormal, lightEye) ,0.0, 1.0), 50.0);

  vec4 diffuseVec = vec4(vec3(diffuse), 1.0);

  vec4 specularVec = vec4(vec3(specular), 1.0);

  vec4 color = vec4(vec3(0.0), 1.0);
  if(isTexture == false){
    vec4 light = vec4(vNormal, 1.0) * diffuseVec + specularVec;
    color = light + uAmbientMaterial;
  } else {
    // ライティングはなし
    color = texture(uTexture, vTexCoord);
  }

  fragColor = color;
}