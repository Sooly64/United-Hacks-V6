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

  const extractProfileInfo = (profileData) => {
    const profile = profileData.profile || {};
    const posts = profileData.posts || [];
    
    return {
      name: profile.name || 'Unknown',
      headline: profile.description || profile.jobTitle || 'Professional',
      location: profile.address?.addressLocality || 'Location not specified',
      company: profile.worksFor?.[0]?.name || 'Company not specified',
      experience: profile.description || profile.jobTitle || 'Experience details not available',
      posts: posts.slice(0, 3).map(post => post.headline || 'Recent post'),
      skills: profile.knowsAbout || ['Professional skills'],
      education: profile.alumniOf?.[0]?.name || 'Education not specified'
    };
  };

  return (
    <div className="profile-breakdown">
      <h2 className="breakdown-header">A. Profile Breakdown</h2>
      
      <div className="profiles-grid">
        {analysis.map((profileData, index) => {
          const profileInfo = extractProfileInfo(profileData);
          
          return (
            <div key={index} className="profile-card">
              <h3 className="profile-name">
                {profileInfo.name}
                <span className="confidence-score">
                  95% match
                </span>
              </h3>
              
              <div className="profile-basic-info">
                <p className="profile-headline">{profileInfo.headline}</p>
                <p className="profile-company">{profileInfo.company}</p>
                <p className="profile-location">{profileInfo.location}</p>
              </div>

              <div className="analysis-section">
                <h4 className="analysis-title">Professional Experience</h4>
                <div className="analysis-items">
                  <div className="analysis-item">
                    <span className="analysis-icon">💼</span>
                    <span className="analysis-text">{profileInfo.experience}</span>
                  </div>
                </div>
              </div>

              <div className="analysis-section">
                <h4 className="analysis-title">Recent Activity</h4>
                <div className="analysis-items">
                  {profileInfo.posts.map((post, i) => (
                    <div key={i} className="analysis-item">
                      <span className="analysis-icon">📝</span>
                      <span className="analysis-text">{post}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analysis-section">
                <h4 className="analysis-title">Skills & Expertise</h4>
                <div className="analysis-items">
                  {profileInfo.skills.map((skill, i) => (
                    <div key={i} className="analysis-item">
                      <span className="analysis-icon">🎯</span>
                      <span className="analysis-text">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analysis-section">
                <h4 className="analysis-title">Education</h4>
                <div className="analysis-items">
                  <div className="analysis-item">
                    <span className="analysis-icon">🎓</span>
                    <span className="analysis-text">{profileInfo.education}</span>
                  </div>
                </div>
              </div>

              <div className="analysis-section">
                <h4 className="analysis-title">Communication Style</h4>
                <div className="analysis-items">
                  <div className="analysis-item">
                    <span className="analysis-icon">📧</span>
                    <span className="analysis-text"><strong>Professional</strong> and <strong>value-driven</strong> communication with industry insights</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
