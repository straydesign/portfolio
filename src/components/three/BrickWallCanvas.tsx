"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useCallback, useEffect, Component, type ReactNode } from "react";
import { PerformanceMonitor, Preload } from "@react-three/drei";
import { BrickWallScene } from "./BrickWallScene";
import { ReducedMotionFallback } from "./ReducedMotionFallback";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* ------------------------------------------------------------------ */
/*  WebGL support detection                                            */
/* ------------------------------------------------------------------ */
function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    return gl instanceof WebGLRenderingContext || gl instanceof WebGL2RenderingContext;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Error boundary — catches R3F "Error creating WebGL context" etc.  */
/* ------------------------------------------------------------------ */
interface WebGLErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
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
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglSupported(detectWebGLSupport());
  }, []);

  const handleCreated = useCallback(() => {
    requestAnimationFrame(() => setReady(true));
  }, []);

  const isDark = theme === "dark";

  if (prefersReducedMotion || webglSupported === false) {
    return <ReducedMotionFallback isDark={isDark} />;
  }

  // Still detecting — show the gradient placeholder to avoid a flash
  if (webglSupported === null) {
    return (
      <div
        className="fixed inset-0 z-0"
        style={{
          background: isDark
            ? "linear-gradient(180deg, #0a0a0a 0%, #050505 50%, #0a0a0a 100%)"
            : "linear-gradient(180deg, #f5f5f5 0%, #eaeaea 50%, #f5f5f5 100%)",
        }}
      />
    );
  }

  return (
    <WebGLErrorBoundary fallback={<ReducedMotionFallback isDark={isDark} />}>
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
    </WebGLErrorBoundary>
  );
}
