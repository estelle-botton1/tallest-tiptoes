import { useState, useEffect } from "react";
import NavBar from "../src/NavBar";
import HonestyBox from "../src/HonestyBox";

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

const formats = [
  { id: "all", label: "All" },
  { id: "essay", label: "Essays" },
  { id: "vlog", label: "Vlogs" },
  { id: "rec", label: "Recs" },
  { id: "podcast", label: "Podcast" },
  { id: "photo", label: "Photo" },
];

const posts = [
  {
    id: 1,
    format: "essay",
    featured: true,
    date: "May 8, 2026",
    day: "Thursday · 8 PM",
    title: "Essay Title Goes Here",
    preview: "The opening lines of your essay — enough to pull someone in. This is your voice, your perspective, your world...",
    readTime: "6 min read",
    bg: `linear-gradient(135deg, ${C.warmCream}, ${C.blush}88)`,
    h: 260,
    comments: 14,
  },
  {
    id: 2,
    format: "vlog",
    date: "May 5, 2026",
    day: "Monday · 8 AM",
    title: "Vlog Title Goes Here",
    preview: "Weekend recap — a short description of what happened...",
    readTime: "12 min watch",
    bg: `linear-gradient(135deg, ${C.palePink}, ${C.cream})`,
    h: 180,
    comments: 8,
  },
  {
    id: 3,
    format: "rec",
    date: "Apr 24, 2026",
    day: "Thursday · 8 PM",
    title: "Movie Rec Title Goes Here",
    preview: "Why you should watch this — your personal take...",
    readTime: "3 min read",
    bg: `linear-gradient(135deg, ${C.rosé}44, ${C.warmCream})`,
    h: 160,
    comments: 22,
  },
  {
    id: 4,
    format: "podcast",
    date: "Apr 14, 2026",
    day: "Monday · 8 AM",
    title: "Podcast Episode Title",
    preview: "What you talked about this episode — a teaser...",
    readTime: "38 min listen",
    bg: `linear-gradient(135deg, ${C.blush}66, ${C.palePink})`,
    h: 140,
    comments: 5,
  },
  {
    id: 5,
    format: "essay",
    date: "Apr 10, 2026",
    day: "Thursday · 8 PM",
    title: "Another Essay Title",
    preview: "The second essay in your archive — building a body of work...",
    readTime: "8 min read",
    bg: `linear-gradient(135deg, ${C.warmCream}, ${C.rosé}33)`,
    h: 180,
    comments: 31,
  },
  {
    id: 6,
    format: "photo",
    date: "Mar 27, 2026",
    day: "Thursday · 8 PM",
    title: "Photo Essay Title",
    preview: "A visual story told through images...",
    readTime: "4 min read",
    bg: `linear-gradient(135deg, ${C.deepPink}22, ${C.blush}44)`,
    h: 200,
    comments: 17,
  },
  {
    id: 7,
    format: "vlog",
    date: "Mar 23, 2026",
    day: "Monday · 8 AM",
    title: "Vlog Episode Two",
    preview: "Another week, another recap...",
    readTime: "9 min watch",
    bg: `linear-gradient(135deg, ${C.palePink}88, ${C.cream})`,
    h: 160,
    comments: 3,
  },
];

const formatColors = {
  essay: C.deepPink,
  vlog: C.dark,
  rec: C.rosé,
  podcast: C.softBlack,
  photo: C.pink,
};

function PostDetail({ post, onClose }) {
  const isVideo = post.format === "vlog";
  const isPodcast = post.format === "podcast";
  const isPhoto = post.format === "photo";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: C.cream,
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 20px",
        borderBottom: `1px solid ${C.palePink}`,
        position: "sticky", top: 0,
        background: `${C.cream}F2`,
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        zIndex: 10,
      }}>
        <span onClick={onClose} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "13px", color: C.muted, cursor: "pointer",
        }}>← Back</span>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "16px", color: C.black,
        }}>The Forum</span>
        <div style={{ width: "40px" }} />
      </div>

      {/* Hero image / video placeholder */}
      <div style={{
        height: isVideo ? "240px" : "300px",
        background: post.bg,
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(45deg, ${C.dark} 0, ${C.dark} 1px, transparent 0, transparent 50%)`,
          backgroundSize: "12px 12px",
        }} />

        {(isVideo || isPodcast) && (
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: `${C.black}CC`, display: "flex",
            alignItems: "center", justifyContent: "center",
            zIndex: 2, cursor: "pointer",
          }}>
            <div style={{
              width: 0, height: 0,
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderLeft: `16px solid ${C.cream}`,
              marginLeft: "3px",
            }} />
          </div>
        )}

        {!isVideo && !isPodcast && (
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
            letterSpacing: "2px", color: C.dark, opacity: 0.3, zIndex: 2, position: "relative",
          }}>{isPhoto ? "COVER IMAGE" : "ARTICLE IMAGE"}</span>
        )}
      </div>

      {/* Article meta */}
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <span style={{
            padding: "3px 10px",
            fontSize: "9px",
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: "600",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            background: formatColors[post.format],
            color: C.cream,
            borderRadius: "10px",
          }}>{post.format}</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "12px", color: C.muted,
          }}>{post.readTime}</span>
        </div>

        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "28px", fontWeight: "400",
          margin: "0 0 8px", lineHeight: "1.25",
        }}>{post.title}</h1>

        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          paddingBottom: "20px",
          borderBottom: `1px solid ${C.palePink}`,
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "13px", fontStyle: "italic", color: C.muted,
          }}>{post.date}</span>
          <span style={{ color: C.palePink }}>·</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "13px", fontStyle: "italic", color: C.light,
          }}>{post.day}</span>
        </div>
      </div>

      {/* Article body placeholder */}
      <div style={{ padding: "24px 20px" }}>
        {isPhoto ? (
          /* Photo essay layout — grid of images */
          <div>
            <div style={{
              height: "280px", background: `linear-gradient(135deg, ${C.blush}44, ${C.warmCream})`,
              borderRadius: "8px", marginBottom: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `repeating-linear-gradient(45deg, ${C.dark} 0, ${C.dark} 1px, transparent 0, transparent 50%)`, backgroundSize: "10px 10px" }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "1.5px", color: C.muted, opacity: 0.5 }}>PHOTO 1</span>
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "15px", fontStyle: "italic", color: C.dark,
              lineHeight: "1.7", margin: "0 0 20px",
            }}>
              Your caption for this image — a sentence or two that gives it context. The story behind the photo.
            </p>
            <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
              {[1, 2].map(n => (
                <div key={n} style={{
                  flex: 1, height: "180px",
                  background: `linear-gradient(135deg, ${n === 1 ? C.palePink : C.warmCream}, ${n === 1 ? C.cream : C.blush}44)`,
                  borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `repeating-linear-gradient(45deg, ${C.dark} 0, ${C.dark} 1px, transparent 0, transparent 50%)`, backgroundSize: "10px 10px" }} />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", letterSpacing: "1.5px", color: C.muted, opacity: 0.5 }}>PHOTO {n + 1}</span>
                </div>
              ))}
            </div>
          </div>
        ) : isPodcast ? (
          /* Podcast layout — player + show notes */
          <div>
            {/* Player placeholder */}
            <div style={{
              background: C.black, borderRadius: "12px",
              padding: "20px", marginBottom: "24px",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px",
              }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: C.deepPink, display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <div style={{
                    width: 0, height: 0,
                    borderTop: "7px solid transparent",
                    borderBottom: "7px solid transparent",
                    borderLeft: `11px solid ${C.cream}`,
                    marginLeft: "2px",
                  }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "14px", color: C.cream, margin: "0 0 2px",
                  }}>{post.title}</p>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "11px", color: C.light,
                  }}>{post.readTime}</span>
                </div>
              </div>
              {/* Progress bar */}
              <div style={{
                height: "3px", background: `${C.dark}`,
                borderRadius: "2px", overflow: "hidden",
              }}>
                <div style={{
                  width: "35%", height: "100%",
                  background: C.deepPink, borderRadius: "2px",
                }} />
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between", marginTop: "6px",
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", color: C.light }}>13:24</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", color: C.light }}>38:00</span>
              </div>
            </div>

            <span style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
              letterSpacing: "2.5px", textTransform: "uppercase", color: C.muted,
            }}>SHOW NOTES</span>
            <div style={{ height: "1px", background: C.palePink, margin: "8px 0 16px" }} />
            {["Topic one discussed in this episode", "Topic two — a deeper conversation", "Topic three — the unexpected tangent"].map((note, i) => (
              <p key={i} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "14px", color: C.dark,
                margin: "0 0 10px", paddingLeft: "12px",
                borderLeft: `2px solid ${C.palePink}`,
                lineHeight: "1.5",
              }}>{note}</p>
            ))}
          </div>
        ) : (
          /* Essay / article layout */
          <div>
            {[1, 2, 3].map(p => (
              <div key={p} style={{ marginBottom: "20px" }}>
                <div style={{
                  height: `${14 + Math.random() * 4}px`,
                  background: C.light, opacity: 0.25,
                  borderRadius: "2px", marginBottom: "10px", width: "100%",
                }} />
                <div style={{
                  height: "14px", background: C.light, opacity: 0.2,
                  borderRadius: "2px", marginBottom: "10px", width: "95%",
                }} />
                <div style={{
                  height: "14px", background: C.light, opacity: 0.18,
                  borderRadius: "2px", marginBottom: "10px", width: `${80 + Math.random() * 15}%`,
                }} />
                <div style={{
                  height: "14px", background: C.light, opacity: 0.15,
                  borderRadius: "2px", width: `${60 + Math.random() * 20}%`,
                }} />
              </div>
            ))}

            {/* Pull quote */}
            <div style={{
              padding: "24px 20px",
              margin: "8px 0 24px",
              borderLeft: `3px solid ${C.deepPink}`,
              borderRight: `3px solid ${C.deepPink}`,
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "20px", fontStyle: "italic",
                color: C.softBlack, margin: 0, lineHeight: "1.4",
              }}>
                "A pull quote from your essay would go here — the line people screenshot and share."
              </p>
            </div>

            {[1, 2].map(p => (
              <div key={p} style={{ marginBottom: "20px" }}>
                <div style={{ height: "14px", background: C.light, opacity: 0.22, borderRadius: "2px", marginBottom: "10px", width: "100%" }} />
                <div style={{ height: "14px", background: C.light, opacity: 0.18, borderRadius: "2px", marginBottom: "10px", width: "92%" }} />
                <div style={{ height: "14px", background: C.light, opacity: 0.15, borderRadius: "2px", width: `${65 + Math.random() * 20}%` }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comments section */}
      <div style={{ padding: "0 20px 40px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          marginBottom: "16px",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
            letterSpacing: "2.5px", textTransform: "uppercase", color: C.muted,
          }}>COMMENTS</span>
          <div style={{ flex: 1, height: "1px", background: C.palePink }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "12px", color: C.deepPink,
          }}>{post.comments}</span>
        </div>

        {/* Comment input */}
        <div style={{
          display: "flex", gap: "10px", marginBottom: "20px",
          padding: "14px", background: C.white,
          borderRadius: "12px", border: `1px solid ${C.palePink}`,
          alignItems: "center",
        }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: C.blush, flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "13px", fontStyle: "italic", color: C.light,
            flex: 1,
          }}>Add a comment...</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "11px", fontWeight: "600",
            letterSpacing: "1px", textTransform: "uppercase",
            color: C.deepPink,
          }}>POST</span>
        </div>

        {/* Sample comments */}
        {[
          { time: "2 hours ago", text: "Placeholder comment — this is where reader conversation happens." },
          { time: "5 hours ago", text: "Another comment from a reader. Building community around your content." },
        ].map((comment, i) => (
          <div key={i} style={{
            display: "flex", gap: "10px",
            padding: "14px 0",
            borderBottom: `1px solid ${C.palePink}`,
          }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: i === 0 ? C.palePink : C.warmCream,
              flexShrink: 0, marginTop: "2px",
            }} />
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px", fontWeight: "600", color: C.softBlack,
                }}>Reader</span>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "11px", color: C.light,
                }}>{comment.time}</span>
              </div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "13px", color: C.dark,
                margin: "4px 0 0", lineHeight: "1.5",
              }}>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TheForum() {
  const [loaded, setLoaded] = useState(false);
  const [activeFormat, setActiveFormat] = useState("all");
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 50); }, []);

  const filtered = activeFormat === "all"
    ? posts
    : posts.filter(p => p.format === activeFormat);

  const featured = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p.id !== featured?.id);

  if (selectedPost) {
    return <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />;
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: C.cream,
      fontFamily: "'Playfair Display', Georgia, serif",
      color: C.black,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Dancing+Script:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Grain */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 100,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Nav */}
      <NavBar />

      {/* Page header */}
      <div style={{
        padding: "32px 20px 0",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
      }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "32px", fontWeight: "400", margin: "0 0 6px",
        }}>The Forum</h1>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "14px", fontStyle: "italic", color: C.muted, margin: "0",
        }}>New drops every Thursday at 8 PM</p>
      </div>

      {/* Format filter */}
      <div style={{
        display: "flex", gap: "6px", padding: "20px 20px 24px",
        overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none",
        opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.2s",
      }}>
        {formats.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFormat(f.id)}
            style={{
              padding: "7px 16px", fontSize: "11px",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: "600", letterSpacing: "1px",
              textTransform: "uppercase", whiteSpace: "nowrap",
              background: activeFormat === f.id ? C.black : "transparent",
              color: activeFormat === f.id ? C.cream : C.dark,
              border: `1px solid ${activeFormat === f.id ? C.black : C.light}`,
              borderRadius: "20px", cursor: "pointer", transition: "all 0.25s",
            }}
          >{f.label}</button>
        ))}
      </div>

      {/* Featured post */}
      {featured && (
        <div
          style={{
            padding: "0 20px", marginBottom: "8px", cursor: "pointer",
            opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.3s",
          }}
          onClick={() => setSelectedPost(featured)}
        >
          <div style={{
            height: featured.h || 260,
            background: featured.bg,
            borderRadius: "12px",
            position: "relative", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              position: "absolute", inset: 0, opacity: 0.05,
              backgroundImage: `repeating-linear-gradient(45deg, ${C.dark} 0, ${C.dark} 1px, transparent 0, transparent 50%)`,
              backgroundSize: "12px 12px",
            }} />
            {featured.format === "vlog" && (
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: `${C.black}BB`, display: "flex",
                alignItems: "center", justifyContent: "center", zIndex: 2,
              }}>
                <div style={{
                  width: 0, height: 0,
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderLeft: `13px solid ${C.cream}`,
                  marginLeft: "2px",
                }} />
              </div>
            )}
            {featured.format !== "vlog" && (
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
                letterSpacing: "2px", color: C.dark, opacity: 0.3, zIndex: 2, position: "relative",
              }}>FEATURED IMAGE</span>
            )}

            {/* Format badge on image */}
            <div style={{
              position: "absolute", top: "12px", left: "12px",
              padding: "4px 12px", borderRadius: "12px",
              background: formatColors[featured.format],
              zIndex: 2,
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "9px",
                fontWeight: "600", letterSpacing: "1.5px",
                textTransform: "uppercase", color: C.cream,
              }}>{featured.format}</span>
            </div>
          </div>

          <div style={{ padding: "14px 0 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "11px",
                color: C.muted,
              }}>{featured.date}</span>
              <span style={{ color: C.palePink }}>·</span>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "11px",
                color: C.light,
              }}>{featured.readTime}</span>
              <span style={{ color: C.palePink }}>·</span>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "11px",
                color: C.light,
              }}>{featured.comments} comments</span>
            </div>
            <h3 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "22px", fontWeight: "400", fontStyle: "italic",
              margin: "0 0 6px", lineHeight: "1.3",
            }}>{featured.title}</h3>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "14px", color: C.muted, margin: 0, lineHeight: "1.5",
            }}>{featured.preview}</p>
          </div>
        </div>
      )}

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", padding: "0 20px 20px", gap: "16px" }}>
        <div style={{ flex: 1, height: "1px", background: C.palePink }} />
        <span style={{ color: C.pink, fontSize: "8px" }}>✦</span>
        <div style={{ flex: 1, height: "1px", background: C.palePink }} />
      </div>

      {/* Archive list */}
      <div style={{
        padding: "0 20px 40px",
        opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.4s",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
          letterSpacing: "2.5px", textTransform: "uppercase", color: C.muted,
          display: "block", marginBottom: "16px",
        }}>ARCHIVE</span>

        {rest.map((post, i) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            style={{
              display: "flex", gap: "14px", cursor: "pointer",
              padding: "16px 0",
              borderBottom: i < rest.length - 1 ? `1px solid ${C.palePink}` : "none",
            }}
          >
            {/* Thumbnail */}
            <div style={{
              width: "80px", height: "80px", flexShrink: 0,
              background: post.bg,
              borderRadius: "8px",
              position: "relative", overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                position: "absolute", inset: 0, opacity: 0.05,
                backgroundImage: `repeating-linear-gradient(45deg, ${C.dark} 0, ${C.dark} 1px, transparent 0, transparent 50%)`,
                backgroundSize: "8px 8px",
              }} />
              {(post.format === "vlog" || post.format === "podcast") && (
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: `${C.black}AA`, display: "flex",
                  alignItems: "center", justifyContent: "center", zIndex: 2,
                }}>
                  <div style={{
                    width: 0, height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: `8px solid ${C.cream}`,
                    marginLeft: "1px",
                  }} />
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <span style={{
                  padding: "2px 8px", borderRadius: "8px",
                  background: formatColors[post.format],
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "8px",
                  fontWeight: "600", letterSpacing: "1.5px",
                  textTransform: "uppercase", color: C.cream,
                }}>{post.format}</span>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "11px", color: C.light,
                }}>{post.date}</span>
              </div>
              <p style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "16px", fontStyle: "italic",
                margin: "0 0 4px", lineHeight: "1.3",
                overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>{post.title}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "11px", color: C.muted,
                }}>{post.readTime}</span>
                <span style={{ color: C.palePink }}>·</span>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "11px", color: C.muted,
                }}>{post.comments} comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <HonestyBox />
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
