import { Link, useLocation } from "react-router-dom";

var c = {
  black: "#1A1A1A",
  cream: "#F6F0E8",
  pale: "#EAE2D8",
  muted: "#8A7E72",
};

var sections = [
  { name: "The Forum", path: "/the-forum" },
  { name: "The Edit", path: "/the-edit" },
  { name: "The Shop", path: "/the-shop" },
  { name: "His Not Hers", path: "/his-not-hers" },
  { name: "The Guide", path: "/the-guide" },
];

export default function NavBar() {
  var location = useLocation();

  return (
    <div>
      {/* Top nav */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 20px", borderBottom: "1px solid " + c.pale,
        position: "sticky", top: 0, background: c.cream + "F2",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", zIndex: 50,
      }}>
        <Link to="/" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: c.black, textDecoration: "none" }}>
          Tallest Tiptoes
        </Link>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", cursor: "pointer" }}>
          <div style={{ width: "20px", height: "1.5px", background: c.black }} />
          <div style={{ width: "14px", height: "1.5px", background: c.black }} />
        </div>
      </nav>

      {/* Section nav */}
      <div style={{
        display: "flex", gap: "20px", padding: "14px 20px",
        borderBottom: "1px solid " + c.pale,
        overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none",
      }}>
        {sections.map(function(section, i) {
          var isActive = location.pathname === section.path;
          return (
            <Link
              key={i}
              to={section.path}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "13px",
                fontWeight: "500",
                color: isActive ? c.black : c.muted,
                whiteSpace: "nowrap",
                cursor: "pointer",
                borderBottom: isActive ? "1px solid " + c.black : "none",
                paddingBottom: "2px",
                textDecoration: "none",
              }}
            >{section.name}</Link>
          );
        })}
      </div>
    </div>
  );
}
