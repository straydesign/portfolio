// straydesign.co Figma Importer Plugin
// Creates organized pages with screenshot frames, design system annotations, and labels.

figma.showUI(__html__, { width: 320, height: 520 });

const COLORS = {
  background: { r: 0, g: 0, b: 0 },
  white: { r: 1, g: 1, b: 1 },
  secondary: { r: 0.63, g: 0.63, b: 0.65 },
  green: { r: 0.133, g: 0.773, b: 0.369 },
  amber: { r: 0.918, g: 0.702, b: 0.031 },
  red: { r: 0.937, g: 0.267, b: 0.267 },
  cardBg: { r: 0.067, g: 0.067, b: 0.067 },
  border: { r: 1, g: 1, b: 1 },
};

const DESKTOP_W = 1440;
const MOBILE_W = 390;

function sendStep(id, status) {
  figma.ui.postMessage({ type: "step", id, status });
}

function sendStatus(text) {
  figma.ui.postMessage({ type: "status", text });
}

async function loadFonts() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
}

function createText(text, opts = {}) {
  const node = figma.createText();
  node.characters = text;
  node.fontSize = opts.size || 14;
  node.fontName = {
    family: "Inter",
    style: opts.weight || "Regular",
  };
  node.fills = [
    {
      type: "SOLID",
      color: opts.color || COLORS.white,
    },
  ];
  if (opts.x !== undefined) node.x = opts.x;
  if (opts.y !== undefined) node.y = opts.y;
  return node;
}

function createColorSwatch(color, label, x, y) {
  const frame = figma.createFrame();
  frame.resize(120, 80);
  frame.x = x;
  frame.y = y;
  frame.fills = [];
  frame.clipsContent = false;

  const swatch = figma.createRectangle();
  swatch.resize(120, 48);
  swatch.cornerRadius = 0;
  swatch.fills = [{ type: "SOLID", color }];
  swatch.strokes = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];
  swatch.strokeWeight = 1;
  frame.appendChild(swatch);

  const labelNode = createText(label, {
    size: 11,
    color: COLORS.secondary,
    x: 0,
    y: 54,
  });
  frame.appendChild(labelNode);

  return frame;
}

function createSectionLabel(text, x, y) {
  return createText(text, {
    size: 24,
    weight: "Bold",
    color: COLORS.white,
    x,
    y,
  });
}

async function createDesignSystemPage() {
  sendStep("design", "active");
  sendStatus("Building design system page...");

  const page = figma.createPage();
  page.name = "Design System";

  // Background
  const bg = figma.createRectangle();
  bg.resize(2400, 1600);
  bg.fills = [{ type: "SOLID", color: COLORS.background }];
  page.appendChild(bg);

  // Title
  const title = createText("straydesign.co — Design System", {
    size: 36,
    weight: "Bold",
    x: 60,
    y: 60,
  });
  page.appendChild(title);

  const subtitle = createText(
    "Dark-only. Zero border radius. Inter + Bungee. Industrial aesthetic.",
    { size: 16, color: COLORS.secondary, x: 60, y: 110 }
  );
  page.appendChild(subtitle);

  // Colors section
  const colorsLabel = createSectionLabel("Colors", 60, 170);
  page.appendChild(colorsLabel);

  const colorData = [
    [{ r: 0, g: 0, b: 0 }, "#000000 — Background"],
    [{ r: 1, g: 1, b: 1 }, "#FFFFFF — Primary text"],
    [{ r: 0.067, g: 0.067, b: 0.067 }, "#111111 — Brick / Input bg"],
    [{ r: 0.63, g: 0.63, b: 0.65 }, "#A1A1A6 — Secondary text"],
    [{ r: 0.227, g: 0.227, b: 0.227 }, "#3A3A3A — Grout / Dividers"],
    [COLORS.green, "#22C55E — MIDDLEMAN accent"],
    [COLORS.amber, "#EAB308 — Warning / Amber"],
    [COLORS.red, "#EF4444 — Error / Critical"],
  ];

  colorData.forEach(([color, label], i) => {
    const swatch = createColorSwatch(
      color,
      label,
      60 + (i % 4) * 150,
      210 + Math.floor(i / 4) * 110
    );
    page.appendChild(swatch);
  });

  // Typography section
  const typoLabel = createSectionLabel("Typography", 60, 460);
  page.appendChild(typoLabel);

  const typoItems = [
    ["Hero Headline", "Bungee 72px — Outlined stroke", 36],
    ["Section Heading", "Bungee 44-56px", 28],
    ["Subheading", "Inter Semibold 20-24px", 20],
    ["Body", "Inter Regular 15-17px", 16],
    ["Caption / Label", "Inter Regular 12-13px", 12],
  ];

  let typoY = 510;
  typoItems.forEach(([label, desc, size]) => {
    const sample = createText(label, {
      size: Math.min(size, 32),
      weight: "Bold",
      x: 60,
      y: typoY,
    });
    page.appendChild(sample);

    const descNode = createText(desc, {
      size: 12,
      color: COLORS.secondary,
      x: 60,
      y: typoY + Math.min(size, 32) + 4,
    });
    page.appendChild(descNode);

    typoY += Math.min(size, 32) + 30;
  });

  // Spacing / Grid
  const spacingLabel = createSectionLabel("Design Principles", 700, 460);
  page.appendChild(spacingLabel);

  const principles = [
    "Zero border-radius everywhere (buttons, cards, badges, inputs)",
    "Sharp, industrial aesthetic — not friendly, not playful",
    "Dark-only theme — no light mode toggle",
    "Card bg: #000 with 1px rgba(255,255,255,0.06) border",
    "3D tilt on hover (spring physics, ±4deg rotate)",
    "Scroll-triggered blur-fade entrances (AnimateIn)",
    "Bungee font for all headings (uppercase, display)",
    "Inter for all body text and UI elements",
    "Framer Motion for all animations",
    "Three.js brick wall background with GPU ripple simulation",
  ];

  principles.forEach((p, i) => {
    const node = createText(`→ ${p}`, {
      size: 13,
      color: COLORS.secondary,
      x: 700,
      y: 510 + i * 24,
    });
    page.appendChild(node);
  });

  // Site map section
  const mapLabel = createSectionLabel("Site Map", 60, 800);
  page.appendChild(mapLabel);

  const pages = [
    ["/ (Home)", "Hero, Work (3 projects), Kind Words (4 recs), Get in Touch"],
    ["/work", "Hero, Carousel, Project cards (3), Contact CTA"],
    ["/resume", "Full resume in a TextCard — experience, education"],
    ["/about", "Bio, Photo carousel, Interests, 3D Books, Bookshelf (30), CTA"],
    ["/dayone", "FirstDay.life case study — journey, core loop, screens, design"],
    ["/doordash", "DoorDash UX evaluation — 5 issues with redesign proposals"],
    ["/middleman", "MIDDLEMAN case study — dashboard, pull list, schedule, design system"],
  ];

  pages.forEach(([route, desc], i) => {
    const routeNode = createText(route, {
      size: 14,
      weight: "Medium",
      x: 60,
      y: 850 + i * 50,
    });
    page.appendChild(routeNode);

    const descNode = createText(desc, {
      size: 12,
      color: COLORS.secondary,
      x: 60,
      y: 850 + i * 50 + 20,
    });
    page.appendChild(descNode);
  });

  sendStep("design", "done");
  return page;
}

async function createScreenshotPage(pageName, imageBytes, opts = {}) {
  const page = figma.createPage();
  page.name = pageName;

  if (!imageBytes) {
    // Create placeholder frame
    const placeholder = figma.createFrame();
    placeholder.resize(opts.width || DESKTOP_W, opts.height || 900);
    placeholder.fills = [{ type: "SOLID", color: COLORS.cardBg }];
    page.appendChild(placeholder);

    const label = createText(`${pageName} — screenshot not provided`, {
      size: 16,
      color: COLORS.secondary,
      x: 40,
      y: 40,
    });
    placeholder.appendChild(label);
    return page;
  }

  // Create image from bytes
  const image = figma.createImage(new Uint8Array(imageBytes));
  const { width, height } = await image.getSizeAsync();

  // Create frame matching image dimensions
  const frame = figma.createFrame();
  frame.name = `${pageName} — ${width}x${height}`;
  frame.resize(width, height);
  frame.fills = [
    {
      type: "IMAGE",
      imageHash: image.hash,
      scaleMode: "FILL",
    },
  ];
  page.appendChild(frame);

  // Add page label above frame
  const label = createText(pageName.toUpperCase(), {
    size: 20,
    weight: "Bold",
    x: 0,
    y: -40,
  });
  page.appendChild(label);

  const dimensions = createText(`${width} × ${height}px`, {
    size: 12,
    color: COLORS.secondary,
    x: 0,
    y: -16,
  });
  page.appendChild(dimensions);

  return page;
}

figma.ui.onmessage = async (msg) => {
  if (msg.type !== "import") return;

  try {
    await loadFonts();

    let pageCount = 0;
    let frameCount = 0;

    // Step 1: Create page structure
    sendStep("structure", "active");
    sendStatus("Creating page structure...");

    // Remove default page if empty
    const defaultPage = figma.root.children[0];
    const removeDefault =
      defaultPage &&
      defaultPage.children.length === 0 &&
      figma.root.children.length === 1;

    sendStep("structure", "done");
    pageCount++;

    // Step 2: Design system
    await createDesignSystemPage();
    pageCount++;
    frameCount += 10;

    // Step 3-9: Screenshot pages
    const pageConfigs = [
      { step: "home", name: "Home", keys: ["home-full", "home-viewport", "home-mobile"] },
      { step: "work", name: "Work", keys: ["work-full"] },
      { step: "resume", name: "Resume", keys: ["resume-full"] },
      { step: "about", name: "About", keys: ["about-full"] },
      { step: "firstday", name: "FirstDay Case Study", keys: ["firstday-full"] },
      { step: "doordash", name: "DoorDash Case Study", keys: ["doordash-full"] },
      { step: "middleman", name: "MIDDLEMAN Case Study", keys: ["middleman-full"] },
    ];

    for (const config of pageConfigs) {
      sendStep(config.step, "active");
      sendStatus(`Creating ${config.name}...`);

      for (const key of config.keys) {
        const imageData = msg.images[key];
        if (imageData) {
          const isMobile = key.includes("mobile");
          await createScreenshotPage(
            config.keys.length > 1 ? `${config.name} — ${key.includes("mobile") ? "Mobile" : key.includes("viewport") ? "Viewport" : "Full Page"}` : config.name,
            imageData,
            { width: isMobile ? MOBILE_W : DESKTOP_W }
          );
          pageCount++;
          frameCount++;
        }
      }

      sendStep(config.step, "done");
    }

    // Remove default empty page
    if (removeDefault && figma.root.children.length > 1) {
      defaultPage.remove();
    }

    // Navigate to design system page
    figma.currentPage = figma.root.children[0];

    figma.ui.postMessage({
      type: "done",
      pageCount,
      frameCount,
    });

    sendStatus("Import complete!");
  } catch (err) {
    sendStatus(`Error: ${err.message}`);
    console.error(err);
  }
};
