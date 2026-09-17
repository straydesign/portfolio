import { type CaseStudy } from './types';

/* Aquatics retail in Erie since 1975. Every claim here is visible on the live
   site or measured from it. Each line of copy names its own capture in
   `scripts/shots/seacave.mjs`, and `npm run check:budget` proves it resolves.

   Nothing below names a value that the site regenerates — no stock count, no
   price, no species that happens to be in the tanks this week. The counts on
   the aisle tiles and the prices in a parts list are described as mechanisms,
   so a re-capture next month still agrees with the sentence beside it. */

export const SEACAVE: CaseStudy = {
  slug: 'seacave',
  client: 'Sea Cave Inc.',
  title: 'A 900-page catalogue for an aquarium shop',
  meta: 'Erie, PA · aquatics retail · design, build, CMS',
  liveUrl: 'https://seacaveinc.com',
  cover: ['seacave/cover-home', 'seacave/cover-catalogue', 'seacave/cover-species', 'seacave/cover-guides'],
  summary:
    'Sea Cave has sold saltwater fish at 660 East 14th Street in Erie since 1975, and nothing leaves the building by post. The site had to work as a reference rather than a store, so a species page carries the phone number where a basket would be.',
  topics: [
    {
      label: 'Two catalogues',
      gloss: 'live tanks and hardware, kept apart',
      lead: 'The shop keeps two lists. The catalogue is a reference for what is alive in its tanks, and the shop page is the hardware that carries prices.',
      items: [
        {
          heading: 'Aisle tiles',
          body: 'One tile each for saltwater, freshwater, coral and invertebrates, one for all of them, and every tile carries its count.',
          shot: 'seacave/catalogue-aisles',
        },
        {
          heading: 'In-store notice',
          body: 'One notice: sold in store, live animals never shipped, special orders taken, and the number to call.',
          shot: 'seacave/shop-instore',
        },
        {
          heading: 'Call button',
          body: 'A species page carries no basket. The button in the buy slot is the shop’s phone number.',
          shot: 'seacave/species-call',
        },
      ],
    },
    {
      label: 'One species',
      gloss: 'one page per fish',
      lead: 'Every species the shop keeps has a page. Each is built to answer what would otherwise have to be asked out loud at the counter.',
      items: [
        {
          heading: 'Care grid',
          body: 'This one grid holds care level, temperament, community, adult size, minimum tank, diet and the scientific name.',
          shot: 'seacave/species-care',
        },
        {
          heading: 'Adult-size card',
          body: 'Sixteen species outgrow the tank they are bought for, and only those pages carry the juvenile gallons beside the adult gallons.',
          shot: 'seacave/species-grows',
        },
        {
          heading: 'Tankmate card',
          body: 'A tankmate the shop keeps gets its photograph, a link to its own page, and a paragraph on why the pairing works.',
          shot: 'seacave/species-tankmates',
        },
      ],
    },
    {
      label: 'Builds',
      gloss: 'eight guides, each priced',
      lead: "Eight of the guides walk a whole tank build. Each of those ends in a parts list, priced off the shop's own shelves.",
      items: [
        {
          heading: 'Water-and-size chip',
          body: 'One chip gives the water type and the tank size the build was written for.',
          shot: 'seacave/guide-cards',
        },
        {
          heading: 'Parts-list row',
          body: 'A row holds the photograph, the part, its price, one line on the job it does, and the link to the product.',
          shot: 'seacave/guide-part',
        },
        {
          heading: 'Estimated price',
          body: 'An unconfirmed price carries a tilde and the word estimate, beside the part it belongs to and the line explaining it.',
          shot: 'seacave/guide-estimate',
        },
      ],
    },
    {
      label: 'Servicing',
      gloss: 'maintenance and coral farming',
      lead: 'Servicing and coral farming have a page of their own. Numbered blocks rather than one long paragraph, so each service can be read and left on its own.',
      items: [
        {
          heading: 'Service photograph',
          body: "Each photograph is one of the shop's own display tanks in Erie.",
          shot: 'seacave/service-photo',
        },
        {
          heading: 'What a visit covers',
          body: 'Saltwater, freshwater and office tanks, the visit plans, repairs and emergency call-outs each get a line of their own.',
          shot: 'seacave/service-covered',
        },
        {
          heading: 'Enquire button',
          body: 'The same phone number closes each service, so nobody has to scroll back up to find it.',
          shot: 'seacave/service-call',
        },
      ],
    },
    /* The owner's half of the site. The impact block has claimed "the shop
       edits all of it" since the first version of this study and never showed
       it, which made it the one line here a reader had to take on faith.

       These three captures come off the store editor at /manage rather than
       the public site — see `seacaveManage` in scripts/shots.config.mjs. No
       count goes in the copy: 884 live and 85 off the site are true this
       morning and false the next time somebody turns a tank over. */
    {
      label: 'Day to day',
      gloss: 'what the shop changes itself',
      lead: 'Sea Cave edits the site itself. Every screen in the editor is named for a job the shop already does, and the whole of it fits a phone.',
      items: [
        {
          heading: 'Task card',
          body: 'The front page is a stack of these. Each is named for the job, and the line under it says when to reach for it.',
          shot: 'seacave/manage-tasks',
        },
        {
          heading: 'Product card',
          body: 'Photo, name, price and the switch that takes it off the site. Anything that sells out goes off in one tap.',
          shot: 'seacave/manage-toggle',
        },
        {
          heading: 'Second-look rows',
          body: 'The editor checks its own catalogue. Anything live without a photo or without a price is listed here, so nobody goes looking for it.',
          shot: 'seacave/manage-check',
        },
      ],
    },
  ],
  impact: {
    lead: 'The shop edits all of it. Catalogue, shop page, guides and services. Fifty years in, this is the first website Sea Cave has ever had.',
    metrics: [
      { value: '900', label: 'Pages, one per species and product' },
      { value: '~25,000', label: 'Google search impressions a month' },
      { value: '0', label: 'Baskets on a species page, by design' },
    ],
    note: "Impressions measured in Search Console across full months, July–August 2026. Page count is 728 products plus 172 species pages, read off the sitemap; the catalogue index lists 156 of them.",
  },
  learnings: [
    {
      heading: 'Split the catalogue',
      body: 'Separating what the shop can order from what is in the building ended the calls that opened with disappointment.',
    },
    {
      heading: 'Servicing is the recurring money',
      body: 'Servicing was less fun to design than a wall of species photographs, and it is where the recurring money comes from.',
    },
    {
      heading: 'Label the estimate',
      body: 'A price the shop cannot stand behind is marked rather than dropped, which keeps the rest of the list believable.',
    },
  ],
};
