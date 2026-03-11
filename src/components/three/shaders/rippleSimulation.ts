/**
 * GPU-based water ripple simulation shaders.
 * Uses ping-pong render targets with a discrete wave equation.
 * RG channels store current and previous height values.
 */

export const SIMULATION_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const SIMULATION_FRAG = /* glsl */ `
  precision highp float;

  uniform sampler2D uPrevState;
  uniform vec2 uTexelSize;    // 1.0 / resolution
  uniform float uDamping;     // wave energy retention per frame
  uniform vec2 uDropPos;      // UV of injected drop (-1 = none)
  uniform float uDropRadius;
  uniform float uDropStrength;

  varying vec2 vUv;

  void main() {
    // Current height in R, previous height in G
    vec4 state = texture2D(uPrevState, vUv);
    float current = state.r;
    float previous = state.g;

    // Laplacian from 4 neighbors (discrete wave equation)
    float left  = texture2D(uPrevState, vUv + vec2(-uTexelSize.x, 0.0)).r;
    float right = texture2D(uPrevState, vUv + vec2( uTexelSize.x, 0.0)).r;
    float up    = texture2D(uPrevState, vUv + vec2(0.0,  uTexelSize.y)).r;
    float down  = texture2D(uPrevState, vUv + vec2(0.0, -uTexelSize.y)).r;

    float next = (left + right + up + down) * 0.5 - previous;
    next *= uDamping;

    // Inject drop at mouse position
    if (uDropPos.x >= 0.0) {
      float dist = distance(vUv, uDropPos);
      float drop = uDropStrength * smoothstep(uDropRadius, 0.0, dist);
      next += drop;
    }

    gl_FragColor = vec4(next, current, 0.0, 1.0);
  }
`;
