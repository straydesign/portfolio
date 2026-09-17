/* What to shoot on Sea Cave, and what on each shot the copy is pointing at.
 *
 * `find` names the element by its OWN text (the deepest visible node that
 * contains it), `up` climbs to the card or row that frames it — stopping
 * before any parent taller than `maxH` — and `pad` decides where that lands in
 * the 390x844 viewport. `must` and `mustNot` then prove the box actually
 * frames the thing the sentence names. The capture script measures all of it,
 * so an entry here is a description of intent, never a pixel coordinate.
 *
 * One entry per line of copy, plus three or four unannotated cover shots.
 * A sentence with no entry here has no screenshot, and `npm run check:budget`
 * fails the build.
 *
 * Two things on this site move on their own and are deliberately NOT targeted:
 * the live counts on the aisle tiles, and the crossfading photograph in the
 * coral-farming block. Every target below is authored copy or a control, so a
 * re-capture next month frames the same thing.
 */

export const SPECS = [

    // Cover — no annotation, these are the title wall
    { id: 'cover-home', route: '/', scrollY: 0, alt: 'Sea Cave home page on a phone' },
    { id: 'cover-catalogue', route: '/catalogue', scrollY: 560, alt: 'The Sea Cave species catalogue on a phone' },
    { id: 'cover-species', route: '/catalogue/yellow-tang', scrollY: 180, alt: 'A Sea Cave species page on a phone' },
    { id: 'cover-guides', route: '/guides', scrollY: 700, alt: 'The Sea Cave build guides on a phone' },

    // Two catalogues
    // The grid holds an "All" tile with the four species aisles and there is no
    // wrapper around the four on their own, so the box takes all five — which
    // is why the sentence beside it counts five tiles, not four.
    { id: 'catalogue-aisles', route: '/catalogue', find: { text: 'Coral & Anemones', up: 3, maxH: 300 }, pad: 0.25,
      must: ['All', 'Saltwater Fish', 'Freshwater Fish', 'Coral & Anemones', 'Invertebrates'],
      mustNot: ['Everything we carry', 'Search the catalogue'],
      alt: 'The aisle tiles on the Sea Cave catalogue, each carrying a count', note: 'Every tile carries its count' },
    { id: 'shop-instore', route: '/shop', find: { text: 'there is no online checkout', up: 1, maxH: 300 }, pad: 0.25,
      must: ['there is no online checkout', 'we never ship live animals', 'Let us order it for you', '(814) 456-9445'],
      mustNot: ['Everything we carry'],
      alt: 'The line above the shop grid saying everything is sold in store', note: 'Sold in store only' },
    { id: 'species-call', route: '/catalogue/yellow-tang', find: { text: 'Call (814) 456-9445' }, pad: 0.34,
      must: ['Call (814) 456-9445'], mustNot: ['Ask a question'],
      alt: 'The phone-number button in the buy slot on a species page', note: 'Call, not add to cart' },

    // One species
    { id: 'species-care', route: '/catalogue/yellow-tang', find: { text: 'CARE LEVEL', up: 3, maxH: 560 }, pad: 0.2,
      must: ['CARE LEVEL', 'SCIENTIFIC NAME'], mustNot: ['GROWS INTO ITS TANK'],
      alt: 'The care-at-a-glance grid on a Sea Cave species page', note: 'Care at a glance' },
    { id: 'species-grows', route: '/catalogue/yellow-tang', find: { text: 'GROWS INTO ITS TANK', up: 1, maxH: 300 }, pad: 0.3,
      must: ['GROWS INTO ITS TANK'], mustNot: ['SCIENTIFIC NAME', 'Good tank mates'],
      alt: 'The card giving juvenile and adult tank sizes for a species', note: 'Juvenile and adult gallons' },
    /* The Royal Gramma card was in this box until its paragraph turned out to
       end "the saltwateraquariumblog author confirms … corroborated by
       Fishkeeping World". Thirty of the shop's 172 species pages name an
       outside source like that, which is a copy problem on their site, not
       something to frame and point an arrow at here. This card carries the same
       three things — photograph, its own page, the reason for the pairing —
       and cites nobody. `mustNot` now fails the capture if the citation ever
       lands back inside the frame. */
    { id: 'species-tankmates', route: '/catalogue/yellow-tang', find: { text: 'Ultra Black Ice Clownfish', up: 3, maxH: 560 }, pad: 0.2,
      must: ['Ultra Black Ice Clownfish'],
      mustNot: ['Royal Gramma', 'saltwateraquariumblog', 'Fishkeeping World', 'care guides'],
      alt: 'A suggested tankmate card with the reasoning for the pairing', note: 'A pairing, with the reason' },

    // The builds
    /* `up: 2` climbed to the whole card, so a sentence about one chip had a
       marker box around a chip, a headline and a full-bleed photograph of a
       sailfin tang. No `up` at all lands on the chip itself, which is the only
       thing the sentence claims. `mustNot` now fails the capture if the title
       or the photo's card creeps back into the frame. */
    { id: 'guide-cards', route: '/guides', find: { text: 'SALTWATER · 30–55 GALLON' }, pad: 0.24,
      must: ['SALTWATER', '30–55 GALLON'],
      mustNot: ['Your first saltwater aquarium', 'FOWLR'],
      alt: 'The chip on a build-guide card giving its water type and tank size', note: 'Water type and tank size' },
    { id: 'guide-part', route: '/guides/first-saltwater-aquarium', find: { text: 'Slows evaporation that would otherwise', up: 3, maxH: 400 }, pad: 0.25,
      must: ['Aqueon Hinged Glass Top 36"x18"', '$39.99', 'View product'], mustNot: ['30× Dry Reef Rock'],
      alt: 'A parts-list row with its price, its reason and a link to the product', note: 'Part, price, and why' },
    { id: 'guide-estimate', route: '/guides/first-saltwater-aquarium', find: { text: 'Reads salinity precisely', up: 1, maxH: 400 }, pad: 0.25,
      must: ['Marine Refractometer for Saltwater Salinity', '~$49.99', 'ESTIMATE'], mustNot: ['2× Aquatop 150W Submersible'],
      alt: 'A parts-list row whose price is marked as an estimate', note: 'Marked as an estimate' },

    // Servicing
    // The one wordless target on this study, so it carries no `must` — a
    // photograph has no text to contain. `mustNot` keeps the number and the
    // title out of the box, and the selector does the rest: nth 1, not 0,
    // because image 0 is the page hero and image 2 is the crossfading frame in
    // the coral-farming block. 1 is the static photograph that opens service
    // 01, directly above its number and title.
    { id: 'service-photo', route: '/services', find: { css: 'main img', nth: 1, up: 1 }, pad: 0.3,
      mustNot: ['PROFESSIONAL AQUARIUM MAINTENANCE', 'Tank Servicing.'],
      alt: 'The photograph opening the tank-servicing block, above its number and title', note: "The shop's own tank" },
    { id: 'service-covered', route: '/services', find: { text: 'Emergency service available', up: 2, maxH: 560 }, pad: 0.2,
      must: ['Emergency service available', 'Home and office aquariums'], mustNot: ['Enquire — (814) 456-9445'],
      alt: 'The list of jobs a tank-servicing visit covers', note: 'What the service covers' },
    { id: 'service-call', route: '/services', find: { text: 'Enquire — (814) 456-9445' }, pad: 0.4,
      must: ['Enquire — (814) 456-9445'], mustNot: ['Emergency service available'],
      alt: 'The phone-number button that closes a service block', note: 'Every block ends here' },

    /* The store editor — the owner's half of the site, on `site:
       'seacaveManage'`. See the note beside that entry in shots.config.mjs for
       why the address bar reads seacaveinc.com and where the password comes
       from.

       Each of these three wants its own screen's heading in frame as well as
       the element being annotated, so `pad` is set high enough to keep the
       capture at scroll 0 rather than the default quarter-viewport lead-in. A
       reader has to be able to tell which screen they are looking at.

       No count goes in the copy beside these. 884 live and 85 off the site are
       both true this morning and false the moment the shop turns something
       off, which is the whole point of the screen. */
    { id: 'manage-tasks', site: 'seacaveManage', route: '/manage', find: { text: 'Edit or Turn Off a Product', up: 2, maxH: 400 }, pad: 0.7,
      must: ['Edit or Turn Off a Product', 'Change a price or photo'],
      mustNot: ['Add a New Product', 'What would you like to do?'],
      alt: 'A task card on the store editor naming the job it does', note: 'Named for the job' },
    { id: 'manage-toggle', site: 'seacaveManage', route: '/manage/products', find: { css: 'button[role="switch"]', nth: 0, up: 5, maxH: 400 }, pad: 0.9,
      must: ['On the site'],
      mustNot: ['Off site', 'Your products'],
      alt: 'A product card in the editor with the switch that takes it off the site', note: 'Off the site in one tap' },
    /* The one of the three that does NOT open at scroll 0. The page's intro
       paragraph is a wall of grey text that says what the two headings under
       it already say, and it carries a glued "On the sitebreaks down" — a JSX
       space eaten at compile, fixed in the shop's repo and waiting on a deploy.
       Starting a quarter-viewport above the flags drops the paragraph off the
       top and puts the "884 live · 4 worth a second look" summary in frame
       instead, which is the context the annotation actually needs. */
    { id: 'manage-check', site: 'seacaveManage', route: '/manage/not-live', find: { text: 'Live, but no photo', up: 4, maxH: 400 }, pad: 0.25,
      must: ['Live, but no photo', 'Live, but no price'],
      mustNot: ['WORTH A SECOND LOOK', 'Saltwater Fish'],
      alt: 'The rows flagging listings that went live without a photo or a price', note: 'The site checks itself' },
];
