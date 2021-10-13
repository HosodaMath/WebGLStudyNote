precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

varying vec2 vTexCoord;

// 座標変換
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

vec4 createGeometry(vec2 coord){
  float time = abs(sin(uTime));
  coord = rotateLoop(coord, uTime);
  vec4 color1 = vec4(0.0039, 0.0078, 0.2392, 1.0);
  vec4 color2 = vec4(0.3137, 0.3216, 0.6784, 1.0);
  vec4 calcColor = mix(color1, color2, coord.y);
  
  return calcColor;
}

void main(){

  vec2 coord = vTexCoord;

  gl_FragColor = createGeometry(coord);
}