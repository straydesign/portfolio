"use client";

import dynamic from "next/dynamic";

const BrickWallCanvas = dynamic(
  () => import("./BrickWallCanvas"),
  { ssr: false }
);

interface BrickWallWrapperProps {
  theme?: "dark" | "light";
  accentColor?: string;
}

export function BrickWallWrapper({ theme = "dark", accentColor }: BrickWallWrapperProps) {
  return <BrickWallCanvas theme={theme} accentColor={accentColor} />;
}
