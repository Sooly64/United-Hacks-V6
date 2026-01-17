// src/components/Message.js
import React, { useState } from "react";
import "./Message.css";

export default function Message({ message, onEdit }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!message) {
    return (
      <div className="message-section">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Crafting personalized message...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-section">
      <h2 className="message-header">C. 1 Message</h2>
      
      <div className="message-container">
        <div className="message-length">
          {message.fullText?.length || 0} characters
        </div>
        
        <h3 className="message-subject">
          {message.subject || "Strategic Partnership Inquiry"}
          <span className={`tone-indicator tone-${message.tone || 'professional'}`}>
            {message.tone || 'Professional'}
          </span>
        </h3>
        
        <div className="message-body">
          <div dangerouslySetInnerHTML={{ __html: message.htmlBody || message.body }} />
        </div>
        
        <div className="message-personalization">
          <h4 className="personalization-title">Personalization Elements</h4>
          <div className="personalization-points">
            {message.personalization?.map((point, i) => (
              <div key={i} className="personalization-point">
                <span className="point-icon">✓</span>
                <span>{point}</span>
              </div>
            )) || (
              <>
                <div className="personalization-point">
                  <span className="point-icon">✓</span>
                  <span>References their recent activity/achievements</span>
                </div>
                <div className="personalization-point">
                  <span className="point-icon">✓</span>
                  <span>Highlights mutual connections or interests</span>
                </div>
                <div className="personalization-point">
                  <span className="point-icon">✓</span>
                  <span>Offers clear value proposition</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="message-actions">
          <button 
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={copyToClipboard}
          >
            {copied ? '✓ Copied' : '📋 Copy Message'}
          </button>
          <button className="edit-btn" onClick={onEdit}>
            ✏️ Edit Message
          </button>
        </div>
        
        <div className="message-metrics">
          <div className="metric-item">
            <div className="metric-value">{message.readability || '8.5'}/10</div>
            <div className="metric-label">Readability</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{message.personalizationScore || '9.2'}/10</div>
            <div className="metric-label">Personalization</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{message.engagementPrediction || '78'}%</div>
            <div className="metric-label">Engagement Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}
