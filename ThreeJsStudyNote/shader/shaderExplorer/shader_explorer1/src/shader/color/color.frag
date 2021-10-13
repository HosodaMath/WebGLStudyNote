precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vTexCoord;

vec2 rotateLoop(vec2 coord, float radian){
  const int iter = 5;
  for(int i = 0; i < iter; i++){
    coord = abs(coord * 1.5) - 1.0;
    float a = radian * float(i);
    float c = cos(a);
    float s = sin(a);
    coord *= mat2(c, s, -s, c);
  }

  return coord;
}

// 乱数生成
float random(vec2 value){
  return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
}

//乱数2
vec2 random2(vec2 value){
  return fract(sin(vec2(dot(value, vec2(127.1, 311.7)), dot(value, vec2(269.5, 183.3)))) * 43758.5453);
}

// ノイズ 多種多様な生成
float noise(vec2 value){
  vec2 i = floor(value);
  //vec2 f = fract(value);
  vec2 f = smoothstep(0.0, 1.0, fract(value));

  //float a = random(i);
  //float b = random(i + vec2(1.0, 0.0));
  //float c = random(i + vec2(0.0, 1.0));
  //float d = random(i + vec2(1.0, 1.0));

  //vec2 u = f * f * (3.0 - 2.0 * f);
  
  float mix1 = mix(random(i), random(i + vec2(1.0, 0.0)), f.x);
  float mix2 = mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), f.x);
  float valueMix = mix(mix1,mix2,f.y);
  //float valueMix = mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;

  return valueMix;
}

float fbm(vec2 value){
  const int octaves = 2;
  float result = 0.0;
  float amplitude = 0.5;
  for(int i = 0; i < octaves; i++){
    result += amplitude * noise(value);
    //value += 2.0;
    amplitude += 0.5;
  }

  return result;
}

// ボロノイ
float voronoi(vec2 coord){
  coord = rotateLoop(coord, uTime * 0.2);
  vec2 baseCell = floor(coord);
  vec2 fst = fract(coord);
  float move_dist = 10.0;
  for(int x = -1; x <= 1; x++){
    for(int y = -1; y <= 1; y++){
      vec2 cell = vec2(float(x), float(y));
      vec2 point = random2(baseCell + cell);
      point = 0.5 + 0.5 * sin(6.2831 * point);
      vec2 diff = cell + point - fst;
      float cell_dist = length(diff);
      if(cell_dist < move_dist){
        move_dist = cell_dist;
      }
    }
  }

  return move_dist;
}

vec3 createColor(vec2 coord){
  
  vec3 color1 = vec3(0.1255, 0.2941, 0.6549);
  vec3 color2 = vec3(0.3882, 0.2157, 0.7882);
  vec3 bgColor = mix(color1, color2, coord.y);

  
  float voronoiNoise1 = voronoi(coord * abs(cos(uTime * 0.5)));
  float voronoiNoise2 = voronoi(coord * abs(sin(uTime * 0.5)));
  float voronoiNoise3 = voronoi(coord * abs(sin(uTime * 0.5)));

  vec3 calcColor = vec3(voronoiNoise1, voronoiNoise2, voronoiNoise3);
  calcColor *= 2.0;
  calcColor = pow(calcColor,vec3(4.0));

  vec3 voronoiColor = vec3(calcColor);

  bgColor += voronoiColor;

  return bgColor;
}
void main(){

  vec2 coord = vTexCoord;

  coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);

  gl_FragColor = vec4(createColor(coord), 1.0);
}