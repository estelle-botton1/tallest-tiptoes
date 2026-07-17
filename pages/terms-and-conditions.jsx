import NavBar from "../src/NavBar";

var c = {
  black: "#1A1A1A",
  cream: "#F6F0E8",
  ink: "#3D3633",
  pale: "#EAE2D8",
  muted: "#8A7E72",
};

export default function TermsAndConditions() {
  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />
      <NavBar />
      <div style={{ padding: "32px 20px 60px", maxWidth: "640px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", fontWeight: "400", margin: "0 0 6px" }}>Terms & Conditions</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, margin: "0 0 32px" }}>Last Updated: July 2026</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Program Name</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>Tallest Tiptoes SMS Notifications</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Program Description</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>By opting into Tallest Tiptoes text messages, you agree to receive recurring SMS and MMS messages from Tallest Tiptoes. Messages may include styling updates, new arrivals, editorial content, website updates, exclusive offers, event announcements, product launches, and other brand-related communications.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Message Frequency</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>Message frequency may vary depending on user engagement and business activity.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Message and Data Rates</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>Message and data rates may apply according to your mobile carrier plan.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Opt-Out</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>You may cancel the SMS service at any time by replying <strong>STOP</strong> to any message. After you send <strong>STOP</strong>, you will receive a confirmation message and will no longer receive SMS messages from us.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Help</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>For assistance, reply <strong>HELP</strong> to any message or contact us at sophia@tallest-tiptoes.com.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Supported Carriers</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>Mobile carriers are not liable for delayed or undelivered messages.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Privacy</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>Your information is handled in accordance with our <a href="/privacy-policy" style={{ color: c.black, textDecoration: "underline" }}>Privacy Policy</a>.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Contact</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>Tallest Tiptoes<br />Email: sophia@tallest-tiptoes.com<br />Website: www.tallest-tiptoes.com</p>
      </div>
    </div>
  );
}