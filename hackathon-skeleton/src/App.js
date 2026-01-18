// src/App.js
import React, { useState } from "react";
import Layout from "./components/Layout.js";
import InputSection from "./components/InputSection.js";
import ProfileBreakdown from "./components/ProfileBreakdown.js";
import { linkedinService } from "./API_Service.js";
import "./App.css";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async ({ profiles: profileUrls }) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    
    try {
      // Use AI analysis endpoint for better insights
      const response = await linkedinService.analyzeProfile(profileUrls);
      
      if (response.success) {
        setProfiles(profileUrls);
        setAnalysis(response); // Use the full response object
      } else {
        setError('Failed to analyze profile data');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'An error occurred while analyzing the profile';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Layout>
        <div className="hero-section">
          <h1 className="hero-title">ReachRight</h1>
          <p className="hero-subtitle">
            - networking made easy -
          </p>
        </div>
        
        <InputSection onAnalyze={handleAnalyze} />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Analyzing profile...</p>
          </div>
        ) : (
          analysis && <ProfileBreakdown profiles={profiles} analysis={analysis} />
        )}
      </Layout>
    </div>
  );
}

export default App;