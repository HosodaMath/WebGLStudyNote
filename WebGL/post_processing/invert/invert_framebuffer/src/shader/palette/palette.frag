#version 300 es
precision highp float;
precision highp int;

uniform mat4 uNormalInvertMatrix;
uniform vec4 uAmbientMaterial;
uniform vec3 uDirectionalLight;
uniform vec3 uEyeDirection;
uniform float uTime;
uniform bool isTexture;
uniform sampler2D uTexture;
const float PI2 = 6.28318530718;
const float TAU = PI2;

// varying
in vec4 vColor;
in vec3 vNormal;
in vec2 vTexCoord;

// 最終的に出力される色
out vec4 fragColor;

vec3 fade(vec3 x){
  vec3 result = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);

  return result;
}

vec3 phash(vec3 p){
  p = fract(mat3(1.2989833, 7.8233198, 2.3562332,
                  6.7598192, 3.4857334, 8.2837193,
                   2.9175399, 2.9884245, 5.4987265) * p);
    p = ((2384.2345 * p - 1324.3438) * p + 3884.2243) * p - 4921.2354;
    return normalize(fract(p) * 2.0 - 1.0);
}

float noise(vec3 p)
{
    vec3 ip = floor(p);
    vec3 fp = fract(p);
    float d000 = dot(phash(ip), fp);
    float d001 = dot(phash(ip + vec3(0.0, 0.0, 1.0)), fp - vec3(0.0, 0.0, 1.0));
    float d010 = dot(phash(ip + vec3(0.0, 1.0, 0.0)), fp - vec3(0.0, 1.0, 0.0));
    float d011 = dot(phash(ip + vec3(0.0, 1.0, 1.0)), fp - vec3(0.0, 1.0, 1.0));
    float d100 = dot(phash(ip + vec3(1.0, 0.0, 0.0)), fp - vec3(1.0, 0.0, 0.0));
    float d101 = dot(phash(ip + vec3(1.0, 0.0, 1.0)), fp - vec3(1.0, 0.0, 1.0));
    float d110 = dot(phash(ip + vec3(1.0, 1.0, 0.0)), fp - vec3(1.0, 1.0, 0.0));
    float d111 = dot(phash(ip + vec3(1.0, 1.0, 1.0)), fp - vec3(1.0, 1.0, 1.0));
    fp = fade(fp);
    return mix(mix(mix(d000, d001, fp.z), mix(d010, d011, fp.z), fp.y),
              mix(mix(d100, d101, fp.z), mix(d110, d111, fp.z), fp.y), fp.x);
}

float fbm(vec3 value){
  const int Max = 5;
  float result = 0.0;
  float amp = 0.5;
  for(int i = 0; i < Max; i++){
    result += amp * noise(value);
    value *= 2.01;
    amp *= 0.5;
  }

  return result;
}


/*
  color(t) = a + b * cos(2pi(c * t + d))
*/
vec3 palette1(vec3 a, vec3 b, vec3 c, vec3 d, float t){
  return a + b * cos(TAU * (c * t + d));
}

/*
  color(t) = a + b * sin(2pi(c * t + d))
*/
vec3 palette2(vec3 a, vec3 b, vec3 c, vec3 d, float t){
  return a + b * sin(TAU * (c * t + d));
}

void main(void){

  vec2 uv = vTexCoord;
  // vec3 uv10 = vec3(uv, uTime * 0.005);
  vec3 uv10 = vec3(uv, 0.005);
  vec4 bgColor = vec4(vec3(fbm(uv10) / 2.0 + 0.5), 1.0);
  if(isTexture == false){
    vec4 color1 = vec4(palette2(vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0, 0.333, 0.666), uv.x), 1.0);
    vec4 color2 = vec4(palette2(vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0, 0.333, 0.666), uv.y), 1.0);
    bgColor += vec4(vec3(mix(color1, color2, length(vNormal))), 1.0);
  } else {
    bgColor = texture(uTexture, vTexCoord);
  }

  fragColor = bgColor;
}