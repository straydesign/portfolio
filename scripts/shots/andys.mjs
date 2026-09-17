/* What to shoot on Andy's Ale House, and what on each shot the copy is
 * pointing at.
 *
 * `find` names the element by its OWN text (the deepest visible node that
 * contains it), `up` climbs to the card or row that frames it — stopping
 * before any parent taller than `maxH` — and `pad` decides where that lands in
 * the 390x844 viewport. The capture script measures the result, so an entry
 * here is a description of intent, never a pixel coordinate.
 *
 * `must` / `mustNot` are the contract: the strings that have to fall inside
 * the measured box and the ones that have to fall outside. Geometry alone
 * shipped a "name, description, price" box that stopped short of the price,
 * and a "today's specials" box that reached down into the food card below the
 * panel. Use only text that will still be on the page next month — a daily
 * special or a selected weekday is a value, not a landmark.
 *
 * One entry per line of copy, plus the cover shots. A sentence with no entry
 * here has no screenshot, and `npm run check:budget` fails the build.
 */

export const SPECS = [
  // Cover — no annotation, these are the title wall
  { id: 'cover-home', route: '/', scrollY: 0, alt: "Andy's home page on a phone" },
  { id: 'cover-menu', route: '/menu', scrollY: 400, alt: "Andy's menu on a phone" },
  { id: 'cover-gallery', route: '/gallery', scrollY: 330, alt: "Andy's gallery on a phone" },
  { id: 'cover-dish', route: '/menu/club-melt', scrollY: 150, alt: "An Andy's dish page on a phone" },

  // Today
  { id: 'today-card', route: '/', find: { text: "TODAY'S SPECIALS", up: 1, maxH: 480 }, pad: 0.3,
    must: ["TODAY'S SPECIALS", 'DRINK', 'LUNCH', 'WED'],
    mustNot: ['FROM THE MENU', 'Late Kitchen'],
    alt: "Today's specials panel on Andy's home page", note: "Today's specials" },
  // This strip used to need 382px in a 358px window, so the page scrolled the
  // selected day flush right on load and cut the first 24px off Monday. Fixed
  // on the bar's own site (gap-2 → gap-1.5, px-3 → px-2.5, andys d7da680): the
  // row is 342px and the whole week fits. All seven are in the contract now, so
  // if that ever regresses this capture fails instead of shipping half a word.
  { id: 'day-tabs', route: '/menu', find: { text: 'Sun', up: 2, maxH: 120 }, pad: 0.36,
    must: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    mustNot: ['TONIGHT', 'LUNCH SPECIAL'],
    alt: 'The seven day tabs on the menu page, today already selected', note: 'Seven days, today selected' },
  { id: 'tonight', route: '/menu', find: { text: 'Daily drink special · 8 PM – 12 AM', up: 2, maxH: 130 }, pad: 0.32,
    must: ['TONIGHT', 'Daily drink special · 8 PM – 12 AM'],
    mustNot: ['LUNCH SPECIAL', 'Sun'],
    alt: "Tonight's drink special with its serving window", note: 'Tonight, with a time' },

  // The menu
  { id: 'menu-cats', route: '/menu', find: { text: 'Gourmet Burgers', up: 1, maxH: 320 }, pad: 0.3,
    must: ['Appetizers', 'Gourmet Burgers', 'Wings', 'Desserts'],
    mustNot: ['FOOD', 'TONIGHT'],
    alt: 'The food category grid on the menu page', note: 'Twelve categories' },
  { id: 'menu-list', route: '/menu', find: { text: 'Battered and deep fried. Large basket.', up: 2, maxH: 130 }, pad: 0.3,
    must: ['Zucchini', 'Battered and deep fried. Large basket.', '$9.95'],
    mustNot: ['Appetizers'],
    alt: 'A dish row with its name, description and price', note: 'Name, description, price' },
  // Every row the box frames is named in the sentence beside it, so the
  // contract lists all seven. `pad` keeps the top edge clear of the floating
  // HOURS pill, which the old 0.16 ran the border straight through.
  { id: 'menu-faq', route: '/menu', find: { text: 'Common questions', up: 1, maxH: 620 }, pad: 0.26,
    must: ["Where is Andy's Pub?", 'What time does the kitchen close?', 'Do you do pickup orders?',
      'Do you have daily lunch specials?', "Is there a kids' menu?", 'Is parking free?', 'Can you host a group or party?'],
    alt: 'The common-questions list at the foot of the menu page', note: 'The questions people call about' },

  // A dish
  { id: 'dish-hero', route: '/menu/club-melt', find: { text: 'Club Melt' }, pad: 0.26,
    must: ['Club Melt'],
    mustNot: ['$9.95', 'MELTS', 'Ham, turkey, tomato, swiss & American cheese.'],
    alt: 'The dish name on its own page', note: 'The dish name is the heading' },
  { id: 'dish-pickup', route: '/menu/club-melt', find: { text: '3866 Peach Street, Erie, PA', up: 4, maxH: 300 }, pad: 0.3,
    must: ['3866 Peach Street, Erie, PA', 'Kitchen 11 AM – Midnight · 7 days a week', 'Call to order', 'See full menu'],
    mustNot: ['Club Melt', 'More from Melts'],
    alt: "The pickup card on the Club Melt page — address, kitchen hours, phone, and the way back", note: 'Address, hours, phone, menu' },
  { id: 'dish-back', route: '/menu/club-melt', find: { text: 'BACK TO FULL MENU' }, pad: 0.4,
    must: ['BACK TO FULL MENU'],
    mustNot: ['HOURS', 'Club Melt'],
    alt: 'The link back to the full menu', note: 'One tap back' },

  // The photographs
  // The only box on a wordless target. `must` takes strings, so the contract
  // here is the geometry guard plus the `css`/`nth` selector itself — one
  // <img> in the grid, never the grid.
  { id: 'gallery-grid', route: '/gallery', find: { css: 'main img', nth: 2, up: 2, maxH: 260 }, pad: 0.3,
    alt: "A single photograph in Andy's gallery grid", note: 'One photo, one tile' },
  { id: 'gallery-upload', route: '/gallery', find: { text: 'Share a photo', up: 2 }, pad: 0.32,
    must: ['Share a photo', 'Choose photo', 'Submit photo'],
    mustNot: ['QUICK LINKS'],
    alt: 'The form a customer uses to send a photo in', note: 'Anyone can add one' },
  { id: 'room-cards', route: '/', find: { text: '26 pool & billiard tables', up: 2 }, pad: 0.3,
    must: ['26 pool & billiard tables', '17 regulation, 8 bar tables', 'See the room'],
    mustNot: ['40+ HD TVs & a 21-ft laser screen', 'MORE THAN A GRILL'],
    alt: 'The photographed card describing the pool room', note: 'One room, counted on the photo' },
];
