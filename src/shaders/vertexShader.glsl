attribute vec2 a_position;
attribute vec2 a_texCoord;

varying vec2 v_texCoord;

uniform vec2 u_spritePosition;
uniform vec2 u_spriteSize;

void main() {
  gl_Position = vec4(a_position, 0, 1);
  v_texCoord = a_texCoord * u_spriteSize + u_spritePosition;
}