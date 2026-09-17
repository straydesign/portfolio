/* Where each study lives, and which spec file describes its shots.
 *
 * The specs are split one file per study so five of them can be written and
 * captured at the same time without two writers landing in the same file.
 */
import { SPECS as andys } from './shots/andys.mjs';
import { SPECS as bullfrog } from './shots/bullfrog.mjs';
import { SPECS as seacave } from './shots/seacave.mjs';
import { SPECS as presqueisle } from './shots/presqueisle.mjs';
import { SPECS as middleman } from './shots/middleman.mjs';

/* `dismiss` holds selectors clicked once after every navigation, before the
   page is measured. Andy's and Bullfrog float an expanded HOURS card over the
   top right of every route; on the home page it covers the headline and half
   the intro paragraph. Its own minimize button collapses it to the small HOURS
   pill, which is a real control a real visitor uses — so the capture stays a
   picture of the site as shipped rather than the site with a part removed. */
export const SITES = {
  andys: {
    base: 'https://andyspub.com',
    display: 'andyspub.com',
    dismiss: ['button[aria-label="Minimize hours"]'],
  },
  bullfrog: {
    base: 'https://bullfrogbarerie.com',
    display: 'bullfrogbarerie.com',
    dismiss: ['button[aria-label="Minimize hours"]'],
  },
  seacave: { base: 'https://seacaveinc.com', display: 'seacaveinc.com' },
  presqueisle: { base: 'https://presqueislefishandfarm.com', display: 'presqueislefishandfarm.com' },
  middleman: { base: 'https://middleman.quest', display: 'middleman.quest' },
};

export const SHOT_SPECS = { andys, bullfrog, seacave, presqueisle, middleman };
