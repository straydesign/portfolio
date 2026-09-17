import Image from 'next/image';

/* PhoneFrame — static hardware bezel for a real 390×844 mobile capture.
   No tilt, no video, no hover: the case studies and the work grid want the
   screenshot to read as a thing that exists, not as an interactive toy.
   PhoneMockup is the animated sibling; use that one only where the motion
   earns its place. */

export default function PhoneFrame({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(min-width: 1024px) 18vw, 45vw',
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[14%/6.5%] bg-[#101010] p-[3.2%] shadow-[0_1px_2px_rgba(0,0,0,0.22),0_18px_40px_rgba(0,0,0,0.18)] ${className}`}
    >
      <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[12%/5.5%] bg-[#0b0b0e]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
