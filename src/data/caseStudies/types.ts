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
  /** 3–6 words for the rail: what this section covers. A label alone tells a
   *  reader where they are and not what they are about to read. */
  readonly gloss: string;
  readonly lead: string;
  readonly items: Trio;
}

/* A before/after comparison, paired.
 *
 * This was two independent lists of seven, and two lists side by side do not
 * compare — a reader has to hold step four of the left one in their head while
 * finding step four of the right one, and the two were not even in the same
 * order. Paired rows do the comparison on the page: one step, what replaced
 * it, on one line.
 *
 * No per-step times. The only measured duration on this job is the two and a
 * half hours a proper count took, which is Tom's own figure; inventing "4 min"
 * against each row would be seven numbers nobody ever recorded.
 *
 * One screen is pinned beside the table rather than one per row. A handset
 * under each step ran the block to 2,000px and put five dark terminal UIs on
 * the page at 144px, where none of them can be read — height spent on pictures
 * that carry nothing. The pinned screen earns its place by carrying a count
 * instead: `here` marks the steps that happen on it, so "five of the seven"
 * is something a reader can check against the rows rather than a claim. */
export interface FlowStep {
  readonly before: string;
  readonly after: string;
  /** This step happens on the screen pinned beside the table. */
  readonly here?: boolean;
}

export interface Flow {
  readonly label: string;
  readonly gloss: string;
  readonly lead: string;
  readonly beforeLabel: string;
  /** One line under the column head. Measured, or it does not go in. */
  readonly beforeNote: string;
  readonly afterLabel: string;
  readonly afterNote: string;
  readonly steps: readonly FlowStep[];
  /** Manifest id of the one screen pinned beside the comparison. */
  readonly screen: string;
  /** What the marked rows add up to. Countable against the table. */
  readonly screenNote: string;
}

export interface CaseStudy {
  readonly slug: string;
  readonly client: string;
  /** What the project IS, flat. A noun phrase naming the thing that was built,
   *  five to eight words, no full stop and no flourish.
   *
   *  All five of these used to be aphorisms — "A catalogue that never checks
   *  out", "Built for a phone at nine", "The price is on the sticker". Every
   *  one of them withheld the subject: a reader scanning five studies could
   *  not tell which was a menu, which was a show calendar and which was an
   *  app, and the line under it was a second riddle rather than an answer. */
  readonly title: string;
  readonly meta: string;
  readonly liveUrl?: string;
  readonly liveLabel?: string;
  /** Title wall: handset captures running off the right edge. Manifest ids. */
  readonly cover: readonly string[];
  /** Why this was the thing to build, in two sentences, directly under the
   *  title. Framing only — it carries no claim that needs a picture, and it is
   *  the route's meta description, so it stays inside ~158 characters. */
  readonly summary: string;
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
