'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

interface LiteYouTubeProps {
  videoId: string;
  title: string;
  borderColor: string;
}

export default function LiteYouTube({ videoId, title, borderColor }: LiteYouTubeProps) {
  const [playing, setPlaying] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-2xl"
          style={{ border: `2px solid ${borderColor}` }}
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className="relative w-full rounded-2xl overflow-hidden group cursor-pointer"
      style={{ paddingBottom: '56.25%', height: 0, border: `2px solid ${borderColor}` }}
    >
      {/* Skeleton shimmer shown until thumbnail loads */}
      {!thumbLoaded && (
        <div className="skeleton absolute top-0 left-0 w-full h-full" />
      )}
      <img
        src={thumbnailUrl}
        alt={`${title} thumbnail`}
        loading="lazy"
        onLoad={() => setThumbLoaded(true)}
        className={`absolute top-0 left-0 w-full h-full object-cover img-fade${thumbLoaded ? ' loaded' : ''}`}
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 text-white ml-1" fill="white" />
        </div>
      </div>
    </button>
  );
}
