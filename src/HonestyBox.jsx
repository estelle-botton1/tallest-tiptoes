export default function HonestyBox() {
  var c = {
    red: "#A33B2E",
    cream: "#F0DDD0",
    light: "#F0DDD0",
    pale: "#EAE2D8",
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", padding: "32px 20px", gap: "16px" }}>
        <div style={{ flex: 1, height: "1px", background: c.pale }} />
        <div style={{ flex: 1, height: "1px", background: c.pale }} />
      </div>
      <section style={{ padding: "0 20px 40px" }}>
        <div style={{ background: c.cream, borderRadius: "3px", padding: "36px 24px", textAlign: "center" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: c.red }}>ANONYMOUS</span>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", fontWeight: "400", fontStyle: "italic", color: c.red, margin: "8px 0 10px" }}>The Honesty Box</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.light, margin: "0 0 20px" }}>Say what you really think</p>
          <div style={{ display: "inline-block", padding: "10px 28px", border: "1px solid " + c.red, borderRadius: "2px", cursor: "pointer" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: c.red }}>SUBMIT</span>
          </div>
        </div>
      </section>
    </div>
  );
}