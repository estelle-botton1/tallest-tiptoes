import { useState, useEffect } from "react";
import NavBar from "../src/NavBar";
import HonestyBox from "../src/HonestyBox";
import { client, urlFor } from "../src/sanityClient";

var c = {
  red: "#A33B2E",
  oldRose: "#B98589",
  ink: "#3D3633",
  black: "#1A1A1A",
  cream: "#F6F0E8",
  parchment: "#EDE4D8",
  warm: "#E0D2C2",
  pale: "#EAE2D8",
  muted: "#8A7E72",
  light: "#B8AA9C",
  white: "#FBF8F4",
};

var formatColors = {
  Essay: c.red,
  Vlog: c.ink,
  "Movie Rec": c.oldRose,
  Podcast: c.ink,
  "Photo Essay": c.muted,
};

export default function TheForum() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(function () {
    client
      .fetch(
        '*[_type == "forumPost"] | order(coalesce(sortOrder, 999) asc, _createdAt desc)) { _id, title, format, date, preview, videoUrl, image, body }'
      )
      .then(function (data) {
        setPosts(data);
        setLoading(false);
      })
      .catch(function () {
        setLoading(false);
      });
  }, []);

  var featured = posts.length > 0 ? posts[0] : null;
  var rest = posts.length > 1 ? posts.slice(1) : [];

  if (selectedPost) {
    return (
      <PostDetail post={selectedPost} onClose={function () { setSelectedPost(null); }} />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />

      <NavBar />

      {/* Page header */}
      <div style={{ padding: "32px 20px 0" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", fontWeight: "400", margin: "0 0 6px" }}>The Forum</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.muted, margin: "0" }}>New drops every Thursday at 8 PM</p>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.muted, fontStyle: "italic" }}>Loading...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && posts.length === 0 && (
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.muted, fontStyle: "italic" }}>Coming soon</p>
        </div>
      )}

      {/* Featured post */}
      {featured && (
        <div style={{ padding: "24px 20px 0", cursor: "pointer" }} onClick={function () { setSelectedPost(featured); }}>
          <div style={{
            height: "240px", borderRadius: "3px", position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            background: featured.image ? "none" : "linear-gradient(135deg, " + c.parchment + ", " + c.warm + "88)",
          }}>
            {featured.image && (
              <img src={urlFor(featured.image).width(800).url()} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
            <div style={{ position: "absolute", top: "12px", left: "12px", padding: "4px 12px", background: formatColors[featured.format] || c.red, borderRadius: "2px" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: c.cream }}>{featured.format || "POST"}</span>
            </div>
          </div>

          <div style={{ padding: "14px 0" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: c.red }}>
              {featured.format || "POST"}{featured.date ? " \u00B7 " + new Date(featured.date).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : ""}
            </span>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontWeight: "400", fontStyle: "italic", margin: "6px 0 6px", lineHeight: "1.3" }}>{featured.title}</h3>
            {featured.preview && (
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.muted, margin: 0, lineHeight: "1.5" }}>{featured.preview}</p>
            )}
          </div>
        </div>
      )}

      {/* Divider */}
      {rest.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", padding: "8px 20px 16px", gap: "16px" }}>
          <div style={{ flex: 1, height: "1px", background: c.pale }} />
          <div style={{ flex: 1, height: "1px", background: c.pale }} />
        </div>
      )}

      {/* Archive list */}
      {rest.length > 0 && (
        <div style={{ padding: "0 20px" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted, display: "block", marginBottom: "16px" }}>ARCHIVE</span>

          {rest.map(function (post, i) {
            return (
              <div key={post._id} onClick={function () { setSelectedPost(post); }} style={{ display: "flex", gap: "14px", cursor: "pointer", padding: "16px 0", borderBottom: i < rest.length - 1 ? "1px solid " + c.pale : "none" }}>
                <div style={{
                  width: "80px", height: "80px", flexShrink: 0, borderRadius: "3px", overflow: "hidden",
                  background: post.image ? "none" : "linear-gradient(135deg, " + c.parchment + ", " + c.warm + ")",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {post.image ? (
                    <img src={urlFor(post.image).width(200).height(200).url()} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", color: c.muted, opacity: 0.4 }}>IMAGE</span>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <span style={{ padding: "2px 8px", borderRadius: "2px", background: formatColors[post.format] || c.red, fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: c.cream }}>{post.format || "POST"}</span>
                    {post.date && (
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.light }}>
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", fontStyle: "italic", margin: "0 0 4px", lineHeight: "1.3", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</p>
                  {post.preview && (
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.preview}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ padding: "20px 0" }} />
      <HonestyBox />

      {/* Footer */}
      <footer style={{ padding: "24px 24px 40px", textAlign: "center", borderTop: "1px solid " + c.pale }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: c.black, margin: "0" }}>Tallest Tiptoes</p>
      </footer>
    </div>
  );
}

function PostDetail({ post, onClose }) {
  var isVideo = post.format === "Vlog";

  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid " + c.pale, position: "sticky", top: 0, background: c.cream + "F2", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", zIndex: 10 }}>
        <span onClick={onClose} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, cursor: "pointer" }}>Back</span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: c.black }}>The Forum</span>
        <div style={{ width: "40px" }} />
      </div>

      {/* Hero image */}
      <div style={{
        height: "300px", overflow: "hidden",
        background: post.image ? "none" : "linear-gradient(135deg, " + c.parchment + ", " + c.warm + "88)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {post.image ? (
          <img src={urlFor(post.image).width(1000).url()} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : isVideo && post.videoUrl ? (
          <a href={post.videoUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: c.black + "CC", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "16px solid " + c.cream, marginLeft: "3px" }} />
            </div>
          </a>
        ) : null}
      </div>

      {/* Article meta */}
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <span style={{ padding: "3px 10px", fontSize: "9px", fontFamily: "'Cormorant Garamond', serif", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", background: formatColors[post.format] || c.red, color: c.cream, borderRadius: "2px" }}>{post.format || "POST"}</span>
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", fontWeight: "400", margin: "0 0 8px", lineHeight: "1.25" }}>{post.title}</h1>
        {post.date && (
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: c.muted, margin: "0", paddingBottom: "20px", borderBottom: "1px solid " + c.pale }}>
            {new Date(post.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        )}
      </div>

      {/* Video link */}
      {isVideo && post.videoUrl && (
        <div style={{ padding: "20px" }}>
          <a href={post.videoUrl} target="_blank" rel="noopener noreferrer" style={{
            display: "block", textAlign: "center", padding: "14px", background: c.black, borderRadius: "3px", textDecoration: "none",
          }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", color: c.cream }}>WATCH VIDEO</span>
          </a>
        </div>
      )}

      {/* Body content */}
      <div style={{ padding: "24px 20px" }}>
        {post.body && post.body.map(function (block, i) {
          if (block._type === "block" && block.children) {
            var text = block.children.map(function (child) { return child.text; }).join("");
            if (block.style === "h2") {
              return <h2 key={i} style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", fontWeight: "400", margin: "24px 0 8px", color: c.black }}>{text}</h2>;
            }
            if (block.style === "blockquote") {
              return (
                <div key={i} style={{ padding: "20px", margin: "16px 0", borderLeft: "3px solid " + c.red, borderRight: "3px solid " + c.red, textAlign: "center" }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", fontStyle: "italic", color: c.ink, margin: 0, lineHeight: "1.4" }}>{text}</p>
                </div>
              );
            }
            return <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: c.ink, margin: "0 0 16px", lineHeight: "1.7" }}>{text}</p>;
          }
          if (block._type === "image" && block.asset) {
            return (
              <div key={i} style={{ margin: "20px 0", borderRadius: "3px", overflow: "hidden" }}>
                <img src={urlFor(block).width(800).url()} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            );
          }
          return null;
        })}

        {!post.body && post.preview && (
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.ink, lineHeight: "1.7" }}>{post.preview}</p>
        )}
      </div>

      <HonestyBox />

      <footer style={{ padding: "24px 24px 40px", textAlign: "center", borderTop: "1px solid " + c.pale }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: c.black, margin: "0" }}>Tallest Tiptoes</p>
      </footer>
    </div>
  );
}
