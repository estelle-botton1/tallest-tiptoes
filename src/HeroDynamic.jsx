import { useState, useEffect } from "react";

var c = {
  rope: "#9B5B3A",
  ink: "#2C2826",
  cream: "#F6F0E8",
};

export default function HeroDynamic() {
  const [drawRope, setDrawRope] = useState(false);
  const [showSig, setShowSig] = useState(false);

  useEffect(function () {
    setTimeout(function () { setDrawRope(true); }, 100);
    setTimeout(function () { setShowSig(true); }, 2000);
  }, []);

  const [sigLen, setSigLen] = useState(0);
  var sigText = "xx tallest tiptoes";

  useEffect(function () {
    if (!showSig) return;
    if (sigLen >= sigText.length) return;
    var timer = setTimeout(function () {
      setSigLen(sigLen + 1);
    }, 120);
    return function () { clearTimeout(timer); };
  }, [showSig, sigLen]);

  var ropePath = [
    "M-20 135",
    "C20 135 60 135 100 135",
    "C130 135 150 140 165 150",
    "C180 160 188 178 185 195",
    "C182 215 170 228 155 230",
    "C140 232 128 222 125 205",
    "C122 188 130 168 145 155",
    "C160 142 180 135 210 130",
    "C240 125 270 122 300 120",
    "C330 118 360 118 390 120",
    "C420 122 445 128 465 135",
    "C480 142 490 155 492 168",
    "C494 182 488 195 478 198",
    "C468 201 458 194 456 180",
    "C454 166 460 152 472 142",
    "C484 132 500 128 520 126",
    "C535 124 545 130 548 142",
    "C551 154 546 164 538 166",
    "C530 168 526 160 527 148",
    "C528 136 535 128 548 126",
    "C565 124 590 124 630 126",
    "C670 128 710 132 750 135",
  ].join(" ");

  return (
    <div style={{ background: c.cream, padding: "10px 0 0", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "720px",
        margin: "0 auto",
        aspectRatio: "720 / 350",
      }}>
        <svg
          viewBox="0 0 720 300"
          style={{
            position: "absolute",
            top: 0, left: 0, width: "100%", height: "auto", zIndex: 1,
          }}
        >
          <path
            d={ropePath}
            stroke={c.rope}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2400"
            strokeDashoffset={drawRope ? "0" : "2400"}
            style={{ transition: "stroke-dashoffset 9.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
          />
        </svg>

        <img
          src="/figure.png"
          alt="Figure on tiptoes"
          style={{
            position: "absolute",
            height: "55%",
            left: "50%",
            transform: "translateX(-50%)",
            top: "0.5%",
            zIndex: 2,
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />

     {/* Handwritten signature — one letter at a time */}
     <div style={{
          position: "absolute",
          bottom: "3%",
          right: "8%",
          zIndex: 3,
        }}>
          <span style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "20px",
            fontWeight: "400",
            color: c.ink,
          }}>{sigText.slice(0, sigLen)}</span>
        </div>
      </div>
    </div>
  );
}