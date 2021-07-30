mat4 uProjectionMatrix;
mat4 uModelViewMatrix;
varying vec2 vTexCoord;
    
void main()
{
  vTexCoord = uv;
  uProjectionMatrix = projectionMatrix;
  uModelViewMatrix = modelViewMatrix;
  gl_Position = uProjectionMatrix *  uModelViewMatrix * vec4( position, 1.0 );
}