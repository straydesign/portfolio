"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function MouseLight() {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((state) => {
    if (!lightRef.current) return;

    // Mouse biases direction loosely — not a direct follow
    const targetX = (mouse.current.x - 0.5) * 6;
    const targetY = -(mouse.current.y - 0.5) * 6;

    // Add slow organic drift so it feels alive
    const t = state.clock.elapsedTime;
    const driftX = Math.sin(t * 0.3) * 1.5;
    const driftY = Math.cos(t * 0.2) * 1.0;

    // Very lazy follow — takes its time getting there
    current.current.x += ((targetX + driftX) - current.current.x) * 0.012;
    current.current.y += ((targetY + driftY) - current.current.y) * 0.012;

    lightRef.current.position.set(
      current.current.x,
      current.current.y,
      8
    );
  });

  return (
    <directionalLight
      ref={lightRef}
      intensity={4}
      color="#ffffff"
      position={[0, 0, 8]}
    />
  );
}
