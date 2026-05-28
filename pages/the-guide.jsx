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
  nude: "#D8C8B8",
  pale: "#EAE2D8",
  muted: "#8A7E72",
  light: "#B8AA9C",
  white: "#FBF8F4",
};

var categories = ["All", "Restaurants", "Hosting", "Weekend", "Travel"];
var catBgs = { Restaurants: c.warm, Hosting: c.parchment, Weekend: c.pale, Travel: c.nude };

export default function TheGuide() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(function () {
    client.fetch('*[_type == "guide"] | order(date desc) { _id, title, category, date, image, preview, body }')
      .then(function (data) { setGuides(data); setLoading(false); })
      .catch(function () { setLoading(false); });
  }, []);

  var filtered = activeCat === "All" ? guides : guides.filter(function (g) { return g.category === activeCat; });
  var featured = filtered.length > 0 ? filtered[0] : null;
  var rest = filtered.length > 1 ? filtered.slice(1) : [];

  if (selected) {
    return <GuideDetail guide={selected} onClose={function () { setSelected(null); }} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />
      <NavBar />

      <div style={{ padding: "32px 20px 0" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", fontWeight: "400", margin: "0 0 6px" }}>The Guide</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.muted, margin: "0" }}>Where to go, what to do, how to host</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "24px 20px" }}>
        {categories.filter(function (cat) { return cat !== "All"; }).map(function (cat) {
          return (
            <div key={cat} onClick={function () { setActiveCat(activeCat === cat ? "All" : cat); }} style={{ padding: "18px 14px", background: activeCat === cat ? c.black : c.white, border: "1px solid " + (activeCat === cat ? c.black : c.pale), cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: "500", color: activeCat === cat ? c.cream : c.black }}>{cat}</span>
            </div>
          );
        })}
      </div>

      {activeCat !== "All" && (
        <div style={{ padding: "0 20px 8px" }}>
          <span onClick={function () { setActiveCat("All"); }} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.red, fontStyle: "italic", cursor: "pointer" }}>Show all guides</span>
        </div>
      )}

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

      {featured && (
        <div onClick={function () { setSelected(featured); }} style={{ padding: "8px 20px", cursor: "pointer" }}>
          <div style={{ height: "220px", overflow: "hidden", borderRadius: "3px", background: featured.image ? "none" : "linear-gradient(135deg, " + (catBgs[featured.category] || c.warm) + ", " + c.cream + ")", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            {featured.image ? (
              <img src={urlFor(featured.image).width(800).url()} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : null}
            <div style={{ position: "absolute", top: "10px", left: "10px", padding: "4px 10px", background: c.black }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: c.cream }}>{featured.category}</span>
            </div>
          </div>
          <div style={{ padding: "14px 0" }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontWeight: "400", fontStyle: "italic", margin: "0 0 4px", lineHeight: "1.3" }}>{featured.title}</h3>
            {featured.preview && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, margin: "0", lineHeight: "1.5" }}>{featured.preview}</p>}
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div style={{ padding: "0 20px 40px" }}>
          {rest.map(function (guide, i) {
            return (
              <div key={guide._id} onClick={function () { setSelected(guide); }} style={{ display: "flex", gap: "14px", cursor: "pointer", padding: "16px 0", borderBottom: i < rest.length - 1 ? "1px solid " + c.pale : "none" }}>
                <div style={{ width: "80px", height: "80px", flexShrink: 0, overflow: "hidden", background: guide.image ? "none" : "linear-gradient(135deg, " + (catBgs[guide.category] || c.warm) + ", " + c.cream + ")", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {guide.image ? (
                    <img src={urlFor(guide.image).width(200).url()} alt={guide.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : null}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: c.red }}>{guide.category}</span>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", fontStyle: "italic", margin: "3px 0 3px", lineHeight: "1.3" }}>{guide.title}</p>
                  {guide.date && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.light }}>{new Date(guide.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>}
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

function GuideDetail({ guide, onClose }) {
  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid " + c.pale, position: "sticky", top: 0, background: c.cream + "F2", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span onClick={onClose} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, cursor: "pointer" }}>Back</span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: c.black }}>The Guide</span>
        <div style={{ width: "40px" }} />
      </div>

      <div style={{ height: "260px", overflow: "hidden", background: guide.image ? "none" : "linear-gradient(135deg, " + c.warm + ", " + c.parchment + ")", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {guide.image ? (
          <img src={urlFor(guide.image).width(1000).url()} alt={guide.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : null}
      </div>

      <div style={{ padding: "24px 20px 0" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: c.red }}>{guide.category}{guide.date ? " \u00B7 " + new Date(guide.date).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : ""}</span>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", margin: "8px 0 8px", lineHeight: "1.25" }}>{guide.title}</h1>
        {guide.preview && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.muted, margin: "0 0 20px", lineHeight: "1.6", paddingBottom: "20px", borderBottom: "1px solid " + c.pale }}>{guide.preview}</p>}
      </div>

      <div style={{ padding: "0 20px 20px" }}>
        {guide.body && guide.body.map(function (block, i) {
          if (block._type === "block" && block.children) {
            var text = block.children.map(function (child) { return child.text; }).join("");
            if (block.style === "h2") return <h2 key={i} style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", fontWeight: "400", margin: "24px 0 8px" }}>{text}</h2>;
            return <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.ink, margin: "0 0 16px", lineHeight: "1.7" }}>{text}</p>;
          }
          if (block._type === "image" && block.asset) {
            return <div key={i} style={{ margin: "20px 0", overflow: "hidden" }}><img src={urlFor(block).width(800).url()} alt="" style={{ width: "100%", height: "auto" }} /></div>;
          }
          return null;
        })}
      </div>

      <HonestyBox />
      <footer style={{ padding: "24px 24px 40px", textAlign: "center", borderTop: "1px solid " + c.pale }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: c.black, margin: "0" }}>Tallest Tiptoes</p>
      </footer>
    </div>
  );
}
