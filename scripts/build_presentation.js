const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.title = "Automatisierte Lead-Erfassung mit KI";
pres.author = "Lead-Automatisierung Projekt";

// ============ PALETTE: Eco-Counter inspired ============
// Charcoal text, generous white, signature lime-green accent
const NAVY = "1F2937";          // charcoal (replaces dark headers/boxes)
const NAVY_DARK = "111827";     // near-black
const ICE = "D5E8B0";           // light green tint
const ICE_LIGHT = "EEF6DC";     // very pale green
const WHITE = "FFFFFF";
const ACCENT = "7AB02D";        // Eco-Counter signature green
const ACCENT_DARK = "5A8C1F";   // hover/dark green
const TEXT_DARK = "1F2937";
const TEXT_MUTED = "6B7280";
const BG_LIGHT = "F9FAFB";      // very subtle off-white
const BORDER = "E5E7EB";        // soft gray border

const FONT_H = "Segoe UI";
const FONT_B = "Segoe UI";

const W = 13.3;
const H = 7.5;

// ---- Helper: section header bar ----
function addHeader(slide, title, subtitle) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W, h: 1.1,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 1.1, w: W, h: 0.05,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });
  slide.addText(title, {
    x: 0.6, y: 0.15, w: 11, h: 0.55,
    fontSize: 28, bold: true, color: WHITE, fontFace: FONT_H, margin: 0
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6, y: 0.65, w: 11, h: 0.4,
      fontSize: 14, color: ICE, fontFace: FONT_B, margin: 0
    });
  }
}

function addFooter(slide, pageNum) {
  slide.addText("Lead-Automatisierung  |  Pitch fürs Team", {
    x: 0.5, y: 7.15, w: 8, h: 0.3,
    fontSize: 9, color: TEXT_MUTED, fontFace: FONT_B
  });
  slide.addText(String(pageNum), {
    x: W - 1.0, y: 7.15, w: 0.5, h: 0.3,
    fontSize: 9, color: TEXT_MUTED, fontFace: FONT_B, align: "right"
  });
}

// =====================================================
// SLIDE 1 — TITLE
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  // accent bar left
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.35, h: H,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });

  // small label
  s.addText("PROJEKT-PITCH  ·  MAI 2026", {
    x: 1.0, y: 1.6, w: 11, h: 0.4,
    fontSize: 14, color: ICE, fontFace: FONT_H, bold: true, charSpacing: 4, margin: 0
  });

  s.addText("Automatisierte Lead-Erfassung mit KI", {
    x: 1.0, y: 2.3, w: 11.5, h: 1.5,
    fontSize: 54, color: WHITE, fontFace: FONT_H, bold: true, margin: 0
  });

  s.addText("Wie wir neue Kunden 24/7 erkennen, strukturieren\nund in Salesforce anlegen — ohne manuelle Recherche.", {
    x: 1.0, y: 4.0, w: 11.5, h: 1.5,
    fontSize: 22, color: ICE, fontFace: FONT_B, margin: 0
  });

  // bottom info row
  s.addShape(pres.shapes.LINE, {
    x: 1.0, y: 6.3, w: 3, h: 0,
    line: { color: ACCENT, width: 2 }
  });
  s.addText("Für Marketing & Management", {
    x: 1.0, y: 6.5, w: 11, h: 0.4,
    fontSize: 14, color: ICE, fontFace: FONT_B, margin: 0
  });
}

// =====================================================
// SLIDE 2 — STATUS QUO
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Wo wir heute stehen", "Lead-Recherche ist manuell, langsam und uneinheitlich");

  // Left: pain points (3 cards stacked)
  const pains = [
    {
      h: "Manuelle Recherche frisst Zeit",
      t: "Pro Lead 5–10 Minuten Google, LinkedIn, Impressum kopieren. Nicht skalierbar."
    },
    {
      h: "Leads gehen verloren",
      t: "Kontaktdaten aus E-Mail-Signaturen werden selten erfasst. Potenzial bleibt liegen."
    },
    {
      h: "Datenqualität schwankt",
      t: "Jeder erfasst anders. Salesforce-Datensätze sind unvollständig, Duplikate häufen sich."
    }
  ];
  pains.forEach((p, i) => {
    const y = 1.6 + i * 1.65;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y, w: 6.1, h: 1.4,
      fill: { color: BG_LIGHT }, line: { color: ICE, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y, w: 0.08, h: 1.4,
      fill: { color: ACCENT }, line: { color: ACCENT }
    });
    s.addText(p.h, {
      x: 0.85, y: y + 0.15, w: 5.7, h: 0.45,
      fontSize: 17, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
    });
    s.addText(p.t, {
      x: 0.85, y: y + 0.65, w: 5.7, h: 0.65,
      fontSize: 13, color: TEXT_DARK, fontFace: FONT_B, margin: 0
    });
  });

  // Right: big stat
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.2, y: 1.6, w: 5.5, h: 5.05,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("Heute verlieren wir", {
    x: 7.4, y: 1.85, w: 5.1, h: 0.5,
    fontSize: 16, color: ICE, fontFace: FONT_B, margin: 0
  });
  s.addText("15–30", {
    x: 7.4, y: 2.4, w: 5.1, h: 1.6,
    fontSize: 110, bold: true, color: WHITE, fontFace: FONT_H, margin: 0
  });
  s.addText("Stunden manueller", {
    x: 7.4, y: 4.2, w: 5.1, h: 0.45,
    fontSize: 18, color: WHITE, fontFace: FONT_B, margin: 0
  });
  s.addText("Recherche pro Monat", {
    x: 7.4, y: 4.6, w: 5.1, h: 0.45,
    fontSize: 18, color: WHITE, fontFace: FONT_B, margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: 7.4, y: 5.3, w: 1.5, h: 0,
    line: { color: ACCENT, width: 2 }
  });
  s.addText("…plus unbekannte Anzahl Leads, die wir nie erfassen.", {
    x: 7.4, y: 5.5, w: 5.1, h: 0.9,
    fontSize: 13, color: ICE, italic: true, fontFace: FONT_B, margin: 0
  });

  addFooter(s, 2);
}

// =====================================================
// SLIDE 3 — DIE LÖSUNG (OVERVIEW)
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Unsere Lösung in einem Bild", "Zwei automatisierte Kanäle, ein einheitliches Format, direkter Weg nach Salesforce");

  // Three-step flow: Input -> Process -> Output
  const boxY = 2.4;
  const boxH = 3.2;

  // Step 1: Inputs
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: boxY, w: 3.6, h: boxH,
    fill: { color: ICE_LIGHT }, line: { color: ICE, width: 1 }
  });
  s.addText("1. ERKENNEN", {
    x: 0.6, y: boxY + 0.2, w: 3.6, h: 0.4,
    fontSize: 12, bold: true, color: NAVY, fontFace: FONT_H, align: "center", charSpacing: 3, margin: 0
  });
  s.addText("Eingangskanäle", {
    x: 0.6, y: boxY + 0.6, w: 3.6, h: 0.5,
    fontSize: 20, bold: true, color: NAVY, fontFace: FONT_H, align: "center", margin: 0
  });
  s.addText([
    { text: "Web-Recherche", options: { bold: true, fontSize: 15, color: NAVY, breakLine: true } },
    { text: "Täglich neue Wunschkunden\naus dem Internet finden\n\n", options: { fontSize: 12, color: TEXT_DARK, breakLine: true } },
    { text: "E-Mail-Signaturen", options: { bold: true, fontSize: 15, color: NAVY, breakLine: true } },
    { text: "Aus jeder neuen Mail\nKontaktdaten auslesen", options: { fontSize: 12, color: TEXT_DARK } }
  ], { x: 0.85, y: boxY + 1.3, w: 3.1, h: 1.8, fontFace: FONT_B, margin: 0, valign: "top" });

  // Arrow 1
  s.addShape(pres.shapes.RIGHT_TRIANGLE, {
    x: 4.35, y: boxY + boxH/2 - 0.3, w: 0.5, h: 0.6,
    fill: { color: ACCENT }, line: { color: ACCENT }, rotate: 90
  });

  // Step 2: Process
  s.addShape(pres.shapes.RECTANGLE, {
    x: 4.95, y: boxY, w: 3.6, h: boxH,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("2. VERARBEITEN", {
    x: 4.95, y: boxY + 0.2, w: 3.6, h: 0.4,
    fontSize: 12, bold: true, color: ICE, fontFace: FONT_H, align: "center", charSpacing: 3, margin: 0
  });
  s.addText("KI-Service", {
    x: 4.95, y: boxY + 0.6, w: 3.6, h: 0.5,
    fontSize: 20, bold: true, color: WHITE, fontFace: FONT_H, align: "center", margin: 0
  });
  s.addText([
    { text: "Daten extrahieren", options: { bold: true, fontSize: 14, color: WHITE, breakLine: true } },
    { text: "Firma, Name, Mail, Telefon,\nBranche – strukturiert\n\n", options: { fontSize: 12, color: ICE, breakLine: true } },
    { text: "Qualität prüfen", options: { bold: true, fontSize: 14, color: WHITE, breakLine: true } },
    { text: "Duplikate erkennen, fehlende\nFelder, Plausibilität", options: { fontSize: 12, color: ICE } }
  ], { x: 5.2, y: boxY + 1.3, w: 3.1, h: 1.8, fontFace: FONT_B, margin: 0, valign: "top" });

  // Arrow 2
  s.addShape(pres.shapes.RIGHT_TRIANGLE, {
    x: 8.7, y: boxY + boxH/2 - 0.3, w: 0.5, h: 0.6,
    fill: { color: ACCENT }, line: { color: ACCENT }, rotate: 90
  });

  // Step 3: Output
  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.3, y: boxY, w: 3.4, h: boxH,
    fill: { color: ICE_LIGHT }, line: { color: ICE, width: 1 }
  });
  s.addText("3. ÜBERGEBEN", {
    x: 9.3, y: boxY + 0.2, w: 3.4, h: 0.4,
    fontSize: 12, bold: true, color: NAVY, fontFace: FONT_H, align: "center", charSpacing: 3, margin: 0
  });
  s.addText("Salesforce", {
    x: 9.3, y: boxY + 0.6, w: 3.4, h: 0.5,
    fontSize: 20, bold: true, color: NAVY, fontFace: FONT_H, align: "center", margin: 0
  });
  s.addText([
    { text: "Alle 5 Minuten", options: { bold: true, fontSize: 14, color: NAVY, breakLine: true } },
    { text: "Neue Leads landen\nautomatisch in der\nSales-Queue\n\n", options: { fontSize: 12, color: TEXT_DARK, breakLine: true } },
    { text: "Standard-Prozess", options: { bold: true, fontSize: 14, color: NAVY, breakLine: true } },
    { text: "Sales arbeitet weiter\nwie gewohnt", options: { fontSize: 12, color: TEXT_DARK } }
  ], { x: 9.55, y: boxY + 1.3, w: 2.9, h: 1.8, fontFace: FONT_B, margin: 0, valign: "top" });

  // Tagline
  s.addText("24/7 automatisch  ·  einheitliches Datenformat  ·  Qualitätskontrolle eingebaut", {
    x: 0.6, y: 6.3, w: 12.1, h: 0.5,
    fontSize: 16, italic: true, color: NAVY, fontFace: FONT_B, align: "center", margin: 0
  });

  addFooter(s, 3);
}

// =====================================================
// SLIDE 4 — KANAL 1: WEB-RECHERCHE
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Kanal 1: Web-Recherche (proaktiv)", "Wir suchen aktiv nach neuen Wunschkunden");

  // Left side: explanation
  s.addText("Wie es funktioniert", {
    x: 0.6, y: 1.5, w: 6, h: 0.5,
    fontSize: 20, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
  });

  const steps = [
    { n: "1", h: "Suchkriterien festlegen", t: "Sales-Team definiert: welche Branche, welche Region, welche Firmengröße." },
    { n: "2", h: "Jede Nacht automatisch suchen", t: "Das System findet passende Unternehmen und reichert sie mit öffentlichen Daten an." },
    { n: "3", h: "Strukturiert übergeben", t: "Firma, Kontakt, Mail, Telefon, Branche — alles in einheitlichem Format." }
  ];
  steps.forEach((st, i) => {
    const y = 2.15 + i * 1.35;
    // number circle
    s.addShape(pres.shapes.OVAL, {
      x: 0.6, y: y, w: 0.65, h: 0.65,
      fill: { color: NAVY }, line: { color: NAVY }
    });
    s.addText(st.n, {
      x: 0.6, y: y, w: 0.65, h: 0.65,
      fontSize: 22, bold: true, color: WHITE, fontFace: FONT_H, align: "center", valign: "middle", margin: 0
    });
    s.addText(st.h, {
      x: 1.45, y: y - 0.05, w: 5.2, h: 0.4,
      fontSize: 16, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
    });
    s.addText(st.t, {
      x: 1.45, y: y + 0.32, w: 5.2, h: 0.8,
      fontSize: 13, color: TEXT_DARK, fontFace: FONT_B, margin: 0
    });
  });

  // Right: example card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.4, y: 1.5, w: 5.3, h: 5.25,
    fill: { color: BG_LIGHT }, line: { color: ICE, width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.4, y: 1.5, w: 5.3, h: 0.5,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("BEISPIEL-LEAD AUS DEM WEB", {
    x: 7.4, y: 1.55, w: 5.3, h: 0.4,
    fontSize: 11, bold: true, color: WHITE, fontFace: FONT_H, align: "center", charSpacing: 3, margin: 0
  });

  const fields = [
    ["Firma", "Müller Maschinenbau GmbH"],
    ["Website", "mueller-maschinen.de"],
    ["Kontakt", "Anna Beck"],
    ["Position", "Einkaufsleitung"],
    ["E-Mail", "a.beck@mueller-maschinen.de"],
    ["Telefon", "+49 89 123456"],
    ["Branche", "Maschinenbau"],
    ["Mitarbeiter", "120"],
    ["Standort", "München, DE"]
  ];
  fields.forEach((f, i) => {
    const y = 2.2 + i * 0.45;
    s.addText(f[0], {
      x: 7.7, y: y, w: 1.8, h: 0.35,
      fontSize: 12, bold: true, color: TEXT_MUTED, fontFace: FONT_B, margin: 0
    });
    s.addText(f[1], {
      x: 9.6, y: y, w: 3.0, h: 0.35,
      fontSize: 12, color: TEXT_DARK, fontFace: FONT_B, margin: 0
    });
  });

  addFooter(s, 4);
}

// =====================================================
// SLIDE 5 — KANAL 2: E-MAIL-SIGNATUREN
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Kanal 2: E-Mail-Signaturen (reaktiv)", "Jede neue Mail kann ein Lead sein — wir lesen automatisch aus");

  // Left: explanation
  s.addText("Wie es funktioniert", {
    x: 0.6, y: 1.5, w: 6, h: 0.5,
    fontSize: 20, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
  });

  const steps = [
    { n: "1", h: "Mail kommt an", t: "Eine neue externe Mail erreicht unsere Sales-Mailbox in Outlook." },
    { n: "2", h: "Signatur erkennen", t: "Die KI liest den Signatur-Block aus und erkennt die Felder automatisch." },
    { n: "3", h: "Lead anlegen", t: "Daten landen im gleichen Format wie aus Kanal 1 — gleiche Qualitätsprüfung." }
  ];
  steps.forEach((st, i) => {
    const y = 2.15 + i * 1.35;
    s.addShape(pres.shapes.OVAL, {
      x: 0.6, y: y, w: 0.65, h: 0.65,
      fill: { color: NAVY }, line: { color: NAVY }
    });
    s.addText(st.n, {
      x: 0.6, y: y, w: 0.65, h: 0.65,
      fontSize: 22, bold: true, color: WHITE, fontFace: FONT_H, align: "center", valign: "middle", margin: 0
    });
    s.addText(st.h, {
      x: 1.45, y: y - 0.05, w: 5.2, h: 0.4,
      fontSize: 16, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
    });
    s.addText(st.t, {
      x: 1.45, y: y + 0.32, w: 5.2, h: 0.8,
      fontSize: 13, color: TEXT_DARK, fontFace: FONT_B, margin: 0
    });
  });

  // Right: signature example
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.4, y: 1.5, w: 5.3, h: 5.25,
    fill: { color: WHITE }, line: { color: ICE, width: 2 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.4, y: 1.5, w: 5.3, h: 0.5,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("BEISPIEL-MAIL", {
    x: 7.4, y: 1.55, w: 5.3, h: 0.4,
    fontSize: 11, bold: true, color: WHITE, fontFace: FONT_H, align: "center", charSpacing: 3, margin: 0
  });

  // mail header
  s.addText([
    { text: "Von: ", options: { bold: true, color: TEXT_MUTED } },
    { text: "thomas.weber@solar-nord.de", options: { color: TEXT_DARK, breakLine: true } },
    { text: "Betreff: ", options: { bold: true, color: TEXT_MUTED } },
    { text: "Anfrage Produktinfos", options: { color: TEXT_DARK } }
  ], { x: 7.65, y: 2.15, w: 4.9, h: 0.8, fontSize: 11, fontFace: FONT_B, margin: 0 });

  s.addShape(pres.shapes.LINE, {
    x: 7.65, y: 2.95, w: 4.9, h: 0,
    line: { color: ICE, width: 1 }
  });

  s.addText("Sehr geehrte Damen und Herren,\nbitte senden Sie mir Ihre aktuellen\nProduktunterlagen zu.\n\nMit freundlichen Grüßen", {
    x: 7.65, y: 3.05, w: 4.9, h: 1.5,
    fontSize: 11, color: TEXT_DARK, fontFace: FONT_B, margin: 0
  });

  // signature highlight
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.55, y: 4.65, w: 5.0, h: 2.0,
    fill: { color: ICE_LIGHT }, line: { color: ACCENT, width: 2 }
  });
  s.addText("Thomas Weber", {
    x: 7.7, y: 4.75, w: 4.7, h: 0.3,
    fontSize: 12, bold: true, color: NAVY, fontFace: FONT_B, margin: 0
  });
  s.addText("Geschäftsführer", {
    x: 7.7, y: 5.05, w: 4.7, h: 0.3,
    fontSize: 11, color: TEXT_DARK, fontFace: FONT_B, margin: 0
  });
  s.addText("Solar Nord GmbH\nHafenstraße 12, 22767 Hamburg\nTel: +49 40 555 1234\nthomas.weber@solar-nord.de", {
    x: 7.7, y: 5.35, w: 4.7, h: 1.3,
    fontSize: 10, color: TEXT_DARK, fontFace: FONT_B, margin: 0
  });
  s.addText("← KI extrahiert automatisch", {
    x: 7.55, y: 6.7, w: 5.0, h: 0.25,
    fontSize: 10, italic: true, bold: true, color: ACCENT, fontFace: FONT_B, align: "right", margin: 0
  });

  addFooter(s, 5);
}

// =====================================================
// SLIDE 6 — QUALITÄTSSICHERUNG
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Qualitätssicherung: Mensch trifft Maschine", "Nicht jeder Lead landet automatisch in Salesforce — bei Unsicherheit entscheidet ein Mensch");

  // Three confidence levels as horizontal cards
  const cards = [
    {
      color: "2C8C5C", lightColor: "E6F4EC",
      title: "Hohe Datenqualität",
      tag: "Direkt anlegen",
      desc: "Alle Pflichtfelder vorhanden, Domain bekannt, Plausibilität ok.",
      action: "→ Automatischer Push nach Salesforce"
    },
    {
      color: ACCENT, lightColor: "FDF1DA",
      title: "Mittlere Qualität",
      tag: "Kurz prüfen",
      desc: "Pflichtfelder ok, aber neue Domain oder ungewöhnliche Werte.",
      action: "→ Mail an Sales mit „Anlegen / Verwerfen\""
    },
    {
      color: "B23A3A", lightColor: "FBEAEA",
      title: "Niedrige Qualität",
      tag: "Verwerfen",
      desc: "Pflichtfelder fehlen oder Daten nicht plausibel.",
      action: "→ Nicht angelegt, mit Begründung archiviert"
    }
  ];

  cards.forEach((c, i) => {
    const x = 0.6 + i * 4.15;
    const y = 1.6;
    const w = 3.95;
    const h = 4.5;

    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: w, h: h,
      fill: { color: c.lightColor }, line: { color: c.color, width: 1 }
    });
    // top bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: w, h: 0.6,
      fill: { color: c.color }, line: { color: c.color }
    });
    s.addText(c.tag.toUpperCase(), {
      x: x, y: y + 0.1, w: w, h: 0.4,
      fontSize: 13, bold: true, color: WHITE, fontFace: FONT_H, align: "center", charSpacing: 3, margin: 0
    });

    s.addText(c.title, {
      x: x + 0.3, y: y + 0.9, w: w - 0.6, h: 0.6,
      fontSize: 22, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
    });

    s.addText(c.desc, {
      x: x + 0.3, y: y + 1.7, w: w - 0.6, h: 1.5,
      fontSize: 14, color: TEXT_DARK, fontFace: FONT_B, margin: 0
    });

    s.addShape(pres.shapes.LINE, {
      x: x + 0.3, y: y + 3.4, w: w - 0.6, h: 0,
      line: { color: c.color, width: 1 }
    });

    s.addText(c.action, {
      x: x + 0.3, y: y + 3.55, w: w - 0.6, h: 0.8,
      fontSize: 13, bold: true, italic: true, color: c.color, fontFace: FONT_B, margin: 0
    });
  });

  // Bottom note
  s.addText("Ergebnis: Wir sehen keinen Müll in Salesforce — und kein echter Lead geht verloren.", {
    x: 0.6, y: 6.4, w: 12.1, h: 0.5,
    fontSize: 15, italic: true, color: NAVY, fontFace: FONT_B, align: "center", margin: 0
  });

  addFooter(s, 6);
}

// =====================================================
// SLIDE 7 — WAS SICH FÜRS TEAM ÄNDERT
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Was sich für das Sales-Team ändert", "Spoiler: nichts an den Tools. Aber vieles an der Qualität der Pipeline.");

  // Two columns: Before / After
  const colW = 5.7;
  const colH = 5.0;
  const colY = 1.6;

  // BEFORE
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: colY, w: colW, h: colH,
    fill: { color: BG_LIGHT }, line: { color: ICE, width: 1 }
  });
  s.addText("VORHER", {
    x: 0.6, y: colY + 0.2, w: colW, h: 0.4,
    fontSize: 13, bold: true, color: TEXT_MUTED, fontFace: FONT_H, align: "center", charSpacing: 4, margin: 0
  });
  s.addText("Manueller Prozess", {
    x: 0.6, y: colY + 0.6, w: colW, h: 0.6,
    fontSize: 22, bold: true, color: TEXT_MUTED, fontFace: FONT_H, align: "center", margin: 0
  });

  const before = [
    "Sales recherchiert jeden Lead selbst",
    "Signaturen werden selten abgetippt",
    "Datenqualität in SF schwankt stark",
    "Duplikate sammeln sich an",
    "Reaktionszeit auf neue Mails: Stunden"
  ];
  before.forEach((b, i) => {
    s.addText("–", {
      x: 0.9, y: colY + 1.55 + i * 0.55, w: 0.3, h: 0.4,
      fontSize: 18, bold: true, color: TEXT_MUTED, fontFace: FONT_B, margin: 0
    });
    s.addText(b, {
      x: 1.2, y: colY + 1.55 + i * 0.55, w: 4.9, h: 0.5,
      fontSize: 14, color: TEXT_DARK, fontFace: FONT_B, margin: 0
    });
  });

  // AFTER
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.0, y: colY, w: colW, h: colH,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("NACHHER", {
    x: 7.0, y: colY + 0.2, w: colW, h: 0.4,
    fontSize: 13, bold: true, color: ACCENT, fontFace: FONT_H, align: "center", charSpacing: 4, margin: 0
  });
  s.addText("Automatisierter Prozess", {
    x: 7.0, y: colY + 0.6, w: colW, h: 0.6,
    fontSize: 22, bold: true, color: WHITE, fontFace: FONT_H, align: "center", margin: 0
  });

  const after = [
    "Leads landen automatisch in der Queue",
    "Jede Mail-Signatur wird erfasst",
    "Einheitliches Datenformat überall",
    "Duplikate werden automatisch erkannt",
    "Reaktionszeit auf neue Mails: Minuten"
  ];
  after.forEach((a, i) => {
    s.addText("✓", {
      x: 7.3, y: colY + 1.55 + i * 0.55, w: 0.3, h: 0.4,
      fontSize: 18, bold: true, color: ACCENT, fontFace: FONT_B, margin: 0
    });
    s.addText(a, {
      x: 7.65, y: colY + 1.55 + i * 0.55, w: 4.9, h: 0.5,
      fontSize: 14, color: WHITE, fontFace: FONT_B, margin: 0
    });
  });

  // Bottom note
  s.addText("Sales nutzt weiterhin Salesforce wie gewohnt — bekommt aber mehr, bessere und schnellere Leads.", {
    x: 0.6, y: 6.85, w: 12.1, h: 0.35,
    fontSize: 13, italic: true, color: TEXT_MUTED, fontFace: FONT_B, align: "center", margin: 0
  });

  addFooter(s, 7);
}

// =====================================================
// SLIDE 8 — TECH-STACK ÜBERSICHT
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Technischer Tool-Stack", "Welche Bausteine wir einsetzen — und warum");

  // Section label
  s.addText("ab hier technischer Teil – Details für IT / Entwicklung", {
    x: 0.6, y: 1.35, w: 12.1, h: 0.3,
    fontSize: 11, italic: true, color: TEXT_MUTED, fontFace: FONT_B, margin: 0
  });

  // Categories as 3x2 grid
  const cats = [
    {
      title: "EINGANGSKANÄLE",
      color: NAVY,
      tools: [
        ["Clay.com", "Web-Lead-Discovery + Enrichment"],
        ["Microsoft Graph API", "Outlook-Mail-Push in Echtzeit"]
      ]
    },
    {
      title: "VERARBEITUNG",
      color: NAVY,
      tools: [
        ["Python + FastAPI", "Webhook-Endpoints, Logik"],
        ["Claude API (Haiku)", "Strukturierte Datenextraktion"]
      ]
    },
    {
      title: "STORAGE & JOBS",
      color: NAVY,
      tools: [
        ["SQLite", "Lead-Datenbank, eine Datei"],
        ["APScheduler", "Cron-Jobs im Service"]
      ]
    },
    {
      title: "AUSGABE",
      color: ACCENT,
      tools: [
        ["Salesforce REST API", "Lead.create alle 5 Minuten"],
        ["SMTP / Magic Links", "Review-Mails ans Sales-Team"]
      ]
    },
    {
      title: "HOSTING & BETRIEB",
      color: ACCENT,
      tools: [
        ["Docker + docker-compose", "Containerisierter Stack"],
        ["Hetzner VPS + Caddy", "Server in DE, HTTPS, ~10 €"]
      ]
    },
    {
      title: "ENTWICKLUNG",
      color: ACCENT,
      tools: [
        ["Claude Code", "Vibe-Coding, schreibt den Großteil"],
        ["GitHub Actions", "Tests, CI, Deployment"]
      ]
    }
  ];

  cats.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.6 + col * 4.15;
    const y = 1.85 + row * 2.55;
    const w = 3.95;
    const h = 2.35;

    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: w, h: h,
      fill: { color: BG_LIGHT }, line: { color: ICE, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: w, h: 0.4,
      fill: { color: c.color }, line: { color: c.color }
    });
    s.addText(c.title, {
      x: x + 0.2, y: y + 0.05, w: w - 0.4, h: 0.3,
      fontSize: 11, bold: true, color: WHITE, fontFace: FONT_H, charSpacing: 3, margin: 0
    });

    c.tools.forEach((t, j) => {
      const ty = y + 0.55 + j * 0.85;
      s.addText(t[0], {
        x: x + 0.2, y: ty, w: w - 0.4, h: 0.35,
        fontSize: 14, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
      });
      s.addText(t[1], {
        x: x + 0.2, y: ty + 0.35, w: w - 0.4, h: 0.4,
        fontSize: 11, color: TEXT_DARK, fontFace: FONT_B, margin: 0
      });
    });
  });

  addFooter(s, 8);
}

// =====================================================
// SLIDE 9 — DATENFLUSS WEB-RECHERCHE
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Datenfluss Kanal 1: Web-Recherche", "Vom Suchkriterium bis zum Salesforce-Lead");

  // Section labels above the flow
  const labelY = 2.0;
  const sections = [
    { label: "QUELLE", x: 0.6, w: 1.85 },
    { label: "EMPFANG & VERARBEITUNG", x: 2.85, w: 6.0 },
    { label: "ÜBERGABE", x: 9.25, w: 3.45 }
  ];
  sections.forEach(sec => {
    s.addText(sec.label, {
      x: sec.x, y: labelY, w: sec.w, h: 0.3,
      fontSize: 10, bold: true, color: ACCENT, fontFace: FONT_H, charSpacing: 4, margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: sec.x, y: labelY + 0.32, w: sec.w, h: 0,
      line: { color: ACCENT, width: 1 }
    });
  });

  // Flow steps (cleaner, no top bars — just typography hierarchy)
  const steps = [
    { tool: "Clay.com",     action: "Discovery +\nEnrichment",     sub: "täglich 03:00",     section: 0 },
    { tool: "Webhook",      action: "POST\n/ingest/clay",          sub: "HMAC-signiert",     section: 1 },
    { tool: "FastAPI",      action: "Mapping auf\nLead-Schema",    sub: "Python-Service",    section: 1 },
    { tool: "Validierung",  action: "Dedup +\nPflichtfelder",      sub: "deterministisch",   section: 1 },
    { tool: "Sync-Job",     action: "Lead.create\nalle 5 Min",     sub: "APScheduler",       section: 1 },
    { tool: "Salesforce",   action: "Lead\nangelegt",              sub: "REST API",          section: 2 }
  ];

  const flowY = 2.8;
  const boxW = 1.75;
  const boxH = 2.4;
  const gap = 0.32;
  const startX = (W - (steps.length * boxW + (steps.length - 1) * gap)) / 2;

  steps.forEach((st, i) => {
    const x = startX + i * (boxW + gap);
    const isEndpoint = (i === 0 || i === steps.length - 1);
    const fill = isEndpoint ? ACCENT : WHITE;
    const lineCol = isEndpoint ? ACCENT : BORDER;
    const titleCol = isEndpoint ? WHITE : NAVY;
    const actionCol = isEndpoint ? WHITE : TEXT_DARK;
    const subCol = isEndpoint ? "EEF6DC" : TEXT_MUTED;

    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: flowY, w: boxW, h: boxH,
      fill: { color: fill }, line: { color: lineCol, width: 1 },
      shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 90, opacity: 0.05 }
    });

    // step number small
    s.addText(String(i + 1).padStart(2, "0"), {
      x: x + 0.15, y: flowY + 0.15, w: 0.5, h: 0.25,
      fontSize: 10, bold: true, color: isEndpoint ? WHITE : ACCENT, fontFace: FONT_H, charSpacing: 2, margin: 0
    });

    s.addText(st.tool, {
      x: x + 0.15, y: flowY + 0.55, w: boxW - 0.3, h: 0.45,
      fontSize: 16, bold: true, color: titleCol, fontFace: FONT_H, margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 0.15, y: flowY + 1.05, w: 0.4, h: 0,
      line: { color: isEndpoint ? WHITE : ACCENT, width: 1.5 }
    });
    s.addText(st.action, {
      x: x + 0.15, y: flowY + 1.2, w: boxW - 0.3, h: 0.8,
      fontSize: 12, color: actionCol, fontFace: FONT_B, margin: 0
    });
    s.addText(st.sub, {
      x: x + 0.15, y: flowY + 2.0, w: boxW - 0.3, h: 0.3,
      fontSize: 9, italic: true, color: subCol, fontFace: FONT_B, margin: 0
    });

    // arrow
    if (i < steps.length - 1) {
      const ax = x + boxW + 0.04;
      const ay = flowY + boxH / 2;
      s.addShape(pres.shapes.LINE, {
        x: ax, y: ay, w: gap - 0.08, h: 0,
        line: { color: TEXT_MUTED, width: 1.25, endArrowType: "triangle" }
      });
    }
  });

  // Bottom: simple key facts row
  const factY = 6.0;
  const facts = [
    ["Auslöser", "Cron in Clay (täglich)"],
    ["Datenmenge", "~50–200 Leads / Lauf"],
    ["Verzögerung", "max. 5 Min bis Salesforce"]
  ];
  facts.forEach((f, i) => {
    const fx = 0.6 + i * 4.15;
    s.addText(f[0], {
      x: fx, y: factY, w: 3.9, h: 0.3,
      fontSize: 10, bold: true, color: ACCENT, fontFace: FONT_H, charSpacing: 3, margin: 0
    });
    s.addText(f[1], {
      x: fx, y: factY + 0.3, w: 3.9, h: 0.4,
      fontSize: 14, color: NAVY, fontFace: FONT_B, margin: 0
    });
  });

  addFooter(s, 9);
}

// =====================================================
// SLIDE 10 — DATENFLUSS E-MAIL
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Datenfluss Kanal 2: E-Mail-Signaturen", "Push-Trigger in Echtzeit — Mail rein, Lead raus");

  // Section labels
  const labelY = 1.8;
  const sectionsE = [
    { label: "QUELLE", x: 0.6, w: 1.85 },
    { label: "EMPFANG, EXTRAKTION & QUALITÄT", x: 2.85, w: 9.85 }
  ];
  sectionsE.forEach(sec => {
    s.addText(sec.label, {
      x: sec.x, y: labelY, w: sec.w, h: 0.3,
      fontSize: 10, bold: true, color: ACCENT, fontFace: FONT_H, charSpacing: 4, margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: sec.x, y: labelY + 0.32, w: sec.w, h: 0,
      line: { color: ACCENT, width: 1 }
    });
  });

  const steps = [
    { tool: "Outlook",      action: "Neue Mail\nin Mailbox",     sub: "Shared Mailbox" },
    { tool: "MS Graph",     action: "Push-Webhook\nan Service",  sub: "Echtzeit" },
    { tool: "FastAPI",      action: "Body + Header\nladen",      sub: "/ingest/email" },
    { tool: "Filter",       action: "Extern? Auto?\nBekannt?",   sub: "Vorab-Check" },
    { tool: "Claude API",   action: "Signatur\nextrahieren",     sub: "JSON-Schema" },
    { tool: "Validierung",  action: "Dedup +\nQualitäts-Score",  sub: "score 0–5" }
  ];

  const flowY = 2.6;
  const boxW = 1.95;
  const boxH = 1.95;
  const gap = 0.1;
  const startX = (W - (steps.length * boxW + (steps.length - 1) * gap)) / 2;

  steps.forEach((st, i) => {
    const x = startX + i * (boxW + gap);
    const isSource = i === 0;
    const fill = isSource ? ACCENT : WHITE;
    const lineCol = isSource ? ACCENT : BORDER;
    const titleCol = isSource ? WHITE : NAVY;
    const actionCol = isSource ? WHITE : TEXT_DARK;
    const subCol = isSource ? "EEF6DC" : TEXT_MUTED;

    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: flowY, w: boxW, h: boxH,
      fill: { color: fill }, line: { color: lineCol, width: 1 },
      shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 90, opacity: 0.05 }
    });
    s.addText(String(i + 1).padStart(2, "0"), {
      x: x + 0.15, y: flowY + 0.15, w: 0.5, h: 0.25,
      fontSize: 10, bold: true, color: isSource ? WHITE : ACCENT, fontFace: FONT_H, charSpacing: 2, margin: 0
    });
    s.addText(st.tool, {
      x: x + 0.15, y: flowY + 0.45, w: boxW - 0.3, h: 0.4,
      fontSize: 15, bold: true, color: titleCol, fontFace: FONT_H, margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 0.15, y: flowY + 0.9, w: 0.4, h: 0,
      line: { color: isSource ? WHITE : ACCENT, width: 1.5 }
    });
    s.addText(st.action, {
      x: x + 0.15, y: flowY + 1.05, w: boxW - 0.3, h: 0.65,
      fontSize: 11, color: actionCol, fontFace: FONT_B, margin: 0
    });
    s.addText(st.sub, {
      x: x + 0.15, y: flowY + 1.65, w: boxW - 0.3, h: 0.25,
      fontSize: 9, italic: true, color: subCol, fontFace: FONT_B, margin: 0
    });

    if (i < steps.length - 1) {
      const ax = x + boxW + 0.005;
      const ay = flowY + boxH / 2;
      s.addShape(pres.shapes.LINE, {
        x: ax, y: ay, w: gap - 0.02, h: 0,
        line: { color: TEXT_MUTED, width: 1.25, endArrowType: "triangle" }
      });
    }
  });

  // Decision diamond visual: branching
  const decisionY = flowY + boxH + 0.45;
  s.addText("nach Score-Berechnung →", {
    x: 0.6, y: decisionY, w: 12.1, h: 0.3,
    fontSize: 11, italic: true, color: TEXT_MUTED, fontFace: FONT_B, align: "center", margin: 0
  });

  const branches = [
    { label: "Score ≥ 4",  action: "Auto-Push nach Salesforce",    color: ACCENT,    bg: "EEF6DC" },
    { label: "Score 2–3",  action: "Review-Mail an Sales",         color: "D97706",  bg: "FEF3C7" },
    { label: "Score ≤ 1",  action: "Verworfen, archiviert",        color: "9CA3AF",  bg: "F3F4F6" }
  ];
  const brY = decisionY + 0.4;
  const brW = 3.95;
  branches.forEach((b, i) => {
    const bx = 0.6 + i * 4.15;
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: brY, w: brW, h: 0.95,
      fill: { color: b.bg }, line: { color: b.bg }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: brY, w: 0.1, h: 0.95,
      fill: { color: b.color }, line: { color: b.color }
    });
    s.addText(b.label, {
      x: bx + 0.3, y: brY + 0.12, w: brW - 0.4, h: 0.35,
      fontSize: 13, bold: true, color: b.color, fontFace: FONT_H, charSpacing: 1, margin: 0
    });
    s.addText(b.action, {
      x: bx + 0.3, y: brY + 0.48, w: brW - 0.4, h: 0.4,
      fontSize: 13, color: NAVY, fontFace: FONT_B, margin: 0
    });
  });

  // Bottom: background jobs as understated row
  s.addText("BACKGROUND-JOBS", {
    x: 0.6, y: 6.55, w: 12.1, h: 0.25,
    fontSize: 9, bold: true, color: ACCENT, fontFace: FONT_H, charSpacing: 3, align: "center", margin: 0
  });
  s.addText("Subscription-Renewal alle 48 h   ·   Dead-Man's-Switch stündlich   ·   Backup täglich", {
    x: 0.6, y: 6.8, w: 12.1, h: 0.3,
    fontSize: 11, color: TEXT_MUTED, fontFace: FONT_B, align: "center", margin: 0
  });

  addFooter(s, 10);
}

// =====================================================
// SLIDE 11 — SYSTEM-ARCHITEKTUR
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "System-Architektur: Was läuft wo", "Ein Server, vier externe Dienste, klare Trennung");

  // Column labels
  const colY = 1.75;
  const cols = [
    { label: "EINGÄNGE", x: 0.6, w: 2.85, align: "left" },
    { label: "UNSER SERVER", x: 4.05, w: 5.2, align: "left" },
    { label: "AUSGÄNGE", x: 9.85, w: 2.85, align: "left" }
  ];
  cols.forEach(c => {
    s.addText(c.label, {
      x: c.x, y: colY, w: c.w, h: 0.3,
      fontSize: 10, bold: true, color: ACCENT, fontFace: FONT_H, charSpacing: 4, align: c.align, margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: c.x, y: colY + 0.32, w: c.w, h: 0,
      line: { color: ACCENT, width: 1 }
    });
  });

  // ---- Central VPS container ----
  const vpsX = 4.05, vpsY = 2.3, vpsW = 5.2, vpsH = 4.0;
  s.addShape(pres.shapes.RECTANGLE, {
    x: vpsX, y: vpsY, w: vpsW, h: vpsH,
    fill: { color: BG_LIGHT }, line: { color: BORDER, width: 1 },
    shadow: { type: "outer", color: "000000", blur: 12, offset: 3, angle: 90, opacity: 0.06 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: vpsX, y: vpsY, w: vpsW, h: 0.55,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("HETZNER VPS · Deutschland", {
    x: vpsX + 0.2, y: vpsY + 0.08, w: vpsW - 0.4, h: 0.2,
    fontSize: 10, bold: true, color: ACCENT, fontFace: FONT_H, charSpacing: 3, margin: 0
  });
  s.addText("docker-compose – ein Stack, eine Maschine", {
    x: vpsX + 0.2, y: vpsY + 0.28, w: vpsW - 0.4, h: 0.25,
    fontSize: 11, italic: true, color: WHITE, fontFace: FONT_B, margin: 0
  });

  // Containers grid 2x3
  const containers = [
    { name: "FastAPI",      desc: "Webhooks · LLM-Calls\nReview-UI" },
    { name: "Datenbank",    desc: "leads-Tabelle als\nDatei-Volume" },
    { name: "Caddy",        desc: "HTTPS-Proxy\nLet's Encrypt" },
    { name: "Scheduler",    desc: "Sync · Renewal\nBackup-Jobs" },
    { name: "Monitoring",   desc: "Uptime-Checks\nAlerting per Mail" },
    { name: "Logs & Backup", desc: "strukturiert\ntägl. Storage-Box" }
  ];
  const cBoxW = 1.5, cBoxH = 1.45, cGap = 0.12;
  containers.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = vpsX + 0.25 + col * (cBoxW + cGap);
    const cy = vpsY + 0.75 + row * (cBoxH + cGap);

    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cBoxW, h: cBoxH,
      fill: { color: WHITE }, line: { color: BORDER, width: 1 }
    });
    // small green accent
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cBoxW, h: 0.06,
      fill: { color: ACCENT }, line: { color: ACCENT }
    });
    s.addText(c.name, {
      x: cx + 0.15, y: cy + 0.2, w: cBoxW - 0.3, h: 0.35,
      fontSize: 12, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
    });
    s.addText(c.desc, {
      x: cx + 0.15, y: cy + 0.6, w: cBoxW - 0.3, h: 0.75,
      fontSize: 9.5, color: TEXT_DARK, fontFace: FONT_B, margin: 0
    });
  });

  // ---- External services helper ----
  function extCard(x, y, name, desc) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 2.85, h: 1.3,
      fill: { color: WHITE }, line: { color: BORDER, width: 1 },
      shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 90, opacity: 0.05 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 0.08, h: 1.3,
      fill: { color: ACCENT }, line: { color: ACCENT }
    });
    s.addText(name, {
      x: x + 0.25, y: y + 0.2, w: 2.55, h: 0.4,
      fontSize: 15, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
    });
    s.addText(desc, {
      x: x + 0.25, y: y + 0.6, w: 2.55, h: 0.65,
      fontSize: 11, color: TEXT_DARK, fontFace: FONT_B, margin: 0
    });
  }

  // Left external services
  extCard(0.6, 2.5, "Clay.com",      "Web-Lead-Discovery\nWebhook täglich");
  extCard(0.6, 4.5, "Microsoft 365", "Outlook Mailbox\nGraph Subscriptions");

  // Right external services
  extCard(9.85, 2.5, "Anthropic",   "Claude API\nDatenextraktion");
  extCard(9.85, 4.5, "Salesforce",  "REST API\nLead.create");

  // Connection arrows (subtle)
  // Left → VPS
  [3.15, 5.15].forEach(yIdx => {
    s.addShape(pres.shapes.LINE, {
      x: 3.45, y: yIdx, w: 0.55, h: 0,
      line: { color: TEXT_MUTED, width: 1.25, endArrowType: "triangle" }
    });
  });
  // VPS → Right
  [3.15, 5.15].forEach(yIdx => {
    s.addShape(pres.shapes.LINE, {
      x: 9.25, y: yIdx, w: 0.55, h: 0,
      line: { color: TEXT_MUTED, width: 1.25, endArrowType: "triangle" }
    });
  });

  // Bottom note
  s.addText("Alles läuft auf einer Maschine in Deutschland.   Bei Ausfall: dokumentiertes Recovery-Runbook, ~30 Min Wiederherstellung.", {
    x: 0.6, y: 6.65, w: 12.1, h: 0.35,
    fontSize: 11, italic: true, color: TEXT_MUTED, fontFace: FONT_B, align: "center", margin: 0
  });

  addFooter(s, 11);
}

// =====================================================
// SLIDE 12 — ROADMAP
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Fahrplan: 5 Wochen bis Produktivbetrieb", "Wir bauen iterativ — nach Woche 2 läuft bereits das erste Stück produktiv");

  const phases = [
    { w: "Woche 1", t: "Vorbereitung", d: "Zugänge, Freigaben\n(IT, Legal, Salesforce)", c: NAVY },
    { w: "Woche 2", t: "Skelett & Salesforce", d: "Grundgerüst läuft, Dummy-Leads erreichen Salesforce", c: NAVY },
    { w: "Woche 3", t: "E-Mail-Kanal", d: "Outlook-Anbindung, Signatur-Auslese, erste echte Leads", c: ACCENT },
    { w: "Woche 4", t: "Web-Kanal + Review", d: "Clay-Integration, Freigabe-Mails ans Sales-Team", c: ACCENT },
    { w: "Woche 5", t: "Go-Live", d: "Monitoring, Schulung, Produktivbetrieb startet", c: "2C8C5C" }
  ];

  // Timeline line
  const tlY = 4.0;
  s.addShape(pres.shapes.LINE, {
    x: 1.0, y: tlY, w: 11.3, h: 0,
    line: { color: ICE, width: 4 }
  });

  phases.forEach((p, i) => {
    const x = 1.0 + i * 2.45;
    // dot
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.85, y: tlY - 0.25, w: 0.5, h: 0.5,
      fill: { color: p.c }, line: { color: p.c }
    });
    s.addText(String(i + 1), {
      x: x + 0.85, y: tlY - 0.25, w: 0.5, h: 0.5,
      fontSize: 16, bold: true, color: WHITE, fontFace: FONT_H, align: "center", valign: "middle", margin: 0
    });

    // top card
    if (i % 2 === 0) {
      // top
      s.addShape(pres.shapes.RECTANGLE, {
        x: x, y: 1.8, w: 2.2, h: 1.9,
        fill: { color: BG_LIGHT }, line: { color: ICE, width: 1 }
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: x, y: 1.8, w: 2.2, h: 0.05,
        fill: { color: p.c }, line: { color: p.c }
      });
      s.addText(p.w, {
        x: x + 0.15, y: 1.9, w: 1.95, h: 0.3,
        fontSize: 11, bold: true, color: p.c, fontFace: FONT_H, charSpacing: 2, margin: 0
      });
      s.addText(p.t, {
        x: x + 0.15, y: 2.2, w: 1.95, h: 0.4,
        fontSize: 15, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
      });
      s.addText(p.d, {
        x: x + 0.15, y: 2.6, w: 1.95, h: 1.05,
        fontSize: 11, color: TEXT_DARK, fontFace: FONT_B, margin: 0
      });
    } else {
      // bottom
      s.addShape(pres.shapes.RECTANGLE, {
        x: x, y: 4.3, w: 2.2, h: 1.9,
        fill: { color: BG_LIGHT }, line: { color: ICE, width: 1 }
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: x, y: 6.15, w: 2.2, h: 0.05,
        fill: { color: p.c }, line: { color: p.c }
      });
      s.addText(p.w, {
        x: x + 0.15, y: 4.4, w: 1.95, h: 0.3,
        fontSize: 11, bold: true, color: p.c, fontFace: FONT_H, charSpacing: 2, margin: 0
      });
      s.addText(p.t, {
        x: x + 0.15, y: 4.7, w: 1.95, h: 0.4,
        fontSize: 15, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
      });
      s.addText(p.d, {
        x: x + 0.15, y: 5.1, w: 1.95, h: 1.05,
        fontSize: 11, color: TEXT_DARK, fontFace: FONT_B, margin: 0
      });
    }
  });

  // Bottom note
  s.addText("Aufwand: ~16 Personentage verteilt auf Dev, Sales-Ops, IT, Salesforce-Admin", {
    x: 0.6, y: 6.75, w: 12.1, h: 0.4,
    fontSize: 13, italic: true, color: TEXT_MUTED, fontFace: FONT_B, align: "center", margin: 0
  });

  addFooter(s, 12);
}

// =====================================================
// SLIDE 13 — KOSTEN & ROI
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Kosten und Wertbeitrag", "Die Rechnung ist schon ab dem ersten Monat positiv");

  // Left: monthly cost breakdown
  s.addText("Laufende Kosten pro Monat", {
    x: 0.6, y: 1.5, w: 6, h: 0.5,
    fontSize: 18, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
  });

  const costs = [
    ["Clay.com (Lead-Quelle)", "150–350 €"],
    ["KI-Modell (Datenauslese)", "~15 €"],
    ["Server (Hetzner)", "~10 €"],
    ["Entwickler-Tools", "~80 €"],
    ["Outlook & Salesforce", "0 € *"]
  ];
  costs.forEach((c, i) => {
    const y = 2.15 + i * 0.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y, w: 6.0, h: 0.45,
      fill: { color: i % 2 === 0 ? BG_LIGHT : WHITE }, line: { color: ICE, width: 0.5 }
    });
    s.addText(c[0], {
      x: 0.8, y: y + 0.05, w: 4.0, h: 0.35,
      fontSize: 13, color: TEXT_DARK, fontFace: FONT_B, margin: 0
    });
    s.addText(c[1], {
      x: 4.8, y: y + 0.05, w: 1.7, h: 0.35,
      fontSize: 13, bold: true, color: NAVY, fontFace: FONT_B, align: "right", margin: 0
    });
  });

  // Sum
  const sumY = 2.15 + costs.length * 0.55 + 0.1;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: sumY, w: 6.0, h: 0.55,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("Summe", {
    x: 0.8, y: sumY + 0.1, w: 4.0, h: 0.4,
    fontSize: 15, bold: true, color: WHITE, fontFace: FONT_B, margin: 0
  });
  s.addText("ca. 255–455 € / Monat", {
    x: 3.5, y: sumY + 0.1, w: 3.0, h: 0.4,
    fontSize: 15, bold: true, color: ACCENT, align: "right", fontFace: FONT_B, margin: 0
  });

  s.addText("* enthalten in bestehenden Lizenzen", {
    x: 0.6, y: sumY + 0.7, w: 6.0, h: 0.3,
    fontSize: 10, italic: true, color: TEXT_MUTED, fontFace: FONT_B, margin: 0
  });

  // Right: ROI box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.4, y: 1.5, w: 5.3, h: 5.2,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("WERTBEITRAG", {
    x: 7.4, y: 1.75, w: 5.3, h: 0.4,
    fontSize: 13, bold: true, color: ACCENT, fontFace: FONT_H, align: "center", charSpacing: 4, margin: 0
  });

  s.addText("750–1.500 €", {
    x: 7.4, y: 2.3, w: 5.3, h: 1.2,
    fontSize: 56, bold: true, color: WHITE, fontFace: FONT_H, align: "center", margin: 0
  });
  s.addText("eingesparter Aufwand / Monat", {
    x: 7.4, y: 3.55, w: 5.3, h: 0.4,
    fontSize: 15, color: ICE, align: "center", fontFace: FONT_B, margin: 0
  });

  s.addShape(pres.shapes.LINE, {
    x: 9.0, y: 4.2, w: 2.1, h: 0,
    line: { color: ACCENT, width: 2 }
  });

  s.addText("Basis-Annahme", {
    x: 7.7, y: 4.45, w: 4.7, h: 0.3,
    fontSize: 12, bold: true, color: ACCENT, fontFace: FONT_B, align: "center", margin: 0
  });
  s.addText("200 automatische Leads/Monat\n× 5–10 Min Recherche gespart\n= 15–30 Stunden\n× 50 € Vollkosten", {
    x: 7.7, y: 4.75, w: 4.7, h: 1.5,
    fontSize: 12, color: WHITE, fontFace: FONT_B, align: "center", margin: 0
  });

  s.addText("Break-even ab Monat 1", {
    x: 7.7, y: 6.25, w: 4.7, h: 0.35,
    fontSize: 14, italic: true, bold: true, color: ACCENT, fontFace: FONT_B, align: "center", margin: 0
  });

  addFooter(s, 13);
}

// =====================================================
// SLIDE 14 — RISIKEN
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Risiken und wie wir sie adressieren", "Wir haben die wichtigsten Stolpersteine eingeplant");

  const risks = [
    {
      r: "DSGVO / Datenschutz",
      m: "Vorab-Freigabe durch Legal. Klare Trennung: wir legen Leads an — die Entscheidung zur Kontaktaufnahme bleibt manuell beim Sales-Team."
    },
    {
      r: "KI macht Fehler bei der Extraktion",
      m: "Keine Blackbox: deterministische Prüfregeln und Human-Review-Schritt bei unsicheren Daten."
    },
    {
      r: "Sales-Queue wird mit schlechten Leads geflutet",
      m: "Dedup-Logik erkennt Duplikate. Qualitätsstufen filtern bevor etwas in Salesforce landet."
    },
    {
      r: "System fällt unbemerkt aus",
      m: "Monitoring meldet Ausfälle aktiv per Mail. Tägliche Backups, dokumentierte Wiederherstellung."
    },
    {
      r: "Abhängigkeit von externem Dienstleister (Clay)",
      m: "Unser Datenformat ist eigen. Clay ist eine austauschbare Quelle — wir können später eigene Recherche bauen."
    }
  ];

  risks.forEach((rk, i) => {
    const y = 1.55 + i * 1.05;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y, w: 12.1, h: 0.9,
      fill: { color: BG_LIGHT }, line: { color: ICE, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y, w: 0.08, h: 0.9,
      fill: { color: ACCENT }, line: { color: ACCENT }
    });
    s.addText(rk.r, {
      x: 0.95, y: y + 0.1, w: 4.5, h: 0.7,
      fontSize: 14, bold: true, color: NAVY, fontFace: FONT_H, valign: "middle", margin: 0
    });
    s.addText(rk.m, {
      x: 5.6, y: y + 0.1, w: 7.0, h: 0.7,
      fontSize: 12, color: TEXT_DARK, fontFace: FONT_B, valign: "middle", margin: 0
    });
  });

  addFooter(s, 14);
}

// =====================================================
// SLIDE 15 — WAS WIR VOM TEAM BRAUCHEN
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Was wir vom Team brauchen", "Damit wir nächste Woche starten können");

  const asks = [
    { who: "MANAGEMENT", what: "Freigabe Budget und Projekt", detail: "Rahmen ~460 € / Monat, ~16 Personentage über 5 Wochen.", color: NAVY },
    { who: "LEGAL", what: "DSGVO-Bewertung", detail: "Klärung der zulässigen Datenhaltung für B2B-Leads.", color: NAVY },
    { who: "IT", what: "Microsoft-Zugang", detail: "Azure-App-Freigabe für Zugriff auf die Sales-Mailbox.", color: NAVY },
    { who: "SALES-LEAD", what: "Pilot-Scope definieren", detail: "Welche Branche, welche Region, welche Mailbox starten wir?", color: ACCENT },
    { who: "SALES-OPS", what: "Suchkriterien & Review", detail: "Suchprofile pflegen, Stichproben bei Lead-Qualität reviewen.", color: ACCENT },
    { who: "SF-ADMIN", what: "Salesforce-Setup", detail: "Sandbox-Zugang und drei Custom Fields anlegen.", color: NAVY }
  ];

  asks.forEach((a, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.6 + col * 6.15;
    const y = 1.55 + row * 1.55;

    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 5.95, h: 1.4,
      fill: { color: WHITE }, line: { color: ICE, width: 1 },
      shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 90, opacity: 0.08 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 0.12, h: 1.4,
      fill: { color: a.color }, line: { color: a.color }
    });
    s.addText(a.who, {
      x: x + 0.3, y: y + 0.15, w: 5.55, h: 0.3,
      fontSize: 11, bold: true, color: a.color, fontFace: FONT_H, charSpacing: 3, margin: 0
    });
    s.addText(a.what, {
      x: x + 0.3, y: y + 0.45, w: 5.55, h: 0.4,
      fontSize: 16, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
    });
    s.addText(a.detail, {
      x: x + 0.3, y: y + 0.85, w: 5.55, h: 0.5,
      fontSize: 12, color: TEXT_DARK, fontFace: FONT_B, margin: 0
    });
  });

  addFooter(s, 15);
}

// =====================================================
// SLIDE 16 — KONKRETE NEXT STEPS
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Konkrete nächste Schritte", "Was diese und nächste Woche passiert");

  // Two columns: This week / Next week
  const colY = 1.65;
  const colH = 5.0;
  const colW = 5.95;

  const blocks = [
    {
      title: "DIESE WOCHE",
      sub: "Entscheidung & Zugänge",
      x: 0.6,
      items: [
        { who: "Management", task: "Go-Entscheidung & Budget-Freigabe" },
        { who: "Legal", task: "DSGVO-Bewertung anstoßen" },
        { who: "Sales-Lead", task: "Pilot-Branche & Mailbox festlegen" },
        { who: "Projekt-Lead", task: "Product-Owner-Rolle besetzen" },
        { who: "Dev", task: "GitHub-Repo + Claude Code Setup" }
      ]
    },
    {
      title: "NÄCHSTE WOCHE",
      sub: "Sprint 0: Voraussetzungen",
      x: 7.0,
      items: [
        { who: "IT", task: "Azure App Registration anlegen" },
        { who: "SF-Admin", task: "Sandbox + 3 Custom Fields" },
        { who: "Sales-Ops", task: "Clay-Account & erste Suchprofile" },
        { who: "DevOps", task: "VPS bestellen, DNS konfigurieren" },
        { who: "Dev", task: "API-Keys einrichten, Skeleton starten" }
      ]
    }
  ];

  blocks.forEach(b => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: b.x, y: colY, w: colW, h: colH,
      fill: { color: BG_LIGHT }, line: { color: BORDER, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: b.x, y: colY, w: colW, h: 0.08,
      fill: { color: ACCENT }, line: { color: ACCENT }
    });
    s.addText(b.title, {
      x: b.x + 0.35, y: colY + 0.3, w: colW - 0.7, h: 0.35,
      fontSize: 12, bold: true, color: ACCENT, fontFace: FONT_H, charSpacing: 4, margin: 0
    });
    s.addText(b.sub, {
      x: b.x + 0.35, y: colY + 0.65, w: colW - 0.7, h: 0.4,
      fontSize: 18, bold: true, color: NAVY, fontFace: FONT_H, margin: 0
    });

    b.items.forEach((it, i) => {
      const iy = colY + 1.3 + i * 0.7;
      // checkbox
      s.addShape(pres.shapes.RECTANGLE, {
        x: b.x + 0.35, y: iy + 0.05, w: 0.22, h: 0.22,
        fill: { color: WHITE }, line: { color: ACCENT, width: 1.5 }
      });
      s.addText(it.who, {
        x: b.x + 0.7, y: iy, w: 1.7, h: 0.3,
        fontSize: 10, bold: true, color: ACCENT, fontFace: FONT_H, charSpacing: 2, margin: 0
      });
      s.addText(it.task, {
        x: b.x + 0.7, y: iy + 0.25, w: colW - 1.05, h: 0.4,
        fontSize: 12, color: TEXT_DARK, fontFace: FONT_B, margin: 0
      });
    });
  });

  // Bottom commitment line
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 6.75, w: 12.35, h: 0.35,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("Ziel: Freitag dieser Woche steht die Entscheidung   ·   Montag der Folgewoche startet Sprint 0", {
    x: 0.6, y: 6.78, w: 12.35, h: 0.3,
    fontSize: 11, bold: true, color: ACCENT, fontFace: FONT_B, align: "center", charSpacing: 2, margin: 0
  });

  addFooter(s, 16);
}

// =====================================================
// SLIDE 17 — DETAILLIERTE TIMELINE (Gantt)
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addHeader(s, "Detaillierte Timeline", "5 Wochen Umsetzung — was wann passiert");

  // Gantt-style chart
  const chartX = 2.6;
  const chartY = 1.9;
  const chartW = 10.0;
  const weekW = chartW / 5;

  // Week headers
  for (let i = 0; i < 5; i++) {
    s.addText("Woche " + (i + 1), {
      x: chartX + i * weekW, y: chartY, w: weekW, h: 0.35,
      fontSize: 11, bold: true, color: ACCENT, fontFace: FONT_H, charSpacing: 2, align: "center", margin: 0
    });
    // vertical separator line
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x: chartX + i * weekW, y: chartY + 0.35, w: 0, h: 4.6,
        line: { color: BORDER, width: 0.5 }
      });
    }
  }
  // Top + bottom chart lines
  s.addShape(pres.shapes.LINE, {
    x: chartX, y: chartY + 0.35, w: chartW, h: 0,
    line: { color: ACCENT, width: 1.5 }
  });
  s.addShape(pres.shapes.LINE, {
    x: chartX, y: chartY + 4.95, w: chartW, h: 0,
    line: { color: BORDER, width: 0.5 }
  });

  // Tasks: { label, startWeek (0-4), durationWeeks, color }
  const tasks = [
    { label: "Sprint 0  Voraussetzungen & Freigaben",  start: 0, dur: 1.0 },
    { label: "Sprint 1  Skelett & Salesforce-Sync",     start: 1, dur: 0.7 },
    { label: "Sprint 2  Outlook-Pipeline",              start: 1.7, dur: 1.3 },
    { label: "Sprint 3  Clay-Integration",              start: 3, dur: 0.5 },
    { label: "Sprint 4  Review-Flow",                   start: 3.5, dur: 0.3 },
    { label: "Sprint 5  Go-Live & Monitoring",          start: 3.8, dur: 0.7 },
    { label: "Soft-Launch & Retro",                     start: 4.5, dur: 0.5 }
  ];

  const rowH = 0.55;
  const barH = 0.32;
  tasks.forEach((t, i) => {
    const ty = chartY + 0.55 + i * rowH;
    // label on the left
    s.addText(t.label, {
      x: 0.6, y: ty + 0.02, w: 1.95, h: 0.35,
      fontSize: 10, color: NAVY, fontFace: FONT_B, margin: 0
    });
    // bar
    const bx = chartX + t.start * weekW + 0.05;
    const bw = t.dur * weekW - 0.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx, y: ty + 0.05, w: bw, h: barH,
      fill: { color: ACCENT }, line: { color: ACCENT }
    });
    // small inset label (sprint number) — leave bar clean for readability
  });

  // Milestones row at bottom
  const msY = chartY + 4.95;
  const milestones = [
    { week: 1.0, label: "Zugänge\nstehen" },
    { week: 2.7, label: "SF-Sync\nläuft" },
    { week: 4.0, label: "Echte Leads\nin DB" },
    { week: 5.0, label: "Produktiv-\nbetrieb" }
  ];
  milestones.forEach(m => {
    const mx = chartX + m.week * weekW;
    // diamond marker
    s.addShape(pres.shapes.DIAMOND, {
      x: mx - 0.15, y: msY - 0.15, w: 0.3, h: 0.3,
      fill: { color: NAVY }, line: { color: NAVY }
    });
    s.addText(m.label, {
      x: mx - 0.85, y: msY + 0.22, w: 1.7, h: 0.55,
      fontSize: 9, bold: true, color: NAVY, fontFace: FONT_B, align: "center", margin: 0
    });
  });
  s.addText("MEILENSTEINE", {
    x: 0.6, y: msY + 0.05, w: 1.95, h: 0.3,
    fontSize: 9, bold: true, color: ACCENT, fontFace: FONT_H, charSpacing: 3, margin: 0
  });

  // Legend bottom
  const legY = 7.0;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: legY, w: 0.25, h: 0.18,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });
  s.addText("Arbeitspaket", {
    x: 0.9, y: legY - 0.02, w: 1.5, h: 0.25,
    fontSize: 10, color: TEXT_MUTED, fontFace: FONT_B, margin: 0
  });
  s.addShape(pres.shapes.DIAMOND, {
    x: 2.5, y: legY, w: 0.18, h: 0.18,
    fill: { color: NAVY }, line: { color: NAVY }
  });
  s.addText("Meilenstein", {
    x: 2.75, y: legY - 0.02, w: 1.5, h: 0.25,
    fontSize: 10, color: TEXT_MUTED, fontFace: FONT_B, margin: 0
  });
  s.addText("Sprints laufen teilweise parallel — Voraussetzungen (Sprint 0) blockieren nichts.", {
    x: 5.0, y: legY - 0.02, w: 7.7, h: 0.25,
    fontSize: 10, italic: true, color: TEXT_MUTED, fontFace: FONT_B, align: "right", margin: 0
  });

  addFooter(s, 17);
}

// =====================================================
// SLIDE 18 — Q&A
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.35, h: H,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });

  s.addText("Diskussion", {
    x: 1.0, y: 2.6, w: 12, h: 1.5,
    fontSize: 72, bold: true, color: WHITE, fontFace: FONT_H, margin: 0
  });

  s.addShape(pres.shapes.LINE, {
    x: 1.0, y: 4.0, w: 3.5, h: 0,
    line: { color: ACCENT, width: 3 }
  });

  s.addText("Fragen, Bedenken, Vorschläge — jetzt ist der Moment.", {
    x: 1.0, y: 4.3, w: 12, h: 0.6,
    fontSize: 22, color: ICE, fontFace: FONT_B, margin: 0
  });

  s.addText("Nächster Schritt: Entscheidung bis Ende der Woche, Start Sprint 0 nächsten Montag.", {
    x: 1.0, y: 5.4, w: 12, h: 0.6,
    fontSize: 16, italic: true, color: ICE, fontFace: FONT_B, margin: 0
  });
}

const outPath = path.resolve(__dirname, "..", "docs", "presentation.pptx");
pres.writeFile({ fileName: outPath })
  .then(fn => console.log("Created:", fn));
