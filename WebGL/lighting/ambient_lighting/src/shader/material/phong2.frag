#version 300 es
precision highp float;
precision highp int;
uniform mat4 uInvertMatrix;
uniform vec4 uAmbientColor;
uniform vec3 uLightDirecton;
uniform vec3 uEyeDirection;
uniform vec2 uResolution;
uniform float uTime;

in vec4 vColor;
in vec3 vNormal;
in vec2 vTexCoord;

out vec4 fragColor;

const float PI2 = 6.28318530718;

vec2 waveEffect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}

float random(vec3 value){
  return fract(sin(dot(value, vec3(12.9898, 78.233, 19.8321))) * 43758.5453);
}

float noise(vec3 value){
  vec3 i = floor(value);
  vec3 f = smoothstep(0.0, 1.0, fract(value));
  float color1 = 	mix(
		mix(random(i), random(i + vec3(1.0, 0.0, 0.0)), f.x),
		mix(random(i + vec3(0.0, 1.0, 0.0)), random(i + vec3(1.0, 1.0, 0.0)), f.x),
		f.y
	);
  float color2 = mix(
		mix(random(i + vec3(0.0, 0.0, 1.0)), random(i + vec3(1.0, 0.0, 1.0)), f.x),
		mix(random(i + vec3(0.0, 1.0, 1.0)), random(i + vec3(1.0, 1.0, 1.0)), f.x),
		f.y
	);
  return mix(color1,color2,f.z);
}

float fbm(vec3 value){
  float result = 0.0;
  float amp = 0.5;
  for(int i = 0; i < 5; i++){
    result += amp * noise(value);
    value *= 2.01;
    amp *= 0.5;
  }

  return result;
}

vec4 createWarter(vec2 position){
  vec3 color = vec3(
    0.2, 
    fbm(vec3(position * 10.0, abs(sin(uTime * 0.5)))), 
    1.0);

  vec2 q = vec2(0.0);
  q.x = fbm(vec3(position * 10.0, abs(cos(uTime * 0.5))));
  q.y = fbm(vec3(position * 10.0, abs(sin(uTime * 0.5))));

  vec2 r = vec2(0.0);
  r.x = fbm(vec3(position + 1.0 * q + vec2(1.7, 9.2), 0.15 * uTime));
  r.y = fbm(vec3(position + 1.0 * q + vec2(8.3, 2.8), 0.126 * uTime));

  float f = fbm(vec3(position + q, uTime * 0.1));

  color = mix(
    vec3(0.2039, 0.102, 0.6667), 
    vec3(0.4, 0.6, 0.9), 
    clamp((f * f) * 4.0, 0.0, 1.0)
  );

  color = mix(
    color, 
    vec3(0.025, 0.035, 0.5), 
    clamp(length(q), 0.0, 1.0)
  );

  color = mix(
    color, 
    vec3(0.1, 0.45, 1.0), 
    clamp(length(r.x), 0.0, 1.0)
  );

  vec4 calcColor = vec4(vec3(f * f * f + 0.6 * f * f + 0.5 * f) * color, 1.0);

  return calcColor;
}


void main(void){

  vec2 coord = vTexCoord;
  // coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y); 
  coord  = waveEffect(coord);
  vec3 invertLight = normalize(uInvertMatrix * vec4(uLightDirecton, 0.0)).xyz;
  vec3 invertEye = normalize(uInvertMatrix * vec4(uEyeDirection, 0.0)).xyz;
  vec3 invertLightEye = normalize(invertLight + invertEye);
  float diffuse = clamp(dot(vNormal, invertLight), 0.0, 1.0);
  float specular = pow(clamp(dot(vNormal, invertLightEye), 0.0, 1.0), 50.0);
  vec4 bgColor = vColor;
  vec2 coord10 = coord * 10.0;
  vec4 waterColor = createWarter(coord10);
  bgColor += waterColor;
  vec4 color = bgColor + vec4(vec3(diffuse), 1.0) + vec4(vec3(specular), 1.0) * uAmbientColor;  
  
  fragColor = color;

}