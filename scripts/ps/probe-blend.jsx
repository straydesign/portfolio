/* Opacity, fill and blend mode of every layer that could tint the screen —
   the smart object, its group, and anything sitting directly under it. A warm
   lift with no layer above the glass to explain it means the glass itself is
   letting something through. */
var jf = new File("/Users/tomsesler/Projects/portfolio/.ps-run/probe-job.txt");
jf.open("r"); var psdPath = jf.readln(); jf.close();

var doc = app.open(new File(psdPath));
var lines = [];
function walk(layers, path, depth) {
  for (var i = 0; i < layers.length; i++) {
    var L = layers[i];
    var p = path + "/" + L.name;
    var b = "";
    try { b = String(L.blendMode).replace("BlendMode.", ""); } catch (e) { b = "?"; }
    var op = "?", fo = "?";
    try { op = Math.round(L.opacity); } catch (e) {}
    try { fo = Math.round(L.fillOpacity); } catch (e) {}
    var flag = (op !== 100 || (fo !== "?" && fo !== 100) || b !== "NORMAL") ? "  <<<" : "";
    if (depth <= 3) lines.push(p + "  [" + b + " op" + op + " fill" + fo + "]" + flag);
    if (L.typename === "LayerSet") walk(L.layers, p, depth + 1);
  }
}
walk(doc.layers, "", 0);
doc.close(SaveOptions.DONOTSAVECHANGES);
try { app.purge(PurgeTarget.ALLCACHES); } catch (e) {}
var of = new File("/Users/tomsesler/Projects/portfolio/.ps-run/probe-out.txt");
of.open("w"); of.write(lines.join("\n")); of.close();
"OK " + lines.length;
