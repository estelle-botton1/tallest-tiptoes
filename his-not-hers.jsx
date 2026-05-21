import { useState, useEffect } from "react";

const C = {
  cream: "#FBF6F0",
  warmCream: "#F3EBE0",
  pink: "#E8B4B8",
  deepPink: "#C48B8F",
  blush: "#F2D4D7",
  palePink: "#FAE8EA",
  black: "#1A1A1A",
  softBlack: "#2C2424",
  dark: "#3D2B2B",
  muted: "#9B8E8E",
  light: "#C4B5B0",
  white: "#FFFFFF",
};

var quickCategories = [
  { id: "splurge", label: "Splurge", desc: "Go big" },
  { id: "basics", label: "Wardrobe Basics", desc: "Start here" },
  { id: "outfits", label: "Outfit Guide", desc: "Full looks, no guessing" },
];

var splurgeItems = [
  { id: 1, name: "Leather Jacket", brand: "Brand Name", price: "$1,200", note: "The one you keep for 20 years", bg: "linear-gradient(160deg, #E0D8CE, #D6CCC2)" },
  { id: 2, name: "Cashmere Sweater", brand: "Brand Name", price: "$495", note: "Heavier than you expect, worth it", bg: "linear-gradient(160deg, #E8E0D6, #D8CFC5)" },
  { id: 3, name: "Watch", brand: "Brand Name", price: "$2,800", note: "Simple face, automatic, forever", bg: "linear-gradient(160deg, #EDE5DD, #E2D9CF)" },
  { id: 4, name: "Dress Shoes", brand: "Brand Name", price: "$650", note: "Goodyear welt, resole them in 5 years", bg: "linear-gradient(160deg, #E6DDD5, #DDD3C9)" },
  { id: 5, name: "Overcoat", brand: "Brand Name", price: "$890", note: "Camel or charcoal, hits below the knee", bg: "linear-gradient(160deg, #E4DCD4, #DCD3CA)" },
  { id: 6, name: "Sunglasses", brand: "Brand Name", price: "$380", note: "Acetate frame, classic shape, polarized", bg: "linear-gradient(160deg, #ECE4DB, #E2D9CF)" },
];

var basicsItems = [
  { id: 1, name: "White T-Shirt", brand: "Brand Name", price: "$45", note: "Heavyweight cotton, not see-through", bg: "linear-gradient(160deg, #EDE5DD, #E2D9CF)" },
  { id: 2, name: "Dark Jeans", brand: "Brand Name", price: "$198", note: "Straight leg, no distressing", bg: "linear-gradient(160deg, #E0D8CE, #D6CCC2)" },
  { id: 3, name: "Navy Blazer", brand: "Brand Name", price: "$380", note: "Unstructured, throw it on with anything", bg: "linear-gradient(160deg, #E8E0D6, #D8CFC5)" },
  { id: 4, name: "Grey Sweatshirt", brand: "Brand Name", price: "$95", note: "Midweight, no logos", bg: "linear-gradient(160deg, #E6DDD5, #DDD3C9)" },
  { id: 5, name: "White Sneakers", brand: "Brand Name", price: "$130", note: "Leather, minimal, keep them clean", bg: "linear-gradient(160deg, #ECE4DB, #E2D9CF)" },
  { id: 6, name: "Chinos", brand: "Brand Name", price: "$125", note: "Khaki or olive, tapered not slim", bg: "linear-gradient(160deg, #E4DCD4, #DCD3CA)" },
  { id: 7, name: "Oxford Shirt", brand: "Brand Name", price: "$110", note: "Light blue, slightly relaxed fit", bg: "linear-gradient(160deg, #EDE5DD, #E2D9CF)" },
  { id: 8, name: "Belt", brand: "Brand Name", price: "$85", note: "Brown leather, simple buckle", bg: "linear-gradient(160deg, #E0D8CE, #D6CCC2)" },
];

var outfitGuides = [
  {
    id: 1, title: "Date Night", desc: "She will notice",
    pieces: [
      { name: "Navy Blazer", brand: "Brand Name", bg: "linear-gradient(160deg, #E0D8CE, #D6CCC2)" },
      { name: "White T-Shirt", brand: "Brand Name", bg: "linear-gradient(160deg, #EDE5DD, #E2D9CF)" },
      { name: "Dark Jeans", brand: "Brand Name", bg: "linear-gradient(160deg, #E8E0D6, #D8CFC5)" },
      { name: "Leather Boots", brand: "Brand Name", bg: "linear-gradient(160deg, #E6DDD5, #DDD3C9)" },
    ],
  },
  {
    id: 2, title: "Weekend", desc: "Effortless but put together",
    pieces: [
      { name: "Grey Sweatshirt", brand: "Brand Name", bg: "linear-gradient(160deg, #E8E0D6, #D8CFC5)" },
      { name: "Chinos", brand: "Brand Name", bg: "linear-gradient(160deg, #EDE5DD, #E2D9CF)" },
      { name: "White Sneakers", brand: "Brand Name", bg: "linear-gradient(160deg, #E0D8CE, #D6CCC2)" },
      { name: "Watch", brand: "Brand Name", bg: "linear-gradient(160deg, #E6DDD5, #DDD3C9)" },
    ],
  },
  {
    id: 3, title: "Wedding Guest", desc: "Not the groom, still sharp",
    pieces: [
      { name: "Linen Suit", brand: "Brand Name", bg: "linear-gradient(160deg, #EDE5DD, #E2D9CF)" },
      { name: "Dress Shirt", brand: "Brand Name", bg: "linear-gradient(160deg, #E0D8CE, #D6CCC2)" },
      { name: "Loafers", brand: "Brand Name", bg: "linear-gradient(160deg, #E8E0D6, #D8CFC5)" },
      { name: "Pocket Square", brand: "Brand Name", bg: "linear-gradient(160deg, #E6DDD5, #DDD3C9)" },
    ],
  },
  {
    id: 4, title: "Office", desc: "Polished without trying too hard",
    pieces: [
      { name: "Oxford Shirt", brand: "Brand Name", bg: "linear-gradient(160deg, #E8E0D6, #D8CFC5)" },
      { name: "Tailored Trousers", brand: "Brand Name", bg: "linear-gradient(160deg, #EDE5DD, #E2D9CF)" },
      { name: "Dress Shoes", brand: "Brand Name", bg: "linear-gradient(160deg, #E0D8CE, #D6CCC2)" },
      { name: "Belt", brand: "Brand Name", bg: "linear-gradient(160deg, #E6DDD5, #DDD3C9)" },
    ],
  },
];

function ProductGrid({ items }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
      {items.map(function(item) {
        return (
          <div key={item.id} style={{ cursor: "pointer" }}>
            <div style={{ aspectRatio: "1", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", letterSpacing: "1.5px", color: C.muted, opacity: 0.3 }}>PHOTO</span>
            </div>
            <div style={{ padding: "10px 0" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontWeight: "500", margin: "0 0 1px", color: C.softBlack }}>{item.name}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: C.light, margin: "0 0 4px" }}>{item.brand}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontStyle: "italic", color: C.muted, margin: "0 0 4px", lineHeight: "1.4" }}>{item.note}</p>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: "600", color: C.dark }}>{item.price}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OutfitGuideContent() {
  return (
    <div>
      {outfitGuides.map(function(outfit) {
        return (
          <div key={outfit.id} style={{ marginBottom: "32px" }}>
            <div style={{ marginBottom: "14px" }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", fontWeight: "400", margin: "0 0 3px", color: C.softBlack }}>{outfit.title}</h3>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: C.muted }}>{outfit.desc}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "6px" }}>
              {outfit.pieces.map(function(piece, j) {
                return (
                  <div key={j}>
                    <div style={{ aspectRatio: "3/4", background: piece.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "7px", letterSpacing: "1px", color: C.muted, opacity: 0.3 }}>PHOTO</span>
                    </div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", margin: "6px 0 1px", color: C.softBlack, lineHeight: "1.3" }}>{piece.name}</p>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", color: C.light }}>{piece.brand}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "12px", textAlign: "center", padding: "11px", background: C.black, cursor: "pointer" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: C.cream }}>SHOP THIS LOOK</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CategoryDetail({ category, onClose }) {
  var title = "";
  var subtitle = "";
  var content = null;

  if (category === "splurge") {
    title = "Splurge";
    subtitle = "Investment pieces. Buy once, keep forever.";
    content = <ProductGrid items={splurgeItems} />;
  } else if (category === "basics") {
    title = "Wardrobe Basics";
    subtitle = "The foundation. Get these right, everything else is easy.";
    content = <ProductGrid items={basicsItems} />;
  } else {
    title = "Outfit Guide";
    subtitle = "Full looks. Just copy it.";
    content = <OutfitGuideContent />;
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: C.cream, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid " + C.palePink, position: "sticky", top: 0, background: C.cream + "F2", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", zIndex: 10 }}>
        <span onClick={onClose} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: C.muted, cursor: "pointer" }}>Back</span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: C.black }}>His Not Hers</span>
        <div style={{ width: "40px" }} />
      </div>

      <div style={{ padding: "28px 20px 0" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", fontWeight: "400", margin: "0 0 6px" }}>{title}</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: C.muted, margin: "0 0 24px" }}>{subtitle}</p>
      </div>

      <div style={{ padding: "0 20px 40px" }}>
        {content}
      </div>

      <footer style={{ padding: "24px 24px 40px", textAlign: "center", borderTop: "1px solid " + C.palePink }}>
        <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "20px", color: C.black, margin: "0" }}>Tallest Tiptoes</p>
      </footer>
    </div>
  );
}

export default function HisNotHers() {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(function() { setTimeout(function() { setLoaded(true); }, 50); }, []);

  if (activeCategory) {
    return <CategoryDetail category={activeCategory} onClose={function() { setActiveCategory(null); }} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: C.cream, fontFamily: "'Playfair Display', Georgia, serif", color: C.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Dancing+Script:wght@400;500;600&display=swap" rel="stylesheet" />

      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid " + C.palePink, position: "sticky", top: 0, background: C.cream + "F2", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", zIndex: 50, opacity: loaded ? 1 : 0, transition: "opacity 0.5s" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: C.muted, cursor: "pointer" }}>Home</span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: C.black }}>Tallest Tiptoes</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", cursor: "pointer" }}>
          <div style={{ width: "20px", height: "1.5px", background: C.black }} />
          <div style={{ width: "14px", height: "1.5px", background: C.black }} />
        </div>
      </nav>

      <div style={{ padding: "32px 20px 0", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", fontWeight: "400", margin: "0 0 6px" }}>His Not Hers</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: C.muted, margin: "0" }}>We did the research. You just pick.</p>
      </div>

      <div style={{ padding: "24px 20px 0", opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.15s" }}>
        {quickCategories.map(function(cat, i) {
          return (
            <div key={cat.id} onClick={function() { setActiveCategory(cat.id); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", borderBottom: i < quickCategories.length - 1 ? "1px solid " + C.palePink : "none", cursor: "pointer" }}>
              <div>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontWeight: "400", margin: "0 0 3px", color: C.softBlack }}>{cat.label}</p>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: C.light }}>{cat.desc}</span>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: C.light }}>{">"}</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", padding: "32px 20px", gap: "16px" }}>
        <div style={{ flex: 1, height: "1px", background: C.palePink }} />
        <span style={{ color: C.pink, fontSize: "8px" }}>{"\u2726"}</span>
        <div style={{ flex: 1, height: "1px", background: C.palePink }} />
      </div>

      <div style={{ padding: "0 20px", opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.2s" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: "14px" }}>QUICK PICKS</span>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: C.light, margin: "0 0 16px" }}>If you only buy one thing this month</p>

        <div style={{ display: "flex", gap: "12px", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", paddingBottom: "4px", marginRight: "-20px", paddingRight: "20px" }}>
          {[
            { name: "This Jacket", price: "$295", note: "Goes with everything", bg: "linear-gradient(160deg, #E8E0D6, #D8CFC5)" },
            { name: "These Sneakers", price: "$130", note: "Clean, minimal, done", bg: "linear-gradient(160deg, #E0D8CE, #D6CCC2)" },
            { name: "This Watch", price: "$250", note: "No bells, no whistles", bg: "linear-gradient(160deg, #EDE5DD, #E2D9CF)" },
          ].map(function(item, i) {
            return (
              <div key={i} style={{ minWidth: "160px", flexShrink: 0, cursor: "pointer" }}>
                <div style={{ aspectRatio: "1", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", letterSpacing: "1.5px", color: C.muted, opacity: 0.3 }}>PHOTO</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: "500", margin: "8px 0 2px", color: C.softBlack }}>{item.name}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", fontStyle: "italic", color: C.muted, margin: "0 0 3px" }}>{item.note}</p>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: "600", color: C.dark }}>{item.price}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "32px 20px 40px", opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.25s" }}>
        <div style={{ background: C.black, padding: "28px 24px", textAlign: "center" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: C.deepPink }}>NO SPAM, JUST PICKS</span>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontWeight: "400", fontStyle: "italic", color: C.cream, margin: "8px 0 6px" }}>Get the list</h3>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: C.light, margin: "0 0 16px" }}>One email a month. Best picks. That is it.</p>
          <div style={{ display: "flex", gap: "0" }}>
            <div style={{ flex: 1, padding: "11px 14px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", display: "flex", alignItems: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: C.light, opacity: 0.4 }}>Your email</span>
            </div>
            <div style={{ padding: "11px 20px", background: C.deepPink, display: "flex", alignItems: "center", cursor: "pointer" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: C.cream }}>JOIN</span>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ padding: "24px 24px 40px", textAlign: "center", borderTop: "1px solid " + C.palePink }}>
        <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "20px", color: C.black, margin: "0" }}>Tallest Tiptoes</p>
      </footer>
    </div>
  );
}
