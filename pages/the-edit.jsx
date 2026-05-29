import { useState, useEffect } from "react";
import NavBar from "../src/NavBar";
import HonestyBox from "../src/HonestyBox";
import { client, urlFor } from "../src/sanityClient";

var c = {
  red: "#A33B2E",
  oldRose: "#B98589",
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

var moods = ["All", "Errands", "Dinner", "Weekend", "Event", "Night Out", "Work", "Vacation"];

export default function TheEdit() {
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMood, setActiveMood] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(function () {
    client.fetch('*[_type == "outfit"] | order(date desc) { _id, title, mood, date, image, note, items }')
      .then(function (data) { setOutfits(data); setLoading(false); })
      .catch(function () { setLoading(false); });
  }, []);

  var filtered = activeMood === "All" ? outfits : outfits.filter(function (o) { return o.mood === activeMood; });
  var leftCol = filtered.filter(function (_, i) { return i % 2 === 0; });
  var rightCol = filtered.filter(function (_, i) { return i % 2 === 1; });

  if (selected) {
    return <OutfitDetail outfit={selected} onClose={function () { setSelected(null); }} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />
      <NavBar />

      <div style={{ padding: "32px 20px 0" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", fontWeight: "400", margin: "0 0 6px" }}>The Edit</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.muted, margin: "0" }}>What I wore and where I wore it</p>
      </div>

      <div style={{ display: "flex", gap: "6px", padding: "20px 20px 24px", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
        {moods.map(function (mood) {
          return (
            <button key={mood} onClick={function () { setActiveMood(mood); }} style={{ padding: "7px 16px", fontSize: "11px", fontFamily: "'Cormorant Garamond', serif", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap", background: activeMood === mood ? c.black : "transparent", color: activeMood === mood ? c.cream : c.ink, border: "1px solid " + (activeMood === mood ? c.black : c.light), borderRadius: "2px", cursor: "pointer" }}>{mood}</button>
          );
        })}
      </div>

      {loading && (
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.muted, fontStyle: "italic" }}>Loading...</p>
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.muted, fontStyle: "italic" }}>Coming soon</p>
        </div>
      )}

      {filtered.length > 0 && (
        <div style={{ display: "flex", gap: "12px", padding: "0 20px 40px" }}>
          <div style={{ flex: 1 }}>
            {leftCol.map(function (outfit) {
              return <OutfitCard key={outfit._id} outfit={outfit} onClick={function () { setSelected(outfit); }} />;
            })}
          </div>
          <div style={{ flex: 1, marginTop: "32px" }}>
            {rightCol.map(function (outfit) {
              return <OutfitCard key={outfit._id} outfit={outfit} onClick={function () { setSelected(outfit); }} />;
            })}
          </div>
        </div>
      )}

      <HonestyBox />
      <footer style={{ padding: "24px 24px 40px", textAlign: "center", borderTop: "1px solid " + c.pale }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: c.black, margin: "0" }}>Tallest Tiptoes</p>
      </footer>
    </div>
  );
}

function OutfitCard({ outfit, onClick }) {
  var h = 200 + Math.floor(Math.random() * 80);
  return (
    <div onClick={onClick} style={{ cursor: "pointer", marginBottom: "12px" }}>
      <div style={{ height: h + "px", borderRadius: "3px", overflow: "hidden", background: outfit.image ? "none" : "linear-gradient(160deg, " + c.warm + ", " + c.parchment + ")", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {outfit.image ? (
          <img src={urlFor(outfit.image).width(400).url()} alt={outfit.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", color: c.muted, opacity: 0.4 }}>PHOTO</span>
        )}
        {outfit.date && (
          <div style={{ position: "absolute", bottom: "8px", left: "8px", background: c.cream + "CC", padding: "3px 8px", borderRadius: "2px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", color: c.ink }}>{new Date(outfit.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
        )}
      </div>
      <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "14px", fontStyle: "italic", margin: "8px 0 0", lineHeight: "1.3", color: c.black }}>{outfit.title}</p>
      {outfit.mood && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.muted, fontStyle: "italic" }}>{outfit.mood}</span>}
    </div>
  );
}

function OutfitDetail({ outfit, onClose }) {
  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid " + c.pale, position: "sticky", top: 0, background: c.cream + "F2", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span onClick={onClose} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, cursor: "pointer" }}>Back</span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: c.black }}>The Edit</span>
        <div style={{ width: "40px" }} />
      </div>

      <div style={{ height: "460px", overflow: "hidden", background: outfit.image ? "none" : "linear-gradient(135deg, " + c.warm + ", " + c.parchment + ")", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {outfit.image ? (
          <img src={urlFor(outfit.image).width(1000).url()} alt={outfit.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : null}
      </div>

      <div style={{ padding: "24px 20px 8px" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: c.red }}>
          {outfit.date ? new Date(outfit.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}{outfit.mood ? " \u00B7 " + outfit.mood : ""}
        </span>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "24px", fontWeight: "400", fontStyle: "italic", margin: "6px 0 0", lineHeight: "1.3" }}>{outfit.title}</h2>
      </div>

      {outfit.note && (
        <div style={{ padding: "12px 20px 20px" }}>
          <div style={{ padding: "16px", background: c.parchment, borderRadius: "3px", borderLeft: "3px solid " + c.red }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.ink, margin: "0", lineHeight: "1.6" }}>{outfit.note}</p>
          </div>
        </div>
      )}

      {outfit.items && outfit.items.length > 0 && (
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>THE BREAKDOWN</span>
            <div style={{ flex: 1, height: "1px", background: c.pale }} />
          </div>
          {outfit.items.map(function (item, i) {
            return (
              <div key={i} style={{ display: "flex", alignItems: "stretch", marginBottom: "8px", borderRadius: "3px", overflow: "hidden", border: "1px solid " + c.pale, background: c.white }}>
                <div style={{ width: "80px", flexShrink: 0, overflow: "hidden", background: item.image ? "none" : "linear-gradient(135deg, " + c.pale + ", " + c.warm + "44)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.image ? (
                    <img src={urlFor(item.image).width(200).url()} alt={item.piece} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", color: c.muted, opacity: 0.4 }}>PHOTO</span>
                  )}
                </div>
                <div style={{ padding: "12px 14px", flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "15px", fontStyle: "italic", margin: "0 0 2px", color: c.black }}>{item.piece}</p>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted }}>{item.brand}</span>
                  </div>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: "600", color: c.red }}>{item.price}</span>
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
