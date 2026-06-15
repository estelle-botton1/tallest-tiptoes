import { useState } from "react";

var categories = [
  { id: "forum", label: "The Forum", desc: "Essays, vlogs, recs" },
  { id: "edit", label: "The Edit", desc: "New outfits" },
  { id: "shop", label: "The Shop", desc: "New drops" },
  { id: "hisNotHers", label: "His Not Hers", desc: "New picks" },
  { id: "guide", label: "The Guide", desc: "New guides" },
];

export default function SubscribeBox() {
  var c = {
    red: "#A33B2E",
    cream: "#F6F0E8",
    light: "#F0DDD0",
    pale: "#EAE2D8",
    black: "#1A1A1A",
    ink: "#3D3633",
  };

  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState("idle");

  function toggleCategory(id) {
    if (selected.indexOf(id) >= 0) {
      setSelected(selected.filter(function (s) { return s !== id; }));
    } else {
      setSelected(selected.concat([id])); 
    }
  }

  function selectAll() {
    if (selected.length === categories.length) {
      setSelected([]);
    } else {
      setSelected(categories.map(function (cat) { return cat.id; }));
    }
  }

  function formatPhone(value) {
    var digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return "(" + digits.slice(0, 3) + ") " + digits.slice(3);
    return "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6, 10);
  }

  function handlePhoneChange(e) {
    var digits = e.target.value.replace(/\D/g, "");
    if (digits.length <= 10) {
      setPhone(formatPhone(digits));
    }
  }

  function handleSubmit() {
    var digits = phone.replace(/\D/g, "");
    if (digits.length !== 10 || selected.length === 0) return;

    setStatus("sending");

    fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: "+1" + digits,
        categories: selected,
      }),
    })
      .then(function (res) {
        if (res.ok) {
          setStatus("sent");
          setPhone("");
          setSelected([]);
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

  var isValid = phone.replace(/\D/g, "").length === 10 && selected.length > 0;

  return (
    <section style={{ padding: "0 20px 20px" }}>
      <div style={{
       background: c.red, borderRadius: "3px", padding: "32px 24px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
            letterSpacing: "3px", textTransform: "uppercase", color: c.red,
          }}>TEXT NOTIFICATIONS</span>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: "24px",
            fontWeight: "400", fontStyle: "italic", color: c.cream, margin: "8px 0 8px",
          }}>Stay in the Loop</h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "13px",
            fontStyle: "italic", color: c.light, margin: "0",
          }}>Get a text when something new drops</p>
        </div>

        {status === "sent" ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "16px",
              fontStyle: "italic", color: c.cream, margin: "0 0 6px",
            }}>You are in.</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "13px",
              color: c.light, margin: "0",
            }}>Reply STOP anytime to unsubscribe.</p>
          </div>
        ) : (
          <div>
            {/* Phone input */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "11px",
                letterSpacing: "1.5px", textTransform: "uppercase", color: c.light,
                display: "block", marginBottom: "6px",
              }}>PHONE NUMBER</label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(555) 123-4567"
                style={{
                  width: "100%", padding: "12px 14px",
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "3px", color: c.cream,
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "16px",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>

            {/* Category checkboxes */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: "10px",
              }}>
                <label style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "11px",
                  letterSpacing: "1.5px", textTransform: "uppercase", color: c.light,
                }}>NOTIFY ME ABOUT</label>
                <span
                  onClick={selectAll}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "11px",
                    color: c.red, cursor: "pointer", fontStyle: "italic",
                  }}
                >{selected.length === categories.length ? "Clear all" : "Select all"}</span>
              </div>

              {categories.map(function (cat) {
                var isChecked = selected.indexOf(cat.id) >= 0;
                return (
                  <div
                    key={cat.id}
                    onClick={function () { toggleCategory(cat.id); }}
                    style={{
                      display: "flex", alignItems: "center", gap: "12px",
                      padding: "10px 0", cursor: "pointer",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div style={{
                      width: "18px", height: "18px", flexShrink: 0,
                      border: "1px solid " + (isChecked ? c.cream : "rgba(255,255,255,0.3)"),
                      background: isChecked ? c.cream : "transparent",
                      borderRadius: "2px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s",
                    }}>
                      {isChecked && (
                       <span style={{ color: c.red, fontSize: "12px", lineHeight: "1" }}>&#10003;</span>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: "14px",
                        color: c.cream,
                      }}>{cat.label}</span>
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: "12px",
                        color: c.light, marginLeft: "8px", fontStyle: "italic",
                      }}>{cat.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit */}
            <div
              onClick={handleSubmit}
              style={{
                textAlign: "center", padding: "13px",
                background: isValid && status !== "sending" ? c.cream : "rgba(255,255,255,0.15)",
                borderRadius: "3px",
                cursor: isValid && status !== "sending" ? "pointer" : "default",
                transition: "background 0.2s",
              }}
            >
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "13px",
                fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase",
                color: c.cream,
              }}>
                {status === "sending" ? "SUBSCRIBING..." : status === "error" ? "TRY AGAIN" : "SUBSCRIBE"}
              </span>
            </div>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "11px",
              color: c.light, opacity: 0.4, textAlign: "center",
              margin: "12px 0 0", fontStyle: "italic",
            }}>Text only. No spam. Reply STOP to unsubscribe.</p>
          </div>
        )}
      </div>
    </section>
  );
}
