"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useCallback } from "react";
import { PerformanceMonitor, Preload } from "@react-three/drei";
import { BrickWallScene } from "./BrickWallScene";
import { ReducedMotionFallback } from "./ReducedMotionFallback";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface BrickWallCanvasProps {
  theme?: "dark" | "light";
  accentColor?: string;
}

export default function BrickWallCanvas({ theme = "dark", accentColor }: BrickWallCanvasProps) {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const [dpr, setDpr] = useState(1.5);
  const [ready, setReady] = useState(false);

  const handleCreated = useCallback(() => {
    requestAnimationFrame(() => setReady(true));
  }, []);

  const isDark = theme === "dark";

  if (prefersReducedMotion) {
    return <ReducedMotionFallback isDark={isDark} />;
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-1000 ${
          ready ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          background: isDark
            ? "linear-gradient(180deg, #0a0a0a 0%, #050505 50%, #0a0a0a 100%)"
            : "linear-gradient(180deg, #f5f5f5 0%, #eaeaea 50%, #f5f5f5 100%)",
        }}
      />

      <div
        className={`fixed inset-0 z-0 transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: "none" }}
      >
        <Canvas
          dpr={dpr}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          onCreated={handleCreated}
        >
          <PerformanceMonitor
            onDecline={() => setDpr(1)}
            onIncline={() =>
              setDpr(Math.min(1.5, window.devicePixelRatio))
            }
          >
            <Suspense fallback={null}>
              <BrickWallScene isDark={isDark} accentColor={accentColor} />
              <Preload all />
            </Suspense>
          </PerformanceMonitor>
        </Canvas>
      </div>
    </>
  );
}
