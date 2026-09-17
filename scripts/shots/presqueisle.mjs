/* What to shoot on Presque Isle Fish & Farm, and what on each shot the copy is pointing at.
 *
 * `find` names the element by its OWN text (the deepest visible node that
 * contains it), `up` climbs to the card or row that frames it — stopping
 * before any parent taller than `maxH` — and `pad` decides where that lands in
 * the 390x844 viewport. The capture script measures the result, so an entry
 * here is a description of intent, never a pixel coordinate.
 *
 * `must` and `mustNot` are the contract that the box frames the sentence's
 * subject and stops there. Every noun the copy line claims is in `must` — if
 * the sentence says price, a price string is in `must`; if it says tag, a tag
 * string is. Whatever sits next to the box and must not be swallowed is in
 * `mustNot`, including the price and hours the copy places OUTSIDE a box.
 *
 * A price, a species and a fresh-or-frozen state all belong in `must` and none
 * of them belong in the shipped copy. `must` is checked at capture time, so a
 * restocked counter fails the run loudly. A sentence cannot be re-checked, so
 * it names the mechanism instead of the value the mechanism is holding.
 *
 * `must` resolves the FIRST visible occurrence on the page, so a tile contract
 * has to target the first tile in the grid — a chip string like
 * "fresh or frozen" resolves to the earliest tile carrying it, which is why
 * `card-photo` frames Walleye Cheeks and not a tile further down.
 *
 * One entry per line of copy, plus three or four unannotated cover shots.
 * A sentence with no entry here has no screenshot, and `npm run check:budget`
 * fails the build.
 *
 * The home page autoplays a video and floats photographic prints past the
 * headline, so nothing here waits on `networkidle` and nothing targets the
 * print stack — a floated card moves between the measure and the frame.
 */

export const SPECS = [

    // Cover — no annotation, these are the title wall
    { id: 'cover-home', route: '/', scrollY: 0, alt: 'Presque Isle home page on a phone' },
    { id: 'cover-counter', route: '/whats-in/off-the-boat-lake-erie', scrollY: 300, alt: 'The Lake Erie counter on a phone' },
    { id: 'cover-fish', route: '/item/lake-erie-walleye', scrollY: 120, alt: 'A Presque Isle fish page on a phone' },
    { id: 'cover-week', route: '/the-week', scrollY: 300, alt: 'The week page on a phone' },

    // Their own
    // Copy says three lines of display type, so all three are in `must`; the
    // sub-line under the headline is the thing the box must stop before.
    { id: 'hero-line', route: '/', find: { text: 'OURSELVES.', up: 1, maxH: 200 }, pad: 0.3,
      must: ['WE FISH', 'LAKE ERIE', 'OURSELVES.'],
      mustNot: ['Family owned', 'Learn more'],
      alt: 'The home page headline over the shop’s own photograph of the lake', note: 'The claim, three lines deep' },
    // EXEMPT from `must` per the contract rule: the target is the wordless
    // compass mark in the header bar, an image link with no visible text of its
    // own. `mustNot` still proves the box did not climb into the page beneath.
    { id: 'roundel', route: '/the-captain', find: { css: 'header a', nth: 0 }, pad: 0.2,
      mustNot: ['THE CAPTAIN', 'Back to the shop'],
      alt: 'The shop’s compass roundel in the red header bar', note: 'The red is theirs' },
    { id: 'captain-print', route: '/the-captain', find: { text: 'Rods off the stern. Our own photo.', up: 1, maxH: 700 }, pad: 0.22,
      must: ['Rods off the stern. Our own photo.'],
      mustNot: ['Yellow perch, walleye, whitefish', 'Presque Isle Fish & Farm is family owned'],
      alt: 'A photographic print on the Captain page, with its caption', note: 'Their photo, captioned' },

    // The counters
    // The copy names four things on the tile — photograph, name, price, tag —
    // so the name, the price and the tag are all in `must`. The photograph has
    // no text. The neighbouring tile and the heading above are in `mustNot`.
    { id: 'card-photo', route: '/whats-in/off-the-boat-lake-erie', find: { text: 'Walleye Cheeks', up: 3, maxH: 640 }, pad: 0.3,
      must: ['Walleye Cheeks', '$22', 'fresh or frozen'],
      mustNot: ['Yellow Perch fillets', 'Fresh fish prices change frequently'],
      alt: 'A photographed tile on the Lake Erie counter — photo, name, price and tag', note: 'Photo, name, price, tag' },
    // Copy claims the name on the card and the line that stands in for a price,
    // so both are in `must`. The description and chips sit under the card and
    // are what an `up: 2` would wrongly swallow.
    { id: 'card-sign', route: '/whats-in/off-the-boat-lake-erie', find: { text: 'ASK AT THE COUNTER', up: 1, maxH: 400 }, pad: 0.5,
      must: ['Catfish', 'ASK AT THE COUNTER'],
      mustNot: ['Whole.', 'Walleye Wings'],
      alt: 'The red card that stands in where a product has no photograph', note: 'A card, never a gap' },
    // `up: 0` on purpose — the knockout span overhangs its own <p> by a few px,
    // so climbing one level gives a box its own text falls outside of.
    // Copy claims the phone number and the admission that the page may lag, so
    // both strings are in `must`.
    { id: 'price-note', route: '/whats-in/off-the-boat-lake-erie', find: { text: 'Fresh fish prices change frequently' }, pad: 0.3,
      must: ['Fresh fish prices change frequently', 'may not always be perfectly accurate', '(814) 520-5047'],
      mustNot: ['Off the Boat · Lake Erie', 'Walleye Cheeks'],
      alt: 'The line under the counter heading asking you to call for today’s price', note: "Call for today's price" },

    // A fish
    { id: 'fish-taste', route: '/item/lake-erie-walleye', find: { text: 'Sweet, mild and clean' }, pad: 0.3,
      must: ['Sweet, mild and clean', 'best-eating freshwater fish'],
      mustNot: ['Lake Erie Walleye', '$20', 'Directions'],
      alt: 'The tasting note under a fish name on its own page', note: 'What it tastes like' },
    // The copy puts the price and the hours OUTSIDE this box — "both sitting
    // under the price with the hours" — so both are in `mustNot`, and the box
    // failing to stop at the two buttons is what that catches.
    { id: 'fish-actions', route: '/item/lake-erie-walleye', find: { text: 'Call (814) 520-5047', up: 1, maxH: 300 }, pad: 0.34,
      must: ['Call (814) 520-5047', 'Directions'],
      mustNot: ['$20', 'Fridays to 6', 'ON THE TABLE', 'Sweet, mild and clean'],
      alt: 'The call and directions buttons under the price on a fish page', note: 'Call and directions' },
    // First and last meal idea both in `must`, so a box that clips the list
    // fails rather than shipping a sentence about ideas you cannot see.
    { id: 'fish-table', route: '/item/lake-erie-walleye', find: { text: 'ON THE TABLE', up: 1, maxH: 300 }, pad: 0.32,
      must: ['ON THE TABLE', 'Pan-fried walleye with lemon', 'Shore-lunch style, in cornmeal'],
      mustNot: ['Fridays to 6', 'Directions', 'MORE FROM OFF THE BOAT'],
      alt: 'The meal ideas listed on a fish page', note: 'How people cook it' },

    // The week
    { id: 'friday', route: '/the-week', find: { text: 'Fish Fry Fridays', up: 1, maxH: 640 }, pad: 0.22,
      must: ['FRIDAYS', 'Fish Fry Fridays', 'Open to 6', 'on the fry'],
      mustNot: ['SATURDAYS', 'Lobster Roll Saturdays'],
      alt: 'The Fish Fry Fridays block on the week page', note: 'Fridays run late' },
    // Copy claims hours, price and what is in the kit — all three in `must`.
    { id: 'saturday', route: '/the-week', find: { text: 'Lobster Roll Saturdays', up: 1, maxH: 640 }, pad: 0.24,
      must: ['SATURDAYS', 'Lobster Roll Saturdays', '$20 each', 'New England rolls'],
      mustNot: ['Fish Fry Fridays', 'Cooking class nights'],
      alt: 'The Lobster Roll Saturdays block with its hours and price', note: 'A standing Saturday' },
    // Copy claims a day rate and a refundable deposit, so both figures are in
    // `must` even though neither appears in the sentence.
    { id: 'boiler', route: '/the-week', find: { text: 'Seafood boiler rental', up: 1, maxH: 640 }, pad: 0.26,
      must: ['Seafood boiler rental', '$25 a day', '$500 deposit, refunded on return'],
      mustNot: ['Custom fish smoking', 'Cooking class nights'],
      alt: 'The seafood boiler rental block with its day rate and deposit', note: 'Rate and deposit, printed' },
];
