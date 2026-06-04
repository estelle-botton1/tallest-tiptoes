import { useState, useEffect } from "react";

var c = {
  rope: "#9B5B3A",
  ink: "#2C2826",
  cream: "#F6F0E8",
};

export default function HeroDynamic() {
  const [phase, setPhase] = useState(0);

  useEffect(function () {
    setTimeout(function () { setPhase(1); }, 100);
    setTimeout(function () { setPhase(2); }, 2000);
    setTimeout(function () { setPhase(3); }, 2800);
  }, []);

  // Rope path matching the reference image exactly:
  // enters left → big loop lower-left → sweeps up to center → 
  // loop right of figure → smaller loop → exits right
  var ropePath = [
    // enter from left edge, slightly angled down
    "M-20 140",
    "C10 145 30 150 50 158",
    // curve down toward big loop
    "C70 166 85 180 90 195",
    // big counterclockwise loop (bottom-left)
    "C95 215 90 235 78 242",
    "C66 249 50 245 42 232",
    "C34 219 38 198 50 182",
    "C62 166 80 152 100 142",
    // sweep upward to center where figure stands
    "C120 132 145 122 175 115",
    "C205 108 240 103 275 100",
    // flatter section under figure
    "C310 97 345 96 375 98",
    // past figure, start descending
    "C405 100 425 105 445 112",
    "C465 120 478 132 485 145",
    // clockwise loop (right side)
    "C492 160 490 178 480 186",
    "C470 194 456 190 452 178",
    "C448 166 454 148 468 138",
    // continue right
    "C482 128 500 120 520 116",
    "C540 112 555 112 570 118",
    // smaller loop
    "C582 124 588 136 585 145",
    "C582 154 572 156 568 148",
    "C564 140 568 128 578 122",
    // exit right
    "C588 116 610 112 640 114",
    "C670 116 700 122 740 128",
  ].join(" ");

  return (
    <div style={{ background: c.cream, padding: "10px 0 0", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "720px",
        margin: "0 auto",
        aspectRatio: "720 / 340",
      }}>
        {/* SVG rope layer */}
        <svg
          viewBox="0 0 720 300"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
            zIndex: 1,
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
            strokeDashoffset={phase >= 1 ? "0" : "2400"}
            style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)" }}
          />
        </svg>

        {/* Girl figure — positioned on the rope */}
        <img
          src="/figure.png"
          alt="Figure on tiptoes"
          style={{
            position: "absolute",
            height: "58%",
            left: "50%",
            bottom: "38%",
            transform: "translateX(-50%)",
            zIndex: 2,
            objectFit: "contain",
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 0.8s ease",
            pointerEvents: "none",
          }}
        />

        {/* Text — Tallest Tiptoes */}
        <svg
          viewBox="0 0 720 300"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          <text
            x="360"
            y="285"
            textAnchor="middle"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "24px",
              fontWeight: "400",
              letterSpacing: "5px",
              fill: c.ink,
              opacity: phase >= 3 ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >Tallest Tiptoes</text>
        </svg>
      </div>
    </div>
  );
}
