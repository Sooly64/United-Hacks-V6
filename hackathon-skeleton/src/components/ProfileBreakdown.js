// src/components/ProfileBreakdown.js
import React from "react";
import "./ProfileBreakdown.css";

// Simple Markdown parser for basic formatting
const parseMarkdown = (text) => {
  if (!text) return '';
  
  return text
    // Headers (# ## ###)
    .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
    // Bold text (**text**)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic text (*text*)
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Numbered lists (1. item)
    .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
    // Bullet points (• item or - item or * item)
    .replace(/^[\•\-\*]\s+(.+)$/gm, '<li>$1</li>')
    // Wrap consecutive list items in ul tags
    .replace(/(<li>.*?<\/li>)(\s*<li>.*?<\/li>)*/gs, '<ul>$&</ul>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Wrap in paragraphs
    .replace(/^(.+)$/gm, '<p>$1</p>')
    // Clean up extra paragraphs around lists and headers
    .replace(/<p><[h1-6]>/g, '<$1')
    .replace(/<\/[h1-6]><\/p>/g, '</$1>')
    .replace(/<p><ul>/g, '<ul>')
    .replace(/<\/ul><\/p>/g, '</ul>')
    .replace(/<p><li>/g, '<li>')
    .replace(/<\/li><\/p>/g, '</li>');
};

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

  // Check if this is AI analysis or regular profile data
  const isAIAnalysis = analysis.ai_analysis || analysis.profile?.ai_analysis;
  
  if (isAIAnalysis) {
    // Display AI analysis with simplified profile data
    return (
      <div className="profile-breakdown">
        <h2 className="breakdown-header">How You Can Reach — Right</h2>
        
        <div className="profiles-grid">
          <div className="profile-card">
            <h3 className="profile-name">
              {analysis.profile?.name || 'Unknown Profile'}
              <span className="confidence-score">
                AI Analysis
              </span>
            </h3>
            
            <div className="profile-basic-info">
              <p className="profile-headline">{analysis.profile?.jobTitle || 'Professional'}</p>
              <p className="profile-location">{analysis.profile?.location || 'Location not specified'}</p>
              <p className="profile-education">🎓 {analysis.profile?.education || 'Education not specified'}</p>
            </div>
            
            <div className="analysis-section">
              <h4 className="analysis-title">🎓 How to Network</h4>
              <div className="analysis-items">
                <div className="analysis-item">
                  <span 
                    className="analysis-text" 
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(analysis.ai_analysis) }}
                  />
                </div>
              </div>
            </div>

            <div className="analysis-section">
              <h4 className="analysis-title">📈 About</h4>
              <div className="analysis-items">
                <div className="analysis-item">
                  <span className="analysis-text">{analysis.profile?.description || 'No description available'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Fallback to original profile display for non-AI analysis
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
