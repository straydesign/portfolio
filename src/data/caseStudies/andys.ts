import { type CaseStudy } from './types';

/* Peach Street bar and grill since 1985. Every claim here is visible on the live
   site or measured from it. Each line of copy names its own capture in
   `scripts/shots/andys.mjs`, and `npm run check:budget` proves it resolves. */

export const ANDYS: CaseStudy = {
  slug: 'andys',
  client: "Andy's Ale House & Grill",
  // The cover used to carry the bar's own tagline, at 75px, beside a phone
  // showing that same tagline. Two hundred pixels apart, the same six words,
  // and none of them about the work. The title is the design claim now.
  title: 'Built for a phone at nine.',
  meta: 'Erie, PA · bar & grill · design, build, CMS',
  liveUrl: 'https://andyspub.com',
  cover: ['andys/cover-home', 'andys/cover-menu', 'andys/cover-dish', 'andys/cover-gallery'],
  context: {
    headline: 'One question, asked late',
    lead: "Andy's has run a Peach Street kitchen to midnight since '85, under forty-plus TVs and a twenty-one-foot laser screen.",
  },
  topics: [
    {
      label: 'Today',
      lead: 'The specials change every day, and a drink price is useless without the hours it runs. The panel carries the day and the window.',
      items: [
        {
          heading: "Today's specials lead the page",
          body: 'A drink special and a lunch special, each with its price, the window the drink runs in, the month as a PDF and seven day tabs.',
          shot: 'andys/today-card',
        },
        {
          heading: 'Today is already selected',
          body: 'All seven days are there to browse, and the one you are standing in is already open.',
          shot: 'andys/day-tabs',
        },
        {
          heading: 'The window is printed',
          body: 'The drink special prints its own serving window, so nobody drives over an hour before the price starts.',
          shot: 'andys/tonight',
        },
      ],
    },
    {
      label: 'The menu',
      lead: 'Twelve categories, a row per dish, and the questions people phone in about answered at the bottom. The kitchen edits all of it without calling me.',
      items: [
        {
          heading: 'Twelve categories',
          body: 'Each one is a tap that drops you into that part of the list.',
          shot: 'andys/menu-cats',
        },
        {
          heading: 'Name, description, price',
          body: 'The name, what comes in the basket and the price, on the row itself, so nothing has to be opened to find out what it costs.',
          shot: 'andys/menu-list',
        },
        {
          heading: 'The questions people call about',
          body: "Address, closing time, pickup, specials, kids' menu, parking, parties. Answered under the menu instead of over the phone.",
          shot: 'andys/menu-faq',
        },
      ],
    },
    {
      label: 'A dish',
      lead: "Fifty-three dishes have a page of their own. Each carries the photograph, the price and the way to order it, so a plate can turn up in a search on its own name.",
      items: [
        {
          heading: 'One dish, one page',
          body: "The plate's name is the heading, so it can turn up in search without the rest of the menu.",
          shot: 'andys/dish-hero',
        },
        {
          heading: 'Ordering it is one tap',
          body: 'A pickup card with the address, the kitchen hours, a live phone number and the way back to the full menu.',
          shot: 'andys/dish-pickup',
        },
        {
          heading: 'One tap back',
          body: 'The link out reads BACK TO FULL MENU, so a dish page is never a dead end.',
          shot: 'andys/dish-back',
        },
      ],
    },
    {
      label: 'The photographs',
      lead: "The photography is all Andy's own — the room, the tables, the plates. Stock would have shown a bar nobody in Erie has ever been inside.",
      items: [
        {
          heading: 'The room, with a number on it',
          body: 'Twenty-six tables broken into regulation, bar and billiard, counted out over a photograph of the actual room, with the way in.',
          shot: 'andys/room-cards',
        },
        {
          heading: 'Shown at size',
          body: 'Each photograph gets a tile of its own, rather than a thumbnail in a strip that hides the rest.',
          shot: 'andys/gallery-grid',
        },
        {
          heading: 'Anyone can add one',
          body: 'Customers send photos in from the page itself. Location data is stripped before anything is stored.',
          shot: 'andys/gallery-upload',
        },
      ],
    },
  ],
  impact: {
    lead: 'The specials panel, the menu and the gallery are all edited by the bar. Nothing on this site needs me to change a line of copy.',
    // Impact is what the work changed. The three numbers here used to be the
    // bar's own inventory — 40+ TVs, 26 pool tables — all of which were true
    // before any of this was designed.
    metrics: [
      { value: '53', label: 'Dishes that open a page of their own' },
      { value: '1,586', label: 'Arrivals from search, July and August' },
      { value: '2', label: 'Bars running on this one build' },
    ],
    note: 'Arrivals read from Search Console across full months, July–August 2026. Dish count read off the live menu page.',
  },
  learnings: [
    {
      heading: 'Preselect the obvious',
      body: 'A tab that opens on the current day removed the most common piece of work the page was asking for.',
    },
    {
      heading: 'A page for every dish',
      body: 'One document is one search result. Fifty-three pages are fifty-three ways for a craving to find the kitchen.',
    },
    {
      heading: 'Build for the sister bar',
      body: "Every decision had to survive being restyled for another bar, so nothing could lean on Andy's red.",
    },
  ],
};
