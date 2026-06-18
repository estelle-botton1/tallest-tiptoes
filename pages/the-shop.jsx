import { useState, useEffect } from "react";
import NavBar from "../src/NavBar";
import HonestyBox from "../src/HonestyBox";
import { client, urlFor } from "../src/sanityClient";
import { useLocation } from "react-router-dom";

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

var tabs = [
  { id: "all", label: "All" },
  { id: "Made by Me", label: "Made by Me" },
  { id: "Collected", label: "Collected" },
  { id: "From My Closet", label: "My Closet" },
];

export default function TheShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(function () {
    client.fetch('*[_type == "product"] | order(coalesce(sortOrder, 999) asc, _createdAt desc) { _id, title, category, price, status, edition, story, location, images, shopUrl }')
      .then(function (data) { setProducts(data); setLoading(false); })
      .catch(function () { setLoading(false); });
  }, []);

  var location = useLocation();

  useEffect(function () {
    if (location.state && location.state.selectedId && products.length > 0) {
      var match = products.find(function (p) { return p._id === location.state.selectedId; });
      if (match) setSelected(match);
    }
  }, [products, location.state]);

  var filtered = activeTab === "all" ? products : products.filter(function (p) { return p.category === activeTab; });

  if (selected) {
    return <ProductDetail product={selected} onClose={function () { setSelected(null); }} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />
      <NavBar />

      <div style={{ padding: "32px 20px 0" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", fontWeight: "400", margin: "0 0 6px" }}>The Shop</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.muted, margin: "0" }}>Things I have made, found, and loved</p>
      </div>

      <div style={{ display: "flex", gap: "0", padding: "20px 20px 0", borderBottom: "1px solid " + c.pale, overflowX: "auto", scrollbarWidth: "none" }}>
        {tabs.map(function (tab) {
          return (
            <button key={tab.id} onClick={function () { setActiveTab(tab.id); }} style={{ padding: "10px 16px 12px", fontSize: "12px", fontFamily: "'Cormorant Garamond', serif", fontWeight: "500", whiteSpace: "nowrap", background: "transparent", color: activeTab === tab.id ? c.black : c.muted, border: "none", borderBottom: activeTab === tab.id ? "2px solid " + c.black : "2px solid transparent", cursor: "pointer" }}>{tab.label}</button>
          );
        })}
      </div>

      <div style={{ padding: "14px 20px 0", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.light }}>{filtered.length} items</span>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 12px", padding: "16px 20px 40px" }}>
          {filtered.map(function (product) {
            var img = product.images && product.images.length > 0 ? product.images[0] : null;
            return (
              <div key={product._id} onClick={function () { setSelected(product); }} style={{ cursor: "pointer" }}>
                <div style={{ aspectRatio: "4/5", maxHeight: "200px", overflow: "hidden", background: img ? "none" : "linear-gradient(160deg, " + c.warm + ", " + c.parchment + ")", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  {img ? (
                    <img src={urlFor(img).width(400).url()} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", color: c.muted, opacity: 0.3 }}>PHOTO</span>
                  )}
                  {product.status === "Sold" && (
                    <div style={{ position: "absolute", top: "8px", right: "8px", padding: "3px 8px", background: c.black }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: c.cream }}>Sold</span>
                    </div>
                  )}
                  {product.status === "Coming Soon" && (
                    <div style={{ position: "absolute", top: "8px", right: "8px", padding: "3px 8px", background: c.red }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: c.cream }}>Soon</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: "10px 0" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", margin: "0 0 2px", color: c.black }}>{product.title}</p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.ink }}>{product.price}</span>
                    {product.location && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", fontStyle: "italic", color: c.light }}>{product.location}</span>}
                  </div>
                  {product.edition && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", fontStyle: "italic", color: c.light }}>{product.edition}</span>}
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

function ProductDetail({ product, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  var images = product.images || [];
  var img = images.length > 0 ? images[activeImg] : null;

  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid " + c.pale, position: "sticky", top: 0, background: c.cream + "F2", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span onClick={onClose} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, cursor: "pointer" }}>Back</span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: c.black }}>The Shop</span>
        <div style={{ width: "40px" }} />
      </div>

      <div
        onClick={function () { setZoomed(!zoomed); }}
        style={{
          height: zoomed ? "auto" : "420px",
          maxHeight: zoomed ? "none" : "420px",
          overflow: zoomed ? "visible" : "hidden",
          background: img ? "none" : "linear-gradient(135deg, " + c.warm + ", " + c.parchment + ")",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", cursor: zoomed ? "zoom-out" : "zoom-in",
        }}
      >
        {img ? (
          <img src={urlFor(img).width(zoomed ? 1600 : 1000).url()} alt={product.title} style={{
            width: "100%",
            height: zoomed ? "auto" : "100%",
            objectFit: zoomed ? "contain" : "cover",
          }} />
        ) : null}
        {product.status === "Sold" && (
          <div style={{ position: "absolute", top: "16px", right: "16px", padding: "5px 14px", background: c.black }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: c.cream }}>Sold Out</span>
          </div>
        )}
        {!zoomed && images.length > 1 && (
          <div style={{ position: "absolute", bottom: "10px", right: "10px", padding: "4px 10px", background: "rgba(0,0,0,0.5)", borderRadius: "2px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", color: "#fff" }}>{activeImg + 1} / {images.length}</span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div style={{ display: "flex", gap: "6px", padding: "10px 20px", overflowX: "auto", scrollbarWidth: "none" }}>
          {images.map(function (img2, i) {
            return (
              <div key={i} onClick={function () { setActiveImg(i); setZoomed(false); }} style={{
                width: "60px", height: "60px", flexShrink: 0, overflow: "hidden",
                border: i === activeImg ? "2px solid " + c.ink : "1px solid " + c.pale,
                cursor: "pointer",
              }}>
                <img src={urlFor(img2).width(200).url()} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            );
          })}
        </div>
      )}

      <div style={{ padding: "20px 20px 0" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.muted, fontStyle: "italic" }}>{product.category}</span>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", margin: "6px 0 8px" }}>{product.title}</h1>
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", paddingBottom: "20px", borderBottom: "1px solid " + c.pale }}>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: c.black }}>{product.price}</span>
          {product.edition && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, fontStyle: "italic" }}>{product.edition}</span>}
        </div>
      </div>

      {product.story && (
        <div style={{ padding: "20px" }}>
          <div style={{ padding: "20px", background: c.parchment, borderRadius: "3px", borderLeft: "3px solid " + c.red }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: c.muted }}>THE STORY</span>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", fontStyle: "italic", color: c.ink, margin: "8px 0 0", lineHeight: "1.6" }}>{product.story}</p>
            {product.location && (
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, margin: "12px 0 0" }}>Found in {product.location}</p>
            )}
          </div>
        </div>
      )}

      <div style={{ padding: "4px 20px 20px" }}>
        {product.status === "Available" && product.shopUrl && (
          <a href={product.shopUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ textAlign: "center", padding: "15px", background: c.black, cursor: "pointer" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", color: c.cream }}>BUY NOW</span>
            </div>
          </a>
        )}
        {product.status === "Available" && !product.shopUrl && (
          <div style={{ textAlign: "center", padding: "15px", background: c.black, opacity: 0.5 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", color: c.cream }}>COMING SOON</span>
          </div>
        )}
        {product.status === "Sold" && (
          <div style={{ textAlign: "center", padding: "15px", background: c.light }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", color: c.white }}>SOLD OUT</span>
          </div>
        )}
        {product.status === "Coming Soon" && (
          <div style={{ textAlign: "center", padding: "15px", border: "1px solid " + c.black }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", color: c.black }}>NOTIFY ME</span>
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