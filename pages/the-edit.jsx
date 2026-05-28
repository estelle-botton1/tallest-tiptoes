import { useState, useEffect } from "react";
import NavBar from "../src/NavBar";
import HonestyBox from "../src/HonestyBox";

const C = {
  cream: "#FBF6F0",
  warmCream: "#F3EBE0",
  pink: "#E8B4B8",
  deepPink: "#C48B8F",
  rosé: "#D4979C",
  blush: "#F2D4D7",
  palePink: "#FAE8EA",
  black: "#1A1A1A",
  softBlack: "#2C2424",
  dark: "#3D2B2B",
  muted: "#9B8E8E",
  light: "#C4B5B0",
  white: "#FFFFFF",
};

const moods = [
  { id: "all", label: "All" },
  { id: "errands", label: "Errands" },
  { id: "dinner", label: "Dinner" },
  { id: "weekend", label: "Weekend" },
  { id: "airport", label: "Airport" },
  { id: "night", label: "Night Out" },
  { id: "work", label: "Work" },
];

// Placeholder outfits — these represent real mirror selfie posts
const outfits = [
  {
    id: 1, mood: "dinner", date: "May 8", title: "Dinner at the place with no sign",
    h: 260,
    bg: `linear-gradient(155deg, ${C.rosé}55, ${C.warmCream})`,
    items: [
      { piece: "Coat", brand: "La Double J", price: "$980" },
      { piece: "T-Shirt", brand: "Leset", price: "$68" },
      { piece: "Jeans", brand: "SLVRLAKE", price: "$279" },
      { piece: "Heels", brand: "Valentino Garavani", price: "$1,070" },
    ],
  },
  {
    id: 2, mood: "errands", date: "May 5", title: "Coffee run but make it count",
    h: 200,
    bg: `linear-gradient(155deg, ${C.warmCream}, ${C.palePink}88)`,
    items: [
      { piece: "Blazer", brand: "Totême", price: "$690" },
      { piece: "Tank", brand: "Skims", price: "$32" },
      { piece: "Trousers", brand: "The Frankie Shop", price: "$195" },
    ],
  },
  {
    id: 3, mood: "weekend", date: "May 3", title: "Farmer's market energy",
    h: 240,
    bg: `linear-gradient(155deg, ${C.blush}, ${C.cream})`,
    items: [
      { piece: "Dress", brand: "Dôen", price: "$298" },
      { piece: "Sandals", brand: "K. Jacques", price: "$265" },
      { piece: "Bag", brand: "Dragon Diffusion", price: "$390" },
    ],
  },
  {
    id: 4, mood: "airport", date: "Apr 29", title: "JFK → CDG",
    h: 220,
    bg: `linear-gradient(155deg, ${C.palePink}66, ${C.warmCream})`,
    items: [
      { piece: "Cardigan", brand: "Khaite", price: "$1,480" },
      { piece: "Leggings", brand: "Alo", price: "$98" },
      { piece: "Sneakers", brand: "New Balance", price: "$110" },
    ],
  },
  {
    id: 5, mood: "night", date: "Apr 25", title: "That new bar on the corner",
    h: 280,
    bg: `linear-gradient(155deg, ${C.deepPink}33, ${C.blush}66)`,
    items: [
      { piece: "Top", brand: "Khaite", price: "$780" },
      { piece: "Skirt", brand: "Reformation", price: "$148" },
      { piece: "Heels", brand: "Jimmy Choo", price: "$850" },
      { piece: "Bag", brand: "Tallest Tiptoes", price: "$120", own: true },
    ],
  },
  {
    id: 6, mood: "work", date: "Apr 22", title: "Meeting I almost forgot about",
    h: 190,
    bg: `linear-gradient(155deg, ${C.warmCream}, ${C.rosé}33)`,
    items: [
      { piece: "Blazer", brand: "The Row", price: "$2,890" },
      { piece: "Shirt", brand: "Nili Lotan", price: "$295" },
      { piece: "Pants", brand: "Vince", price: "$345" },
    ],
  },
  {
    id: 7, mood: "dinner", date: "Apr 18", title: "Birthday dinner — not mine",
    h: 250,
    bg: `linear-gradient(155deg, ${C.blush}88, ${C.palePink})`,
    items: [
      { piece: "Dress", brand: "Ulla Johnson", price: "$595" },
      { piece: "Earrings", brand: "Lizzie Fortunato", price: "$195" },
    ],
  },
  {
    id: 8, mood: "weekend", date: "Apr 14", title: "Sunday with nowhere to be",
    h: 210,
    bg: `linear-gradient(155deg, ${C.cream}, ${C.blush}44)`,
    items: [
      { piece: "Knit", brand: "Alex Mill", price: "$135" },
      { piece: "Shorts", brand: "Agolde", price: "$128" },
      { piece: "Slides", brand: "ATP Atelier", price: "$225" },
    ],
  },
];

function OutfitCard({ outfit, onClick }) {
  return (
    <div onClick={onClick} style={{ cursor: "pointer", marginBottom: "12px" }}>
      <div style={{
        height: outfit.h,
        background: outfit.bg,
        borderRadius: "10px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Crosshatch placeholder pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(45deg, ${C.dark} 0, ${C.dark} 1px, transparent 0, transparent 50%)`,
          backgroundSize: "12px 12px", pointerEvents: "none",
        }} />
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
          letterSpacing: "2px", color: C.dark, opacity: 0.3, zIndex: 2, position: "relative",
        }}>MIRROR SELFIE</span>

        {/* Date badge */}
        <div style={{
          position: "absolute", bottom: "10px", left: "10px",
          background: `${C.white}CC`, backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          padding: "4px 10px", borderRadius: "12px",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "11px", color: C.dark, letterSpacing: "0.5px",
          zIndex: 2,
        }}>{outfit.date}</div>
      </div>

      <p style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: "14px", fontStyle: "italic",
        margin: "8px 0 0", lineHeight: "1.3", color: C.softBlack,
      }}>{outfit.title}</p>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "11px", color: C.muted, fontStyle: "italic",
      }}>{outfit.items.length} pieces</span>
    </div>
  );
}

function OutfitDetail({ outfit, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: `${C.cream}`,
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 20px",
        borderBottom: `1px solid ${C.palePink}`,
        position: "sticky", top: 0,
        background: `${C.cream}F2`,
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        zIndex: 10,
      }}>
        <span
          onClick={onClose}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "13px", color: C.muted, cursor: "pointer",
            letterSpacing: "0.5px",
          }}
        >← Back</span>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "16px", color: C.black,
        }}>Getting Dressed</span>
        <div style={{ width: "40px" }} />
      </div>

      {/* Main outfit image */}
      <div style={{
        height: "460px",
        background: outfit.bg,
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(45deg, ${C.dark} 0, ${C.dark} 1px, transparent 0, transparent 50%)`,
          backgroundSize: "12px 12px",
        }} />
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "11px",
          letterSpacing: "2px", color: C.dark, opacity: 0.3, zIndex: 2, position: "relative",
        }}>FULL OUTFIT PHOTO</span>
      </div>

      {/* Outfit info */}
      <div style={{ padding: "24px 20px 8px" }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
          letterSpacing: "2px", textTransform: "uppercase", color: C.deepPink,
        }}>{outfit.date} · {moods.find(m => m.id === outfit.mood)?.label}</span>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "24px", fontWeight: "400", fontStyle: "italic",
          margin: "6px 0 0", lineHeight: "1.3",
        }}>{outfit.title}</h2>
      </div>

      {/* Divider label */}
      <div style={{
        display: "flex", alignItems: "center", padding: "20px 20px 14px", gap: "12px",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
          letterSpacing: "2.5px", textTransform: "uppercase", color: C.muted,
        }}>THE BREAKDOWN</span>
        <div style={{ flex: 1, height: "1px", background: C.palePink }} />
      </div>

      {/* Individual items — like Leandra's product grid */}
      <div style={{ padding: "0 20px 20px" }}>
        {outfit.items.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "stretch",
            marginBottom: "10px", borderRadius: "10px",
            overflow: "hidden",
            border: `1px solid ${C.palePink}`,
            background: C.white,
          }}>
            {/* Product image placeholder */}
            <div style={{
              width: "90px", flexShrink: 0,
              background: item.own
                ? `linear-gradient(135deg, ${C.black}, ${C.softBlack})`
                : `linear-gradient(135deg, ${C.palePink}, ${C.blush}44)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "8px",
                letterSpacing: "1px", color: item.own ? C.pink : C.muted,
                opacity: 0.5, zIndex: 2, position: "relative",
              }}>{item.own ? "MY SHOP" : "PRODUCT"}</span>
            </div>
            <div style={{
              padding: "14px 14px", flex: 1,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <p style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "15px", fontStyle: "italic",
                  margin: "0 0 2px", color: C.softBlack,
                }}>{item.piece}</p>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px", color: C.muted, letterSpacing: "0.5px",
                }}>{item.brand}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px", fontWeight: "600", color: C.deepPink,
                }}>{item.price}</span>
                {item.own && (
                  <span style={{
                    display: "block",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "9px", letterSpacing: "1.5px",
                    textTransform: "uppercase", color: C.pink, marginTop: "2px",
                  }}>TALLEST TIPTOES</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shop the look CTA */}
      <div style={{ padding: "0 20px 32px" }}>
        <div style={{
          textAlign: "center",
          padding: "14px",
          background: C.black,
          borderRadius: "12px",
          cursor: "pointer",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "13px", fontWeight: "600",
            letterSpacing: "1.5px", textTransform: "uppercase",
            color: C.cream,
          }}>SHOP THIS LOOK</span>
        </div>
      </div>

      {/* Note / caption area */}
      <div style={{
        padding: "0 20px 40px",
      }}>
        <div style={{
          padding: "20px",
          background: C.warmCream,
          borderRadius: "12px",
          borderLeft: `3px solid ${C.deepPink}`,
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
            letterSpacing: "2px", textTransform: "uppercase", color: C.muted,
          }}>NOTE</span>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "14px", fontStyle: "italic", color: C.dark,
            margin: "6px 0 0", lineHeight: "1.6",
          }}>
            This is where you'd write a quick note about the outfit — the story behind it, why you chose it, where you were going. One or two sentences max. Personal, not promotional.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GettingDressed() {
  const [loaded, setLoaded] = useState(false);
  const [activeMood, setActiveMood] = useState("all");
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 50); }, []);

  const filtered = activeMood === "all"
    ? outfits
    : outfits.filter(o => o.mood === activeMood);

  // Split into two columns for masonry
  const leftCol = filtered.filter((_, i) => i % 2 === 0);
  const rightCol = filtered.filter((_, i) => i % 2 === 1);

  if (selectedOutfit) {
    return <OutfitDetail outfit={selectedOutfit} onClose={() => setSelectedOutfit(null)} />;
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: C.cream,
      fontFamily: "'Playfair Display', Georgia, serif",
      color: C.black,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Dancing+Script:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Grain */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 100,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Nav */}
      <NavBar />

      {/* Page header */}
      <div style={{
        padding: "32px 20px 0",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
      }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "32px", fontWeight: "400",
          margin: "0 0 6px",
        }}>Getting Dressed</h1>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "14px", fontStyle: "italic", color: C.muted,
          margin: "0",
        }}>What I wore and where I wore it</p>
      </div>

      {/* Mood filter pills */}
      <div style={{
        display: "flex", gap: "6px", padding: "20px 20px 24px",
        overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s 0.2s",
      }}>
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setActiveMood(mood.id)}
            style={{
              padding: "7px 16px",
              fontSize: "11px",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: "600",
              letterSpacing: "1px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              background: activeMood === mood.id ? C.black : "transparent",
              color: activeMood === mood.id ? C.cream : C.dark,
              border: `1px solid ${activeMood === mood.id ? C.black : C.light}`,
              borderRadius: "20px",
              cursor: "pointer",
              transition: "all 0.25s",
            }}
          >{mood.label}</button>
        ))}
      </div>

      {/* Masonry grid */}
      <div style={{
        display: "flex", gap: "12px", padding: "0 20px 40px",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s 0.3s",
      }}>
        {/* Left column */}
        <div style={{ flex: 1 }}>
          {leftCol.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              outfit={outfit}
              onClick={() => setSelectedOutfit(outfit)}
            />
          ))}
        </div>

        {/* Right column — offset for masonry effect */}
        <div style={{ flex: 1, marginTop: "32px" }}>
          {rightCol.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              outfit={outfit}
              onClick={() => setSelectedOutfit(outfit)}
            />
          ))}
        </div>
      </div>
      <HonestyBox />
      {/* Footer */}
      <footer style={{
        padding: "24px 24px 40px", textAlign: "center",
        borderTop: `1px solid ${C.palePink}`,
      }}>
        <p style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "20px", color: C.black, margin: "0",
        }}>Tallest Tiptoes</p>
      </footer>
    </div>
  );
}
