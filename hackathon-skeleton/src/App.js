// src/App.js
import React, { useState } from "react";
import Layout from "./components/Layout.js";
import InputSection from "./components/InputSection.js";
import "./App.css";

function App() {
  // TODO: Implement LinkedIn scraping and networking analysis
  
  return (
    <div className="app-container">
      <Layout>
        <div className="hero-section">
          <h1 className="hero-title">ReachRight</h1>
          <p className="hero-subtitle">
            - LinkedIn Networking Analysis -
          </p>
        </div>
        
        <InputSection />
      </Layout>
    </div>
  );
}

export default App;