import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../src/NavBar";
import HonestyBox from "../src/HonestyBox";
import { client, urlFor } from "../src/sanityClient";
import { useLocation } from "react-router-dom";

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

function hasAsset(img) {
  return img && img.asset;
}

function safeImages(arr) {
  if (!arr) return [];
  return arr.filter(hasAsset);
}

var mainTabs = ["Outfit Guide", "Explore"];
var moods = ["All", "Night Out", "Weekend", "Workwear", "Chill", "Closet Must Haves", "Little Fancier"];

export default function HisNotHers() {
  const [activeTab, setActiveTab] = useState("Outfit Guide");
  const [activeMood, setActiveMood] = useState("All");
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  var location = useLocation();

  useEffect(function () {
    client.fetch('*[_type == "mensItem"] | order(coalesce(sortOrder, 999) asc, _createdAt desc) { _id, title, category, mood, brand, price, link, note, date, image, images, outfitPieces, _createdAt }')
      .then(function (data) {
        setItems(data);
        setLoading(false);
      })
      .catch(function () { setLoading(false); });
  }, []);

  useEffect(function () {
    if (location.state && location.state.selectedId && items.length > 0) {
      var match = items.find(function (i) { return i._id === location.state.selectedId; });
      if (match) setSelected(match);
    }
  }, [items, location.state]);

  var outfitItems = items.filter(function (i) { return i.category && i.category.toLowerCase() === "outfit guide"; });
  var exploreItems = items.filter(function (i) { return i.category && i.category.toLowerCase() === "explore"; });

  var filteredOutfits = activeMood === "All" ? outfitItems : outfitItems.filter(function (o) { return o.mood && o.mood.toLowerCase() === activeMood.toLowerCase(); });
  var leftCol = filteredOutfits.filter(function (_, i) { return i % 2 === 0; });
  var rightCol = filteredOutfits.filter(function (_, i) { return i % 2 === 1; });

  var location = useLocation();

  useEffect(function () {
    if (location.state && location.state.selectedId && products.length > 0) {
      var match = products.find(function (p) { return p._id === location.state.selectedId; });
      if (match) setSelected(match);
    }
  }, [products, location.state]);
  
  if (selected) {
    return <ItemDetail item={selected} section={activeTab} onClose={function () { setSelected(null); }} />;
  }

  return (
    <div style={{ background: c.cream, minHeight: "100vh", fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />

      <NavBar />

      <div style={{ padding: "32px 20px 0" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", fontWeight: "400", margin: "0 0 6px" }}>His Not Hers</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.muted, margin: "0" }}>We did the research. You just pick.</p>
      </div>

      <div style={{ display: "flex", gap: "0", padding: "20px 20px 0", borderBottom: "1px solid " + c.pale }}>
        {mainTabs.map(function (tab) {
          return (
            <button key={tab} onClick={function () { setActiveTab(tab); setActiveMood("All"); setSelected(null); }} style={{
              padding: "10px 20px 12px", fontSize: "13px", fontFamily: "'Cormorant Garamond', serif", fontWeight: "500",
              background: "transparent", color: activeTab === tab ? c.black : c.muted,
              border: "none", borderBottom: activeTab === tab ? "2px solid " + c.black : "2px solid transparent",
              cursor: "pointer", whiteSpace: "nowrap",
            }}>{tab}</button>
          );
        })}
      </div>

      {activeTab === "Outfit Guide" && (
        <div>
          <div style={{ display: "flex", gap: "6px", padding: "16px 20px 20px", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
            {moods.map(function (mood) {
              return (
                <button key={mood} onClick={function () { setActiveMood(mood); }} style={{
                  padding: "7px 16px", fontSize: "11px", fontFamily: "'Cormorant Garamond', serif", fontWeight: "600",
                  letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap",
                  background: activeMood === mood ? c.black : "transparent",
                  color: activeMood === mood ? c.cream : c.ink,
                  border: "1px solid " + (activeMood === mood ? c.black : c.light),
                  borderRadius: "2px", cursor: "pointer",
                }}>{mood}</button>
              );
            })}
          </div>

          {loading && (
            <div style={{ padding: "60px 20px", textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.muted, fontStyle: "italic" }}>Loading...</p>
            </div>
          )}

          {!loading && filteredOutfits.length === 0 && (
            <div style={{ padding: "60px 20px", textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.muted, fontStyle: "italic" }}>Coming soon</p>
            </div>
          )}

          {filteredOutfits.length > 0 && (
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
        </div>
      )}

      {activeTab === "Explore" && (
        <div>
          <div style={{ padding: "20px 20px 8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, fontStyle: "italic" }}>Things we are into right now.</div>

          {loading && (
            <div style={{ padding: "60px 20px", textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.muted, fontStyle: "italic" }}>Loading...</p>
            </div>
          )}

          {!loading && exploreItems.length === 0 && (
            <div style={{ padding: "60px 20px", textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.muted, fontStyle: "italic" }}>Coming soon</p>
            </div>
          )}

          {exploreItems.length > 0 && (
            <div style={{ padding: "0 20px 40px" }}>
              {exploreItems.map(function (item) {
                var safe = safeImages(item.images);
                var heroImg = safe.length > 0 ? safe[0] : (hasAsset(item.image) ? item.image : null);
                return (
                  <div key={item._id} onClick={function () { setSelected(item); }} style={{ cursor: "pointer", marginBottom: "2px" }}>
                    <div style={{ height: "320px", overflow: "hidden" }}>
                      {heroImg ? (
                        <img src={urlFor(heroImg).width(800).url()} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.92)" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, " + c.warm + ", " + c.parchment + ")" }} />
                      )}
                    </div>
                    <div style={{ padding: "18px 0 24px", borderBottom: "1px solid " + c.pale }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontStyle: "italic" }}>{item.title}</div>
                          {item.brand && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.muted, marginTop: "4px", letterSpacing: "0.08em" }}>{item.brand}</div>}
                        </div>
                        {item.price && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: c.red, fontWeight: "300" }}>{item.price}</div>}
                      </div>
                      {item.note && <div style={{ marginTop: "12px", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, fontStyle: "italic", lineHeight: "1.6" }}>{item.note}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
  var h = 200 + (outfit._id ? outfit._id.charCodeAt(0) % 80 : 40);
  var safe = safeImages(outfit.images);
  var heroImg = safe.length > 0 ? safe[0] : (hasAsset(outfit.image) ? outfit.image : null);

  return (
    <div onClick={onClick} style={{ cursor: "pointer", marginBottom: "12px" }}>
      <div style={{ height: h + "px", borderRadius: "3px", overflow: "hidden", background: heroImg ? "none" : "linear-gradient(160deg, " + c.warm + ", " + c.parchment + ")", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {heroImg ? (
          <img src={urlFor(heroImg).width(400).url()} alt={outfit.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

function ImageGallery({ images, title }) {
  var safe = safeImages(images);
  const [currentImg, setCurrentImg] = useState(0);
  if (safe.length === 0) {
    return <div style={{ height: "420px", background: "linear-gradient(135deg, " + c.warm + ", " + c.parchment + ")" }} />;
  }

  return (
    <div style={{ position: "relative", height: "460px", overflow: "hidden" }}>
      <img src={urlFor(safe[currentImg]).width(1000).url()} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      {safe.length > 1 && (
        <div>
          <div onClick={function () { setCurrentImg(currentImg > 0 ? currentImg - 1 : safe.length - 1); }} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: "18px" }}>‹</div>
          <div onClick={function () { setCurrentImg(currentImg < safe.length - 1 ? currentImg + 1 : 0); }} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: "18px" }}>›</div>
          <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px" }}>
            {safe.map(function (_, i) {
              return <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: i === currentImg ? "#fff" : "rgba(255,255,255,0.4)" }} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ItemDetail({ item, section, onClose }) {
  const [copied, setCopied] = useState(false);

  var allImages = [];
  if (hasAsset(item.image)) allImages.push(item.image);
  if (item.images) {
    item.images.forEach(function (img) {
      if (hasAsset(img)) allImages.push(img);
    });
  }

  var isOutfitGuide = section === "Outfit Guide";

  function handleShare() {
    var shareData = {
      title: item.title + " — His Not Hers",
      text: "Check this out on Tallest Tiptoes: " + item.title,
      url: "https://tallest-tiptoes.com/his-not-hers",
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url + " — " + item.title).then(function () {
        setCopied(true);
        setTimeout(function () { setCopied(false); }, 2000);
      });
    }
  }

  return (
    <div style={{ background: c.cream, minHeight: "100vh", fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid " + c.pale, position: "sticky", top: 0, background: c.cream + "F2", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span onClick={onClose} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, cursor: "pointer" }}>Back</span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: c.black }}>His Not Hers</span>
        <span onClick={handleShare} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: copied ? c.red : c.muted, cursor: "pointer" }}>{copied ? "Copied!" : "Share"}</span>
      </div>

      <ImageGallery images={allImages} title={item.title} />

      <div style={{ padding: "24px 20px 8px" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: c.red }}>
          {item.date ? new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}{item.mood ? " \u00B7 " + item.mood : ""}
        </span>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "24px", fontWeight: "400", fontStyle: "italic", margin: "6px 0 0", lineHeight: "1.3" }}>{item.title}</h2>
        {!isOutfitGuide && item.brand && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, marginTop: "4px" }}>{item.brand}</div>}
        {!isOutfitGuide && item.price && <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: c.black, marginTop: "8px" }}>{item.price}</div>}
      </div>

      {item.note && (
        <div style={{ padding: "12px 20px 20px" }}>
          <div style={{ padding: "16px", background: c.parchment, borderRadius: "3px", borderLeft: "3px solid " + c.red }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.ink, margin: "0", lineHeight: "1.6" }}>{item.note}</p>
          </div>
        </div>
      )}

      {item.outfitPieces && item.outfitPieces.length > 0 && (
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>THE BREAKDOWN</span>
            <div style={{ flex: 1, height: "1px", background: c.pale }} />
          </div>
          {item.outfitPieces.map(function (piece, i) {
            var pieceContent = (
              <div style={{ display: "flex", alignItems: "stretch", marginBottom: "8px", borderRadius: "3px", overflow: "hidden", border: "1px solid " + c.pale, background: c.white, cursor: piece.link ? "pointer" : "default" }}>
                <div style={{ width: "80px", flexShrink: 0, overflow: "hidden", background: hasAsset(piece.image) ? "none" : "linear-gradient(135deg, " + c.pale + ", " + c.warm + "44)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {hasAsset(piece.image) ? (
                    <img src={urlFor(piece.image).width(200).url()} alt={piece.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", color: c.muted, opacity: 0.4 }}>PHOTO</span>
                  )}
                </div>
                <div style={{ padding: "12px 14px", flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "15px", fontStyle: "italic", margin: "0 0 2px", color: c.black }}>{piece.name}</p>
                    {piece.brand && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted }}>{piece.brand}</span>}
                  </div>
                  {piece.price && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: "600", color: c.red }}>{piece.price}</span>}
                </div>
              </div>
            );

            if (piece.link) {
              return <a key={i} href={piece.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>{pieceContent}</a>;
            }
            return <div key={i}>{pieceContent}</div>;
          })}
        </div>
      )}

      {item.link && (
        <div style={{ padding: "0 20px 24px" }}>
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