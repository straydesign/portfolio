/* Case study shape — the reference deck, unrolled into a scroll.
 *
 * SOURCING RULE: every claim in a study is either (a) visible on the live site
 * or in the prototype, (b) a design decision readable from the screenshots, or
 * (c) a verified analytics figure. Nothing is reconstructed or estimated.
 * Imagery is captures of the shipped thing — never stock, never generated.
 *
 * COPY MUST SURVIVE THE NEXT CAPTURE. A daily special, the selected weekday,
 * a band, a date, a price on a rotating panel: all of those were true in the
 * shot and false a day later. Andy's shipped "Three-dollar Captains and
 * imports" against a capture that by then read "$3 South of the Border".
 * Describe the mechanism, not the value the mechanism happened to be holding.
 *
 * SHAPE: a topic is three lines of copy that belong together, and each line
 * owns one handset capture with a marker drawn around the exact element it is
 * describing. The three sit in a pinned column while their three phones scroll
 * past; whichever phone is crossing the middle of the screen lights its line
 * and dims the other two. So the page never asks which sentence goes with
 * which picture. `npm run check:budget` enforces the counts and proves every
 * `shot` id resolves to a capture on disk.
 */

export interface Item {
  readonly heading: string;
  readonly body: string;
  /** Key into the capture manifest — `<study>/<shot>`. */
  readonly shot: string;
}

export type Trio = readonly [Item, Item, Item];

export interface Topic {
  /** 1–3 words. Sentence case, never a sentence. */
  readonly label: string;
  readonly lead: string;
  readonly items: Trio;
}

/** A before/after step comparison. No image — the count is the argument. */
export interface Flow {
  readonly label: string;
  readonly lead: string;
  readonly beforeLabel: string;
  readonly before: readonly string[];
  readonly afterLabel: string;
  readonly after: readonly string[];
}

export interface CaseStudy {
  readonly slug: string;
  readonly client: string;
  readonly title: string;
  readonly meta: string;
  readonly liveUrl?: string;
  readonly liveLabel?: string;
  /** Title wall: handset captures running off the right edge. Manifest ids. */
  readonly cover: readonly string[];
  /** Framing only — two lines, no claims, so it needs no evidence. */
  readonly context: {
    readonly headline: string;
    readonly lead: string;
  };
  readonly topics: readonly Topic[];
  readonly flow?: Flow;
  readonly impact: {
    readonly lead: string;
    readonly metrics: readonly { readonly value: string; readonly label: string }[];
    readonly note?: string;
  };
  readonly learnings: readonly {
    readonly heading: string;
    readonly body: string;
  }[];
}
