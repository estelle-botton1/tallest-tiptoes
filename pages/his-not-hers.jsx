import { useState, useEffect } from "react";
import NavBar from "../src/NavBar";
import HonestyBox from "../src/HonestyBox";
import { client, urlFor } from "../src/sanityClient";

var c = {
  red: "#A33B2E",
  oldRose: "#B98589",
  ink: "#3D3633",
  black: "#1A1A1A",
  cream: "#F5F0E8",
  parchment: "#EDE4D8",
  warm: "#E0D2C2",
  pale: "#e8e3db",
  muted: "#8A7E72",
  light: "#B8AA9C",
  white: "#FBF8F4",
};

var navItems = ["Outfit Guide", "Splurge", "The Thing"];

export default function HisNotHers() {
  const [activeSection, setActiveSection] = useState("Outfit Guide");
  const [activeOutfit, setActiveOutfit] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    client.fetch('*[_type == "mensItem"] | order(_createdAt desc) { _id, title, category, brand, price, note, image, images, outfitPieces }')
      .then(function (data) { setItems(data); setLoading(false); })
      .catch(function () { setLoading(false); });
  }, []);

  var filtered = items.filter(function (item) { return item.category === activeSection; });

  return (
    <div style={{ background: c.cream, minHeight: "100vh", fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />

      <NavBar />

      {/* Header */}
      <div style={{ borderBottom: "1px solid " + c.pale, padding: "20px 24px 0" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", letterSpacing: "0.15em", color: c.oldRose, marginBottom: "4px" }}>HIS NOT HERS</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, marginBottom: "20px", fontStyle: "italic" }}>We did the research. You just pick.</div>
        <div style={{ display: "flex", gap: "28px", overflowX: "auto" }}>
          {navItems.map(function (item) {
            return (
              <button
                key={item}
                onClick={function () { setActiveSection(item); setActiveOutfit(null); }}
                style={{
                  background: "none", border: "none", padding: "0 0 14px",
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "14px",
                  letterSpacing: "0.05em", cursor: "pointer",
                  color: activeSection === item ? c.black : c.muted,
                  borderBottom: activeSection === item ? "2px solid " + c.red : "2px solid transparent",
                  whiteSpace: "nowrap", transition: "all 0.2s",
                }}
              >{item}</button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 0 40px" }}>

        {loading && (
          <div style={{ padding: "60px 24px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.muted, fontStyle: "italic" }}>Loading...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ padding: "60px 24px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.muted, fontStyle: "italic" }}>Coming soon</p>
          </div>
        )}

        {/* OUTFIT GUIDE */}
        {activeSection === "Outfit Guide" && !loading && filtered.length > 0 && (
          <div>
            {activeOutfit === null ? (
              <div>
                <div style={{ padding: "24px 24px 16px", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, fontStyle: "italic" }}>Full looks, no guessing.</div>
                {filtered.map(function (outfit) {
                  var heroImg = outfit.images && outfit.images.length > 0 ? outfit.images[0] : outfit.image;
                  return (
                    <div key={outfit._id} onClick={function () { setActiveOutfit(outfit); }} style={{ cursor: "pointer", marginBottom: "2px" }}>
                      <div style={{ position: "relative", height: "380px", overflow: "hidden" }}>
                        {heroImg ? (
                          <img src={urlFor(heroImg).width(800).url()} alt={outfit.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.88)" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, " + c.warm + ", " + c.parchment + ")" }} />
                        )}
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.5))", padding: "40px 24px 20px" }}>
                          {outfit.note && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)", marginBottom: "6px" }}>{outfit.note}</div>}
                          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", color: "#fff", fontStyle: "italic" }}>{outfit.title}</div>
                        </div>
                      </div>
                      {outfit.outfitPieces && outfit.outfitPieces.length > 0 && (
                        <div style={{ padding: "16px 24px 24px", borderBottom: "1px solid " + c.pale }}>
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "0.15em", color: c.oldRose, marginBottom: "12px" }}>THE BREAKDOWN</div>
                          {outfit.outfitPieces.slice(0, 2).map(function (piece, i) {
                            return (
                              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 0", borderBottom: "1px solid " + c.pale }}>
                                <div style={{ width: "52px", height: "52px", flexShrink: 0, overflow: "hidden", background: piece.image ? "none" : c.pale }}>
                                  {piece.image && <img src={urlFor(piece.image).width(120).url()} alt={piece.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "14px", fontStyle: "italic" }}>{piece.name}</div>
                                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.muted, marginTop: "2px" }}>{piece.brand}</div>
                                </div>
                              </div>
                            );
                          })}
                          {outfit.outfitPieces.length > 2 && (
                            <div style={{ marginTop: "12px", fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.oldRose, letterSpacing: "0.05em" }}>+ {outfit.outfitPieces.length - 2} more →</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <OutfitGuideDetail outfit={activeOutfit} onBack={function () { setActiveOutfit(null); }} />
            )}
          </div>
        )}

        {/* SPLURGE */}
        {activeSection === "Splurge" && !loading && filtered.length > 0 && (
          <div>
            <div style={{ padding: "24px 24px 8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, fontStyle: "italic" }}>If you are going to buy one thing, buy this.</div>
            {filtered.map(function (item) {
              return (
                <div key={item._id} style={{ marginBottom: "2px" }}>
                  <div style={{ height: "320px", overflow: "hidden" }}>
                    {item.image ? (
                      <img src={urlFor(item.image).width(800).url()} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.92)" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, " + c.warm + ", " + c.parchment + ")" }} />
                    )}
                  </div>
                  <div style={{ padding: "18px 24px 24px", borderBottom: "1px solid " + c.pale }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontStyle: "italic" }}>{item.title}</div>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.muted, marginTop: "4px", letterSpacing: "0.08em" }}>{item.brand}</div>
                      </div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: c.red, fontWeight: "300" }}>{item.price}</div>
                    </div>
                    {item.note && <div style={{ marginTop: "12px", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, fontStyle: "italic", lineHeight: "1.6" }}>{item.note}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* THE THING */}
        {activeSection === "The Thing" && !loading && filtered.length > 0 && (
          <div>
            <div style={{ padding: "24px 24px 8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, fontStyle: "italic" }}>One item. Done right.</div>
            {filtered.map(function (item) {
              var heroImg = item.images && item.images.length > 0 ? item.images[0] : item.image;
              return (
                <div key={item._id}>
                  <div style={{ position: "relative", height: "440px", overflow: "hidden" }}>
                    {heroImg ? (
                      <img src={urlFor(heroImg).width(800).url()} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.82)" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, " + c.warm + ", " + c.parchment + ")" }} />
                    )}
                    <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
                      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", color: "#fff", fontStyle: "italic", lineHeight: "1.2" }}>{item.title}</div>
                      {item.note && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: "rgba(255,255,255,0.75)", marginTop: "8px", fontStyle: "italic" }}>{item.note}</div>}
                    </div>
                  </div>

                  {item.outfitPieces && item.outfitPieces.length > 0 && (
                    <div style={{ padding: "24px" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "0.15em", color: c.oldRose, marginBottom: "16px" }}>THE OPTIONS</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        {item.outfitPieces.map(function (piece, i) {
                          return (
                            <div key={i} style={{ background: c.white, padding: "16px", border: "1px solid " + c.pale }}>
                              {piece.image && (
                                <div style={{ height: "100px", overflow: "hidden", marginBottom: "10px" }}>
                                  <img src={urlFor(piece.image).width(300).url()} alt={piece.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                              )}
                              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "13px", fontStyle: "italic", marginBottom: "4px" }}>{piece.name}</div>
                              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.muted, letterSpacing: "0.05em" }}>{piece.brand}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <HonestyBox />

      <footer style={{ padding: "24px 24px 40px", textAlign: "center", borderTop: "1px solid " + c.pale }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: c.black, margin: "0" }}>Tallest Tiptoes</p>
      </footer>
    </div>
  );
}

function OutfitGuideDetail({ outfit, onBack }) {
  const [currentImg, setCurrentImg] = useState(0);
  var allImages = outfit.images && outfit.images.length > 0 ? outfit.images : (outfit.image ? [outfit.image] : []);
  var heroImg = allImages.length > 0 ? allImages[currentImg] : null;

  return (
    <div>
      <div style={{ position: "relative", height: "420px", overflow: "hidden" }}>
        {heroImg ? (
          <img src={urlFor(heroImg).width(800).url()} alt={outfit.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, " + c.warm + ", " + c.parchment + ")" }} />
        )}

        <button onClick={onBack} style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(255,255,255,0.9)", border: "none", padding: "8px 14px", fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", cursor: "pointer", letterSpacing: "0.05em" }}>← Back</button>

        {allImages.length > 1 && (
          <div>
            <div onClick={function () { setCurrentImg(currentImg > 0 ? currentImg - 1 : allImages.length - 1); }} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: "18px" }}>‹</div>
            <div onClick={function () { setCurrentImg(currentImg < allImages.length - 1 ? currentImg + 1 : 0); }} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: "18px" }}>›</div>
            <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px" }}>
              {allImages.map(function (_, i) {
                return <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: i === currentImg ? "#fff" : "rgba(255,255,255,0.4)" }} />;
              })}
            </div>
          </div>
        )}

        <div style={{ position: "absolute", bottom: "20px", left: "24px" }}>
          {outfit.note && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)" }}>{outfit.note}</div>}
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: "#fff", fontStyle: "italic" }}>{outfit.title}</div>
        </div>
      </div>

      {outfit.outfitPieces && outfit.outfitPieces.length > 0 && (
        <div style={{ padding: "20px 24px" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "0.15em", color: c.oldRose, marginBottom: "16px" }}>THE BREAKDOWN</div>
          {outfit.outfitPieces.map(function (piece, i) {
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 0", borderBottom: "1px solid " + c.pale }}>
                <div style={{ width: "62px", height: "62px", flexShrink: 0, overflow: "hidden", background: piece.image ? "none" : c.pale }}>
                  {piece.image && <img src={urlFor(piece.image).width(150).url()} alt={piece.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", fontStyle: "italic" }}>{piece.name}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.muted, marginTop: "3px" }}>{piece.brand}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}