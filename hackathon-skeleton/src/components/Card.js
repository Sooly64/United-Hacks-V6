// src/components/Card.js
import React from "react";

export default function Card({ title, children }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      boxShadow: "2px 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
