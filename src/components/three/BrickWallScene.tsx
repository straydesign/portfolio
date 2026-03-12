"use client";

import { useRef, useMemo, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three-stdlib";
import { MouseLight } from "./MouseLight";
import { GroutPlane } from "./GroutPlane";
import { KoiFishPlane } from "./KoiFishPlane";
import { useRippleSimulation } from "./useRippleSimulation";
import { useRipplePointer } from "./useRipplePointer";

const BRICK_W = 0.85;
const BRICK_H = 0.35;
const BRICK_D = 0.1;
const GAP = 0.04;
const CORNER_RADIUS = 0.035;
const CORNER_SEGMENTS = 3;

const SIM_SIZE = 512;
const RIPPLE_TEXEL = 1 / SIM_SIZE;
const BRICK_RIPPLE_STRENGTH = 8.0;

function generateBrickPositions(
  viewW: number,
  viewH: number
): [number, number, number][] {
  const stepX = BRICK_W + GAP;
  const stepY = BRICK_H + GAP;
  const cols = Math.ceil(viewW / stepX) + 4;
  const rows = Math.ceil(viewH / stepY) + 4;
  const positions: [number, number, number][] = [];

  for (let row = 0; row < rows; row++) {
    const offset = row % 2 === 0 ? 0 : stepX / 2;
    for (let col = 0; col < cols; col++) {
      positions.push([
        -(cols * stepX) / 2 + col * stepX + offset,
        -(rows * stepY) / 2 + row * stepY,
        0,
      ]);
    }
  }

  return positions;
}

interface BrickWallSceneProps {
  isDark?: boolean;
  accentColor?: string;
}

export function BrickWallScene({ isDark = true, accentColor }: BrickWallSceneProps) {
  const { viewport } = useThree();
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { texture: rippleTexture, injectDrop } = useRippleSimulation();
  const wallWidth = viewport.width + 2;
  const wallHeight = viewport.height + 2;
  useRipplePointer({ injectDrop, wallWidth, wallHeight });

  const geometry = useMemo(
    () =>
      new RoundedBoxGeometry(
        BRICK_W,
        BRICK_H,
        BRICK_D,
        CORNER_SEGMENTS,
        CORNER_RADIUS
      ),
    []
  );

  const brickColor = isDark ? "#111111" : "#e0e0e0";
  const brickRoughness = isDark ? 0.08 : 0.12;
  const envBgColor = isDark ? "#050505" : "#d0d0d0";
  const groutColor = isDark ? "#3a3a3a" : "#c8c8c8";
  const ambientIntensity = isDark ? 0.5 : 0.8;

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(brickColor),
      metalness: 1,
      roughness: brickRoughness,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uRippleTex = { value: null };
      shader.uniforms.uRippleNormalStrength = { value: BRICK_RIPPLE_STRENGTH };
      shader.uniforms.uRippleTexelSize = { value: new THREE.Vector2(RIPPLE_TEXEL, RIPPLE_TEXEL) };
      shader.uniforms.uViewportSize = { value: new THREE.Vector2(wallWidth, wallHeight) };

      mat.userData.shader = shader;

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
          #ifdef USE_INSTANCING
            vWorldPos = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
          #else
            vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
          #endif
        `
      );

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

    mat.customProgramCacheKey = () => `brick-ripple-${isDark ? "dark" : "light"}`;

    return mat;
  }, [wallWidth, wallHeight, brickColor, brickRoughness, isDark]);

  const positions = useMemo(
    () => generateBrickPositions(wallWidth, wallHeight),
    [wallWidth, wallHeight]
  );

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    positions.forEach((pos, i) => {
      dummy.position.set(pos[0], pos[1], pos[2]);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  useFrame(() => {
    const shader = material.userData.shader;
    if (shader) {
      shader.uniforms.uRippleTex.value = rippleTexture;
    }
  });

  // Accent color for the fill light (subtle tint)
  const fillColor = accentColor || (isDark ? "#ccd" : "#dde");

  return (
    <>
      <Environment resolution={128} background={false}>
        <mesh scale={50}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={envBgColor} side={THREE.BackSide} />
        </mesh>
        <Lightformer
          position={[0, 4, -3]}
          scale={[30, 8, 1]}
          intensity={isDark ? 2.5 : 4}
          color="#ffffff"
        />
        <Lightformer
          position={[-2, -4, 4]}
          scale={[24, 6, 1]}
          intensity={isDark ? 1 : 1.5}
          color={fillColor}
        />
        <Lightformer
          position={[0, 0, -8]}
          scale={[30, 20, 1]}
          intensity={isDark ? 0.3 : 0.5}
          color={isDark ? "#111" : "#bbb"}
        />
      </Environment>

      <ambientLight intensity={ambientIntensity} />

      <GroutPlane
        rippleTexture={rippleTexture}
        viewportSize={[wallWidth, wallHeight]}
        groutColor={groutColor}
        isDark={isDark}
      />

      <instancedMesh
        ref={meshRef}
        args={[geometry, material, positions.length]}
        frustumCulled={false}
      />

      <KoiFishPlane
        rippleTexture={rippleTexture}
        viewportSize={[wallWidth, wallHeight]}
        isDark={isDark}
      />

      <MouseLight />
    </>
  );
}
