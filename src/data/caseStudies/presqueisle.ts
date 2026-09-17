import { type CaseStudy } from './types';

/* Erie's only fishery. Every claim here is visible on the live site or measured
   from it, and none of it names a value the counter is free to change — a price,
   a species in the case, a fresh-or-frozen state. Each line of copy names its own
   capture in `scripts/shots/presqueisle.mjs`, and `npm run check:budget` proves
   it resolves. */

export const PRESQUEISLE: CaseStudy = {
  slug: 'presqueisle',
  client: 'Presque Isle Fish & Farm',
  title: 'Honest about going stale.',
  meta: 'Erie, PA · fish market and farm · design, build, CMS',
  liveUrl: 'https://presqueislefishandfarm.com',
  cover: [
    'presqueisle/cover-home',
    'presqueisle/cover-counter',
    'presqueisle/cover-fish',
    'presqueisle/cover-week',
  ],
  context: {
    headline: "Erie's only fishery",
    lead: "Presque Isle Fish & Farm sells whatever the lake and the boats bring in, out of the old Arby's on W 8th. Prices live on stickers at the counter.",
  },
  topics: [
    {
      label: 'Their own',
      lead: "The red is the shop's own and the photographs are the family's, taken on the boat and in the shop. Nothing here came out of a stock library.",
      items: [
        {
          heading: 'The claim leads',
          body: 'Three lines of condensed display type over their own photograph of the lake, above everything else on the page.',
          shot: 'presqueisle/hero-line',
        },
        {
          heading: 'The red is theirs',
          body: "The colour was sampled off this compass mark, which is the shop's own logo and sits on every page.",
          shot: 'presqueisle/roundel',
        },
        {
          heading: 'Every photograph is theirs',
          body: 'Rods off the stern, shot from the boat. The caption under the print says whose photograph it is.',
          shot: 'presqueisle/captain-print',
        },
      ],
    },
    {
      label: 'The counters',
      lead: 'Twelve counters, one page each, 234 products under them. Prices come off stickers at the counter, so the page had to be honest about going stale.',
      items: [
        {
          heading: 'Photographs lead',
          body: 'A fish tile carries the photograph, the name, the price by the pound and a tag saying fresh, frozen or both.',
          shot: 'presqueisle/card-photo',
        },
        {
          heading: 'A card, never a gap',
          body: 'Where there is no photograph the tile prints a red card with the name on it. A missing price says to ask at the counter.',
          shot: 'presqueisle/card-sign',
        },
        {
          heading: "Call for today's price",
          body: 'Fresh prices change at the counter, so a note carries the phone number and admits the page may be behind.',
          shot: 'presqueisle/price-note',
        },
      ],
    },
    {
      label: 'A fish',
      lead: 'Every product on the counters has a page of its own. Each one answers what a customer standing at the counter would otherwise have to ask somebody.',
      items: [
        {
          heading: 'What it tastes like',
          body: 'A short note on the flavour and the flake, so somebody choosing between two of them never leaves to search.',
          shot: 'presqueisle/fish-taste',
        },
        {
          heading: 'Call and directions',
          body: 'The real phone number is printed in the button, and directions sit right under it.',
          shot: 'presqueisle/fish-actions',
        },
        {
          heading: 'How people cook it',
          body: "Meal ideas in the shop's own words, under a heading that reads ON THE TABLE. Nothing here was lifted off a recipe site.",
          shot: 'presqueisle/fish-table',
        },
      ],
    },
    {
      label: 'The week',
      lead: 'The shop stays open later on Friday and runs a standing offer on Saturday. Each gets a block of its own, printed with the hours or the price the day actually carries.',
      items: [
        {
          heading: 'Fridays run late',
          body: 'The one day the doors stay open past the usual closing time, with the menu one tap away.',
          shot: 'presqueisle/friday',
        },
        {
          heading: 'A standing Saturday',
          body: 'Its own block, with the hours, the price and what is in the take-home kit written out.',
          shot: 'presqueisle/saturday',
        },
        {
          heading: 'The boiler goes home',
          body: 'The day rate and the refundable deposit are printed. The call is to find out whether the one boiler is free that weekend.',
          shot: 'presqueisle/boiler',
        },
      ],
    },
  ],
  impact: {
    lead: 'Live since August 2026. The shop runs its own prices and photographs, and every one of the 234 products has a page of its own.',
    metrics: [
      { value: '234', label: 'Products with a page of their own' },
      { value: '293', label: 'Price signs read against the shelf' },
      { value: '12', label: 'Counters, one page each' },
    ],
    note: 'Family owned, and the Captain fishes Lake Erie himself.',
  },
  learnings: [
    {
      heading: 'Read every sign',
      body: 'Photographing 293 price stickers is dull work, and it is the only reason the site agrees with the counter.',
    },
    {
      heading: 'A card beats a gap',
      body: 'A red card with the name on it reads like a shop. An empty tile just reads broken.',
    },
    {
      heading: 'One ground, no bands',
      body: 'Nine section photographs became one sheet of printed paper, and every seam problem left with them.',
    },
  ],
};
