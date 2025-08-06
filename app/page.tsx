"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const mainColors = ["#ff4f8b", "#ff2e63"]; // pink, red
const accents = ["#3ec6ff", "#ffb347", "#ffe156", "#53ff7c"]; // blue, orange, yellow, green

export default function Home() {
  const logoRef = useRef<SVGSVGElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // GSAP removed, so no animation in useEffect
  useEffect(() => {}, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Store email in localStorage for demo purposes
    localStorage.setItem("waitlist-" + email, email);
    setSubmitted(true);
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        fontFamily: '"Pixelify Sans", sans-serif',
        background: `
          repeating-linear-gradient(
            135deg,
            ${mainColors[0]},
            ${mainColors[1]} 40px,
            ${accents[0]} 80px,
            ${accents[1]} 120px,
            ${accents[2]} 160px,
            ${accents[3]} 200px
          )
        `,
      }}
    >
      <div
        className="rounded-2xl shadow-xl flex flex-col items-center justify-center"
        style={{
          width: "375px",
          height: "667px",
          border: "8px solid #fff",
          boxShadow: "0 0 32px rgba(0,0,0,0.2)",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(2px)",
        }}
      >
        {/* Logo */}
        <svg
          ref={logoRef}
          width="80"
          height="80"
          viewBox="0 0 80 80"
          style={{ marginBottom: "16px", imageRendering: "pixelated" }}
        >
          <rect x="20" y="20" width="40" height="40" rx="8" fill="#ff4f8b" />
          <text
            x="40"
            y="50"
            textAnchor="middle"
            fontFamily="'Pixelify Sans', monospace"
            fontSize="36"
            fill="#fff"
            style={{ fontWeight: "bold", letterSpacing: "-2px" }}
          >
            t.
          </text>
        </svg>
        <h1
          className="text-3xl font-bold mb-2"
          style={{
            color: "#fff",
            textShadow: "2px 2px 0 #ff2e63, 4px 4px 0 #3ec6ff",
            fontFamily: '"Pixelify Sans", sans-serif',
            letterSpacing: "2px",
          }}
        >
          taKe Waitlist
        </h1>
        <p
          className="mb-6 text-center"
          style={{
            color: "#fff",
            fontSize: "1.1rem",
            textShadow: "1px 1px 0 #ffb347",
          }}
        >
          Sign up to be the first to try taKe!
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full px-8"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 px-4 py-2 rounded-lg border-2 border-pink-400 text-lg"
            style={{
              fontFamily: '"Pixelify Sans", monospace',
              background: "#fff",
              color: "#ff2e63",
              boxShadow: "0 2px 8px rgba(255,47,99,0.15)",
            }}
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg font-bold text-lg"
            style={{
              background: "linear-gradient(90deg,#ff4f8b,#ff2e63)",
              color: "#fff",
              border: "none",
              boxShadow: "0 2px 8px rgba(62,198,255,0.15)",
              fontFamily: '"Pixelify Sans", monospace',
              cursor: "pointer",
            }}
          >
            {submitted ? "Added!" : "Join Waitlist"}
          </button>
        </form>
        {submitted && (
          <div
            className="mt-4 text-center"
            style={{
              color: accents[3],
              fontFamily: '"Pixelify Sans", monospace',
              fontWeight: "bold",
            }}
          >
            Thanks for joining!
          </div>
        )}
      </div>
    </div>
  );
}
