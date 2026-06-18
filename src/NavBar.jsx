import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

var c = {
  black: "#1A1A1A",
  cream: "#F6F0E8",
  pale: "#EAE2D8",
  muted: "#8A7E72",
  red: "#A33B2E",
};

var sections = [
  { name: "Home", path: "/" },
  { name: "The Forum", path: "/the-forum" },
  { name: "The Edit", path: "/the-edit" },
  { name: "The Shop", path: "/the-shop" },
  { name: "His Not Hers", path: "/his-not-hers" },
  { name: "The Guide", path: "/the-guide" },
];

export default function NavBar() {
  var location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 20px", borderBottom: "1px solid " + c.pale,
        position: "fixed", top: 0, left: 0, width: "100%",
        background: c.cream + "F2",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        zIndex: 50, boxSizing: "border-box",
      }}>
        <div onClick={function () { setMenuOpen(!menuOpen); }} style={{ display: "flex", flexDirection: "column", gap: "4px", cursor: "pointer", padding: "4px 0" }}>
          <div style={{ width: "20px", height: "1.5px", background: c.black, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(3.5px)" : "none" }} />
          <div style={{ width: menuOpen ? "20px" : "14px", height: "1.5px", background: c.black, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-3.5px)" : "none" }} />
        </div>
        <Link to="/" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: c.black, textDecoration: "none", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          Tallest Tiptoes
        </Link>
        <div style={{ width: "20px" }} />
      </nav>

      {/* Dropdown menu */}
      <div style={{
        position: "fixed", top: "57px", left: 0, width: "100%",
        background: c.cream,
        borderBottom: menuOpen ? "1px solid " + c.pale : "none",
        zIndex: 49,
        maxHeight: menuOpen ? "400px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.35s ease",
        boxSizing: "border-box",
      }}>
        <div style={{ padding: "12px 24px 20px" }}>
          {sections.map(function (section, i) {
            var isActive = location.pathname === section.path;
            return (
              <Link
                key={i}
                to={section.path}
                onClick={function () { setMenuOpen(false); }}
                style={{
                  display: "block",
                  padding: "14px 0",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "18px",
                  fontWeight: "400",
                  color: isActive ? c.black : c.muted,
                  textDecoration: "none",
                  borderBottom: i < sections.length - 1 ? "1px solid " + c.pale : "none",
                }}
              >{section.name}</Link>
            );
          })}
          <div style={{ paddingTop: "16px", display: "flex", gap: "20px" }}>
            <a href="https://www.instagram.com/tallest_tiptoesss" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, textDecoration: "none" }}>Instagram</a>
            <a href="https://substack.com/@sophiazami" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, textDecoration: "none" }}>Substack</a>
            <a href="https://shopmy.us/sophiazami/closet" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, textDecoration: "none" }}>ShopMy</a>
          </div>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {menuOpen && (
        <div onClick={function () { setMenuOpen(false); }} style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.15)", zIndex: 48,
        }} />
      )}

      <div style={{ height: "60px" }} />
    </div>
  );
}