import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../src/NavBar";
import HonestyBox from "../src/HonestyBox";
import { client, urlFor } from "../src/sanityClient";
import { useLocation } from "react-router-dom";

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
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(function () {
    client
      .fetch('*[_type == "forumPost"] | order(coalesce(sortOrder, 999) asc, _createdAt desc) { _id, title, format, date, preview, videoUrl, link, image, body, shopLinks }')
      .then(function (data) { setPosts(data); setLoading(false); })
      .catch(function () { setLoading(false); });
  }, []);

  var featured = posts.length > 0 ? posts[0] : null;
  var rest = posts.length > 1 ? posts.slice(1) : [];

  var location = useLocation();

  useEffect(function () {
    if (location.state && location.state.selectedId && posts.length > 0) {
      var matchIndex = posts.findIndex(function (p) { return p._id === location.state.selectedId; });
      if (matchIndex >= 0) setSelectedIndex(matchIndex);
    }
  }, [posts, location.state]);

  if (selectedIndex !== null && posts[selectedIndex]) {
    return (
      <PostDetail
        post={posts[selectedIndex]}
        postIndex={selectedIndex}
        totalPosts={posts.length}
        onClose={function () { setSelectedIndex(null); }}
        onNext={function () {
          if (selectedIndex < posts.length - 1) {
            setSelectedIndex(selectedIndex + 1);
            window.scrollTo(0, 0);
          }
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />
      <NavBar />
      <div style={{ padding: "32px 20px 0" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "36px", fontWeight: "400", margin: "0 0 6px" }}>The Forum</h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontStyle: "italic", color: c.muted, margin: "0" }}>New drops every Thursday at 8 PM</p>
      </div>
      {loading && (<div style={{ padding: "60px 20px", textAlign: "center" }}><p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: c.muted, fontStyle: "italic" }}>Loading...</p></div>)}
      {!loading && posts.length === 0 && (<div style={{ padding: "60px 20px", textAlign: "center" }}><p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.muted, fontStyle: "italic" }}>Coming soon</p></div>)}
      {featured && (
        <div style={{ padding: "24px 20px 0", cursor: "pointer" }} onClick={function () { setSelectedIndex(0); }}>
          <div style={{ height: "240px", borderRadius: "3px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: featured.image ? "none" : "linear-gradient(135deg, " + c.parchment + ", " + c.warm + "88)" }}>
            {featured.image && (<img src={urlFor(featured.image).width(800).url()} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />)}
            <div style={{ position: "absolute", top: "12px", left: "12px", padding: "4px 12px", background: formatColors[featured.format] || c.red, borderRadius: "2px" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "9px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: c.cream }}>{featured.format || "POST"}</span>
            </div>
          </div>
          <div style={{ padding: "14px 0" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: c.red }}>{featured.format || "POST"}{featured.date ? " \u00B7 " + new Date(featured.date).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : ""}</span>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "24px", fontWeight: "400", fontStyle: "italic", margin: "6px 0 6px", lineHeight: "1.3" }}>{featured.title}</h3>
            {featured.preview && (<p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: c.muted, margin: 0, lineHeight: "1.5" }}>{featured.preview}</p>)}
          </div>
        </div>
      )}
      {rest.length > 0 && (<div style={{ display: "flex", alignItems: "center", padding: "8px 20px 16px", gap: "16px" }}><div style={{ flex: 1, height: "1px", background: c.pale }} /><div style={{ flex: 1, height: "1px", background: c.pale }} /></div>)}
      {rest.length > 0 && (
        <div style={{ padding: "0 20px" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted, display: "block", marginBottom: "16px" }}>ARCHIVE</span>
          {rest.map(function (post, i) {
            var actualIndex = i + 1;
            return (
              <div key={post._id} onClick={function () { setSelectedIndex(actualIndex); }} style={{ display: "flex", gap: "14px", cursor: "pointer", padding: "16px 0", borderBottom: i < rest.length - 1 ? "1px solid " + c.pale : "none" }}>
                <div style={{ width: "80px", height: "80px", flexShrink: 0, borderRadius: "3px", overflow: "hidden", background: post.image ? "none" : "linear-gradient(135deg, " + c.parchment + ", " + c.warm + ")", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {post.image ? (<img src={urlFor(post.image).width(200).height(200).url()} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />) : (<span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", color: c.muted, opacity: 0.4 }}>IMAGE</span>)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <span style={{ padding: "2px 8px", borderRadius: "2px", background: formatColors[post.format] || c.red, fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", color: c.cream }}>{post.format || "POST"}</span>
                    {post.date && (<span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.light }}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>)}
                  </div>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", fontStyle: "italic", margin: "0 0 4px", lineHeight: "1.3", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</p>
                  {post.preview && (<p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.preview}</p>)}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div style={{ padding: "20px 0" }} />
      <HonestyBox />
      <footer style={{ padding: "24px 24px 40px", textAlign: "center", borderTop: "1px solid " + c.pale }}><p style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", color: c.black, margin: "0" }}>Tallest Tiptoes</p></footer>
    </div>
  );
}

function renderBlockText(block, i) {
  if (block._type === "block" && block.children) {
    var children = block.children.map(function (child, j) {
      var text = child.text;
      if (!text) return null;
      if (child.marks && child.marks.length > 0 && block.markDefs) {
        var linkMark = null;
        child.marks.forEach(function (markKey) { block.markDefs.forEach(function (def) { if (def._key === markKey && def._type === "link") { linkMark = def; } }); });
        if (linkMark) { return (<a key={j} href={linkMark.href} target="_blank" rel="noopener noreferrer" style={{ color: c.red, textDecoration: "underline", textUnderlineOffset: "3px" }}>{text}</a>); }
        var isBold = child.marks.indexOf("strong") >= 0;
        var isItalic = child.marks.indexOf("em") >= 0;
        if (isBold || isItalic) { return <span key={j} style={{ fontWeight: isBold ? "600" : "inherit", fontStyle: isItalic ? "italic" : "inherit" }}>{text}</span>; }
      }
      return <span key={j}>{text}</span>;
    });
    if (block.style === "h2") { return <h2 key={i} style={{ fontFamily: "'DM Serif Display', serif", fontSize: "24px", fontWeight: "400", margin: "28px 0 10px", color: c.black }}>{children}</h2>; }
    if (block.style === "h3") { return <h3 key={i} style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontWeight: "400", margin: "24px 0 8px", color: c.black }}>{children}</h3>; }
    if (block.style === "blockquote") { return (<div key={i} style={{ padding: "20px", margin: "20px 0", borderLeft: "3px solid " + c.red, borderRight: "3px solid " + c.red, textAlign: "center" }}><p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", fontStyle: "italic", color: c.ink, margin: 0, lineHeight: "1.4" }}>{children}</p></div>); }
    return <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: c.ink, margin: "0 0 18px", lineHeight: "1.7" }}>{children}</p>;
  }
  if (block._type === "image" && block.asset) { return (<div key={i} style={{ margin: "24px 0", borderRadius: "3px", overflow: "hidden" }}><img src={urlFor(block).width(800).url()} alt="" style={{ width: "100%", height: "auto", display: "block" }} /></div>); }
  return null;
}

function PostDetail({ post, postIndex, totalPosts, onClose, onNext }) {
  var isVideo = post.format === "Vlog";
  var hasNext = postIndex < totalPosts - 1;
  return (
    <div style={{ minHeight: "100vh", background: c.cream, fontFamily: "'Playfair Display', Georgia, serif", color: c.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid " + c.pale, position: "sticky", top: 0, background: c.cream + "F2", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", zIndex: 10 }}>
        <span onClick={onClose} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: c.muted, cursor: "pointer" }}>Back</span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: c.black }}>The Forum</span>
        <div style={{ width: "40px" }} />
      </div>
      <div style={{ height: "300px", overflow: "hidden", background: post.image ? "none" : "linear-gradient(135deg, " + c.parchment + ", " + c.warm + "88)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {post.image ? (<img src={urlFor(post.image).width(1000).url()} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />) : isVideo && post.videoUrl ? (<a href={post.videoUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}><div style={{ width: "56px", height: "56px", borderRadius: "50%", background: c.black + "CC", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "16px solid " + c.cream, marginLeft: "3px" }} /></div></a>) : null}
      </div>
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <span style={{ padding: "3px 10px", fontSize: "9px", fontFamily: "'Cormorant Garamond', serif", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", background: formatColors[post.format] || c.red, color: c.cream, borderRadius: "2px" }}>{post.format || "POST"}</span>
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "30px", fontWeight: "400", margin: "0 0 8px", lineHeight: "1.25" }}>{post.title}</h1>
        {post.date && (<p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontStyle: "italic", color: c.muted, margin: "0", paddingBottom: "20px", borderBottom: "1px solid " + c.pale }}>{new Date(post.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>)}
      </div>
      {isVideo && post.videoUrl && (<div style={{ padding: "20px" }}><a href={post.videoUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: "14px", background: c.black, borderRadius: "3px", textDecoration: "none" }}><span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", color: c.cream }}>WATCH VIDEO</span></a></div>)}
      <div style={{ padding: "24px 20px" }}>
        {post.body && post.body.map(function (block, i) { return renderBlockText(block, i); })}
        {!post.body && post.preview && (<p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: c.ink, lineHeight: "1.7" }}>{post.preview}</p>)}
      </div>
      {post.link && (<div style={{ padding: "0 20px 24px" }}><a href={post.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}><div style={{ textAlign: "center", padding: "14px", border: "1px solid " + c.black, borderRadius: "3px", cursor: "pointer" }}><span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", color: c.black }}>READ MORE</span></div></a></div>)}
      {post.shopLinks && post.shopLinks.length > 0 && (
        <div style={{ padding: "0 20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: c.muted }}>SHOP THE POST</span>
            <div style={{ flex: 1, height: "1px", background: c.pale }} />
          </div>
          {post.shopLinks.map(function (item, i) {
            var itemContent = (
              <div style={{ display: "flex", alignItems: "stretch", marginBottom: "8px", borderRadius: "3px", overflow: "hidden", border: "1px solid " + c.pale, background: c.white, cursor: item.link ? "pointer" : "default" }}>
                <div style={{ width: "70px", flexShrink: 0, overflow: "hidden", background: item.image ? "none" : "linear-gradient(135deg, " + c.pale + ", " + c.warm + "44)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.image ? (<img src={urlFor(item.image).width(200).url()} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />) : (<span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8px", color: c.muted, opacity: 0.4 }}>PHOTO</span>)}
                </div>
                <div style={{ padding: "10px 14px", flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "14px", fontStyle: "italic", margin: "0 0 2px", color: c.black }}>{item.name}</p>
                    {item.brand && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.muted }}>{item.brand}</span>}
                  </div>
                  {item.price && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: "600", color: c.red }}>{item.price}</span>}
                </div>
              </div>
            );
            if (item.link) { return <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>{itemContent}</a>; }
            return <div key={i}>{itemContent}</div>;
          })}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", padding: "0 20px 24px", gap: "16px" }}><div style={{ flex: 1, height: "1px", background: c.pale }} /><div style={{ flex: 1, height: "1px", background: c.pale }} /></div>
      <div style={{ padding: "0 20px 32px" }}>
        {hasNext ? (
          <div onClick={onNext} style={{ textAlign: "center", padding: "16px", background: c.black, borderRadius: "3px", cursor: "pointer" }}><span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", color: c.cream }}>NEXT ARTICLE</span></div>
        ) : (
          <Link to="/" style={{ textDecoration: "none" }}><div style={{ textAlign: "center", padding: "16px", background: c.black, borderRadius: "3px", cursor: "pointer" }}><span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", color: c.cream }}>RETURN TO HOME</span></div></Link>
        )}
      </div>
      <HonestyBox />
      
      <footer style={{ padding: "32px 24px 48px", textAlign: "center", borderTop: "1px solid " + c.pale }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "24px", color: c.black, margin: "0 0 16px" }}>Tallest Tiptoes</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "20px" }}>
          <a href="https://www.instagram.com/tallest_tiptoesss" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, textDecoration: "none" }}>Instagram</a>
          <a href="https://substack.com/@sophiazami" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, textDecoration: "none" }}>Substack</a>
          <a href="https://shopmy.us/sophiazami/closet" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: c.muted, textDecoration: "none" }}>ShopMy</a>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: c.light, margin: 0 }}>2026 Tallest Tiptoes</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "12px" }}>
          <Link to="/privacy-policy" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", color: c.light, textDecoration: "none" }}>Privacy Policy</Link>
          <Link to="/terms-and-conditions" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", color: c.light, textDecoration: "none" }}>Terms & Conditions</Link>
        </div>
      </footer>
    </div>
  );
}