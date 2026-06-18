import NavBar from "../src/NavBar";

var c = {
  black: "#1A1A1A",
  cream: "#F6F0E8",
  ink: "#3D3633",
  pale: "#EAE2D8",
  muted: "#8A7E72",
};

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />
      <NavBar />
      <div style={{ padding: "32px 20px 60px", maxWidth: "640px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", fontWeight: "400", margin: "0 0 6px" }}>Privacy Policy</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, margin: "0 0 32px" }}>Last Updated: June 2026</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Information We Collect</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>When you subscribe to our SMS program, we collect your phone number and content preferences. When you submit to our Honesty Box, submissions are anonymous and no personal information is collected. We do not collect browsing data, cookies, or tracking information beyond what is necessary to operate the website.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>How We Use Your Information</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>Your phone number is used solely to send you text message notifications about new content and updates from Tallest Tiptoes based on the categories you selected. We do not use your information for any other purpose.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Information Sharing</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>We do not sell, trade, or share your personal information with third parties. Your phone number is stored securely and used only for the purposes described above. We use Twilio to deliver text messages, and your phone number is shared with Twilio solely for message delivery.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Data Security</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>We take reasonable measures to protect your personal information. However, no method of electronic storage or transmission is completely secure, and we cannot guarantee absolute security.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Opt-Out</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>You can opt out of SMS messages at any time by replying STOP to any text message. Your phone number will be deactivated from our subscriber list.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Changes to This Policy</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date.</p>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontWeight: "400", margin: "24px 0 8px" }}>Contact</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.ink, lineHeight: "1.7", margin: "0 0 16px" }}>Tallest Tiptoes<br />Email: sophia@tallest-tiptoes.com<br />Website: www.tallest-tiptoes.com</p>
      </div>
    </div>
  );
}
