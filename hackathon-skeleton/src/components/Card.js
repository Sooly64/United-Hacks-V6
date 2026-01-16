// src/components/Card.js
import React from "react";
import "./Card.css";

export default function Card({ title, children, badge, className = "" }) {
  const cardClasses = `card ${className}`.trim();
  
  return (
    <div className={cardClasses}>
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        {badge && <span className="card-badge">{badge}</span>}
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}
