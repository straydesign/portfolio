/* Light probe: the layer tree of one PSD, with every smart object's screen
   rectangle. Cheap on purpose — it never opens a smart object's contents, so
   it costs one document open and nothing else. Which SO is which phone is a
   question about position in the frame, and bounds answer it.

   Reads one line from .ps-run/probe-job.txt: the PSD path. */
var jf = new File("/Users/tomsesler/Projects/portfolio/.ps-run/probe-job.txt");
jf.open("r"); var psdPath = jf.readln(); jf.close();

var doc = app.open(new File(psdPath));
var lines = ["DOC " + doc.width.as("px") + "x" + doc.height.as("px") + " @" + doc.resolution + "dpi  mode=" + doc.mode];

function walk(layers, depth, prefix) {
  for (var i = 0; i < layers.length; i++) {
    var L = layers[i];
    var pad = ""; for (var d = 0; d < depth; d++) pad += "  ";
    var path = prefix + "/" + L.name;
    if (L.typename === "LayerSet") {
      lines.push(pad + "[" + (L.visible ? "v" : " ") + "] " + L.name + "/");
      walk(L.layers, depth + 1, path);
    } else {
      var kind = "";
      try { kind = String(L.kind).replace("LayerKind.", ""); } catch (e) { kind = "?"; }
      var box = "";
      try {
        var b = L.bounds;
        var x = Math.round(b[0].as("px")), y = Math.round(b[1].as("px"));
        var w = Math.round(b[2].as("px")) - x, h = Math.round(b[3].as("px")) - y;
        box = "  " + w + "x" + h + " @" + x + "," + y;
      } catch (e) {}
      lines.push(pad + "[" + (L.visible ? "v" : " ") + "] " + L.name + "  <" + kind + ">" + box);
    }
  }
}
walk(doc.layers, 0, "");
doc.close(SaveOptions.DONOTSAVECHANGES);
try { app.purge(PurgeTarget.ALLCACHES); } catch (e) {}

var of = new File("/Users/tomsesler/Projects/portfolio/.ps-run/probe-out.txt");
of.open("w"); of.write(lines.join("\n")); of.close();
"OK " + lines.length + " lines";
