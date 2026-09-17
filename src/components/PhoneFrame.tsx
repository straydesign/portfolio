import Image from 'next/image';

/* PhoneFrame — a photographed iPhone 16 Pro Max, not a drawn one.
 *
 * What it replaced drew the handset in CSS: a 3.2% padding for the bezel and a
 * `rounded-[14%/6.5%]` corner. Both are percentages, and a percentage radius
 * resolves against each axis separately, so a 2.1:1 phone got an elliptical
 * corner that read as a thick rubber case. It also had no status bar, no
 * Dynamic Island and no address bar, and `object-cover object-top` cropped the
 * capture to the frame's aspect — which is what shrank the Sea Cave lockup.
 *
 * The image now carries all of it. `scripts/compose-device-screens.mjs` builds
 * the screen — iOS status bar, the page, the Safari toolbar, the home
 * indicator — at the 1320x2868 the Envato smart object takes, and
 * `scripts/ps/run-screen-jobs.sh` places it into the kit's PSD and exports the
 * handset on transparency. The Dynamic Island in the render is the kit's own
 * hardware layer, painted over the screen the way the real one occludes it.
 *
 * So there is nothing left to draw here but the contact shadow, and that is a
 * `drop-shadow` rather than a `box-shadow` because the image has an alpha
 * channel: box-shadow would trace the rectangle, drop-shadow traces the phone.
 *
 * SafariPhone.tsx still draws its chrome, and should. The 80 annotated case
 * study captures carry a marker positioned from the capture manifest, which
 * has to sit in the DOM on top of a live <Image>; baking those into a raster
 * would freeze the annotation to the pixel it was measured at. Photoreal is
 * for the covers, drawn is for the evidence.
 */

const W = 1127;
const H = 2210;

export default function PhoneFrame({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(min-width: 1024px) 18vw, 45vw',
}: {
  /** A device render from `.ps-run/out`, not a bare screen capture. */
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  /* The layout box is a wrapper and the image fills it. Handing `className`
     straight to the <Image> put the caller's width class and this component's
     own `w-full` on the same element at the same specificity, so which one won
     came down to their order in the generated stylesheet — `w-[26%]` lost, and
     every phone rendered at its natural 1127px.

     The wrapper carries no positioning of its own for the same reason: a
     `relative` here landed on the same element as DeviceDuo's `absolute` and
     took the phone out of the overlap entirely, dropping it into normal flow
     below the laptop. Position belongs to whoever is doing the composing. */
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={W}
        height={H}
        priority={priority}
        sizes={sizes}
        className="block h-auto w-full [filter:drop-shadow(0_2px_3px_rgba(0,0,0,0.20))_drop-shadow(0_18px_34px_rgba(0,0,0,0.28))]"
      />
    </div>
  );
}
