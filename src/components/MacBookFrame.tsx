import Image from 'next/image';

/* MacBookFrame — a real-looking MacBook front view: dark display bezel with a
   camera dot, aluminum base deck with the thumb scoop, soft contact shadow.
   Ported from straywebdesign.co; screenshots captured at 1280×800 (16:10)
   fill the display exactly. */

export default function MacBookFrame({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative">
      {/* Lid / display — slightly narrower than the base, like the real thing */}
      <div className="relative z-10 mx-[5.5%]">
        <div
          className="rounded-t-[0.9rem] rounded-b-none border border-black/50 p-[1.9%] pt-[2.6%] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
          style={{
            background:
              'linear-gradient(180deg, #17171a 0%, #0e0e11 8%, #0b0b0e 100%)',
          }}
        >
          {/* camera dot in the bezel */}
          <span
            aria-hidden
            className="absolute left-1/2 top-[1.1%] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[#1e2b3a] ring-1 ring-black/60"
          />
          <div
            className="relative aspect-[1280/800] w-full overflow-hidden rounded-[2px]"
            style={{ backgroundColor: '#0b0b0e' }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Base deck — full-width aluminum bar with the thumb scoop */}
      <div className="relative z-10">
        <div
          className="h-[14px] rounded-b-[1rem] rounded-t-[2px] border-x border-b border-black/25 md:h-[17px]"
          style={{
            background:
              'linear-gradient(180deg, #f2f3f5 0%, #d9dbdf 45%, #b7bac0 82%, #90939a 100%)',
          }}
        >
          <span
            aria-hidden
            className="absolute left-1/2 top-0 h-[7px] w-[11%] -translate-x-1/2 rounded-b-[10px] md:h-[8px]"
            style={{
              background:
                'linear-gradient(180deg, #8e9198 0%, #c4c7cc 70%, #dfe1e4 100%)',
            }}
          />
        </div>
      </div>

      {/* Contact shadow */}
      <div
        aria-hidden
        className="absolute -bottom-4 left-1/2 h-8 w-[92%] -translate-x-1/2 rounded-[100%] bg-black/25 blur-xl"
      />
    </div>
  );
}
