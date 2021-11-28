#version 300 es
precision highp float;
precision highp int;
uniform mat4 uInvertMatrix;
uniform vec4 uAmbinetColor;
uniform vec3 uLightDirection;
// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
in vec4 vColor;
in vec3 vNormal;
in vec2 vTexCoord;
out vec4 fragColor;
void main(void){
  vec2 coord = vTexCoord;
  // coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
  // 逆行列とライトベクトルからライトの方向を求める 
  vec3 invertLight = normalize(uInvertMatrix * vec4(uLightDirection, 0.0)).xyz;
  // 法線ベクトルとライトから光の拡散値を求める
  // clampを使いマイナスになってしまうのを抑制する
  // しかし平行光源の欠点でもある光があたらないところは真っ暗になってしまう
  float diffuse = clamp(dot(vNormal, invertLight), 0.1, 1.0);
  // uAmbinetColorは最後に加算する。掛け算はだめ
  // ambientColorで欠点が多少変わる
  vec4 resultColor = vColor * vec4(vec3(diffuse), 1.0) + uAmbinetColor;
  
  fragColor = resultColor;
} 
