// src/components/Layout.js
import React from "react";

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "1rem", background: "#222", color: "white", fontWeight: "bold" }}>
        Hackathon App
      </header>
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
      <footer style={{ padding: "1rem", background: "#eee", textAlign: "center" }}>
        © 2026 Hackathon
      </footer>
    </div>
  );
}