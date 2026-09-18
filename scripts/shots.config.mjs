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
const DECLARED_SITES = {
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

  /* The owner-only half of the same site. `/manage` is live on seacaveinc.com
     and answers 307 to the login screen, so the domain drawn in the address
     bar is the route a reader could type — but the capture is taken against
     the local server, which reads the same production KV and therefore the
     same 969 products, 884 of them live. Signing a headless browser into the
     production dashboard to photograph it is not worth doing when the pixels
     are identical.

     `auth` posts the shop's password through the capture context so the
     session cookie is the one the navigations carry. The password is read from
     the environment at capture time and is not in this repo:

       cd ~/Projects/portfolio
       SEACAVE_MANAGE_PASSWORD=… npm run shots seacave

     READS ONLY. The local dev server's KV is production's, so a Save on these
     screens edits the live site. Nothing in the specs below clicks one. */
  seacaveManage: {
    base: 'http://127.0.0.1:5120',
    display: 'seacaveinc.com',
    auth: { post: '/api/manage-auth', secretEnv: 'SEACAVE_MANAGE_PASSWORD' },
  },
  presqueisle: { base: 'https://presqueislefishandfarm.com', display: 'presqueislefishandfarm.com' },
  middleman: { base: 'https://middleman.quest', display: 'middleman.quest' },
};

/* A fix lands locally before it is deployed, and the shot OF that fix has to
   come from the build that has it. `SHOT_BASE_<STUDY>` points one site at a
   local server for a single run:

     SHOT_BASE_PRESQUEISLE=http://localhost:5192 npm run shots -- presqueisle roundel

   `display` is untouched, so the address bar still draws the production
   domain — the same arrangement `seacaveManage` above already runs on. Nothing
   is written back here, so the next run goes to production on its own.

   This is for re-shooting a fix that is committed and waiting to deploy. A
   shot taken from a local build of something NOT yet committed is a picture of
   a site that does not exist. */
export const SITES = Object.fromEntries(
  Object.entries(DECLARED_SITES).map(([study, site]) => {
    const base = process.env[`SHOT_BASE_${study.toUpperCase()}`];
    return [study, base ? { ...site, base } : site];
  }),
);

export const SHOT_SPECS = { andys, bullfrog, seacave, presqueisle, middleman };
