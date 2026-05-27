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

const tabs = [
  { id: "all", label: "All" },
  { id: "made", label: "Made by Me" },
  { id: "collected", label: "Collected" },
  { id: "closet", label: "My Closet" },
];

const products = [
  { id: 1, cat: "made", title: "Evening Bag — Noir", price: "$120", status: "available", edition: "1 of 1", bg: `linear-gradient(160deg, #E8E0D6, #D8CFC5)` },
  { id: 2, cat: "made", title: "Evening Bag — Blush", price: "$120", status: "sold", edition: "1 of 1", bg: `linear-gradient(160deg, #F0E6E0, #E5D9D2)` },
  { id: 3, cat: "collected", title: "Parisian Barrettes", price: "$28", status: "available", edition: "8 sets left", location: "Paris", bg: `linear-gradient(160deg, #EDE5DD, #E0D6CC)` },
  { id: 4, cat: "collected", title: "Vintage Leather Belt", price: "$45", status: "available", edition: "3 left", location: "Lisbon", bg: `linear-gradient(160deg, #E6DDD5, #DDD3C9)` },
  { id: 5, cat: "collected", title: "Ceramic Dish Set", price: "$62", status: "sold", edition: "Set of 4", location: "Oaxaca", bg: `linear-gradient(160deg, #ECE4DB, #E2D9CF)` },
  { id: 6, cat: "closet", title: "Silk Scarf — Floral", price: "$55", status: "available", edition: "From my closet", bg: `linear-gradient(160deg, #F0E8E2, #E8DFD7)` },
  { id: 7, cat: "closet", title: "Wool Blazer — Navy", price: "$140", status: "available", edition: "From my closet", bg: `linear-gradient(160deg, #E4DCD4, #DCD3CA)` },
  { id: 8, cat: "made", title: "Evening Bag — Olive", price: "$135", status: "coming", edition: "1 of 1", bg: `linear-gradient(160deg, #E0D8CE, #D6CCC2)` },
  { id: 9, cat: "collected", title: "Woven Straw Basket", price: "$38", status: "available", edition: "5 left", location: "Marrakech", bg: `linear-gradient(160deg, #EBE3DA, #E1D8CE)` },
  { id: 10, cat: "closet", title: "Linen Trousers — Tan", price: "$75", status: "available", edition: "From my closet", bg: `linear-gradient(160deg, #EDE6DE, #E4DCD3)` },
];

function ProductDetail({ product, onClose }) {
  const catLabels = { made: "Made by Me", collected: "Collected", closet: "From My Closet" };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: C.cream, overflowY: "auto",
      WebkitOverflowScrolling: "touch",
    }}>
      {/* Header */}
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
        }}>Collected</span>
        <div style={{ width: "40px" }} />
      </div>

      {/* Main product image */}
      <div style={{
        height: "420px", background: product.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
          letterSpacing: "2px", color: C.muted, opacity: 0.4,
        }}>PRODUCT PHOTO</span>
        {product.status === "sold" && (
          <div style={{
            position: "absolute", top: "16px", right: "16px",
            padding: "5px 14px", background: C.black, borderRadius: "3px",
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
              fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: C.cream,
            }}>Sold Out</span>
          </div>
        )}
      </div>

      {/* Thumbnail row */}
      <div style={{ display: "flex", gap: "6px", padding: "10px 20px" }}>
        {[1, 2, 3, 4].map(n => (
          <div key={n} style={{
            flex: 1, height: "60px", background: product.bg,
            border: n === 1 ? `2px solid ${C.dark}` : `1px solid ${C.palePink}`,
            opacity: n === 1 ? 1 : 0.6,
          }} />
        ))}
      </div>

      {/* Product info */}
      <div style={{ padding: "24px 20px 0" }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "11px",
          color: C.muted, fontStyle: "italic",
        }}>{catLabels[product.cat]}</span>

        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "26px", fontWeight: "400",
          margin: "6px 0 8px", lineHeight: "1.25",
        }}>{product.title}</h1>

        <div style={{
          display: "flex", alignItems: "baseline", gap: "12px",
          paddingBottom: "20px", borderBottom: `1px solid ${C.palePink}`,
        }}>
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "22px", color: C.softBlack,
          }}>{product.price}</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "12px", color: C.light, fontStyle: "italic",
          }}>{product.edition}</span>
        </div>
      </div>

      {/* Story */}
      <div style={{ padding: "20px" }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
          letterSpacing: "2px", textTransform: "uppercase", color: C.muted,
        }}>THE STORY</span>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "15px", fontStyle: "italic", color: C.dark,
          margin: "8px 0 0", lineHeight: "1.65",
        }}>
          This is where you tell the story behind this piece — where you found it, why it matters, how it was made. A few sentences that make it personal.
        </p>
        {product.location && (
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "12px", color: C.muted, margin: "12px 0 0",
            letterSpacing: "0.5px",
          }}>Found in {product.location}</p>
        )}
      </div>

      {/* Process photos for Made by Me */}
      {product.cat === "made" && (
        <div style={{ padding: "0 20px 20px" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
            letterSpacing: "2px", textTransform: "uppercase", color: C.muted,
            display: "block", marginBottom: "10px",
          }}>THE PROCESS</span>
          <div style={{ display: "flex", gap: "6px" }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{
                flex: 1, height: "110px",
                background: `linear-gradient(160deg, #E8E0D6, #DDD4CA)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "8px",
                  letterSpacing: "1px", color: C.muted, opacity: 0.4,
                }}>STEP {n}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ padding: "4px 20px 20px" }}>
        {product.status === "available" && (
          <div style={{
            textAlign: "center", padding: "15px",
            background: C.black, cursor: "pointer",
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "12px", fontWeight: "600",
              letterSpacing: "2px", textTransform: "uppercase", color: C.cream,
            }}>ADD TO BAG</span>
          </div>
        )}
        {product.status === "sold" && (
          <div style={{
            textAlign: "center", padding: "15px",
            background: C.light,
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "12px", fontWeight: "600",
              letterSpacing: "2px", textTransform: "uppercase", color: C.white,
            }}>SOLD OUT</span>
          </div>
        )}
        {product.status === "coming" && (
          <div style={{
            textAlign: "center", padding: "15px",
            border: `1px solid ${C.black}`, cursor: "pointer",
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "12px", fontWeight: "600",
              letterSpacing: "2px", textTransform: "uppercase", color: C.black,
            }}>NOTIFY ME</span>
          </div>
        )}
      </div>

      {/* You might also like */}
      <div style={{ padding: "20px 20px 40px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px",
        }}>
          <div style={{ flex: 1, height: "1px", background: C.palePink }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
            letterSpacing: "2px", textTransform: "uppercase", color: C.muted,
          }}>YOU MIGHT ALSO LIKE</span>
          <div style={{ flex: 1, height: "1px", background: C.palePink }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[1, 2].map(n => (
            <div key={n}>
              <div style={{
                aspectRatio: "1", background: `linear-gradient(160deg, #EDE5DD, #E2D9CF)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "9px",
                  letterSpacing: "1px", color: C.muted, opacity: 0.3,
                }}>PHOTO</span>
              </div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "13px", margin: "8px 0 2px", color: C.softBlack,
              }}>Another Item</p>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "13px", color: C.muted,
              }}>$XX</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CollectedShop() {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 50); }, []);

  const filtered = activeTab === "all"
    ? products
    : products.filter(p => p.cat === activeTab);

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />;
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: C.cream,
      fontFamily: "'Playfair Display', Georgia, serif",
      color: C.black,
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
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "13px", color: C.muted, cursor: "pointer",
        }}>← Home</span>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "18px", color: C.black,
        }}>Tallest Tiptoes</span>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "13px", color: C.dark, cursor: "pointer",
        }}>Bag (0)</span>
      </nav>

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
        }}>Collected</h1>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "14px", fontStyle: "italic", color: C.muted, margin: "0",
        }}>Things I've made, found & loved</p>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: "0", padding: "20px 20px 0",
        borderBottom: `1px solid ${C.palePink}`,
        overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none",
        opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.2s",
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 16px 12px",
              fontSize: "12px",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: "500",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
              background: "transparent",
              color: activeTab === tab.id ? C.black : C.muted,
              border: "none",
              borderBottom: activeTab === tab.id ? `2px solid ${C.black}` : "2px solid transparent",
              cursor: "pointer",
              transition: "all 0.25s",
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* Item count + sort */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 20px",
        opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.25s",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "12px", color: C.light,
        }}>{filtered.length} items</span>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "12px", color: C.muted, cursor: "pointer",
        }}>Newest first ↓</span>
      </div>

      {/* Product grid — clean 2-column */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px 12px",
        padding: "0 20px",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s 0.3s",
      }}>
        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            style={{ cursor: "pointer" }}
          >
            {/* Product image — square, uniform */}
            <div style={{
              aspectRatio: "1",
              background: product.bg,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "9px",
                letterSpacing: "1.5px", color: C.muted, opacity: 0.3,
              }}>PHOTO</span>

              {/* Status badge — top right like Roweam */}
              {product.status === "sold" && (
                <div style={{
                  position: "absolute", top: "8px", right: "8px",
                  padding: "3px 8px", background: C.black,
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "9px",
                    fontWeight: "600", letterSpacing: "1px",
                    textTransform: "uppercase", color: C.cream,
                  }}>Sold Out</span>
                </div>
              )}
              {product.status === "coming" && (
                <div style={{
                  position: "absolute", top: "8px", right: "8px",
                  padding: "3px 8px", background: C.deepPink,
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "9px",
                    fontWeight: "600", letterSpacing: "1px",
                    textTransform: "uppercase", color: C.cream,
                  }}>Coming Soon</span>
                </div>
              )}
            </div>

            {/* Product info — clean, below image */}
            <div style={{ padding: "10px 0" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "13px",
                margin: "0 0 2px",
                color: C.softBlack,
                lineHeight: "1.3",
              }}>{product.title}</p>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
              }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px", color: C.dark,
                }}>{product.price}</span>
                {product.location && (
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "11px", fontStyle: "italic", color: C.light,
                  }}>{product.location}</span>
                )}
              </div>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "11px", fontStyle: "italic", color: C.light,
              }}>{product.edition}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Drop notification */}
      <div style={{
        padding: "40px 20px",
        opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.4s",
      }}>
        <div style={{
          background: C.black, padding: "28px 24px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-30px", right: "-30px",
            width: "120px", height: "120px", borderRadius: "50%",
            background: `radial-gradient(circle, ${C.deepPink}15, transparent)`,
          }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "10px",
            letterSpacing: "3px", textTransform: "uppercase", color: C.deepPink,
          }}>DON'T MISS A DROP</span>
          <h3 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "20px", fontWeight: "400", fontStyle: "italic",
            color: C.cream, margin: "8px 0 16px",
          }}>Get notified first</h3>
          <div style={{ display: "flex", gap: "0" }}>
            <div style={{
              flex: 1, padding: "11px 14px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRight: "none",
              display: "flex", alignItems: "center",
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "13px", fontStyle: "italic", color: C.light, opacity: 0.4,
              }}>Your email</span>
            </div>
            <div style={{
              padding: "11px 20px",
              background: C.deepPink,
              display: "flex", alignItems: "center", cursor: "pointer",
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "11px", fontWeight: "600",
                letterSpacing: "1.5px", textTransform: "uppercase", color: C.cream,
              }}>JOIN</span>
            </div>
          </div>
        </div>
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
