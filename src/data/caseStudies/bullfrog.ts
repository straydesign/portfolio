import { type CaseStudy } from './types';

/* The live music room upstairs at Andy's on Peach Street. Every claim here is
   visible on the live site or measured from it, and nothing names a band, a
   date or a door time — those are data the calendar happens to be holding.
   Each line of copy names its own capture in `scripts/shots/bullfrog.mjs`, and
   `npm run check:budget` proves it resolves. */

export const BULLFROG: CaseStudy = {
  slug: 'bullfrog',
  client: 'Bullfrog Bar',
  title: 'A show calendar for a live-music bar',
  meta: 'Erie, PA · live music bar · design, build, CMS',
  liveUrl: 'https://bullfrogbarerie.com',
  cover: ['bullfrog/cover-home', 'bullfrog/cover-lineup', 'bullfrog/cover-events', 'bullfrog/cover-venue'],
  summary:
    "Bullfrog is upstairs at Andy's on Peach Street, a room with a stage, a dance floor and a band every Friday. The question the room gets asked is who is playing, so the next act runs the home page and a date that has passed drops off on its own.",
  topics: [
    {
      label: 'Up next',
      gloss: 'the next act, up top',
      lead: 'The next act sits at the top of the home page, ahead of the room, the kitchen and everything else. Every field a person needs is on the card.',
      items: [
        {
          heading: 'The next-show card',
          body: 'One card over the hero photograph: the act, the night, the set time, the genre, no cover, a write-up and two buttons.',
          shot: 'bullfrog/next-show',
        },
        {
          heading: 'The date line',
          body: 'One line carries the weekday, the date and when the band starts and stops. Nobody has to call to ask.',
          shot: 'bullfrog/show-time',
        },
        {
          heading: 'The two buttons',
          body: 'One button counts the shows still to come. The other dials the bar, because a Friday table is a phone call.',
          shot: 'bullfrog/show-cta',
        },
      ],
    },
    {
      label: 'The calendar',
      gloss: 'every show, in the order it happens',
      lead: 'Every show lives on one page, in the order it happens. A date that has passed drops off, so the page cannot go stale on its own.',
      items: [
        {
          heading: 'The month heading',
          body: 'The heading carries the month it is now, so the page dates itself without anybody typing a word.',
          shot: 'bullfrog/calendar-month',
        },
        {
          heading: 'A show row',
          body: 'The date block, the band, a write-up, the genre, the admission, the set time, a link out and the number to call.',
          shot: 'bullfrog/band-row',
        },
        {
          heading: 'The chips and the band link',
          body: "The genre and the admission are chips, and the link with them opens the band's own page.",
          shot: 'bullfrog/band-link',
        },
      ],
    },
    {
      label: 'The room',
      gloss: 'what the stage gives a band',
      lead: 'The events page describes the room under the show list. A paragraph on what the space gives a band, then a grid of what it has on hand.',
      items: [
        {
          heading: 'The paragraph for the act',
          body: 'Dance floor, laser screen and acoustics, written for the act reading the page as much as for the crowd.',
          shot: 'bullfrog/venue-copy',
        },
        {
          heading: 'The amenities list',
          body: 'Bar, TVs, the laser screen, pool tables, kitchen, parking, darts, event space and WiFi. No paragraph to read.',
          shot: 'bullfrog/amenities',
        },
        {
          heading: 'The venue card',
          body: 'The about page gives it a card that says live music venue, dance floor, laser screen, full bar, no cover.',
          shot: 'bullfrog/about-venue',
        },
      ],
    },
    {
      label: 'Booking',
      gloss: 'a Friday table is a call',
      lead: 'A table for a Friday show is a phone call. The events page says so, and puts the number next to it.',
      items: [
        {
          heading: 'The call panel',
          body: 'A panel at the foot of the events page says tables fill up fast, with the number to call and Facebook under it.',
          shot: 'bullfrog/reserve-cta',
        },
        {
          heading: 'The room as a bookable space',
          body: 'The parties page lists this room as bookable, with what is already rigged in it and how many it holds.',
          shot: 'bullfrog/party-stage',
        },
        {
          heading: 'Live music as an add-on',
          body: 'The parties page lists live entertainment as something you add to a private booking.',
          shot: 'bullfrog/party-live',
        },
      ],
    },
  ],
  impact: {
    lead: 'The calendar is edited by the bar. Adding a Friday updates the home page, the events page and the button that counts them.',
    metrics: [
      { value: '415', label: 'Arrivals from search, July and August' },
      { value: '1', label: 'Entry for a show, three places it lands' },
      { value: '2', label: "Bars on one build, this one restyled green" },
    ],
    note: 'Arrivals read from Search Console across full months, July–August 2026.',
  },
  learnings: [
    {
      heading: 'Put the act first',
      body: 'The question on a Friday is who is playing. Everything else on the home page moved down to answer it.',
    },
    {
      heading: 'Let past dates drop off',
      body: 'Past dates drop off on their own, so nobody has to remember to clear the list.',
    },
    {
      heading: 'The same layout, restyled',
      body: "The layout came straight from Andy's. Typeface, palette and corner radius carried the whole brand change.",
    },
  ],
};
