/**
 * Koi fish vertex + fragment shaders.
 * Fragment shader expects KOI_SDF_LIB to be prepended at material creation.
 */

export const KOI_VERT = /* glsl */ `
  varying vec2 vUv;
  varying vec2 vWorldXY;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldXY = worldPos.xy;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const KOI_FRAG = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMousePresent;
  uniform vec2 uViewportSize;
  uniform sampler2D uRippleTex;
  uniform float uDarkMode;

  varying vec2 vUv;
  varying vec2 vWorldXY;

  #define NUM_FISH 7
  #define RIPPLE_TEXEL (1.0 / 512.0)
  #define REFRACTION_STRENGTH 0.12
  #define SCATTER_RADIUS 1.5

  void main() {
    vec2 wp = vWorldXY;

    // ── Ripple refraction (Sobel gradient) ──
    vec2 ruv = wp / uViewportSize + 0.5;
    float hL = texture2D(uRippleTex, ruv + vec2(-RIPPLE_TEXEL, 0.0)).r;
    float hR = texture2D(uRippleTex, ruv + vec2( RIPPLE_TEXEL, 0.0)).r;
    float hU = texture2D(uRippleTex, ruv + vec2(0.0,  RIPPLE_TEXEL)).r;
    float hD = texture2D(uRippleTex, ruv + vec2(0.0, -RIPPLE_TEXEL)).r;
    vec2 refr = vec2(hL - hR, hD - hU) * REFRACTION_STRENGTH;
    wp += refr;

    float rippleHeight = texture2D(uRippleTex, ruv).r;

    // ── Fish accumulator ──
    vec3 finalColor = vec3(0.0);
    float finalAlpha = 0.0;

    for (int i = 0; i < NUM_FISH; i++) {
      float seed = float(i) * 1.618033 + 0.5;

      // Per-fish parameters from hash
      float sz    = 0.8 + hash21(vec2(seed, 0.0)) * 0.4;
      int   pType = int(mod(floor(hash21(vec2(seed, 1.0)) * 5.0), 5.0));

      // Elliptical orbit — smooth continuous swimming, no reversals
      float orbitSpeed = 0.08 + hash21(vec2(seed, 2.0)) * 0.07;
      float phase = hash21(vec2(seed, 7.0)) * 6.283;
      float dir = hash21(vec2(seed, 11.0)) > 0.5 ? 1.0 : -1.0;
      float angle = uTime * orbitSpeed + phase;

      float ax = uViewportSize.x * (0.25 + hash21(vec2(seed, 3.0)) * 0.2);
      float ay = uViewportSize.y * (0.12 + hash21(vec2(seed, 4.0)) * 0.15);

      // Offset orbit center so fish spread across viewport
      vec2 orbitCenter = vec2(
        (hash21(vec2(seed, 13.0)) - 0.5) * uViewportSize.x * 0.3,
        (hash21(vec2(seed, 14.0)) - 0.5) * uViewportSize.y * 0.3
      );

      vec2 center = orbitCenter + vec2(cos(angle) * ax, sin(angle) * ay * dir);

      // Heading from derivative (always smooth for circular paths)
      vec2 vel = vec2(-sin(angle) * ax, cos(angle) * ay * dir) * orbitSpeed;
      float heading = atan(vel.y, vel.x);

      // Mouse avoidance
      if (uMousePresent > 0.5) {
        vec2 toFish = center - uMouse;
        float md = length(toFish);
        if (md < SCATTER_RADIUS) {
          float ps = (SCATTER_RADIUS - md) / SCATTER_RADIUS;
          ps *= ps;
          vec2 pushDir = normalize(toFish);
          float perpBias = (hash21(vec2(seed, 9.0)) - 0.5) * 2.0;
          vec2 perp = vec2(-pushDir.y, pushDir.x) * perpBias;
          center += (pushDir + perp * 0.5) * ps * 0.8;
        }
      }

      // Bounding box early-exit
      float br = 0.55 * sz;
      vec2 toFrag = wp - center;
      if (dot(toFrag, toFrag) < br * br) {

        // Fish-local space (rotated to face heading)
        mat2 rm = rot2d(-heading);
        vec2 lp = rm * toFrag;

        // Body undulation — gentle, amplitude increases head→tail
        float bodyProgress = clamp((-lp.x / sz + 0.25) / 0.6, 0.0, 1.0);
        float wave = sin(lp.x / sz * 10.0 + uTime * 2.5);
        lp.y -= wave * bodyProgress * bodyProgress * 0.025 * sz;

        // SDF evaluation
        float sdf = koiBodySDF(lp, wave * bodyProgress, sz);

        if (sdf < 0.002) {
          // Pattern color in normalized fish coords
          vec2 np = lp / sz;
          vec3 kc = koiPatternColor(np, seed, pType);

          // Caustic brightness from ripple height
          kc *= 1.0 + rippleHeight * 0.3;

          // Subtle edge rim highlight
          float rim = smoothstep(-0.008, 0.0, sdf) * smoothstep(0.003, 0.0, sdf);
          kc += rim * 0.12;

          // Anti-aliased edge alpha
          float ea = smoothstep(0.002, -0.005, sdf);

          // Over-operator alpha blend
          finalColor = mix(finalColor, kc, ea * (1.0 - finalAlpha));
          finalAlpha += ea * (1.0 - finalAlpha);
        }
      }
    }

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;
