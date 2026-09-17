/* Inner canvas of every smart object in the PSD, in document order.
   The tree probe gives the rectangle each SO occupies in the frame; this gives
   the canvas the artwork is actually rendered into, which is the size the
   screen PNG has to be composed at. Opening contents costs a document each,
   so this runs once and writes its answer to disk. */
var jf = new File("/Users/tomsesler/Projects/portfolio/.ps-run/probe-job.txt");
jf.open("r"); var psdPath = jf.readln(); jf.close();

function collectSOs(layers, prefix, out) {
  for (var i = 0; i < layers.length; i++) {
    var L = layers[i], p = prefix + "/" + L.name;
    if (L.typename === "LayerSet") collectSOs(L.layers, p, out);
    else { try { if (L.kind === LayerKind.SMARTOBJECT) out.push({ path: p, layer: L }); } catch (e) {} }
  }
}

var doc = app.open(new File(psdPath));
var sos = []; collectSOs(doc.layers, "", sos);
var lines = [];
for (var i = 0; i < sos.length; i++) {
  var L = sos[i].layer;
  var b = L.bounds;
  var x = Math.round(b[0].as("px")), y = Math.round(b[1].as("px"));
  var w = Math.round(b[2].as("px")) - x, h = Math.round(b[3].as("px")) - y;
  var inner = "?";
  try {
    // A hidden SO cannot be made active without being shown first.
    var wasVisible = L.visible;
    L.visible = true;
    doc.activeLayer = L;
    executeAction(stringIDToTypeID("placedLayerEditContents"), new ActionDescriptor(), DialogModes.NO);
    var d2 = app.activeDocument;
    inner = d2.width.as("px") + "x" + d2.height.as("px") + " @" + d2.resolution + "dpi";
    d2.close(SaveOptions.DONOTSAVECHANGES);
    app.activeDocument = doc;
    L.visible = wasVisible;
  } catch (e) { inner = "ERR " + e.message; }
  lines.push(i + "  " + sos[i].path + "\n     frame " + w + "x" + h + " @" + x + "," + y + "   inner " + inner);
}
doc.close(SaveOptions.DONOTSAVECHANGES);
try { app.purge(PurgeTarget.ALLCACHES); } catch (e) {}

var of = new File("/Users/tomsesler/Projects/portfolio/.ps-run/probe-out.txt");
of.open("w"); of.write(lines.join("\n")); of.close();
"OK " + sos.length + " smart objects";
