/* ONE smart-object replacement per Photoshop invocation.
 *
 * Adapted from sunbird-kit/ps-scripts/one-pattern-job.jsx, whose header
 * records why it is one per invocation: six 180-250MB PSDs in a single session
 * drove swap to ~10GB. These are 107-118MB each, so the same rule holds — open,
 * replace in memory, duplicate, flatten, export, close without saving, purge.
 *
 * The licensed source is never written back.
 *
 * Job file, one value per line:
 *   psd | art png | out png | SO indices (comma separated, document order)
 *   | solo group index or -1 | trim margin px or -1 | keep background 1/0
 *   | keep screen gloss 1/0
 *
 * Smart objects are addressed by INDEX rather than by name: the kit has three
 * groups all called "iPhone Mockup", each containing a layer called
 * "Smart Object", so a path match would always land on the first phone.
 */
var jf = new File("/Users/tomsesler/Projects/portfolio/.ps-run/screen-job.txt");
jf.open("r");
var psdPath = jf.readln(), artPath = jf.readln(), outPath = jf.readln(),
    idxRaw = jf.readln(), soloRaw = jf.readln(), marginRaw = jf.readln(), bgRaw = jf.readln(),
    glossRaw = jf.readln();
jf.close();

var wanted = idxRaw.split(",");
var solo = parseInt(soloRaw, 10);
var margin = parseInt(marginRaw, 10);
var keepBg = (bgRaw !== "0");
var keepGloss = (glossRaw !== "0");

function collectSOs(layers, out) {
  for (var i = 0; i < layers.length; i++) {
    var L = layers[i];
    if (L.typename === "LayerSet") collectSOs(L.layers, out);
    else { try { if (L.kind === LayerKind.SMARTOBJECT) out.push(L); } catch (e) {} }
  }
}

function findByName(layers, name, out) {
  for (var i = 0; i < layers.length; i++) {
    var L = layers[i];
    if (L.typename === "LayerSet") findByName(L.layers, name, out);
    else if (L.name === name) out.push(L);
  }
}

function findInGroup(layers, groupName, layerName, out) {
  for (var i = 0; i < layers.length; i++) {
    var L = layers[i];
    if (L.typename !== "LayerSet") continue;
    if (L.name === groupName) {
      for (var j = 0; j < L.layers.length; j++) {
        if (L.layers[j].typename !== "LayerSet" && L.layers[j].name === layerName) out.push(L.layers[j]);
      }
    }
    findInGroup(L.layers, groupName, layerName, out);
  }
}

var doc = app.open(new File(psdPath));
var sos = []; collectSOs(doc.layers, sos);
var art = new File(artPath);
if (!art.exists) { doc.close(SaveOptions.DONOTSAVECHANGES); throw new Error("no art at " + artPath); }

var placed = [];
for (var w = 0; w < wanted.length; w++) {
  var idx = parseInt(wanted[w], 10);
  if (isNaN(idx) || idx < 0 || idx >= sos.length) continue;
  var L = sos[idx];
  L.visible = true;
  doc.activeLayer = L;
  var d = new ActionDescriptor();
  d.putPath(charIDToTypeID("null"), art);
  executeAction(stringIDToTypeID("placedLayerReplaceContents"), d, DialogModes.NO);
  placed.push(idx);
}
if (!placed.length) { doc.close(SaveOptions.DONOTSAVECHANGES); throw new Error("no SO index matched; had " + sos.length); }

/* Soloing a phone hides the other two groups AND their cast shadows, which
   live inside the same group — so the plinth is left clean rather than lit by
   a phone that is no longer there. */
var cropBox = null;
if (!isNaN(solo) && solo >= 0) {
  var groups = [];
  for (var g = 0; g < doc.layers.length; g++) {
    if (doc.layers[g].typename === "LayerSet" && doc.layers[g].name.indexOf("iPhone Mockup") !== -1) groups.push(doc.layers[g]);
  }
  for (var k = 0; k < groups.length; k++) groups[k].visible = (k === solo);
  if (groups[solo]) {
    /* The group's own bounds are the cast shadow's, which is nearly twice the
       width of the handset — cropping to them yields a small phone adrift in a
       wide canvas. The body is what the crop is for. */
    var bodies = []; findByName(groups[solo].layers, "Main Object", bodies);
    var b = (bodies.length ? bodies[0] : groups[solo]).bounds;
    cropBox = [b[0].as("px"), b[1].as("px"), b[2].as("px"), b[3].as("px")];
  }
}

/* The plinth is the kit's, not the portfolio's. Dropping it exports the
   handset on transparency, so the render sits on whatever ground the page
   already has instead of carrying a lilac rectangle into it.

   The cast shadow goes with it. It is 1967px wide against a 1007px handset,
   so a crop tight enough to be a useful web asset slices straight through it
   and leaves a hard grey edge under the phone — which is exactly what it did.
   Widening the crop to contain it would mean a mostly-empty image. The page
   draws its own contact shadow in CSS instead, from the alpha channel, so it
   follows the silhouette rather than a rectangle. */
if (!keepBg) {
  for (var bl = 0; bl < doc.layers.length; bl++) {
    if (doc.layers[bl].name.indexOf("Background") !== -1) doc.layers[bl].visible = false;
  }
  var shadows = []; findByName(doc.layers, "Object Shadow", shadows);
  for (var sh = 0; sh < shadows.length; sh++) shadows[sh].visible = false;
}

/* `duplicate(name, true)` is a MERGED duplicate — the copy arrives as a single
   flattened layer already. Calling mergeVisibleLayers() on it raised a modal
   "The command Merge Visible is not currently available", which blocks the
   AppleEvent rather than failing it: Photoshop sat at 0.5% CPU with the script
   waiting on a dialog nobody could see.

   So the only thing left to decide is alpha. flatten() composites onto white,
   which is right when the kit's plinth is in the shot and wrong when it is
   not — with the background hidden, the merged duplicate already carries the
   handset and its shadow on transparency. */
/* The kit lights the phone as a product shot: a broad diagonal highlight
   across the glass plus a second one clipped to the screen itself. On a phone
   photographed at an angle that reads as a reflection. On the straight-on
   centre handset it reads as haze over the UI — Tom: "it looks like it's the
   reflection, but you can't really tell... it just looks like cloudy, like not
   good contrast."

   So the two layers that cross the SCREEN come off and everything that
   describes the DEVICE stays: `Frame Shine` and `Main Effect` are the bezel
   and body, `Camera Effect` is the Dynamic Island, `Speaker` is the earpiece.
   Losing those would leave a flat cutout rather than a photograph. */
if (!keepGloss) {
  var glare = [];
  findByName(doc.layers, "Shine 1", glare);
  findByName(doc.layers, "Shine 2", glare);
  findInGroup(doc.layers, "Smart Object", "Effect", glare);
  for (var g2 = 0; g2 < glare.length; g2++) glare[g2].visible = false;
}

var dup = doc.duplicate("export-tmp", true);
if (keepBg) dup.flatten();
if (cropBox && !isNaN(margin) && margin >= 0) {
  var x1 = Math.max(0, cropBox[0] - margin), y1 = Math.max(0, cropBox[1] - margin);
  var x2 = Math.min(dup.width.as("px"), cropBox[2] + margin), y2 = Math.min(dup.height.as("px"), cropBox[3] + margin);
  dup.crop([x1, y1, x2, y2]);
}
dup.saveAs(new File(outPath), new PNGSaveOptions(), true, Extension.LOWERCASE);
dup.close(SaveOptions.DONOTSAVECHANGES);
doc.close(SaveOptions.DONOTSAVECHANGES);
try { app.purge(PurgeTarget.ALLCACHES); } catch (e) {}
"OK " + outPath + " [SO " + placed.join(",") + " of " + sos.length + "]";
