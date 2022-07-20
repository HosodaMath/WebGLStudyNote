#version 300 es
precision highp float;
precision highp int;
uniform mat4 uInvertMatrix;
uniform vec3 uLightDirection;
uniform vec3 uAmbientColor;
uniform vec2 uFrequency;
uniform vec2 uAmplitude;
uniform float uTime;
// uniform float uScale;
// varying
in vec4 vColor;
in vec3 vNormal;
in vec2 vTexCoord;

// 最終的に出力される色
out vec4 fragColor;

const float PI2 = 6.28318530718;
const float TAU = PI2;

vec2 waveEffect(vec2 uv){
  uv.x += 0.0035 * sin(uv.y * 100.0 + (uTime * 0.05) * PI2);
  uv.x += 0.0015 * cos(uv.y * 250.0 + (uTime * 0.05) * PI2);
  
  uv.y += 0.0035 * sin(uv.x * 100.0 + (uTime * 0.05) * PI2);
  uv.y += 0.0015 * cos(uv.x * 250.0 + (uTime * 0.05) * PI2);
  
  return uv;
}

vec2 rotateLoop(vec2 uv, float radian){
  const int iter = 5;
  for(int i = 0; i < iter; i++){
    uv = abs(uv * 1.5) - 1.0;
    float a = radian * float(i);
    float c = cos(a);
    float s = sin(a);
    uv *= mat2(c, s, -s, c);
  }

  return uv;
}

// 1次元乱数
float random(vec2 value){
  return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
}

// 2次元乱数
vec2 random2(vec2 value){
  return fract(sin(vec2(dot(value, vec2(127.1, 311.7)), dot(value, vec2(269.5, 183.3)))) * 43758.5453);
}

// ノイズ2
float valueNoise2(vec2 value){
  vec2 i = floor(value);
  vec2 f = smoothstep(0.0, 1.0, fract(value));
  
  float mix1 = mix(random(i), random(i + vec2(1.0, 0.0)), f.x);
  float mix2 = mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), f.x);
  float valueMix = mix(mix1,mix2,f.y);
  
  return valueMix;
}

// ボロノイ
float voronoi(vec2 uv){
  uv = rotateLoop(uv, uTime * 0.05);
  vec2 baseCell = floor(uv);
  vec2 fst = fract(uv);
  float move_dist = 10.0;
  for(int x = -1; x <= 1; x++){
    for(int y = -1; y <= 1; y++){
      vec2 cell = vec2(float(x), float(y));
      // vec2 point = random2(baseCell + cell);
      vec2 point = vec2(valueNoise2(baseCell + cell));
      point.x = 0.5 + 0.5 * cos(6.2831 * point.x);
      point.y = 0.5 + 0.5 * sin(6.2831 * point.y);
      vec2 diff = cell + point - fst;
      float cell_dist = length(diff);
      if(cell_dist < move_dist){
        move_dist = cell_dist;
      }
    }
  }

  return move_dist;
}


vec3 createVoronoiColor(vec2 uv){ 
  float r = 0.0;
  float g = voronoi(uv);
  float b = voronoi(uv);

  vec3 color = vec3(r, g, b);
  color *= 1.0;
  color = pow(color, vec3(4.0));

  vec3 voronoiColor = vec3(color);

  vec3 color1 = vec3(0.1, 0.2, 0.6);
  vec3 color2 = vec3(0.2, 0.4, 0.8);
  vec3 blue = mix(color1, color2, uv.y);
  voronoiColor += blue;

  return voronoiColor;
}


/**
  waterShader + DirectinalLight + AmbientLight
*/
void main(void){

  vec2 uv = vTexCoord;
  // vec2 uv = vNormal.xy;

  vec3 invertLight = normalize(uInvertMatrix * vec4(uLightDirection, 0.0)).xyz;
  float diffuse = clamp(dot(vNormal, invertLight), 0.1, 1.0);
  
  // Wave Effect
  uv = waveEffect(uv);
  float cosWave = cos(uv.y * uFrequency.x + uTime * 0.05) * uAmplitude.x;
  float sinWave = sin(uv.x * uFrequency.y + uTime * 0.05) * uAmplitude.y;
  uv.x = uv.x + cosWave;
  uv.y = uv.y + sinWave;

  vec3 voronoiColor = createVoronoiColor(uv);
  vec3 bgColor = voronoiColor;
  // bgColor *= vec3(diffuse);
  // bgColor += uAmbientColor;

  fragColor = vec4(bgColor, 1.0);
}