import { type CaseStudy } from './types';

/* Erie's only fishery. Every claim here is visible on the live site or measured
   from it, and none of it names a value the counter is free to change — a price,
   a species in the case, a fresh-or-frozen state. Each line of copy names its own
   capture in `scripts/shots/presqueisle.mjs`, and `npm run check:budget` proves
   it resolves. */

export const PRESQUEISLE: CaseStudy = {
  slug: 'presqueisle',
  client: 'Presque Isle Fish & Farm',
  title: 'A counter catalogue for a fish market',
  meta: 'Erie, PA · fish market and farm · design, build, CMS',
  liveUrl: 'https://presqueislefishandfarm.com',
  cover: [
    'presqueisle/cover-home',
    'presqueisle/cover-counter',
    'presqueisle/cover-fish',
    'presqueisle/cover-week',
  ],
  summary:
    "Presque Isle works out of the old Arby's on W 8th, and the counter carries whatever the lake and the boats bring in. Prices live on stickers and change with the catch, so every price on the site is printed beside the number to call.",
  topics: [
    {
      label: 'Their own',
      gloss: 'their red, their photographs',
      lead: "The red is the shop's own and the photographs are the family's, taken on the boat and in the shop. Nothing here came out of a stock library.",
      items: [
        {
          heading: 'Hero lines',
          body: 'Three lines of condensed display type over their own photograph of the lake, above everything else on the page.',
          shot: 'presqueisle/hero-line',
        },
        {
          heading: 'Compass mark',
          body: "The colour was sampled off this compass mark, which is the shop's own logo and sits on every page.",
          shot: 'presqueisle/roundel',
        },
        {
          heading: 'Captioned print',
          body: 'Rods off the stern, shot from the boat. The caption under the print says whose photograph it is.',
          shot: 'presqueisle/captain-print',
        },
      ],
    },
    {
      label: 'Counters',
      gloss: 'twelve counters, 283 products',
      lead: "Twelve counters, one page each, 283 products under them. Prices come off stickers at the counter, so the page carries the number to call for today's price.",
      items: [
        {
          heading: 'Product tile',
          body: 'This tile carries the photograph, the name, the price by the pound and a tag saying fresh, frozen or both.',
          shot: 'presqueisle/card-photo',
        },
        {
          heading: 'Red name card',
          body: 'Where there is no photograph the tile prints a red card with the name on it. A missing price says to ask at the counter.',
          shot: 'presqueisle/card-sign',
        },
        {
          heading: 'Price note',
          body: 'The note says fresh prices change frequently and that the page may not always be perfectly accurate. The phone number for today’s is printed in it.',
          shot: 'presqueisle/price-note',
        },
      ],
    },
    {
      label: 'Fish',
      gloss: '234 products with a page',
      lead: '234 of those products open a page. Each answers what a customer standing at the counter would otherwise have to ask somebody.',
      items: [
        {
          heading: 'Flavour note',
          body: 'A short note on the flavour and the flake, so somebody choosing between two of them never leaves to search.',
          shot: 'presqueisle/fish-taste',
        },
        {
          heading: 'Call and directions buttons',
          body: 'The real phone number is printed in the button, and directions sit right under it.',
          shot: 'presqueisle/fish-actions',
        },
        {
          heading: 'ON THE TABLE list',
          body: "Meal ideas in the shop's own words, under a heading that reads ON THE TABLE. Nothing here was lifted off a recipe site.",
          shot: 'presqueisle/fish-table',
        },
      ],
    },
    {
      label: 'Week',
      gloss: 'Friday, Saturday and the boiler',
      lead: 'The shop stays open later on Friday and runs a standing offer on Saturday. Each gets a block of its own, printed with the hours or the price the day actually carries.',
      items: [
        {
          heading: 'Friday block',
          body: 'The one day the doors stay open past the usual closing time, with the menu one tap away.',
          shot: 'presqueisle/friday',
        },
        {
          heading: 'Saturday block',
          body: 'Its own block, with the hours, the price and what is in the take-home kit written out.',
          shot: 'presqueisle/saturday',
        },
        {
          heading: 'Boiler rental',
          body: 'The day rate and the refundable deposit are printed. The call is to find out whether the one boiler is free that weekend.',
          shot: 'presqueisle/boiler',
        },
      ],
    },
  ],
  impact: {
    lead: 'Live since August 2026. The shop runs its own prices and photographs, and 234 of the counter products have a page each.',
    metrics: [
      { value: '234', label: 'Products with a page of their own' },
      { value: '293', label: 'Price signs read against the shelf' },
      { value: '12', label: 'Counters, one page each' },
    ],
    note: 'Products and counters counted off the sitemap, September 2026. The price signs are the ones photographed at the shelf to build the catalogue.',
  },
  learnings: [
    {
      heading: 'Read every sign',
      body: 'Photographing 293 price stickers is dull work, and it is the only reason the site agrees with the counter.',
    },
    {
      heading: 'Print a card where a photo is missing',
      body: 'A red card with the name on it reads like a shop. An empty tile just reads broken.',
    },
    {
      heading: 'One ground instead of nine',
      body: 'Nine section photographs became one sheet of printed paper, and every seam problem left with them.',
    },
  ],
};
