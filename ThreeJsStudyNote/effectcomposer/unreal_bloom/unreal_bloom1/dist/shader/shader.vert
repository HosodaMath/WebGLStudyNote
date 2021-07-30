varying vec2 vTexCoord;
mat4 uProjectionMatrix;
mat4 uModelViewMatrix;
void main()
{
  vTexCoord = uv;
  uProjectionMatrix = projectionMatrix;
  uModelViewMatrix = modelViewMatrix;
  gl_Position = uProjectionMatrix *  uModelViewMatrix * vec4( position, 1.0 );
}