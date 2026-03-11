"use client";

import { useMemo, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BRICK_D = 0.1;
const SIM_SIZE = 512;
const RIPPLE_TEXEL = 1 / SIM_SIZE;
const GROUT_RIPPLE_STRENGTH = 3.0;

// Generate a rough normal map procedurally — no file to load
function createGroutNormalMap(size: number = 256): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base neutral normal (128, 128, 255)
  ctx.fillStyle = "rgb(128, 128, 255)";
  ctx.fillRect(0, 0, size, size);

  // Add grainy noise to simulate rough concrete/mortar
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 40;
    data[i] = Math.max(0, Math.min(255, 128 + noise));         // R (x normal)
    data[i + 1] = Math.max(0, Math.min(255, 128 + noise * 0.8)); // G (y normal)
    // B stays ~255 (z normal pointing out)
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(20, 20);
  return texture;
}

interface GroutPlaneProps {
  rippleTexture?: THREE.Texture;
  viewportSize?: [number, number];
  groutColor?: string;
  isDark?: boolean;
}

export function GroutPlane({ rippleTexture, viewportSize, groutColor = "#3a3a3a", isDark = true }: GroutPlaneProps) {
  const { viewport } = useThree();
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  const normalMap = useMemo(() => createGroutNormalMap(), []);

  const vw = viewportSize?.[0] ?? viewport.width + 2;
  const vh = viewportSize?.[1] ?? viewport.height + 2;

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: groutColor,
      roughness: isDark ? 0.85 : 0.7,
      metalness: isDark ? 0.08 : 0.05,
      normalMap,
      normalScale: new THREE.Vector2(0.6, 0.6),
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uRippleTex = { value: null };
      shader.uniforms.uRippleNormalStrength = { value: GROUT_RIPPLE_STRENGTH };
      shader.uniforms.uRippleTexelSize = { value: new THREE.Vector2(RIPPLE_TEXEL, RIPPLE_TEXEL) };
      shader.uniforms.uViewportSize = { value: new THREE.Vector2(vw, vh) };

      mat.userData.shader = shader;

      // Vertex: pass world position
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        /* glsl */ `
          #include <common>
          varying vec3 vWorldPos;
        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <worldpos_vertex>",
        /* glsl */ `
          #include <worldpos_vertex>
          vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
        `
      );

      // Fragment: ripple normal perturbation
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        /* glsl */ `
          #include <common>
          varying vec3 vWorldPos;
          uniform sampler2D uRippleTex;
          uniform float uRippleNormalStrength;
          uniform vec2 uRippleTexelSize;
          uniform vec2 uViewportSize;
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <normal_fragment_maps>",
        /* glsl */ `
          #include <normal_fragment_maps>

          vec2 rippleUV = vWorldPos.xy / uViewportSize + 0.5;

          float hL = texture2D(uRippleTex, rippleUV + vec2(-uRippleTexelSize.x, 0.0)).r;
          float hR = texture2D(uRippleTex, rippleUV + vec2( uRippleTexelSize.x, 0.0)).r;
          float hU = texture2D(uRippleTex, rippleUV + vec2(0.0,  uRippleTexelSize.y)).r;
          float hD = texture2D(uRippleTex, rippleUV + vec2(0.0, -uRippleTexelSize.y)).r;

          vec3 rippleNormal = normalize(vec3(
            (hL - hR) * uRippleNormalStrength,
            (hD - hU) * uRippleNormalStrength,
            1.0
          ));

          normal = normalize(normal + rippleNormal.xyz * vec3(1.0, 1.0, 0.0));
        `
      );
    };

    mat.customProgramCacheKey = () => `grout-ripple-${isDark ? "dark" : "light"}`;

    return mat;
  }, [normalMap, vw, vh]);

  // Update ripple texture uniform each frame
  useFrame(() => {
    const shader = material.userData.shader;
    if (shader && rippleTexture) {
      shader.uniforms.uRippleTex.value = rippleTexture;
    }
  });

  return (
    <mesh position={[0, 0, -BRICK_D / 2 - 0.01]} material={material}>
      <planeGeometry args={[viewport.width + 6, viewport.height + 6]} />
    </mesh>
  );
}
