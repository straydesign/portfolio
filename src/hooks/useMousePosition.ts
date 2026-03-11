"use client";

import { useEffect, useState } from "react";

type MousePosition = {
  x: number;
  y: number;
};

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    function handleMouseMove(e: MouseEvent) {
      setPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
