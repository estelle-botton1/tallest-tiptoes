import { useState } from "react";

var FORM_ID = "xredjrza";

export default function HonestyBox() {
  var c = {
    red: "#A33B2E",
    cream: "#F6F0E8",
    light: "#F0DDD0",
    pale: "#EAE2D8",
    warm: "#E0D2C2",
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
          setTimeout(function () { setStatus("idle"); }, 5000);
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
        <div style={{
          background: c.cream,
          border: "1px solid " + c.warm,
          borderRadius: "3px",
          padding: "36px 28px",
          position: "relative",
        }}>
          {/* Title — handwritten style */}
          <h2 style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "36px",
            fontWeight: "500",
            color: c.ink,
            margin: "0 0 16px",
            lineHeight: "1.1",
          }}>Honesty Box</h2>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "16px",
            fontStyle: "italic",
            color: c.ink,
            margin: "0 0 20px",
            lineHeight: "1.5",
          }}>Tell me what you really think. I'll never know it's you.</p>

          {status === "sent" ? (
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <p style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "22px",
                color: c.ink,
                margin: "0 0 6px",
              }}>Received.</p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "14px",
                fontStyle: "italic",
                color: c.muted,
                margin: "0",
              }}>Your secret is safe.</p>
            </div>
          ) : (
            <div>
              {/* Prompt */}
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "14px",
                color: c.muted,
                margin: "0 0 10px",
              }}>Got a thought? Send it.</p>

              {/* Text area */}
              <textarea
                value={message}
                onChange={function (e) { setMessage(e.target.value); }}
                placeholder="An idea, a request, a hot take, a random thought..."
                maxLength={1000}
                style={{
                  width: "100%",
                  minHeight: "110px",
                  padding: "14px",
                  background: c.light + "44",
                  border: "1px solid " + c.warm,
                  borderRadius: "3px",
                  color: c.ink,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "15px",
                  fontStyle: "italic",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "12px",
              }}>
                {/* Anonymous note */}
                <span style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "16px",
                  color: c.muted,
                }}>Anonymous, always.</span>

                {/* Submit button */}
                <div
                  onClick={handleSubmit}
                  style={{
                    padding: "9px 24px",
                    background: message.trim() && status !== "sending" ? c.red : c.warm,
                    borderRadius: "2px",
                    cursor: message.trim() && status !== "sending" ? "pointer" : "default",
                    transition: "background 0.2s",
                  }}
                >
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: c.cream,
                  }}>
                    {status === "sending" ? "SENDING..." : status === "error" ? "TRY AGAIN" : "SEND IT"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
