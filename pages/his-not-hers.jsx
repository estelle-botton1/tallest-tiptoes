import { useState, useEffect } from "react";
import NavBar from "../src/NavBar";
import HonestyBox from "../src/HonestyBox";
import { client, urlFor } from "../src/sanityClient";

var c = {
  red: "#A33B2E",
  ink: "#3D3633",
  black: "#1A1A1A",
  cream: "#F6F0E8",
  parchment: "#EDE4D8",
  warm: "#E0D2C2",
  pale: "#EAE2D8",
  muted: "#8A7E72",
  light: "#B8AA9C",
  white: "#FBF8F4",
};

var cats = [
  { id: "Splurge", label: "Splurge", desc: "Go big" },
  { id: "Wardrobe Basics", label: "Wardrobe Basics", desc: "Start here" },
  { id: "Outfit Guide", label: "Outfit Guide", desc: "Full looks, no guessing" },
];

export default function HisNotHers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState(null);

  useEffect(function () {
    client.fetch('*[_type == "mensItem"] | order(_createdAt desc) { _id, title, category, brand, price, note, image, outfitPieces }')
      .then(function (data) { setItems(data); setLoading(false); })
      .catch(function () { setLoading(false); });
  }, []);

  var filtered = activeCat ? items.filter(function (item) { return item.category === activeCat; }) : [];

  if (activeCat) {
    return (
      <CategoryView
        category={activeCat}
        items={filtered}
        loading={loading}
        onClose={function () { setActiveCat(null); }}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />
      <NavBar />

      <div style={{ padding: "32px 20px 0" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", fontWeight: "400", margin: "0 0 6px" }}>His Not Hers</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.muted, margin: "0" }}>We did the research. You just pick.</p>
      </div>

      <div style={{ padding: "24px 20px 0" }}>
        {cats.map(function (cat, i) {
          return (
            <div key={cat.id} onClick={function () { setActiveCat(cat.id); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", borderBottom: i < cats.length - 1 ? "1px solid " + c.pale : "none", cursor: "pointer" }}>
              <div>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontWeight: "400", margin: "0 0 3px" }}>{cat.label}</p>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: c.light }}>{cat.desc}</span>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.light }}>{">"}</span>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "32px 20px 40px" }}>
        <div style={{ background: c.black, padding: "28px 24px", textAlign: "center" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: c.red }}>NO SPAM, JUST PICKS</span>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontWeight: "400", fontStyle: "italic", color: c.cream, margin: "8px 0 6px" }}>Get the list</h3>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: c.light, margin: "0 0 16px" }}>One email a month. Best picks. That is it.</p>
          <div style={{ display: "flex", gap: "0" }}>
            <div style={{ flex: 1, padding: "11px 14px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", display: "flex", alignItems: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: c.light, opacity: 0.4 }}>Your email</span>
            </div>
            <div style={{ padding: "11px 20px", background: c.red, display: "flex", alignItems: "center", cursor: "pointer" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: c.cream }}>JOIN</span>
            </div>
          </div>
        </div>
      </div>

      <HonestyBox />
      <footer style={{ padding: "24px 24px 40px", textAlign: "center", borderTop: "1px solid " + c.pale }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: c.black, margin: "0" }}>Tallest Tiptoes</p>
      </footer>
    </div>
  );
}

function CategoryView({ category, items, loading, onClose }) {
  var catInfo = cats.find(function (cat) { return cat.id === category; });
  var isOutfitGuide = category === "Outfit Guide";

  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid " + c.pale, position: "sticky", top: 0, background: c.cream + "F2", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span onClick={onClose} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, cursor: "pointer" }}>Back</span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: c.black }}>His Not Hers</span>
        <div style={{ width: "40px" }} />
      </div>

      <div style={{ padding: "28px 20px 0" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", fontWeight: "400", margin: "0 0 6px" }}>{catInfo ? catInfo.label : category}</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.muted, margin: "0 0 24px" }}>{catInfo ? catInfo.desc : ""}</p>
      </div>

      {loading && (
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.muted, fontStyle: "italic" }}>Loading...</p>
        </div>
      )}

      {!loading && items.length === 0 && (
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.muted, fontStyle: "italic" }}>Coming soon</p>
        </div>
      )}

      {!isOutfitGuide && items.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "0 20px 40px" }}>
          {items.map(function (item) {
            return (
              <div key={item._id}>
                <div style={{ aspectRatio: "1", overflow: "hidden", background: item.image ? "none" : "linear-gradient(160deg, " + c.warm + ", " + c.parchment + ")", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.image ? (
                    <img src={urlFor(item.image).width(400).url()} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", color: c.muted, opacity: 0.3 }}>PHOTO</span>
                  )}
                </div>
                <div style={{ padding: "10px 0" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontWeight: "500", margin: "0 0 1px", color: c.black }}>{item.title}</p>
                  {item.brand && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.light, margin: "0 0 4px" }}>{item.brand}</p>}
                  {item.note && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontStyle: "italic", color: c.muted, margin: "0 0 4px", lineHeight: "1.4" }}>{item.note}</p>}
                  {item.price && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: "600", color: c.ink }}>{item.price}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isOutfitGuide && items.length > 0 && (
        <div style={{ padding: "0 20px 40px" }}>
          {items.map(function (item) {
            return (
              <div key={item._id} style={{ marginBottom: "32px" }}>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", fontWeight: "400", margin: "0 0 3px" }}>{item.title}</h3>
                {item.note && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: c.muted }}>{item.note}</span>}
                {item.outfitPieces && item.outfitPieces.length > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "6px", marginTop: "14px" }}>
                    {item.outfitPieces.map(function (piece, j) {
                      return (
                        <div key={j}>
                          <div style={{ aspectRatio: "3/4", overflow: "hidden", background: piece.image ? "none" : "linear-gradient(160deg, " + c.warm + ", " + c.parchment + ")", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {piece.image ? (
                              <img src={urlFor(piece.image).width(200).url()} alt={piece.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "7px", color: c.muted, opacity: 0.3 }}>PHOTO</span>
                            )}
                          </div>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", margin: "6px 0 1px", color: c.black, lineHeight: "1.3" }}>{piece.name}</p>
                          {piece.brand && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", color: c.light }}>{piece.brand}</span>}
                        </div>
                      );
                    })}
                  </div>
                )}
                <div style={{ marginTop: "12px", textAlign: "center", padding: "11px", background: c.black, cursor: "pointer" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: c.cream }}>SHOP THIS LOOK</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <HonestyBox />
      <footer style={{ padding: "24px 24px 40px", textAlign: "center", borderTop: "1px solid " + c.pale }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: c.black, margin: "0" }}>Tallest Tiptoes</p>
      </footer>
    </div>
  );
}
