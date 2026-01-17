// src/components/ProfileBreakdown.js
import React from "react";
import "./ProfileBreakdown.css";

export default function ProfileBreakdown({ profiles, analysis }) {
  if (!analysis) {
    return (
      <div className="profile-breakdown">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Analyzing profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-breakdown">
      <h2 className="breakdown-header">A. Profile Breakdown</h2>
      
      <div className="profiles-grid">
        {profiles.map((profile, index) => {
          const profileAnalysis = analysis[index] || {};
          return (
            <div key={index} className="profile-card">
              <h3 className="profile-name">
                Profile {index + 1}
                <span className="confidence-score">
                  {profileAnalysis.confidence || '85'}% match
                </span>
              </h3>
              
              <div className="analysis-section">
                <h4 className="analysis-title">What They Care About</h4>
                <div className="analysis-items">
                  {profileAnalysis.caresAbout?.map((item, i) => (
                    <div key={i} className="analysis-item">
                      <span className="analysis-icon">🎯</span>
                      <span className="analysis-text">{item}</span>
                    </div>
                  )) || (
                    <div className="analysis-item">
                      <span className="analysis-icon">🎯</span>
                      <span className="analysis-text">Professional growth and industry trends</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="analysis-section">
                <h4 className="analysis-title">What They Talk About</h4>
                <div className="analysis-items">
                  {profileAnalysis.talksAbout?.map((item, i) => (
                    <div key={i} className="analysis-item">
                      <span className="analysis-icon">💬</span>
                      <span className="analysis-text">{item}</span>
                    </div>
                  )) || (
                    <div className="analysis-item">
                      <span className="analysis-icon">💬</span>
                      <span className="analysis-text">Industry innovations and team achievements</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="analysis-section">
                <h4 className="analysis-title">What They Respond To</h4>
                <div className="analysis-items">
                  {profileAnalysis.respondsTo?.map((item, i) => (
                    <div key={i} className="analysis-item">
                      <span className="analysis-icon">📧</span>
                      <span className="analysis-text">{item}</span>
                    </div>
                  )) || (
                    <div className="analysis-item">
                      <span className="analysis-icon">📧</span>
                      <span className="analysis-text"><strong>Personalized</strong> messages with specific value propositions</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="analysis-section">
                <h4 className="analysis-title">What They Likely Want</h4>
                <div className="analysis-items">
                  {profileAnalysis.wants?.map((item, i) => (
                    <div key={i} className="analysis-item">
                      <span className="analysis-icon">🎯</span>
                      <span className="analysis-text">{item}</span>
                    </div>
                  )) || (
                    <div className="analysis-item">
                      <span className="analysis-icon">🎯</span>
                      <span className="analysis-text">Strategic partnerships and growth opportunities</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="analysis-section">
                <h4 className="analysis-title">How They Like to Communicate</h4>
                <div className="analysis-items">
                  {profileAnalysis.communication?.map((item, i) => (
                    <div key={i} className="analysis-item">
                      <span className="analysis-icon">📞</span>
                      <span className="analysis-text">{item}</span>
                    </div>
                  )) || (
                    <div className="analysis-item">
                      <span className="analysis-icon">📞</span>
                      <span className="analysis-text"><strong>Direct</strong> and <strong>concise</strong> communication with clear next steps</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
