"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { KOI_SDF_LIB } from "./shaders/koiSDF";
import { KOI_VERT, KOI_FRAG } from "./shaders/koiFish";

function createPlaceholder(): THREE.DataTexture {
  const data = new Float32Array([0, 0, 0, 1]);
  const tex = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat, THREE.FloatType);
  tex.needsUpdate = true;
  return tex;
}

interface KoiFishPlaneProps {
  rippleTexture?: THREE.Texture;
  viewportSize: [number, number];
  isDark?: boolean;
}

export function KoiFishPlane({
  rippleTexture,
  viewportSize,
  isDark = true,
}: KoiFishPlaneProps) {
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const mousePresentRef = useRef(false);

  const placeholder = useMemo(() => createPlaceholder(), []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: KOI_VERT,
      fragmentShader: KOI_SDF_LIB + KOI_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uMousePresent: { value: 0 },
        uViewportSize: { value: new THREE.Vector2() },
        uRippleTex: { value: placeholder },
        uDarkMode: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      depthTest: true,
    });
  }, [placeholder]);

  // Pointer tracking → world coordinates
  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      mouseRef.current.set(
        (e.clientX / window.innerWidth - 0.5) * viewportSize[0],
        (0.5 - e.clientY / window.innerHeight) * viewportSize[1]
      );
      mousePresentRef.current = true;
    };
    const handleLeave = () => {
      mousePresentRef.current = false;
    };

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [viewportSize]);

  // Per-frame uniform updates
  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMouse.value.copy(mouseRef.current);
    material.uniforms.uMousePresent.value = mousePresentRef.current ? 1.0 : 0.0;
    material.uniforms.uViewportSize.value.set(viewportSize[0], viewportSize[1]);
    material.uniforms.uDarkMode.value = isDark ? 1.0 : 0.0;
    if (rippleTexture) {
      material.uniforms.uRippleTex.value = rippleTexture;
    }
  });

  // Cleanup
  useEffect(() => {
    return () => {
      material.dispose();
      placeholder.dispose();
    };
  }, [material, placeholder]);

  return (
    <mesh position={[0, 0, 0.15]} material={material}>
      <planeGeometry args={[viewportSize[0], viewportSize[1]]} />
    </mesh>
  );
}
