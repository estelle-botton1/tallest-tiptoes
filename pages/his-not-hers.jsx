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

var navItems = ["Outfit Guide", "Splurge", "Closet Staples"];

export default function HisNotHers() {
  const [activeSection, setActiveSection] = useState("Outfit Guide");
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    client.fetch('*[_type == "mensItem"] | order(coalesce(sortOrder, 999) asc, _createdAt desc) { _id, title, category, brand, price, link, note, image, images, outfitPieces }')
      .then(function (data) { setItems(data); setLoading(false); })
      .catch(function () { setLoading(false); });
  }, []);

  var filtered = items.filter(function (item) { return item.category === activeSection; });

  if (selected) {
    return <ItemDetail item={selected} section={activeSection} onClose={function () { setSelected(null); }} />;
  }

  return (
    <div style={{ background: c.cream, minHeight: "100vh", fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />

      <NavBar />

      <div style={{ borderBottom: "1px solid " + c.pale, padding: "20px 24px 0" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", letterSpacing: "0.15em", color: c.oldRose, marginBottom: "4px" }}>HIS NOT HERS</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, marginBottom: "20px", fontStyle: "italic" }}>We did the research. You just pick.</div>
        <div style={{ display: "flex", gap: "28px", overflowX: "auto" }}>
          {navItems.map(function (item) {
            return (
              <button key={item} onClick={function () { setActiveSection(item); setSelected(null); }} style={{ background: "none", border: "none", padding: "0 0 14px", fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "0.05em", cursor: "pointer", color: activeSection === item ? c.black : c.muted, borderBottom: activeSection === item ? "2px solid " + c.red : "2px solid transparent", whiteSpace: "nowrap", transition: "all 0.2s" }}>{item}</button>
            );
          })}
        </div>
      </div>

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

        {/* OUTFIT GUIDE LIST */}
        {activeSection === "Outfit Guide" && !loading && filtered.length > 0 && (
          <div>
            <div style={{ padding: "24px 24px 16px", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, fontStyle: "italic" }}>Full looks, no guessing.</div>
            {filtered.map(function (outfit) {
              var heroImg = outfit.images && outfit.images.length > 0 ? outfit.images[0] : outfit.image;
              return (
                <div key={outfit._id} onClick={function () { setSelected(outfit); }} style={{ cursor: "pointer", marginBottom: "2px" }}>
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
                            {piece.price && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.red }}>{piece.price}</div>}
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
        )}

        {/* SPLURGE LIST */}
        {activeSection === "Splurge" && !loading && filtered.length > 0 && (
          <div>
            <div style={{ padding: "24px 24px 8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, fontStyle: "italic" }}>If you are going to buy one thing, buy this.</div>
            {filtered.map(function (item) {
              var heroImg = item.images && item.images.length > 0 ? item.images[0] : item.image;
              return (
                <div key={item._id} onClick={function () { setSelected(item); }} style={{ cursor: "pointer", marginBottom: "2px" }}>
                  <div style={{ height: "320px", overflow: "hidden" }}>
                    {heroImg ? (
                      <img src={urlFor(heroImg).width(800).url()} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.92)" }} />
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

        {/* Closet Staples LIST */}
        {activeSection === "Closet Staples" && !loading && filtered.length > 0 && (
          <div>
            <div style={{ padding: "24px 24px 8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, fontStyle: "italic" }}>One item. Done right.</div>
            {filtered.map(function (item) {
              var heroImg = item.images && item.images.length > 0 ? item.images[0] : item.image;
              return (
                <div key={item._id} onClick={function () { setSelected(item); }} style={{ cursor: "pointer", marginBottom: "2px" }}>
                  <div style={{ position: "relative", height: "380px", overflow: "hidden" }}>
                    {heroImg ? (
                      <img src={urlFor(heroImg).width(800).url()} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.82)" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, " + c.warm + ", " + c.parchment + ")" }} />
                    )}
                    <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
                      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: "#fff", fontStyle: "italic", lineHeight: "1.2" }}>{item.title}</div>
                      {item.note && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: "rgba(255,255,255,0.75)", marginTop: "8px", fontStyle: "italic" }}>{item.note}</div>}
                    </div>
                  </div>
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

function ImageGallery({ images, title }) {
  const [currentImg, setCurrentImg] = useState(0);
  if (!images || images.length === 0) {
    return <div style={{ height: "420px", background: "linear-gradient(135deg, " + c.warm + ", " + c.parchment + ")" }} />;
  }

  return (
    <div style={{ position: "relative", height: "420px", overflow: "hidden" }}>
      <img src={urlFor(images[currentImg]).width(800).url()} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      {images.length > 1 && (
        <div>
          <div onClick={function () { setCurrentImg(currentImg > 0 ? currentImg - 1 : images.length - 1); }} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: "18px" }}>‹</div>
          <div onClick={function () { setCurrentImg(currentImg < images.length - 1 ? currentImg + 1 : 0); }} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: "18px" }}>›</div>
          <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px" }}>
            {images.map(function (_, i) {
              return <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: i === currentImg ? "#fff" : "rgba(255,255,255,0.4)" }} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function PieceRow({ piece }) {
  var content = (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 0", borderBottom: "1px solid " + c.pale, cursor: piece.link ? "pointer" : "default" }}>
      <div style={{ width: "62px", height: "62px", flexShrink: 0, overflow: "hidden", background: piece.image ? "none" : c.pale }}>
        {piece.image && <img src={urlFor(piece.image).width(150).url()} alt={piece.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", fontStyle: "italic" }}>{piece.name}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.muted, marginTop: "3px" }}>{piece.brand}</div>
      </div>
      {piece.price && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontWeight: "600", color: c.red }}>{piece.price}</div>}
    </div>
  );

  if (piece.link) {
    return <a href={piece.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>{content}</a>;
  }
  return content;
}

function ItemDetail({ item, section, onClose }) {
  var allImages = [];
  if (item.image) allImages.push(item.image);
  if (item.images) allImages = allImages.concat(item.images);

  return (
    <div style={{ background: c.cream, minHeight: "100vh", fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid " + c.pale, position: "sticky", top: 0, background: c.cream + "F2", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span onClick={onClose} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, cursor: "pointer" }}>Back</span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: c.black }}>His Not Hers</span>
        <div style={{ width: "40px" }} />
      </div>

      {/* Swipeable images */}
      <ImageGallery images={allImages} title={item.title} />

      {/* Title / meta */}
      <div style={{ padding: "24px 24px 8px" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: c.red }}>{section}</span>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", fontStyle: "italic", margin: "6px 0 0", lineHeight: "1.3" }}>{item.title}</h2>
        {item.brand && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, marginTop: "4px" }}>{item.brand}</div>}
        {item.price && <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: c.black, marginTop: "8px" }}>{item.price}</div>}
      </div>

      {/* Note */}
      {item.note && (
        <div style={{ padding: "12px 24px 20px" }}>
          <div style={{ padding: "16px", background: c.parchment, borderRadius: "3px", borderLeft: "3px solid " + c.red }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.ink, margin: "0", lineHeight: "1.6" }}>{item.note}</p>
          </div>
        </div>
      )}

      {/* Pieces / Options breakdown */}
      {item.outfitPieces && item.outfitPieces.length > 0 && (
        <div style={{ padding: "0 24px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>{section === "Closet Staples" ? "THE OPTIONS" : "THE BREAKDOWN"}</span>
            <div style={{ flex: 1, height: "1px", background: c.pale }} />
          </div>
          {item.outfitPieces.map(function (piece, i) {
            return <PieceRow key={i} piece={piece} />;
          })}
        </div>
      )}

      {/* Shop link button */}
      {item.link && (
        <div style={{ padding: "0 24px 24px" }}>
          <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ textAlign: "center", padding: "14px", background: c.black, borderRadius: "3px", cursor: "pointer" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", color: c.cream }}>SHOP THIS</span>
            </div>
          </a>
        </div>
      )}

      <HonestyBox />
      <footer style={{ padding: "24px 24px 40px", textAlign: "center", borderTop: "1px solid " + c.pale }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: c.black, margin: "0" }}>Tallest Tiptoes</p>
      </footer>
    </div>
  );
}