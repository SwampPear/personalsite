const fragmentShader = `
uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec2 vUv;

void main(void) {
  gl_FragColor = vec4(mix(uColor1, uColor2, vUv.y), 1.0);
}
`

export default fragmentShader