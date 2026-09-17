import { type CaseStudy } from './types';

/* MIDDLEMAN — a prototype I designed from a beer route I actually worked.
   Nothing here shipped, so every claim is either visible in the live prototype
   or a fact Tom confirmed about the job. The demo runs a simulated POS that
   moves stock levels, risk counts and timestamps between loads, so the copy
   names fields and fixture text — store names, SKU codes, PO numbers — and
   never a number that drifts. Each line names its own capture in
   `scripts/shots/middleman.mjs`, and `npm run check:budget` proves it resolves. */

export const MIDDLEMAN: CaseStudy = {
  slug: 'middleman',
  client: 'Middleman',
  title: 'The shelf, before you walk in.',
  meta: 'Beer route merchandising · solo designer · live prototype',
  liveUrl: 'https://middleman.quest',
  liveLabel: 'Try the prototype',
  cover: ['middleman/cover-dashboard', 'middleman/cover-route', 'middleman/cover-stock', 'middleman/cover-order'],
  context: {
    headline: 'A route run from memory',
    lead: 'I worked a daily beer route at New Hampshire Distributors — grocery and convenience stops, restocked at five in the morning before the doors opened, ordered with a pen on cardboard.',
  },
  topics: [
    {
      label: 'The stop',
      lead: 'The first question in any store is which SKUs moved since the last trip. This screen answers it before you reach the aisle.',
      items: [
        {
          heading: 'Three counts, then everything else',
          body: 'Critical, warning and healthy, each with its own number, and nothing else sharing the row with them.',
          shot: 'middleman/risk-row',
        },
        {
          heading: 'Four jobs, one row',
          body: 'Notes, pull, delivery and breakage, the delivery tile carrying its ETA. Those are the four things you actually do in a store.',
          shot: 'middleman/actions-row',
        },
        {
          heading: 'What moved since last visit',
          body: 'Auto-orders, promos, delays, pulls and deliveries, with a name against anything a person did rather than the system.',
          shot: 'middleman/activity-feed',
        },
      ],
    },
    {
      label: 'The shelf',
      lead: 'Counting a store properly took two and a half hours. Most people hit it fast and missed cases instead. The count is on the screen before you start.',
      items: [
        {
          heading: 'One row, the whole shelf',
          body: 'The SKU, two chips flagging backorder and critical, the shelf count against maximum, days of supply left, backstock and how full the facing is.',
          shot: 'middleman/stock-row',
        },
        {
          heading: 'The floor work, three buttons',
          body: 'Pull list, breakage and shrinkage, because those are the three reasons you open this screen.',
          shot: 'middleman/stock-actions',
        },
        {
          heading: 'One SKU, opened up',
          body: 'Stock against maximum, the reorder point and the case size, so the pull is a number of cases rather than a guess.',
          shot: 'middleman/product-stock',
        },
      ],
    },
    {
      label: 'The order',
      lead: 'An order went in on paper and came back as a truck. Everything between those two moments was invisible.',
      items: [
        {
          heading: 'What is on the truck',
          body: 'The ETA with how far along the run it is, the case count, a note that reaches the driver and the full order behind it.',
          shot: 'middleman/order-enroute',
        },
        {
          heading: 'The next one builds itself',
          body: 'Still building at a running case count, with the last change and the name on it, and the whole order one tap from editing.',
          shot: 'middleman/order-building',
        },
        {
          heading: 'Edited by the case',
          body: 'Every line on an open order takes a plus, a minus or a delete, for as long as the order stays open.',
          shot: 'middleman/order-edit',
        },
      ],
    },
  ],
  flow: {
    label: 'The route',
    lead: 'Seven steps, every store, every day. Five of them ran on memory, and none of it was written down anywhere.',
    beforeLabel: 'Pen and cardboard',
    before: [
      'Walk in with no numbers',
      'Count the shelf by eye',
      'Tally it on cardboard',
      'Pull from the back from memory',
      'Hand the order over on paper',
      'Breakage goes unlogged',
      'Variance turns up months later',
    ],
    afterLabel: 'Middleman',
    after: [
      'Open on the store you are in',
      'The shelf count is already there',
      'Pull list computes the cases',
      'Log the breakage where it happened',
      'The order is already building',
      'Edit it while it is open',
      'Shrink is tracked per SKU',
    ],
  },
  impact: {
    lead: 'Nothing here shipped. It is the daily beer route I worked, drawn the way it should have been built.',
    metrics: [
      { value: '2.5 hrs', label: 'To count one store properly' },
      { value: '9', label: 'Screens, each with its own route' },
      { value: '0', label: 'Tools the job actually issued' },
    ],
    note: 'Designed from inside the route rather than from research. I worked it.',
  },
  learnings: [
    {
      heading: 'Design what you have done',
      body: 'Working the route is why these screens answer the real question instead of the one a brief would have asked.',
    },
    {
      heading: 'Cut the camera idea',
      body: 'Photographing the shelf still left you counting it. The goal was knowing the numbers before you walk in.',
    },
    {
      heading: 'Density reads better on a cart',
      body: 'A terminal layout looks hostile on a desk and reads perfectly on a cart in a cold aisle.',
    },
  ],
};
