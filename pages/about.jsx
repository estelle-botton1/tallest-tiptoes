import NavBar from "../src/NavBar";
import { Link } from "react-router-dom";

var c = {
  red: "#A33B2E",
  black: "#1A1A1A",
  cream: "#F6F0E8",
  ink: "#3D3633",
  pale: "#EAE2D8",
  muted: "#8A7E72",
  light: "#B8AA9C",
};

export default function About() {
  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />
      <NavBar />

      <div style={{ padding: "40px 24px 60px", maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", fontWeight: "400", margin: "0 0 32px" }}>About</h1>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: c.ink, lineHeight: "1.8", margin: "0 0 20px" }}>Hi, I'm Sophia.</p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: c.ink, lineHeight: "1.8", margin: "0 0 20px" }}>I'm a personal stylist living in New York City.</p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: c.ink, lineHeight: "1.8", margin: "0 0 20px" }}>I created this website because I couldn't find a place that felt the way I wanted it to. I was always a magazine girl. I loved having one place to read, discover new things, tear out pages, and come back to ideas later. Now everything lives online, and most of the time it feels like I'm scrolling with no end in sight.</p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: c.ink, lineHeight: "1.8", margin: "0 0 20px", fontStyle: "italic" }}>This is my version of that.</p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: c.ink, lineHeight: "1.8", margin: "0 0 20px" }}>A collection of things I've found, thoughts I've had, articles I've written, pieces I've collected, outfits I've loved, and anything else I think is worth sharing.</p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: c.ink, lineHeight: "1.8", margin: "0 0 20px" }}>Fashion is at the center of it, but not always the whole story. Sometimes inspiration comes from a movie, a restaurant, a book, a person on the street, or a random observation I can't stop thinking about.</p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: c.ink, lineHeight: "1.8", margin: "0 0 20px" }}>I love clothes. I love finding things. I love making connections between ideas.</p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: c.ink, lineHeight: "1.8", margin: "0 0 32px", fontStyle: "italic" }}>Think of this as my notebook.</p>

        <div style={{ borderTop: "1px solid " + c.pale, paddingTop: "28px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: c.muted, lineHeight: "1.7", margin: "0" }}>For personal styling inquiries and a copy of my pricing sheet, email <a href="mailto:sophiazami9@gmail.com" style={{ color: c.red, textDecoration: "none" }}>sophiazami9@gmail.com</a> or text <a href="sms:9177509895" style={{ color: c.red, textDecoration: "none" }}>917-750-9895</a></p>
        </div>
      </div>

      <footer style={{ padding: "32px 24px 48px", textAlign: "center", borderTop: "1px solid " + c.pale }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "24px", color: c.black, margin: "0 0 16px" }}>Tallest Tiptoes</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.light, margin: 0 }}>2026 Tallest Tiptoes</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "12px" }}>
          <Link to="/privacy-policy" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", color: c.light, textDecoration: "none" }}>Privacy Policy</Link>
          <Link to="/terms-and-conditions" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", color: c.light, textDecoration: "none" }}>Terms & Conditions</Link>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.muted, margin: "16px 0 0" }}>Website by <a href="mailto:estellebotton1@gmail.com" style={{ color: c.muted, textDecoration: "none" }}>Estelle Botton</a></p>
      </footer>
    </div>
  );
}