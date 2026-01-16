// src/App.js
import React from "react";
import Layout from "./components/Layout";
import Card from "./components/Card";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Layout>
        <div className="hero-section">
          <h1 className="hero-title">Hackathon Skeleton</h1>
          <p className="hero-subtitle">
            We make our hackathon project here. might change alot
          </p>
        </div>

        <div className="cards-grid">
          <Card title="Example Card 1" badge="Featured?">
            <div className="card-content">
              <p>Example content block 1</p>
              <p>paragraph text paragraph text</p>
            </div>
            <div className="card-actions">
              <button className="card-button">Get Started</button>
              <button className="card-button card-button-secondary">Learn More (doesnt do anything XD)</button>
            </div>
          </Card>

          <Card title="Example Card 2" badge="New?">
            <div className="card-content">
              <p>Example content block 2 electric boogalo</p>
              <p>paragraph text paragraph text</p>
            </div>
            <div className="card-footer">
              <div className="card-stats">
                <div className="stat-item">
                  {/* Stats for analytics? */}
                  <span className="stat-value">98%</span>
                  <span className="stat-label">Score</span>
                </div>
                <div className="stat-item">
                  {/* MORE Stats for analytics? */}
                  <span className="stat-value">24h</span>
                  <span className="stat-label">Time</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </div>
  );
}

export default App;