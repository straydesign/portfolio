/**
 * GLSL utility library for procedural koi fish rendering via 2D SDFs.
 * Prepended to the koi fragment shader at material creation time.
 */

export const KOI_SDF_LIB = /* glsl */ `

// ─── Hash & Noise ────────────────────────────────────────────────

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 2; i++) {
    v += a * valueNoise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

// ─── SDF Primitives ──────────────────────────────────────────────

mat2 rot2d(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float sdEllipse(vec2 p, vec2 r) {
  return (length(p / r) - 1.0) * min(r.x, r.y);
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// ─── Koi Body SDF ────────────────────────────────────────────────
// Composite of smooth-unioned ellipses forming a koi fish shape.
// p: fish-local coords, tailFlap: wave value at tail, sz: size scale

float koiBodySDF(vec2 p, float tailFlap, float sz) {
  p /= sz;

  // Main body
  float body = sdEllipse(p, vec2(0.22, 0.07));

  // Head — slightly forward and up
  float head = sdEllipse(p - vec2(0.16, 0.005), vec2(0.09, 0.06));
  float d = smin(body, head, 0.04);

  // Tail stock — narrow connector
  float ts = sdEllipse(p - vec2(-0.2, 0.0), vec2(0.1, 0.022));
  d = smin(d, ts, 0.03);

  // Tail fin lobes — V-shape with flap rotation
  vec2 tc = vec2(-0.32, 0.0);
  vec2 pu = rot2d(-0.35 + tailFlap * 0.3) * (p - tc - vec2(0.0, 0.03));
  float tu = sdEllipse(pu, vec2(0.07, 0.022));
  vec2 pl = rot2d(0.35 - tailFlap * 0.3) * (p - tc + vec2(0.0, 0.03));
  float tl = sdEllipse(pl, vec2(0.07, 0.022));
  d = smin(d, tu, 0.025);
  d = smin(d, tl, 0.025);

  // Dorsal fin
  float df = sdEllipse(p - vec2(-0.02, 0.075), vec2(0.055, 0.014));
  d = smin(d, df, 0.015);

  // Pectoral fin — angled under body
  vec2 pp = rot2d(-0.25) * (p - vec2(0.04, -0.06));
  float pf = sdEllipse(pp, vec2(0.035, 0.01));
  d = smin(d, pf, 0.012);

  return d * sz;
}

// ─── Koi Pattern Color ───────────────────────────────────────────
// 5 koi varieties: Kohaku, Sanke, Showa, Ogon, Tancho.
// p: normalized fish-local coords (p / sizeScale)

vec3 koiPatternColor(vec2 p, float seed, int pType) {
  float n1 = fbm(p * 5.0 + seed * 13.7);
  float n2 = fbm(p * 7.0 + seed * 27.3 + 50.0);
  float n3 = fbm(p * 3.0 + seed * 41.1 + 100.0);

  vec3 white  = vec3(0.96, 0.94, 0.90);
  vec3 orange = vec3(0.92, 0.42, 0.08);
  vec3 red    = vec3(0.88, 0.12, 0.06);
  vec3 black  = vec3(0.06, 0.05, 0.04);
  vec3 gold   = vec3(0.90, 0.75, 0.30);

  vec3 col;

  if (pType == 0) {
    // Kohaku — orange patches on white
    float m = smoothstep(0.42, 0.58, n1);
    col = mix(white, orange, m);
  } else if (pType == 1) {
    // Sanke — red + small black marks on white
    float rm = smoothstep(0.42, 0.58, n1);
    float bm = smoothstep(0.62, 0.72, n2);
    col = mix(white, red, rm);
    col = mix(col, black, bm);
  } else if (pType == 2) {
    // Showa — black base with red and white patches
    float rm = smoothstep(0.38, 0.52, n1);
    float wm = smoothstep(0.55, 0.65, n3);
    col = mix(black, red, rm);
    col = mix(col, white, wm);
  } else if (pType == 3) {
    // Ogon — solid metallic gold with shimmer
    float sh = fbm(p * 10.0 + seed * 7.0) * 0.08;
    col = gold + sh;
  } else {
    // Tancho — white body + red circle on head
    col = white;
    float hd = smoothstep(0.05, 0.02, length(p - vec2(0.12, 0.0)));
    col = mix(col, red, hd);
  }

  // Subtle scale texture
  float scales = sin(p.x * 35.0) * sin(p.y * 45.0) * 0.015;
  col += scales;

  // Eyes (both visible in top-down view)
  float e1 = length(p - vec2(0.21, 0.022));
  float e2 = length(p - vec2(0.21, -0.022));
  float ed = min(e1, e2);
  if (ed < 0.013) {
    col = vec3(0.05);
    vec2 ce = e1 < e2 ? vec2(0.21, 0.022) : vec2(0.21, -0.022);
    float specDist = length(p - ce - vec2(0.003, 0.003));
    if (specDist < 0.004) {
      col = vec3(0.9);
    }
  }

  return col;
}

`;
