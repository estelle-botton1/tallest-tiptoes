import { useState, useEffect } from "react";
import NavBar from "../src/NavBar";
import HonestyBox from "../src/HonestyBox";
import SubscribeBox from "../src/SubscribeBox";
import HeroDynamic from "../src/HeroDynamic";
import { client, urlFor } from "../src/sanityClient";
import { Link } from "react-router-dom";

var c = {
  red: "#A33B2E",
  oldRose: "#B98589",
  ink: "#3D3633",
  black: "#1A1A1A",
  nude: "#F0DDD0",
  cream: "#F6F0E8",
  parchment: "#EDE4D8",
  warm: "#E0D2C2",
  pale: "#EAE2D8",
  muted: "#8A7E72",
  light: "#B8AA9C",
  white: "#FBF8F4",
};

function StarSketch({ style }) {
  return (
    <svg viewBox="0 0 20 20" style={{ width: "12px", height: "12px", ...style }}>
      <line x1="10" y1="2" x2="10" y2="18" stroke={c.ink} strokeWidth="0.8" />
      <line x1="2" y1="10" x2="18" y2="10" stroke={c.ink} strokeWidth="0.8" />
      <line x1="4" y1="4" x2="16" y2="16" stroke={c.ink} strokeWidth="0.6" />
      <line x1="16" y1="4" x2="4" y2="16" stroke={c.ink} strokeWidth="0.6" />
    </svg>
  );
}

function FigureWalking({ style }) {
  return (
    <svg viewBox="0 0 50 80" style={{ width: "28px", height: "44px", ...style }}>
      <circle cx="25" cy="8" r="5" stroke={c.ink} strokeWidth="1" fill="none" />
      <line x1="25" y1="13" x2="25" y2="42" stroke={c.ink} strokeWidth="1" />
      <line x1="25" y1="20" x2="15" y2="30" stroke={c.ink} strokeWidth="1" />
      <line x1="25" y1="22" x2="38" y2="28" stroke={c.ink} strokeWidth="1" />
      <line x1="25" y1="42" x2="15" y2="65" stroke={c.ink} strokeWidth="1" />
      <line x1="25" y1="42" x2="35" y2="62" stroke={c.ink} strokeWidth="1" />
    </svg>
  );
}

function FigureSitting({ style }) {
  return (
    <svg viewBox="0 0 50 60" style={{ width: "28px", height: "34px", ...style }}>
      <circle cx="25" cy="8" r="5" stroke={c.ink} strokeWidth="1" fill="none" />
      <line x1="25" y1="13" x2="25" y2="35" stroke={c.ink} strokeWidth="1" />
      <line x1="25" y1="20" x2="15" y2="28" stroke={c.ink} strokeWidth="1" />
      <line x1="25" y1="20" x2="35" y2="26" stroke={c.ink} strokeWidth="1" />
      <line x1="25" y1="35" x2="38" y2="38" stroke={c.ink} strokeWidth="1" />
      <line x1="38" y1="38" x2="38" y2="52" stroke={c.ink} strokeWidth="1" />
      <line x1="25" y1="35" x2="12" y2="38" stroke={c.ink} strokeWidth="1" />
      <line x1="12" y1="38" x2="12" y2="52" stroke={c.ink} strokeWidth="1" />
    </svg>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "32px 20px", gap: "16px" }}>
      <div style={{ flex: 1, height: "1px", background: c.pale }} />
      <StarSketch />
      <div style={{ flex: 1, height: "1px", background: c.pale }} />
    </div>
  );
}

function ForumPreview() {
  const [posts, setPosts] = useState([]);
  useEffect(function () {
    client.fetch('*[_type == "forumPost"] |  order(coalesce(sortOrder, 999) asc, _createdAt desc) [0...3] { _id, title, format, date, preview, image }')
      .then(function (data) { setPosts(data); });
  }, []);

  var featured = posts.length > 0 ? posts[0] : null;
  var side = posts.length > 1 ? posts.slice(1, 3) : [];

  if (!featured) {
    return (
      <div>
        <div style={{ height: "220px", background: "linear-gradient(135deg, " + c.parchment + ", " + c.warm + "88)", borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", color: c.muted, opacity: 0.4 }}>FEATURED IMAGE</span>
        </div>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontWeight: "400", fontStyle: "italic", margin: "12px 0 6px" }}>Coming soon</h3>
      </div>
    );
  }

  return (
    <Link to="/the-forum" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{ height: "220px", borderRadius: "3px", overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: featured.image ? "none" : "linear-gradient(135deg, " + c.parchment + ", " + c.warm + "88)", marginBottom: "12px" }}>
        {featured.image && <img src={urlFor(featured.image).width(800).url()} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
        {featured.format && (
          <div style={{ position: "absolute", top: "12px", left: "12px", padding: "4px 12px", background: c.red, borderRadius: "2px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: c.cream }}>{featured.format}</span>
          </div>
        )}
      </div>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: c.red }}>{featured.format || "POST"}</span>
      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontWeight: "400", fontStyle: "italic", margin: "6px 0 6px", lineHeight: "1.3" }}>{featured.title}</h3>
      {featured.preview && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.muted, margin: "0 0 4px", lineHeight: "1.5" }}>{featured.preview}</p>}
      {side.length > 0 && (
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          {side.map(function (post) {
            return (
              <div key={post._id} style={{ flex: 1 }}>
                <div style={{ height: "120px", borderRadius: "3px", overflow: "hidden", background: post.image ? "none" : "linear-gradient(135deg, " + c.warm + ", " + c.cream + ")" }}>
                  {post.image && <img src={urlFor(post.image).width(400).url()} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", letterSpacing: "2px", color: post.format === "Vlog" ? c.ink : c.oldRose, display: "block", marginTop: "8px" }}>{post.format || "POST"}</span>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "15px", fontWeight: "400", fontStyle: "italic", margin: "3px 0 0" }}>{post.title}</p>
              </div>
            );
          })}
        </div>
      )}
    </Link>
  );
}

function EditPreview() {
  const [outfits, setOutfits] = useState([]);
  useEffect(function () {
    client.fetch('*[_type == "outfit"] | order(_createdAt desc) [0...4] { _id, title, mood, image }')
      .then(function (data) { setOutfits(data); });
  }, []);

  if (outfits.length === 0) {
    return (
      <Link to="/the-edit" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ height: "210px", background: "linear-gradient(160deg, " + c.warm + ", " + c.parchment + ")", borderRadius: "3px" }} />
            <div style={{ height: "150px", background: "linear-gradient(160deg, " + c.parchment + ", " + c.cream + ")", borderRadius: "3px" }} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", marginTop: "28px" }}>
            <div style={{ height: "190px", background: "linear-gradient(160deg, " + c.cream + ", " + c.warm + "66)", borderRadius: "3px" }} />
            <div style={{ height: "170px", background: "linear-gradient(160deg, " + c.pale + ", " + c.cream + ")", borderRadius: "3px" }} />
          </div>
        </div>
      </Link>
    );
  }

  var left = outfits.filter(function (_, i) { return i % 2 === 0; });
  var right = outfits.filter(function (_, i) { return i % 2 === 1; });

  return (
    <Link to="/the-edit" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
          {left.map(function (o) {
            return (
              <div key={o._id} style={{ height: "200px", borderRadius: "3px", overflow: "hidden", background: o.image ? "none" : "linear-gradient(160deg, " + c.warm + ", " + c.parchment + ")" }}>
                {o.image && <img src={urlFor(o.image).width(400).url()} alt={o.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", marginTop: "28px" }}>
          {right.map(function (o) {
            return (
              <div key={o._id} style={{ height: "200px", borderRadius: "3px", overflow: "hidden", background: o.image ? "none" : "linear-gradient(160deg, " + c.cream + ", " + c.warm + "66)" }}>
                {o.image && <img src={urlFor(o.image).width(400).url()} alt={o.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
              </div>
            );
          })}
        </div>
      </div>
      {outfits[0] && (
        <div style={{ marginTop: "14px", padding: "12px 14px", background: c.white, borderRadius: "3px", border: "1px solid " + c.pale, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: c.muted }}>LATEST</span>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "15px", fontStyle: "italic", margin: "2px 0 0" }}>{outfits[0].title}</p>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.red, fontStyle: "italic" }}>{outfits[0].mood}</span>
        </div>
      )}
    </Link>
  );
}

function ShopPreview() {
  const [products, setProducts] = useState([]);
  useEffect(function () {
    client.fetch('*[_type == "product"] | order(_createdAt desc) [0...3] { _id, title, price, category, images }')
      .then(function (data) { setProducts(data); });
  }, []);

  if (products.length === 0) {
    return (
      <Link to="/the-shop" style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
        {[{ label: "MADE BY ME", bg: c.black, t: c.cream }, { label: "COLLECTED", bg: c.warm, t: c.black }, { label: "MY CLOSET", bg: c.parchment, t: c.black }].map(function (item, i) {
          return (
            <div key={i} style={{ cursor: "pointer" }}>
              <div style={{ aspectRatio: "3/4", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "2px" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", letterSpacing: "1px", color: item.t, opacity: 0.4 }}>PHOTO</span>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: c.red, display: "block", marginTop: "6px" }}>{item.label}</span>
            </div>
          );
        })}
      </Link>
    );
  }

  return (
    <Link to="/the-shop" style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
      {products.map(function (product) {
        var img = product.images && product.images.length > 0 ? product.images[0] : null;
        return (
          <div key={product._id} style={{ cursor: "pointer" }}>
            <div style={{ aspectRatio: "3/4", overflow: "hidden", background: img ? "none" : "linear-gradient(160deg, " + c.warm + ", " + c.parchment + ")", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "2px" }}>
              {img ? <img src={urlFor(img).width(300).url()} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", color: c.muted, opacity: 0.4 }}>PHOTO</span>}
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", margin: "6px 0 2px", color: c.black }}>{product.title}</p>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.ink }}>{product.price}</span>
          </div>
        );
      })}
    </Link>
  );
}

function HisNotHersPreview() {
  const [items, setItems] = useState([]);
  useEffect(function () {
    client.fetch('*[_type == "mensItem"] | order(_createdAt desc) [0...3] { _id, title, brand, price, image }')
      .then(function (data) { setItems(data); });
  }, []);

  return (
    <Link to="/his-not-hers" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      {["Splurge", "Wardrobe Basics", "Outfit Guide"].map(function (cat, i) {
        return (
          <div key={cat} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: i < 2 ? "1px solid " + c.pale : "none", cursor: "pointer" }}>
            <div>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "0 0 2px" }}>{cat}</p>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontStyle: "italic", color: c.light }}>{i === 0 ? "Go big" : i === 1 ? "Start here" : "Full looks, no guessing"}</span>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.light }}>{">"}</span>
          </div>
        );
      })}
      {items.length > 0 && (
        <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
          {items.map(function (item) {
            return (
              <div key={item._id} style={{ flex: 1 }}>
                <div style={{ aspectRatio: "1", overflow: "hidden", borderRadius: "2px", background: item.image ? "none" : "linear-gradient(160deg, " + c.warm + ", " + c.parchment + ")" }}>
                  {item.image && <img src={urlFor(item.image).width(250).url()} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", margin: "6px 0 0", color: c.black }}>{item.title}</p>
                {item.price && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.muted }}>{item.price}</span>}
              </div>
            );
          })}
        </div>
      )}
    </Link>
  );
}

function GuidePreview() {
  const [guides, setGuides] = useState([]);
  useEffect(function () {
    client.fetch('*[_type == "guide"] | order(_createdAt desc) [0...4] { _id, title, category, image }')
      .then(function (data) { setGuides(data); });
  }, []);

  var catBgs = { Restaurants: c.warm, Hosting: c.parchment, Weekend: c.pale, Travel: c.nude + "88" };

  if (guides.length === 0) {
    return (
      <Link to="/the-guide" style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {[{ title: "Restaurants", bg: c.warm }, { title: "Hosting", bg: c.parchment }, { title: "Weekend", bg: c.pale }, { title: "Travel", bg: c.nude + "88" }].map(function (g, i) {
          return (
            <div key={i} style={{ background: g.bg, borderRadius: "3px", padding: "20px 16px", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: "100px" }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "17px", fontStyle: "italic", margin: "0", color: c.black }}>{g.title}</p>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.red, fontStyle: "italic" }}>Browse</span>
            </div>
          );
        })}
      </Link>
    );
  }

  return (
    <Link to="/the-guide" style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      {guides.map(function (guide) {
        var bg = catBgs[guide.category] || c.warm;
        return (
          <div key={guide._id} style={{ borderRadius: "3px", overflow: "hidden", position: "relative", minHeight: "120px", background: guide.image ? "none" : bg, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            {guide.image && <img src={urlFor(guide.image).width(400).url()} alt={guide.title} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
            <div style={{ position: "relative", zIndex: 1, padding: "16px", background: guide.image ? "linear-gradient(transparent, rgba(0,0,0,0.5))" : "none" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: guide.image ? "#F6F0E8" : c.red }}>{guide.category}</span>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "15px", fontStyle: "italic", margin: "2px 0 0", color: guide.image ? "#F6F0E8" : c.black }}>{guide.title}</p>
            </div>
          </div>
        );
      })}
    </Link>
  );
}

export default function Homepage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(function () { setTimeout(function () { setLoaded(true); }, 50); }, []);

  var fadeIn = function (delay) {
    return { opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1) " + (delay || 0) + "s" };
  };

  var linkStyle = { fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.red, fontStyle: "italic", textDecoration: "none" };

  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

      <NavBar />
      <HeroDynamic />

      {/* 01 — THE FORUM */}
      <section style={{ padding: "28px 20px 0", ...fadeIn(0.15) }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
          <Link to="/the-forum" style={{ textDecoration: "none", color: "inherit" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>01</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", margin: "4px 0 0" }}>The Forum</h2>
          </Link>
          <Link to="/the-forum" style={linkStyle}>View all</Link>
        </div>
        <ForumPreview />
      </section>

      <Divider />

      {/* 02 — THE EDIT */}
      <section style={{ padding: "0 20px", position: "relative", ...fadeIn(0.2) }}>
        <FigureWalking style={{ position: "absolute", top: "-5px", right: "20px", opacity: 0.15 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
          <Link to="/the-edit" style={{ textDecoration: "none", color: "inherit" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>02</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", margin: "4px 0 0" }}>The Edit</h2>
          </Link>
          <Link to="/the-edit" style={linkStyle}>See all</Link>
        </div>
        <EditPreview />
      </section>

      <Divider />

      {/* 03 — THE SHOP */}
      <section style={{ padding: "0 20px", ...fadeIn(0.25) }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
          <Link to="/the-shop" style={{ textDecoration: "none", color: "inherit" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>03</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", margin: "4px 0 0" }}>The Shop</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: c.muted, margin: "4px 0 0" }}>Made, found and from my closet</p>
          </Link>
          <Link to="/the-shop" style={linkStyle}>View all</Link>
        </div>
        <ShopPreview />
      </section>

      <Divider />

      {/* 04 — HIS NOT HERS */}
      <section style={{ padding: "0 20px", ...fadeIn(0.3) }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
          <Link to="/his-not-hers" style={{ textDecoration: "none", color: "inherit" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>04</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", margin: "4px 0 0" }}>His Not Hers</h2>
          </Link>
          <Link to="/his-not-hers" style={linkStyle}>Explore</Link>
        </div>
        <HisNotHersPreview />
      </section>

      <Divider />

      {/* 05 — THE GUIDE */}
      <section style={{ padding: "0 20px", position: "relative", ...fadeIn(0.35) }}>
        <FigureSitting style={{ position: "absolute", top: "-8px", right: "20px", opacity: 0.15 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
          <Link to="/the-guide" style={{ textDecoration: "none", color: "inherit" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>05</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", margin: "4px 0 0" }}>The Guide</h2>
          </Link>
          <Link to="/the-guide" style={linkStyle}>Browse</Link>
        </div>
        <GuidePreview />
      </section>

      <Divider />

      <SubscribeBox />
      <HonestyBox />

      {/* Footer */}
      <footer style={{ padding: "32px 24px 48px", textAlign: "center", borderTop: "1px solid " + c.pale }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "24px", color: c.black, margin: "0 0 16px" }}>Tallest Tiptoes</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "20px" }}>
          <a href="https://www.instagram.com/tallest_tiptoesss" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, textDecoration: "none" }}>Instagram</a>
          <a href="https://substack.com/@sophiazami" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, textDecoration: "none" }}>Substack</a>
          <a href="https://shopmy.us/sophiazami/closet" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, textDecoration: "none" }}>ShopMy</a>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.light, margin: 0 }}>2026 Tallest Tiptoes</p>
      </footer>
    </div>
  );
}