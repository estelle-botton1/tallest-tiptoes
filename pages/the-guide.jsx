import { useState, useEffect } from "react";
import NavBar from "../src/NavBar";

const C = {
  cream: "#FBF6F0",
  warmCream: "#F3EBE0",
  pink: "#E8B4B8",
  deepPink: "#C48B8F",
  rosé: "#D4979C",
  blush: "#F2D4D7",
  palePink: "#FAE8EA",
  black: "#1A1A1A",
  softBlack: "#2C2424",
  dark: "#3D2B2B",
  muted: "#9B8E8E",
  light: "#C4B5B0",
  white: "#FFFFFF",
};

const categories = [
  { id: "all", label: "All", icon: "✦" },
  { id: "restaurants", label: "Restaurants", icon: "◯" },
  { id: "hosting", label: "Hosting", icon: "✧" },
  { id: "weekend", label: "Weekend", icon: "◆" },
  { id: "travel", label: "Travel", icon: "▲" },
];

const guides = [
  {
    id: 1, cat: "restaurants", featured: true,
    title: "Restaurant Guide Title",
    subtitle: "By neighborhood or city",
    preview: "Your go-to spots — the places you actually return to, not just the ones that look good online.",
    date: "May 2026",
    bg: `linear-gradient(160deg, #E8E0D6, #D8CFC5)`,
  },
  {
    id: 2, cat: "hosting",
    title: "Hosting Guide Title",
    subtitle: "Table, menu & playlist",
    preview: "How to set a table that feels like you — not Pinterest, not your mom, you.",
    date: "Apr 2026",
    bg: `linear-gradient(160deg, #EDE5DD, #E2D9CF)`,
  },
  {
    id: 3, cat: "weekend",
    title: "Weekend Guide Title",
    subtitle: "Things to do this week",
    preview: "What's worth your Saturday.",
    date: "May 2026",
    bg: `linear-gradient(160deg, #E0D8CE, #D6CCC2)`,
  },
  {
    id: 4, cat: "travel",
    title: "City Guide Title",
    subtitle: "Where to go, eat, stay",
    preview: "The trip notes you actually want — from someone who went and came back with opinions.",
    date: "Mar 2026",
    bg: `linear-gradient(160deg, #E6DDD5, #DDD3C9)`,
  },
  {
    id: 5, cat: "restaurants",
    title: "Another Restaurant Rec",
    subtitle: "The spot you don't know yet",
    preview: "No reservations, no dress code, incredible food.",
    date: "Mar 2026",
    bg: `linear-gradient(160deg, #ECE4DB, #E2D9CF)`,
  },
  {
    id: 6, cat: "hosting",
    title: "Dinner Party for 6",
    subtitle: "Menu, wine & timing",
    preview: "Everything you need for a weeknight dinner that feels special but isn't stressful.",
    date: "Feb 2026",
    bg: `linear-gradient(160deg, #E4DCD4, #DCD3CA)`,
  },
  {
    id: 7, cat: "travel",
    title: "Weekend Trip Title",
    subtitle: "48 hours somewhere new",
    preview: "A quick getaway with everything mapped out.",
    date: "Feb 2026",
    bg: `linear-gradient(160deg, #E8E0D6, #D8CFC5)`,
  },
];

function GuideDetail({ guide, onClose }) {
  const isRestaurant = guide.cat === "restaurants";
  const isHosting = guide.cat === "hosting";
  const isTravel = guide.cat === "travel";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: C.cream, overflowY: "auto",
      WebkitOverflowScrolling: "touch",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 20px", borderBottom: `1px solid ${C.palePink}`,
        position: "sticky", top: 0, background: `${C.cream}F2`,
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", zIndex: 10,
      }}>
        <span onClick={onClose} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "13px", color: C.muted, cursor: "pointer",
        }}>← Back</span>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "16px", color: C.black,
        }}>My Guides</span>
        <div style={{ width: "40px" }} />
      </div>

      {/* Hero */}
      <div style={{
        height: "260px", background: guide.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
          letterSpacing: "2px", color: C.muted, opacity: 0.4,
        }}>COVER IMAGE</span>
      </div>

      {/* Meta */}
      <div style={{ padding: "24px 20px 0" }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
          letterSpacing: "2px", textTransform: "uppercase", color: C.deepPink,
        }}>{guide.cat.toUpperCase()} · {guide.date}</span>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "26px", fontWeight: "400",
          margin: "8px 0 4px", lineHeight: "1.25",
        }}>{guide.title}</h1>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "14px", fontStyle: "italic", color: C.muted,
          margin: "0 0 20px", lineHeight: "1.6",
        }}>{guide.subtitle}</p>
      </div>

      {/* Content */}
      <div style={{ padding: "0 20px 20px" }}>
        {isRestaurant ? (
          /* Restaurant list */
          <div>
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{
                padding: "18px 0",
                borderBottom: `1px solid ${C.palePink}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "17px", fontStyle: "italic",
                      margin: "0 0 4px", color: C.softBlack,
                    }}>Restaurant Name</p>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "12px", color: C.light,
                    }}>Neighborhood · $$ · Cuisine Type</span>
                  </div>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "11px", color: C.deepPink, fontStyle: "italic",
                    flexShrink: 0, marginLeft: "12px",
                  }}>Map →</span>
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px", color: C.muted, margin: "8px 0 0",
                  lineHeight: "1.5", fontStyle: "italic",
                }}>Your one-line take on why this place is worth it.</p>
                <div style={{
                  height: "140px", background: `linear-gradient(160deg, #EDE5DD, #E2D9CF)`,
                  marginTop: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "9px",
                    color: C.muted, opacity: 0.3,
                  }}>RESTAURANT PHOTO</span>
                </div>
              </div>
            ))}
          </div>
        ) : isHosting ? (
          /* Hosting guide — sections */
          <div>
            {["THE TABLE", "THE MENU", "THE PLAYLIST", "THE TIMELINE"].map((section, i) => (
              <div key={i} style={{ marginBottom: "24px" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px",
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
                    letterSpacing: "2.5px", textTransform: "uppercase", color: C.muted,
                  }}>{section}</span>
                  <div style={{ flex: 1, height: "1px", background: C.palePink }} />
                </div>
                {i === 0 && (
                  <div style={{
                    height: "200px", background: `linear-gradient(160deg, #E8E0D6, #DDD4CA)`,
                    marginBottom: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: "9px",
                      color: C.muted, opacity: 0.3,
                    }}>TABLE SETTING PHOTO</span>
                  </div>
                )}
                <div style={{ marginBottom: "8px" }}>
                  <div style={{ height: "14px", background: C.light, opacity: 0.2, borderRadius: "2px", marginBottom: "8px", width: "100%" }} />
                  <div style={{ height: "14px", background: C.light, opacity: 0.17, borderRadius: "2px", marginBottom: "8px", width: "88%" }} />
                  <div style={{ height: "14px", background: C.light, opacity: 0.14, borderRadius: "2px", width: `${60 + i * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        ) : isTravel ? (
          /* Travel guide — day by day */
          <div>
            {["DAY ONE", "DAY TWO"].map((day, i) => (
              <div key={i} style={{ marginBottom: "28px" }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
                  letterSpacing: "2.5px", textTransform: "uppercase", color: C.deepPink,
                  display: "block", marginBottom: "14px",
                }}>{day}</span>

                {[1, 2, 3].map(n => (
                  <div key={n} style={{
                    display: "flex", gap: "12px",
                    padding: "12px 0",
                    borderBottom: `1px solid ${C.palePink}`,
                  }}>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "11px", color: C.light,
                      minWidth: "50px", flexShrink: 0,
                    }}>{n === 1 ? "Morning" : n === 2 ? "Afternoon" : "Evening"}</span>
                    <div>
                      <p style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "15px", fontStyle: "italic",
                        margin: "0 0 3px", color: C.softBlack,
                      }}>Place or Activity Name</p>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "12px", color: C.muted, margin: 0,
                        lineHeight: "1.5",
                      }}>Your note about this spot — quick and personal.</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div style={{
              height: "180px", background: `linear-gradient(160deg, #E6DDD5, #DDD3C9)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "9px",
                color: C.muted, opacity: 0.3,
              }}>TRIP PHOTO</span>
            </div>
          </div>
        ) : (
          /* Weekend — simple list */
          <div>
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{
                padding: "16px 0",
                borderBottom: `1px solid ${C.palePink}`,
              }}>
                <p style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "16px", fontStyle: "italic",
                  margin: "0 0 4px", color: C.softBlack,
                }}>Event or Activity Name</p>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px", color: C.light,
                }}>Where · When</span>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px", color: C.muted, margin: "6px 0 0",
                  lineHeight: "1.5",
                }}>Why it's worth your time this week.</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comments */}
      <div style={{ padding: "20px 20px 40px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
            letterSpacing: "2.5px", textTransform: "uppercase", color: C.muted,
          }}>COMMENTS</span>
          <div style={{ flex: 1, height: "1px", background: C.palePink }} />
        </div>
        <div style={{
          display: "flex", gap: "10px", padding: "12px",
          background: C.white, border: `1px solid ${C.palePink}`,
          alignItems: "center",
        }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: C.blush, flexShrink: 0 }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "13px", fontStyle: "italic", color: C.light, flex: 1,
          }}>Add a comment...</span>
        </div>
      </div>
    </div>
  );
}

export default function MyGuides() {
  const [loaded, setLoaded] = useState(false);
  const [activeCat, setActiveCat] = useState("all");
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 50); }, []);

  const filtered = activeCat === "all" ? guides : guides.filter(g => g.cat === activeCat);
  const featured = filtered.find(g => g.featured) || filtered[0];
  const rest = filtered.filter(g => g.id !== featured?.id);

  if (selectedGuide) {
    return <GuideDetail guide={selectedGuide} onClose={() => setSelectedGuide(null)} />;
  }

  return (
    <div style={{
      minHeight: "100vh", background: C.cream,
      fontFamily: "'Playfair Display', Georgia, serif", color: C.black,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Dancing+Script:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 20px", borderBottom: `1px solid ${C.palePink}`,
        position: "sticky", top: 0, background: `${C.cream}F2`,
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", zIndex: 50,
        opacity: loaded ? 1 : 0, transition: "opacity 0.5s",
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: C.muted, cursor: "pointer" }}>← Home</span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: C.black }}>Tallest Tiptoes</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", cursor: "pointer" }}>
          <div style={{ width: "20px", height: "1.5px", background: C.black }} />
          <div style={{ width: "14px", height: "1.5px", background: C.black }} />
        </div>
      </nav>

      {/* Header */}
      <div style={{
        padding: "32px 20px 0",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
      }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "32px", fontWeight: "400", margin: "0 0 6px",
        }}>My Guides</h1>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "14px", fontStyle: "italic", color: C.muted, margin: "0",
        }}>Where to go, what to do, how to host</p>
      </div>

      {/* Category grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "8px", padding: "24px 20px",
        opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.15s",
      }}>
        {categories.filter(c => c.id !== "all").map((cat) => (
          <div
            key={cat.id}
            onClick={() => setActiveCat(activeCat === cat.id ? "all" : cat.id)}
            style={{
              padding: "18px 14px",
              background: activeCat === cat.id ? C.black : C.white,
              border: `1px solid ${activeCat === cat.id ? C.black : C.palePink}`,
              cursor: "pointer",
              transition: "all 0.25s",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "13px", fontWeight: "500",
              color: activeCat === cat.id ? C.cream : C.softBlack,
            }}>{cat.label}</span>
            <span style={{
              fontSize: "12px",
              color: activeCat === cat.id ? C.pink : C.light,
              opacity: 0.6,
            }}>{cat.icon}</span>
          </div>
        ))}
      </div>

      {activeCat !== "all" && (
        <div style={{ padding: "0 20px 8px" }}>
          <span
            onClick={() => setActiveCat("all")}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "12px", color: C.deepPink, fontStyle: "italic",
              cursor: "pointer",
            }}
          >← Show all guides</span>
        </div>
      )}

      {/* Featured guide */}
      {featured && (
        <div
          onClick={() => setSelectedGuide(featured)}
          style={{
            padding: "8px 20px", cursor: "pointer",
            opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.25s",
          }}
        >
          <div style={{
            height: "220px", background: featured.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
              letterSpacing: "2px", color: C.muted, opacity: 0.4,
            }}>FEATURED IMAGE</span>
            <div style={{
              position: "absolute", top: "10px", left: "10px",
              padding: "4px 10px", background: C.black,
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "9px",
                fontWeight: "600", letterSpacing: "1.5px",
                textTransform: "uppercase", color: C.cream,
              }}>{featured.cat}</span>
            </div>
          </div>
          <div style={{ padding: "14px 0 16px" }}>
            <h3 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "20px", fontWeight: "400", fontStyle: "italic",
              margin: "0 0 4px", lineHeight: "1.3",
            }}>{featured.title}</h3>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "13px", color: C.muted, margin: "0", lineHeight: "1.5",
            }}>{featured.preview}</p>
          </div>
        </div>
      )}

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", padding: "4px 20px 16px", gap: "16px" }}>
        <div style={{ flex: 1, height: "1px", background: C.palePink }} />
        <span style={{ color: C.pink, fontSize: "8px" }}>✦</span>
        <div style={{ flex: 1, height: "1px", background: C.palePink }} />
      </div>

      {/* Rest of guides */}
      <div style={{
        padding: "0 20px 40px",
        opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.3s",
      }}>
        {rest.map((guide, i) => (
          <div
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            style={{
              display: "flex", gap: "14px", cursor: "pointer",
              padding: "16px 0",
              borderBottom: i < rest.length - 1 ? `1px solid ${C.palePink}` : "none",
            }}
          >
            <div style={{
              width: "80px", height: "80px", flexShrink: 0,
              background: guide.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "8px",
                color: C.muted, opacity: 0.3,
              }}>IMAGE</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
                letterSpacing: "1.5px", textTransform: "uppercase", color: C.deepPink,
              }}>{guide.cat}</span>
              <p style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "16px", fontStyle: "italic",
                margin: "3px 0 3px", lineHeight: "1.3",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{guide.title}</p>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "12px", color: C.light,
              }}>{guide.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        padding: "24px 24px 40px", textAlign: "center",
        borderTop: `1px solid ${C.palePink}`,
      }}>
        <p style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "20px", color: C.black, margin: "0",
        }}>Tallest Tiptoes</p>
      </footer>
    </div>
  );
}
