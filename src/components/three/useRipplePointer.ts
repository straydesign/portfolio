import { useRef, useEffect, useCallback } from "react";
import { useThree } from "@react-three/fiber";

const MIN_DISTANCE = 0.005; // minimum UV distance between injected drops

interface RipplePointerOptions {
  injectDrop: (uvX: number, uvY: number) => void;
  wallWidth: number;
  wallHeight: number;
}

/**
 * Tracks pointer movement and injects drops into the ripple simulation.
 * Converts screen coordinates → world coordinates → simulation UV space.
 */
export function useRipplePointer({
  injectDrop,
  wallWidth,
  wallHeight,
}: RipplePointerOptions) {
  const { size } = useThree();
  const lastUV = useRef({ x: -1, y: -1 });

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      // Screen → normalized [0,1]
      const nx = e.clientX / size.width;
      const ny = e.clientY / size.height;

      // Normalized → world (centered at origin)
      // Note: screen Y is inverted relative to world Y
      const worldX = (nx - 0.5) * wallWidth;
      const worldY = (0.5 - ny) * wallHeight;

      // World → simulation UV
      const uvX = worldX / wallWidth + 0.5;
      const uvY = worldY / wallHeight + 0.5;

      // Throttle: only inject when mouse moves enough
      const dx = uvX - lastUV.current.x;
      const dy = uvY - lastUV.current.y;
      if (dx * dx + dy * dy > MIN_DISTANCE * MIN_DISTANCE) {
        lastUV.current = { x: uvX, y: uvY };
        injectDrop(uvX, uvY);
      }
    },
    [injectDrop, wallWidth, wallHeight, size.width, size.height]
  );

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);
}
