import React from "react";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">United Hacks V6</p>
          <div className="footer-links">
            <a href="https://github.com/Sooly64/United-Hacks-V6" className="footer-link">GitHub</a>
            <a href="https://github.com/Sooly64/United-Hacks-V6/blob/main/README.md" className="footer-link">Documentation</a>
            <a href="https://github.com/Sooly64/United-Hacks-V6/issues" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}