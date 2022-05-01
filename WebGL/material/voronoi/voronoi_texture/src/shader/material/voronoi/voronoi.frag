#version 300 es
precision highp float;
precision highp int;

// uniform 
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

// varying
in vec3 vNormal;
in vec2 vTexCoord;

out vec4 fragColor;

const float PI2 = 6.28318530718;
const float TAU = PI2;

vec2 rotateLoop(vec2 uv, float radian){
  const int loopMax = 10;
  for(int i = 0; i < loopMax; i++){
    uv = abs(uv * 1.5) - 1.0;
    float a = radian * float(i);
    float c = cos(a);
    float s = sin(a);
    uv *= mat2(c, s, -s, c);
  }

  return uv;
}

//乱数2
vec2 random2(vec2 value){
  return fract(sin(vec2(dot(value, vec2(127.1, 311.7)), dot(value, vec2(269.5, 183.3)))) * 43758.5453);
}

// ボロノイ
float voronoi(vec2 coord){
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

float circle(vec2 uv, float radius){
  return length(uv) - radius;
}

float hexagon(vec2 uv, float r){
  const vec3 k = vec3(-0.866025404,0.5,0.577350269);
  uv = abs(uv);
  uv -= 2.0 * min(dot(k.xy, uv), 0.0) * k.xy;
  uv -= vec2(clamp(uv.x, -k.z * r, k.z * r), r);

  return length(uv) * sign(uv.y);
}


vec4 voronoiColor(vec2 uv){

  float polygonSize = 0.5;
  float d = hexagon(uv, polygonSize);

  float voronoi1 = voronoi(uv);
  float voronoi2 = voronoi(uv);
  float voronoi3 = voronoi(uv);
  vec4 color1 = vec4(0.100, 1.0, voronoi1, 1.0);
  vec4 color2 = vec4(0.100, voronoi2, voronoi3, 1.0);
  vec4 color = mix(color1, color2, d);
  
  return color;
}

/*
  color(t) = a + b * cos(2pi(c * t + d))
*/
vec3 paletteCos(vec3 a, vec3 b, vec3 c, vec3 d, float t){
  return a + b * cos(PI2 * (c * t + d));
}

/*
  color(t) = a + b * sin(2pi(c * t + d))
*/
vec3 paletteSin(vec3 a, vec3 b, vec3 c, vec3 d, float t){
  return a + b * sin(PI2 * (c * t + d));
}

void main(void){
  //vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x ,uResolution.y);
  // vec2 uv = vTexCoord;

  float polygonSize = 0.5;
  float hexagon1 = hexagon(uv, polygonSize);
  float circle1 = circle(uv, 0.5);
  float t = sin(uTime * 5.0) * 0.5 + 0.5;
  float morphine = smoothstep(-0.5, 0.5, mix(circle1, hexagon1, t));

  float slowScale = 0.005;
  float colorChangeTime1 = clamp(cos(uTime * slowScale), 0.0, 1.0);
  float colorChangeTime2 = clamp(sin(uTime * slowScale), 0.0, 1.0);
  
  float colorChange1 = uMouse.x;
  float colorChange2 = uMouse.y;
  
  vec3 color1 = paletteCos(
    vec3(0.5, 0.5, 0.5), 
    vec3(0.5, 0.5, 0.5), 
    vec3(1.0, 1.0, 1.0), 
    vec3(colorChangeTime1, colorChange1, 0.666),
    morphine
  );

  vec3 color2 = paletteSin(
    vec3(0.0, 0.5, 0.5), 
    vec3(0.0, 0.5, 0.5), 
    vec3(1.0, 1.0, 1.0), 
    vec3(colorChangeTime2, colorChange2, 0.2), 
    morphine
  );

  uv = rotateLoop(uv, uTime * 0.005);

  vec4 bgColor = vec4(vec3(0.0), 1.0);

  bgColor += voronoiColor(uv);
  //bgColor += vec4(mix(color1, color2, hexagon(uv, polygonSize)), 1.0);
  bgColor += vec4(mix(color1, color2, hexagon1), 1.0);

  fragColor = bgColor;
}