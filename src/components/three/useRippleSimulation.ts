import { useRef, useMemo, useCallback, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SIMULATION_VERT, SIMULATION_FRAG } from "./shaders/rippleSimulation";

const SIM_SIZE = 512;
const TEXEL = 1 / SIM_SIZE;

function createRenderTarget(): THREE.WebGLRenderTarget {
  return new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, {
    type: THREE.HalfFloatType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    depthBuffer: false,
    stencilBuffer: false,
  });
}

/** 1x1 black placeholder so shaders compile before first sim frame */
function createPlaceholder(): THREE.DataTexture {
  const data = new Float32Array([0, 0, 0, 1]);
  const tex = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat, THREE.FloatType);
  tex.needsUpdate = true;
  return tex;
}

interface RippleSimulation {
  texture: THREE.Texture;
  injectDrop: (uvX: number, uvY: number) => void;
}

export function useRippleSimulation(): RippleSimulation {
  const { gl } = useThree();

  const rtA = useMemo(() => createRenderTarget(), []);
  const rtB = useMemo(() => createRenderTarget(), []);
  const placeholder = useMemo(() => createPlaceholder(), []);
  const currentRef = useRef(0); // 0 = read A write B, 1 = read B write A

  const pendingDrop = useRef<{ x: number; y: number } | null>(null);
  const outputTexture = useRef<THREE.Texture>(placeholder);

  // Fullscreen quad scene for running the simulation
  const { simScene, simCamera, simMaterial } = useMemo(() => {
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const mat = new THREE.ShaderMaterial({
      vertexShader: SIMULATION_VERT,
      fragmentShader: SIMULATION_FRAG,
      uniforms: {
        uPrevState: { value: null },
        uTexelSize: { value: new THREE.Vector2(TEXEL, TEXEL) },
        uDamping: { value: 0.997 },
        uDropPos: { value: new THREE.Vector2(-1, -1) },
        uDropRadius: { value: 0.015 },
        uDropStrength: { value: 0.15 },
      },
      depthTest: false,
      depthWrite: false,
    });
    const geo = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geo, mat);
    const scene = new THREE.Scene();
    scene.add(quad);
    return { simScene: scene, simCamera: cam, simMaterial: mat };
  }, []);

  const injectDrop = useCallback((uvX: number, uvY: number) => {
    pendingDrop.current = { x: uvX, y: uvY };
  }, []);

  // Run simulation before main render
  useFrame(() => {
    const readTarget = currentRef.current === 0 ? rtA : rtB;
    const writeTarget = currentRef.current === 0 ? rtB : rtA;

    simMaterial.uniforms.uPrevState.value = readTarget.texture;

    // Set or clear drop
    const drop = pendingDrop.current;
    if (drop) {
      simMaterial.uniforms.uDropPos.value.set(drop.x, drop.y);
      pendingDrop.current = null;
    } else {
      simMaterial.uniforms.uDropPos.value.set(-1, -1);
    }

    // Render simulation step
    const prevTarget = gl.getRenderTarget();
    gl.setRenderTarget(writeTarget);
    gl.render(simScene, simCamera);
    gl.setRenderTarget(prevTarget);

    // Swap
    currentRef.current = currentRef.current === 0 ? 1 : 0;

    // Expose the just-written texture
    outputTexture.current = writeTarget.texture;
  }, -1); // priority -1 = before main render

  // Cleanup
  useEffect(() => {
    return () => {
      rtA.dispose();
      rtB.dispose();
      placeholder.dispose();
      simMaterial.dispose();
      simScene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
        }
      });
    };
  }, [rtA, rtB, placeholder, simMaterial, simScene]);

  // Return a proxy object that always reads the latest texture
  return useMemo(
    () => ({
      get texture() {
        return outputTexture.current;
      },
      injectDrop,
    }),
    [injectDrop]
  );
}
