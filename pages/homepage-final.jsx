import { useState, useEffect } from "react";
import NavBar from "../src/NavBar";
import HonestyBox from "../src/HonestyBox";

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

var sections = ["The Forum", "The Edit", "The Shop", "His Not Hers", "The Guide"];

function TiptoeFeet() {
  return (
    <svg viewBox="0 0 200 260" style={{ width: "140px", height: "auto", display: "block", margin: "0 auto" }}>
      <path d="M72 8 C72 20 71 40 70 60 C69 80 68 100 68 120 C68 140 70 155 72 165 C74 175 76 180 78 185" stroke={c.ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M82 8 C82 20 81 40 80 60 C79 80 79 100 79 120 C79 138 80 150 82 160 C83 168 84 174 85 178" stroke={c.ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M108 8 C108 20 109 40 110 60 C111 80 112 100 113 120 C114 138 115 150 116 160 C117 168 118 175 120 182" stroke={c.ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M118 8 C118 20 118 40 119 60 C120 80 121 100 122 120 C122 135 123 148 124 158 C125 165 126 172 127 176" stroke={c.ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M78 185 C76 190 72 195 70 200 C68 205 68 210 72 212 C76 214 82 212 86 208" stroke={c.ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M86 208 C88 215 88 225 86 235 C84 242 80 248 78 250" stroke={c.ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M85 178 C87 185 88 192 88 198 C88 205 87 210 86 208" stroke={c.ink} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M120 182 C118 188 116 194 114 200 C112 206 112 210 116 213 C120 215 126 212 128 208" stroke={c.ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M128 208 C130 216 130 226 128 236 C126 243 123 248 121 250" stroke={c.ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M127 176 C128 184 129 192 129 198 C129 205 128 210 128 208" stroke={c.ink} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M74 188 C78 186 82 190 78 194 C74 198 70 194 74 190 C78 186 84 188 80 192 C76 196 72 192 76 188" stroke={c.ink} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M76 192 C80 190 84 194 80 198 C76 202 72 198 76 194 C80 190 82 196 78 198" stroke={c.ink} strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M72 196 C76 194 80 198 76 202 C72 206 70 200 74 196" stroke={c.ink} strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M118 190 C122 188 126 192 122 196 C118 200 114 196 118 192 C122 188 128 190 124 194 C120 198 116 194 120 190" stroke={c.ink} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M120 194 C124 192 128 196 124 200 C120 204 116 200 120 196 C124 192 126 198 122 200" stroke={c.ink} strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M116 198 C120 196 124 200 120 204 C116 208 114 202 118 198" stroke={c.ink} strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M74 158 C76 156 80 158 82 160" stroke={c.ink} strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M116 155 C118 153 122 155 124 157" stroke={c.ink} strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function HandwrittenText() {
  const [visible, setVisible] = useState(false);
  useEffect(function() { setTimeout(function() { setVisible(true); }, 800); }, []);

  return (
    <div style={{ textAlign: "center", margin: "24px 0 0" }}>
      <div style={{ overflow: "hidden", height: visible ? "52px" : "0px", transition: "height 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s" }}>
        <svg viewBox="0 0 300 50" style={{ width: "220px", height: "auto", display: "block", margin: "0 auto" }}>
          <text x="150" y="40" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "48px", fontWeight: "400", fill: "none", stroke: c.ink, strokeWidth: "0.8", strokeDasharray: "400", strokeDashoffset: visible ? "0" : "400", transition: "stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1) 0.5s" }}>Tallest</text>
          <text x="150" y="40" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "48px", fontWeight: "400", fill: c.ink, opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 2s" }}>Tallest</text>
        </svg>
      </div>
      <div style={{ overflow: "hidden", height: visible ? "52px" : "0px", transition: "height 1s cubic-bezier(0.22, 1, 0.36, 1) 1s" }}>
        <svg viewBox="0 0 300 50" style={{ width: "230px", height: "auto", display: "block", margin: "0 auto" }}>
          <text x="150" y="40" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "48px", fontWeight: "400", fill: "none", stroke: c.ink, strokeWidth: "0.8", strokeDasharray: "400", strokeDashoffset: visible ? "0" : "400", transition: "stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1) 1.3s" }}>Tiptoes</text>
          <text x="150" y="40" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: "48px", fontWeight: "400", fill: c.ink, opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 2.8s" }}>Tiptoes</text>
        </svg>
      </div>
    </div>
  );
}

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

export default function Homepage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(function() { setTimeout(function() { setLoaded(true); }, 50); }, []);

  var fadeIn = function(delay) {
    return { opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1) " + (delay || 0) + "s" };
  };

  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Dancing+Script:wght@400;500;600&display=swap" rel="stylesheet" />

      <NavBar />

      {/* Hero — Tiptoe feet + handwritten name */}
      <div style={{ background: c.nude, padding: "48px 20px 40px", display: "flex", flexDirection: "column", alignItems: "center", opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(15px)", transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s" }}>
          <TiptoeFeet />
        </div>
        <HandwrittenText />
      </div>

      {/* 01 — THE FORUM */}
      <section style={{ padding: "28px 20px 0", ...fadeIn(0.15) }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>01</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", margin: "4px 0 0" }}>The Forum</h2>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.red, fontStyle: "italic", cursor: "pointer" }}>View all</span>
        </div>

        <div style={{ height: "220px", background: "linear-gradient(135deg, " + c.parchment + ", " + c.warm + "88)", borderRadius: "3px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
          <div style={{ position: "absolute", top: "12px", left: "12px", padding: "4px 12px", background: c.red, borderRadius: "2px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: c.cream }}>ESSAY</span>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", color: c.muted, opacity: 0.4 }}>FEATURED IMAGE</span>
        </div>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: c.red }}>ESSAY</span>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontWeight: "400", fontStyle: "italic", margin: "6px 0 6px", lineHeight: "1.3" }}>Article Title Goes Here</h3>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.muted, margin: "0 0 4px", lineHeight: "1.5" }}>A preview that pulls the reader in...</p>

        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          {[{ tag: "VLOG", col: c.ink }, { tag: "REC", col: c.oldRose }].map(function(item, i) {
            return (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ height: "120px", background: i === 0 ? "linear-gradient(135deg, " + c.warm + ", " + c.cream + ")" : "linear-gradient(135deg, " + c.parchment + ", " + c.warm + "66)", borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i === 0 && (
                    <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: c.black + "AA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "10px solid " + c.cream, marginLeft: "2px" }} />
                    </div>
                  )}
                </div>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", letterSpacing: "2px", color: item.col, display: "block", marginTop: "8px" }}>{item.tag}</span>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "15px", fontWeight: "400", fontStyle: "italic", margin: "3px 0 0" }}>Post Title</p>
              </div>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* 02 — THE EDIT */}
      <section style={{ padding: "0 20px", position: "relative", ...fadeIn(0.2) }}>
        <FigureWalking style={{ position: "absolute", top: "-5px", right: "20px", opacity: 0.15 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>02</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", margin: "4px 0 0" }}>The Edit</h2>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.red, fontStyle: "italic", cursor: "pointer" }}>See all</span>
        </div>

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

        <div style={{ marginTop: "14px", padding: "12px 14px", background: c.white, borderRadius: "3px", border: "1px solid " + c.pale, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: c.muted }}>LATEST</span>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "15px", fontStyle: "italic", margin: "2px 0 0" }}>Outfit Title Here</p>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.red, fontStyle: "italic" }}>Shop look</span>
        </div>
      </section>

      <Divider />

      {/* 03 — THE SHOP */}
      <section style={{ padding: "0 20px", ...fadeIn(0.25) }}>
        <div style={{ marginBottom: "16px" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>03</span>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", margin: "4px 0 0" }}>The Shop</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: c.muted, margin: "4px 0 0" }}>Made, found and from my closet</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          {[
            { label: "MADE BY ME", bg: c.black, t: c.cream },
            { label: "COLLECTED", bg: c.warm, t: c.black },
            { label: "MY CLOSET", bg: c.parchment, t: c.black },
          ].map(function(item, i) {
            return (
              <div key={i} style={{ cursor: "pointer" }}>
                <div style={{ aspectRatio: "3/4", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "2px" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", letterSpacing: "1px", color: item.t, opacity: 0.4 }}>PHOTO</span>
                </div>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: c.red, display: "block", marginTop: "6px" }}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* 04 — HIS NOT HERS */}
      <section style={{ padding: "0 20px", ...fadeIn(0.3) }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>04</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", margin: "4px 0 0" }}>His Not Hers</h2>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.red, fontStyle: "italic", cursor: "pointer" }}>Explore</span>
        </div>

        {[
          { title: "Splurge", desc: "Go big" },
          { title: "Wardrobe Basics", desc: "Start here" },
          { title: "Outfit Guide", desc: "Full looks, no guessing" },
        ].map(function(item, i) {
          return (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: i < 2 ? "1px solid " + c.pale : "none", cursor: "pointer" }}>
              <div>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "0 0 2px" }}>{item.title}</p>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontStyle: "italic", color: c.light }}>{item.desc}</span>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.light }}>{">"}</span>
            </div>
          );
        })}
      </section>

      <Divider />

      {/* 05 — THE GUIDE */}
      <section style={{ padding: "0 20px", position: "relative", ...fadeIn(0.35) }}>
        <FigureSitting style={{ position: "absolute", top: "-8px", right: "20px", opacity: 0.15 }} />
        <div style={{ marginBottom: "16px" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>05</span>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", fontWeight: "400", margin: "4px 0 0" }}>The Guide</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {[
            { title: "Restaurants", bg: c.warm },
            { title: "Hosting", bg: c.parchment },
            { title: "Weekend", bg: c.pale },
            { title: "Travel", bg: c.nude + "88" },
          ].map(function(guide, i) {
            return (
              <div key={i} style={{ background: guide.bg, borderRadius: "3px", padding: "20px 16px", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: "100px" }}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "17px", fontStyle: "italic", margin: "0", color: c.black }}>{guide.title}</p>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.red, fontStyle: "italic" }}>Browse</span>
              </div>
            );
          })}
        </div>
      </section>

      <Divider />

    <HonestyBox />

      {/* Footer */}
      <footer style={{ padding: "32px 24px 48px", textAlign: "center", borderTop: "1px solid " + c.pale }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "24px", color: c.black, margin: "0 0 16px" }}>Tallest Tiptoes</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "20px" }}>
          {["Instagram", "TikTok", "Pinterest"].map(function(s, i) {
            return <span key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted }}>{s}</span>;
          })}
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.light, margin: 0 }}>2026 Tallest Tiptoes</p>
      </footer>
    </div>
  );
}
