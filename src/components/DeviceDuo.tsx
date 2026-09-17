import MacBookFrame from './MacBookFrame';
import PhoneFrame from './PhoneFrame';

/* DeviceDuo — a laptop with the phone build overlapping its lower-left corner.
   Both captures are real: 1800×1125 desktop, 900×1948 mobile. A responsive
   site shown on one screen is a claim; shown on two it is the evidence. */

export default function DeviceDuo({
  shot,
  phoneShot,
  alt,
  phoneAlt,
  priority = false,
}: {
  shot: string;
  phoneShot: string;
  alt: string;
  phoneAlt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative w-full pb-[9%] pl-[12%]">
      <MacBookFrame src={shot} alt={alt} priority={priority} />
      <PhoneFrame
        src={phoneShot}
        alt={phoneAlt}
        priority={priority}
        className="absolute bottom-0 left-0 w-[22%]"
        sizes="(min-width: 1024px) 12vw, 28vw"
      />
    </div>
  );
}
