#version 300 es
precision highp float;
precision highp int;
// world Matrix
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;
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

// attribute
in vec3 aPosition;
in vec3 aNormal;
// in vec2 aTexCoord;

out vec4 vColor;

void main(void){
  
  // 頂点ベクトル
  vec4 vertexVector = uModelViewMatrix * vec4(aPosition, 1.0);
  
  // 法線ベクトル
  vec3 normalVec = normalize(vec3(uNormalMatrix * vec4(aNormal, 1.0)));

  // ライトベクトル
  vec3 lightVec = normalize(uDirectionLight);

  // 法線ベクトルと逆ライトベクトルの内積
  float lambert = dot(normalVec, -lightVec);

  // 環境ベクトル
  vec4 ambientVec = uAmbientLight * uAmbientMaterial;

  // 放射ベクトル
  vec4 diffuseVec = vec4(0.0, 0.0, 0.0, 1.0);

  // 鏡面反射ベクトル
  vec4 specularVec = vec4(0.0, 0.0, 0.0, 1.0);

  if(lambert > 0.0){
    diffuseVec = uDiffuseLight * uDiffuseMaterial * lambert;
    
    // 視点ベクトル
    vec3 eyeVec = -vec3(vertexVector.xyz);

    vec3 normalEyeVec = normalize(eyeVec);

    // 反射ベクトル
    vec3 relectVec = reflect(lightVec, normalVec);

    // 鏡面係数
    float specular = pow(max(dot(relectVec, normalEyeVec), 0.0), uShininess);

    specularVec = uSpecularLight * uSpecularMaterial * specular;
  }

  vColor = vec4(vec3(ambientVec + diffuseVec + specularVec), 1.0);

  gl_Position = uProjectionMatrix * vertexVector;
}