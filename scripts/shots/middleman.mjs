/* What to shoot on MIDDLEMAN, and what on each shot the copy is pointing at.
 *
 * `find` names the element by its OWN text (the deepest visible node that
 * contains it), `up` climbs to the card or row that frames it — stopping
 * before any parent taller than `maxH` — and `must` / `mustNot` declare what
 * the resulting box has to frame. The capture script measures the result, so
 * an entry here is a description of intent, never a pixel coordinate.
 *
 * One entry per line of copy, plus three or four unannotated cover shots.
 * A sentence with no entry here has no screenshot, and `npm run check:budget`
 * fails the build.
 *
 * TWO THINGS THIS PROTOTYPE DOES DIFFERENTLY:
 *
 * 1. The app shell is `h-screen` with its own inner scroller, so
 *    `window.scrollTo` is a no-op and `document.documentElement.scrollHeight`
 *    is always 844. `pad` cannot move anything. Every box here was measured
 *    above the fold at 390x844 and has to stay there.
 *
 * 2. The demo runs a simulated POS — a sale every ten seconds, a delivery
 *    every sixty. Stock levels, days of supply, the risk counts, the
 *    percentages and every timestamp move between loads, and the stock list
 *    re-sorts itself. So `must` strings are fixture text only — product names,
 *    SKU codes, field labels — never a number. `stock-row` targets the first
 *    product row positionally for the same reason: whichever SKU is worst
 *    today, the row is the same row.
 *
 * `?demo` opens the screen directly instead of bouncing to /login.
 */

export const SPECS = [

    // Cover — no annotation, these are the title wall
    { id: 'cover-dashboard', route: '/dashboard?demo', scrollY: 0, alt: 'The Middleman dashboard on a phone' },
    { id: 'cover-route', route: '/route?demo', scrollY: 0, alt: "The day's stores on a map, on a phone" },
    { id: 'cover-stock', route: '/stock?demo', scrollY: 0, alt: 'The Middleman stock list on a phone' },
    { id: 'cover-order', route: '/orders/PO-10512?demo', scrollY: 0, alt: 'A Middleman purchase order on a phone' },

    // The stop — what the screen opens on when you walk into a store
    { id: 'risk-row', route: '/dashboard?demo', find: { text: 'CRITICAL', up: 2, maxH: 200 }, pad: 0.2,
      must: ['CRITICAL', 'WARNING', 'HEALTHY'], mustNot: ['ACTIONS'],
      alt: 'The three risk counts at the top of the dashboard', note: 'Critical, warning, healthy' },
    // Targeted from a tile, not from the ACTIONS label: climbing off the label
    // lands on the <section>, which is the header plus the tiles, and a box
    // captioned "four jobs" was framing five things.
    { id: 'actions-row', route: '/dashboard?demo', find: { text: 'NOTES', up: 3, maxH: 140 }, pad: 0.2,
      must: ['NOTES', 'PULL', 'DELIVERY', 'BREAKAGE'], mustNot: ['ACTIONS', 'RECENT ACTIVITY'],
      alt: 'The four in-store actions under the risk counts', note: 'Four jobs, one row' },
    // Likewise: the sentence is about what the feed says, so the heading and
    // the VIEW ALL control stay outside. Targeted from the first row.
    { id: 'activity-feed', route: '/dashboard?demo', find: { text: 'Auto-order adjusted', up: 4, maxH: 220 }, pad: 0.2,
      must: ['Auto-order adjusted', 'New promo scheduled', 'Delivery delay', 'Delivery received', 'Jake M.'],
      mustNot: ['RECENT ACTIVITY', 'VIEW ALL', 'KPIS'],
      alt: 'The recent activity feed on the dashboard', note: 'What moved since last visit' },

    // The shelf — the stock list and one SKU opened up
    { id: 'stock-actions', route: '/stock?demo', find: { text: 'PULL LIST', up: 1, maxH: 120 }, pad: 0.2,
      must: ['PULL LIST', 'BREAKAGE', 'SHRINKAGE'], mustNot: ['ALL PRODUCTS', 'ADD SKU'],
      alt: 'The pull list, breakage and shrinkage buttons on the stock screen', note: 'Pull, breakage, shrinkage' },
    // Positional, not by name: the list re-sorts as the simulated POS runs, so
    // the first row is a stable target and its SKU is not.
    { id: 'stock-row', route: '/stock?demo', find: { css: 'button', nth: 10 }, pad: 0.2,
      must: ['Backstock:'], mustNot: ['ALL PRODUCTS'],
      alt: 'A single product row in the stock list', note: 'One row, the whole shelf' },
    { id: 'product-stock', route: '/stock/12?demo', find: { text: 'CURRENT STOCK', up: 1, maxH: 220 }, pad: 0.2,
      must: ['CURRENT STOCK', 'Reorder at', 'Case size:'], mustNot: ['SALES TREND'],
      alt: 'The stock panel on a single product page', note: 'Stock, reorder point, case size' },

    // The order — what is coming, what is being built, what can still change
    { id: 'order-enroute', route: '/orders?demo', find: { text: 'ON THE WAY', up: 3, maxH: 260 }, pad: 0.2,
      must: ['ON THE WAY', 'NOTE TO DRIVER', 'FULL ORDER'], mustNot: ['SCHEDULED'],
      alt: "The card for the delivery that is on the road", note: 'On the truck now' },
    { id: 'order-building', route: '/orders?demo', find: { text: 'SCHEDULED', up: 3, maxH: 260 }, pad: 0.2,
      must: ['BUILDING', 'REVIEW & EDIT ORDER'], mustNot: ['ON THE WAY'],
      alt: 'The card for the next order, still building', note: 'Still open, still editable' },
    { id: 'order-edit', route: '/orders/PO-10513/edit?demo', find: { text: 'BLL-12C', up: 3, maxH: 100 }, pad: 0.2,
      must: ['Bud Light Lime 12-pack', 'BLL-12C'], mustNot: ['LINE ITEMS (9)'],
      alt: 'One editable line item on an open order', note: 'Edited by the case' },
];
