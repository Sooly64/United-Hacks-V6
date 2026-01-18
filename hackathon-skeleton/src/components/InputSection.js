// src/components/InputSection.js
import React, { useState } from "react";
import "./InputSection.css";

export default function InputSection({ onAnalyze }) {
  const [profileUrl] = useState('https://linkedin.com/in/williamhgates');

  const handleSubmit = (e) => {
    e.preventDefault();

    onAnalyze({
      profiles: [profileUrl]
    });
  };

  return (
    <div className="input-section">
      <h2 className="input-header">Enter Profile URL</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="profile-url">
            Profile URL
          </label>
          <div className="profile-input-wrapper">
            <input
              id="profile-url"
              type="url"
              className="profile-input"
              value={profileUrl}
              readOnly
              disabled
            />
            <span className="profile-input-label">Demo Profile (Fixed)</span>
          </div>
        </div>

        <button 
          type="submit" 
          className="analyze-btn"
        >
          Analyze Profile →
        </button>
      </form>
    </div>
  );
}
