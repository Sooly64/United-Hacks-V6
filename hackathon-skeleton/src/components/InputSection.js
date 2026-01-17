// src/components/InputSection.js
import React, { useState } from "react";
import "./InputSection.css";

export default function InputSection({ onAnalyze }) {
  const [profileUrl, setProfileUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!profileUrl.trim()) {
      alert('Please enter a profile URL');
      return;
    }

    onAnalyze({
      profiles: [profileUrl.trim()]
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
              placeholder="https://linkedin.com/in/username"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              required
            />
            <span className="profile-input-label">Profile Link</span>
          </div>
        </div>

        <button 
          type="submit" 
          className="analyze-btn"
          disabled={!profileUrl.trim()}
        >
          Analyze Profile →
        </button>
      </form>
    </div>
  );
}
