#version 300 es
precision highp float;
precision highp int;
uniform mat4 uInvertMatrix;
uniform vec4 uAmbinetColor;
uniform vec3 uLightPosition;
uniform vec3 uEyeDirection;
// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
in vec4 vColor;
in vec3 vPosition;
in vec3 vNormal;
in vec2 vTexCoord;
out vec4 fragColor;
void main(void){
  vec2 coord = vTexCoord;
  // coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
  // ライトベクトル = ライトの座標 - モデルの位置で求まる。
  vec3 lightVector = uLightPosition - vPosition;
  // 逆行列とライトベクトルからライトの方向を求める 
  vec3 invertLight = normalize(uInvertMatrix * vec4(lightVector, 0.0)).xyz;
  // 逆行列と視線ベクトルから視線の方向を求める。
  vec3 invertEye = normalize(uInvertMatrix * vec4(uEyeDirection, 0.0)).xyz;
  // ライトベクトルと視線ベクトルのハーフベクトル
  vec3 halfLightEye = normalize(invertLight + invertEye);
  // 法線ベクトルとライトから光の拡散値を求める
  float diffuse = clamp(dot(vNormal, invertLight), 0.0, 1.0);
  // ハーフベクトルと面の法線ベクトルから反射値を求める
  float specular = pow(clamp(dot(vNormal, halfLightEye), 0.0, 1.0), 50.0);
  // 結果を光の拡散値と反射値と色から求める
  vec4 light = vColor * vec4(vec3(diffuse), 1.0) + vec4(vec3(specular), 1.0); 
  vec4 resultColor = light + uAmbinetColor;
  
  fragColor = resultColor;
} 
