// src/components/Angles.js
import React, { useState } from "react";
import "./Angles.css";

export default function Angles({ angles, onAngleSelect }) {
  const [selectedAngle, setSelectedAngle] = useState(null);

  const handleAngleClick = (angle, index) => {
    setSelectedAngle(index);
    onAngleSelect(angle);
  };

  if (!angles) {
    return (
      <div className="angles-section">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Generating approach angles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="angles-section">
      <h2 className="angles-header">B. 3 Angles</h2>
      
      <div className="angles-grid">
        {angles.map((angle, index) => (
          <div 
            key={index} 
            className={`angle-card ${selectedAngle === index ? 'selected' : ''}`}
            onClick={() => handleAngleClick(angle, index)}
          >
            <div className="angle-number">{index + 1}</div>
            <h3 className="angle-title">{angle.title}</h3>
            <p className="angle-description">{angle.description}</p>
            
            <div className="angle-strategy">
              <h4 className="strategy-title">Strategy:</h4>
              <ul className="strategy-steps">
                {angle.strategy?.map((step, i) => (
                  <li key={i} className="strategy-step">
                    <span className="step-number">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                )) || (
                  <>
                    <li className="strategy-step">
                      <span className="step-number">1</span>
                      <span>Research their recent activities and interests</span>
                    </li>
                    <li className="strategy-step">
                      <span className="step-number">2</span>
                      <span>Find mutual connections or shared interests</span>
                    </li>
                    <li className="strategy-step">
                      <span className="step-number">3</span>
                      <span>Craft personalized value proposition</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="angle-effectiveness">
              <span className="effectiveness-label">Effectiveness:</span>
              <div className="effectiveness-bar">
                <div 
                  className="effectiveness-fill" 
                  style={{ width: `${angle.effectiveness || 75}%` }}
                ></div>
              </div>
              <span className="effectiveness-value">{angle.effectiveness || 75}%</span>
            </div>
            
            <button className="select-angle-btn">
              Choose This Angle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
