import { useState } from "react";

var FORM_ID = "xredjrza"; 

export default function HonestyBox() {
  var c = {
    red: "#A33B2E",
    cream: "#F6F0E8",
    light: "#F0DDD0",
    pale: "#EAE2D8",
    muted: "#8A7E72",
    ink: "#3D3633",
    black: "#1A1A1A",
  };

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  function handleSubmit() {
    if (!message.trim()) return;

    setStatus("sending");

    fetch("https://formspree.io/f/" + FORM_ID, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message, _subject: "New Honesty Box Submission" }),
    })
      .then(function (res) {
        if (res.ok) {
          setStatus("sent");
          setMessage("");
          setTimeout(function () { setStatus("idle"); }, 4000);
        } else {
          setStatus("error");
          setTimeout(function () { setStatus("idle"); }, 3000);
        }
      })
      .catch(function () {
        setStatus("error");
        setTimeout(function () { setStatus("idle"); }, 3000);
      });
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", padding: "32px 20px", gap: "16px" }}>
        <div style={{ flex: 1, height: "1px", background: c.pale }} />
        <div style={{ flex: 1, height: "1px", background: c.pale }} />
      </div>
      <section style={{ padding: "0 20px 40px" }}>
        <div style={{ background: c.red, borderRadius: "3px", padding: "36px 24px", textAlign: "center" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
            letterSpacing: "3px", textTransform: "uppercase", color: c.cream,
          }}>ANONYMOUS</span>

          <h2 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: "28px",
            fontWeight: "400", fontStyle: "italic", color: c.cream, margin: "8px 0 10px",
          }}>The Honesty Box</h2>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "14px",
            fontStyle: "italic", color: c.light, margin: "0 0 20px",
          }}>Say what you really think</p>

          {status === "sent" ? (
            <div style={{ padding: "20px 0" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "16px",
                fontStyle: "italic", color: c.cream, margin: "0",
              }}>Received. Thank you for your honesty.</p>
            </div>
          ) : (
            <div>
              <textarea
                value={message}
                onChange={function (e) { setMessage(e.target.value); }}
                placeholder="Questions, confessions, hot takes..."
                maxLength={1000}
                style={{
                  width: "100%",
                  minHeight: "100px",
                  padding: "14px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "3px",
                  color: c.cream,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "15px",
                  fontStyle: "italic",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginTop: "8px",
              }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "11px",
                  color: c.light, opacity: 0.5,
                }}>{message.length}/1000</span>

                <span style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "11px",
                  fontStyle: "italic", color: c.light, opacity: 0.5,
                }}>Completely anonymous</span>
              </div>

              <div
                onClick={handleSubmit}
                style={{
                  display: "inline-block",
                  padding: "10px 28px",
                  border: "1px solid " + c.cream,
                  borderRadius: "2px",
                  cursor: message.trim() && status !== "sending" ? "pointer" : "default",
                  opacity: message.trim() && status !== "sending" ? 1 : 0.5,
                  marginTop: "16px",
                  transition: "opacity 0.2s",
                }}
              >
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "13px",
                  fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase",
                  color: c.cream,
                }}>
                  {status === "sending" ? "SENDING..." : status === "error" ? "TRY AGAIN" : "SUBMIT"}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
