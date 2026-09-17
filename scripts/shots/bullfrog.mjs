/* What to shoot on Bullfrog Bar, and what on each shot the copy is pointing at.
 *
 * `find` names the element by its OWN text (the deepest visible node that
 * contains it), `up` climbs to the card or row that frames it — stopping
 * before any parent taller than `maxH` — and `pad` decides where that lands in
 * the 390x844 viewport. `must` and `mustNot` are then checked against real
 * rects at the moment of the shot, so a box that stops short of the thing the
 * sentence names, or swallows the card next to it, fails the run instead of
 * shipping. Every noun a line of copy claims has a string in `must`.
 *
 * One entry per line of copy, plus three or four unannotated cover shots.
 * A sentence with no entry here has no screenshot, and `npm run check:budget`
 * fails the build.
 *
 * The calendar is live: bands, dates and door times all move. None of that is
 * allowed in the shipped copy — but it is allowed here, because `must` is
 * checked against the DOM at capture time. A booking that has rolled over
 * fails loudly on the next run, which is the point.
 *
 * Collisions to know about: the events hero carries its own `Call (814)
 * 864-9007` and `Always Free Admission`, and the nav carries `Andy's Pub`,
 * `Gold Crown` and `Bullfrog Bar` on every route. `must` resolves the FIRST
 * visible match, so none of those strings can assert anything further down
 * the page.
 *
 * A fixed hours card floats over CSS y 114–274 on every route, so every `pad`
 * here is set to land its box below 280. A marker half-covered by a panel the
 * capture cannot dismiss is a marker nobody can read.
 */

export const SPECS = [

    // Cover — no annotation, these are the title wall
    { id: 'cover-home', route: '/', scrollY: 200, alt: 'Bullfrog home page on a phone, the next show under the headline' },
    { id: 'cover-lineup', route: '/', scrollY: 660, alt: 'The live music list on the Bullfrog home page' },
    { id: 'cover-events', route: '/events', scrollY: 340, alt: 'The Bullfrog show calendar on a phone' },
    { id: 'cover-venue', route: '/events', scrollY: 1620, alt: 'The Bullfrog live music room described on a phone' },

    // Up next
    { id: 'next-show', route: '/', find: { text: 'LIVE MUSIC', up: 2 }, pad: 0.34,
      must: ['LIVE MUSIC', 'No cover', 'RESERVE A TABLE'],
      mustNot: ['A warmly-appointed multi-level lounge', 'Free admission every Friday night'],
      alt: 'The next live show, carded under the Bullfrog headline', note: 'The next act, on the hero' },
    // Not a "door time": this room charges nothing at the door and says so on
    // the same page. What the card prints is when the band starts and stops.
    { id: 'show-time', route: '/', find: { text: '6:00 PM – 10:00 PM', up: 1 }, pad: 0.45,
      must: ['Friday', '6:00 PM – 10:00 PM'],
      mustNot: ['No cover', 'LIVE MUSIC', 'Rock'],
      alt: 'The weekday, date and set time on the next-show card', note: 'Day, date, set time' },
    { id: 'show-cta', route: '/', find: { text: 'RESERVE A TABLE', up: 1 }, pad: 0.4,
      must: ['MORE SHOW', 'RESERVE A TABLE'],
      mustNot: ['No cover', 'Rock'],
      alt: 'The two buttons under the next show — the rest of the calendar, and a table', note: 'Two ways off the card' },

    // The calendar
    { id: 'calendar-month', route: '/events', find: { text: 'Upcoming Shows' }, pad: 0.36,
      must: ['Upcoming Shows', '2026'],
      mustNot: ['All shows at the Bullfrog Bar'],
      alt: 'The month heading over the Bullfrog show list', note: 'Headed with the month' },
    { id: 'band-row', route: '/events', find: { css: 'main .divide-y > div', nth: 0 }, pad: 0.35,
      // The band name and its write-up rotate weekly. They are asserted anyway:
      // a booking that has rolled over should fail this run, not ship silently.
      must: ['FRI', 'Gypsy Heart', "Erie's greatest classic rock experience", 'Rock', 'Free Admission',
        '6:00 PM - 10:00 PM', 'Learn More', '(814) 864-9007'],
      mustNot: ['Upcoming Shows', 'Table reservations recommended', 'The Bullfrog Bar'],
      alt: 'One show in the calendar — date block, band, write-up, genre, admission, time, link and number', note: 'One row per show' },
    // Two chips sit in this row, not one — the genre and the door price — and a
    // sentence that named only the genre was describing half its own box.
    { id: 'band-link', route: '/events', find: { text: 'Learn More', up: 1 }, pad: 0.4,
      must: ['Rock', 'Free Admission', 'Learn More'],
      mustNot: ['6:00 PM - 10:00 PM', 'Upcoming Shows'],
      alt: "The genre and admission chips, and the link out to the band's own page", note: "Genre, admission, the band's page" },

    // The room
    { id: 'venue-copy', route: '/events', find: { text: 'Dance floor, 21-foot laser big screen' }, pad: 0.36,
      must: ['Dance floor, 21-foot laser big screen', 'acoustics', 'musicians and audiences'],
      mustNot: ['21-Foot Laser Big Screen', 'The Bullfrog Bar'],
      alt: 'The paragraph describing what the Bullfrog room gives a band', note: 'What a band is walking into' },
    { id: 'amenities', route: '/events', find: { text: '21-Foot Laser Big Screen', up: 1 }, pad: 0.36,
      must: ['Full Bar', '40+ HD TVs', '21-Foot Laser Big Screen', '26 Pool Tables', 'Full Kitchen', 'Free Parking', 'Darts', 'Private Event Space', 'Free WiFi'],
      mustNot: ['Dance floor, 21-foot laser big screen', 'great acoustics'],
      alt: 'The grid of what the room has — bar, TVs, laser screen, tables, kitchen, parking', note: 'What the room has' },
    { id: 'about-venue', route: '/about', find: { text: 'Multi-level live music venue', up: 1 }, pad: 0.36,
      // The card's own title is "Bullfrog Bar", which the nav already carries on
      // every route, so the description is what gets asserted.
      must: ['Multi-level live music venue', 'Never a cover charge'],
      mustNot: ['Gold Crown Billiards', "Andy's Pub"],
      alt: 'The Bullfrog card on the about page, naming it a live music venue', note: 'Named a music venue' },

    // Booking
    { id: 'reserve-cta', route: '/events', find: { text: 'tables fill up fast', up: 1 }, pad: 0.36,
      must: ['Want to Reserve a Table?', 'We recommend calling ahead for Friday shows', 'tables fill up fast', 'Call (814) 864-9007', 'Follow on Facebook'],
      mustNot: ['Free WiFi', 'Private Event Space'],
      alt: 'The reserve-a-table panel at the foot of the events page', note: 'Call ahead for a Friday' },
    { id: 'party-stage', route: '/parties', find: { text: 'stage, PA system, dance floor', up: 1 }, pad: 0.36,
      must: ['stage, PA system, dance floor', '50-100+'],
      mustNot: ["Andy's Dining Area", 'Our Spaces'],
      alt: 'The Bullfrog room listed as a bookable space, with its capacity', note: 'Stage, PA, dance floor' },
    { id: 'party-live', route: '/parties', find: { text: 'Add live music or entertainment', up: 2, maxH: 400 }, pad: 0.4,
      must: ['Live Entertainment', 'Add live music or entertainment'],
      mustNot: ['Custom Menus', '8 to 100+ Guests', 'Full Bar Service'],
      alt: 'The line offering live entertainment as part of a private booking', note: 'Music on a private night too' },
];
