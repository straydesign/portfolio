'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface PhoneMockupProps {
  screenshot: string;
  gradientFrom?: string;
  gradientTo?: string;
  title?: string;
  description?: string;
  deliverable?: string;
  alt?: string;
  textColor?: string;
  secondaryTextColor?: string;
  onClick?: () => void;
  introVideoSrc?: string;
  size?: 'default' | 'large' | 'tiny';
}

export default function PhoneMockup({
  screenshot,
  gradientFrom = '#888888',
  gradientTo = '#000000',
  title,
  description,
  deliverable,
  alt = 'App screenshot',
  textColor,
  secondaryTextColor,
  onClick,
  introVideoSrc,
  size = 'default',
}: PhoneMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isTiny = size === 'tiny';
  const phoneWidth = size === 'large'
    ? (isDesktop ? 300 : 330)
    : isTiny
    ? (isDesktop ? 110 : 100)
    : (isDesktop ? 240 : 270);
  const phoneHeight = size === 'large'
    ? (isDesktop ? 600 : 660)
    : isTiny
    ? (isDesktop ? 238 : 217)
    : (isDesktop ? 480 : 540);

  if (isTiny) {
    return (
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: phoneWidth, height: phoneHeight }}>
          <div
            className="absolute inset-0"
            style={{
              borderRadius: 16,
              background: 'linear-gradient(145deg, #3a3a3a, #1a1a1a, #0a0a0a, #2a2a2a)',
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.12),
                inset 0 -1px 0 rgba(0,0,0,0.4),
                0 0 0 0.5px rgba(255,255,255,0.06),
                0 8px 20px rgba(0,0,0,0.3)
              `,
            }}
          />
          <div
            className="absolute overflow-hidden"
            style={{
              top: 2, left: 2, right: 2, bottom: 2,
              borderRadius: 14,
              background: '#000',
            }}
          >
            <img
              src={screenshot}
              alt={alt}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                top: 4, width: 36, height: 10, borderRadius: 5,
                background: '#000', zIndex: 10,
              }}
            />
            <div
              className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                width: phoneWidth * 0.35, height: 2, borderRadius: 1,
                background: 'rgba(255,255,255,0.25)', zIndex: 11,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'link' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      {/* Title & description — above the phone so it's visible without scrolling */}
      {(title || description) && (
        <div className="w-full mb-4" style={textColor ? { color: textColor } : undefined}>
          {title && (
            <p className="text-base md:text-lg font-bold tracking-tight">{title}</p>
          )}
          {description && (
            <p className="text-sm mt-1.5 leading-relaxed" style={{ color: secondaryTextColor || textColor, opacity: secondaryTextColor ? 1 : 0.65 }}>{description}</p>
          )}
          {deliverable && (
            <p className="text-xs mt-2 font-semibold uppercase tracking-wider" style={{ color: secondaryTextColor || textColor, opacity: 0.5 }}>{deliverable}</p>
          )}
        </div>
      )}

      {/* 3D phone container */}
      <motion.div
        ref={containerRef}
        className="flex items-center justify-center relative"
        style={{
          perspective: '1000px',
          rotateX,
          rotateY,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        {/* Phone device */}
        <motion.div
          className="relative"
          style={{ width: phoneWidth, height: phoneHeight }}
          animate={{ y: isHovered ? -8 : 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Phone bezel */}
          <div
            className="absolute inset-0 rounded-[28px] transition-shadow duration-500"
            style={{
              background: 'linear-gradient(145deg, #3a3a3a, #1a1a1a, #0a0a0a, #2a2a2a)',
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.15),
                inset 0 -1px 0 rgba(0,0,0,0.4),
                0 0 0 0.5px rgba(255,255,255,0.06),
                0 20px 50px rgba(0,0,0,0.4)
              `,
            }}
          />

          {/* Side buttons */}
          <div
            className="absolute rounded-sm"
            style={{
              right: -2, top: '25%', width: 2, height: 30,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
            }}
          />
          <div
            className="absolute rounded-sm"
            style={{
              left: -2, top: '20%', width: 2, height: 20,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.03))',
            }}
          />
          <div
            className="absolute rounded-sm"
            style={{
              left: -2, top: '32%', width: 2, height: 36,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))',
            }}
          />

          {/* Screen area */}
          <div
            className="absolute overflow-hidden"
            style={{
              top: 4, left: 4, right: 4, bottom: 4,
              borderRadius: 24,
              background: '#000',
            }}
          >
            {/* App content — fills entire screen */}
            <div className="absolute inset-0">
              <img
                src={screenshot}
                alt={alt}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                style={{
                  opacity: introVideoSrc && isHovered ? 0 : 1,
                  transition: 'opacity 0.4s ease',
                }}
              />

              {introVideoSrc && (
                <video
                  ref={videoRef}
                  src={introVideoSrc}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  muted
                  playsInline
                  loop
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                />
              )}
            </div>

            {/* Dynamic Island — overlaid on top of content */}
            <div
              className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                top: 8,
                width: 72,
                height: 20,
                borderRadius: 10,
                background: '#000',
                boxShadow: '0 1px 4px rgba(0,0,0,0.6)',
                zIndex: 10,
              }}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  right: 14,
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #2a2a4e, #0a0a15)',
                  boxShadow: 'inset 0 0.5px 1px rgba(255,255,255,0.15)',
                }}
              />
            </div>

            {/* Reflection sweep */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-700"
              style={{
                background: `linear-gradient(
                  120deg,
                  transparent 0%,
                  transparent 30%,
                  rgba(255,255,255,0.08) 45%,
                  rgba(255,255,255,0.18) 50%,
                  rgba(255,255,255,0.08) 55%,
                  transparent 70%,
                  transparent 100%
                )`,
                transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                transition: 'transform 0.8s ease-in-out, opacity 0.3s',
                opacity: isHovered ? 1 : 0,
                zIndex: 11,
              }}
            />

            {/* Top glass sheen */}
            <div
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: '25%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
                zIndex: 11,
              }}
            />

            {/* Home indicator bar */}
            <div
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                width: phoneWidth * 0.35,
                height: 4,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.25)',
                zIndex: 11,
              }}
            />

            {/* Inner screen edge glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: 24,
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
                zIndex: 12,
              }}
            />
          </div>

          {/* Top bezel highlight */}
          <div
            className="absolute top-0 left-1/4 right-1/4 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
          />
        </motion.div>
      </motion.div>

    </div>
  );
}
