import MacBookFrame from './MacBookFrame';
import PhoneFrame from './PhoneFrame';

/* DeviceDuo — a laptop with the phone build overlapping its lower-left corner.
   Both captures are real. A responsive site shown on one screen is a claim;
   shown on two it is the evidence.

   The phone is a photoreal render now, and it carries 60px of margin around
   the handset plus a taller screen, so its outer proportion went from roughly
   2.31:1 to 1.96:1 — at the old 22% width it stood 15% shorter and stopped
   overlapping the laptop. 26% restores the height it had, which is what the
   overlap was composed around.

   `z-20` because MacBookFrame paints its lid and deck at `z-10`: without it
   the laptop covers the half of the phone it is supposed to sit behind. */

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
        className="absolute bottom-0 left-0 z-20 w-[26%]"
        sizes="(min-width: 1024px) 14vw, 32vw"
      />
    </div>
  );
}
