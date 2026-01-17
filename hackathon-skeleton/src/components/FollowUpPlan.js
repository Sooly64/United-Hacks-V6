// src/components/FollowUpPlan.js
import React from "react";
import "./FollowUpPlan.css";

export default function FollowUpPlan({ plan }) {
  if (!plan) {
    return (
      <div className="followup-section">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Creating follow-up strategy...</p>
        </div>
      </div>
    );
  }

  const exportPlan = () => {
    const planText = `
FOLLOW-UP PLAN
===============

TIMING:
${plan.timing?.map(item => 
  `${item.date}: ${item.action}\n  Reason: ${item.reason}`
).join('\n\n') || ''}

NEXT STEPS:
${plan.nextSteps?.map((step, i) => 
  `${i + 1}. ${step.title} ${step.priority ? `[${step.priority.toUpperCase()}]` : ''}\n   ${step.description}`
).join('\n\n') || ''}

RECOMMENDATION:
${plan.recommendation || 'Follow up within 3-5 days with additional value or insights.'}
    `.trim();

    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'follow-up-plan.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="followup-section">
      <h2 className="followup-header">D. Follow-up Plan</h2>
      
      <div className="followup-grid">
        <div className="timing-section">
          <h3 className="section-title">
            When to Follow Up
          </h3>
          
          <div className="timeline">
            {plan.timing?.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-action">{item.action}</div>
                <div className="timeline-reason">{item.reason}</div>
              </div>
            )) || (
              <>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-date">2-3 Days</div>
                  <div className="timeline-action">Send follow-up message</div>
                  <div className="timeline-reason">Give them time to review initial message</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-date">1 Week</div>
                  <div className="timeline-action">Provide additional value</div>
                  <div className="timeline-reason">Share relevant content or insight</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-date">2 Weeks</div>
                  <div className="timeline-action">Final follow-up</div>
                  <div className="timeline-reason">Request specific next step or meeting</div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="next-steps-section">
          <h3 className="section-title">
            <span className="section-icon">📋</span>
            What to Ask Next
          </h3>
          
          <ul className="steps-list">
            {plan.nextSteps?.map((step, index) => (
              <li key={index} className="step-item">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <div className="step-title">
                    {step.title}
                    <span className={`step-priority priority-${step.priority || 'medium'}`}>
                      {step.priority || 'Medium'}
                    </span>
                  </div>
                  <div className="step-description">{step.description}</div>
                </div>
              </li>
            )) || (
              <>
                <li className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <div className="step-title">
                      Schedule a brief call
                      <span className="step-priority priority-high">High</span>
                    </div>
                    <div className="step-description">
                      15-minute discussion to explore synergies and next steps
                    </div>
                  </div>
                </li>
                <li className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <div className="step-title">
                      Share relevant resources
                      <span className="step-priority priority-medium">Medium</span>
                    </div>
                    <div className="step-description">
                      Send case studies, articles, or tools relevant to their interests
                    </div>
                  </div>
                </li>
                <li className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <div className="step-title">
                      Connect with team members
                      <span className="step-priority priority-low">Low</span>
                    </div>
                    <div className="step-description">
                      Identify and reach out to other key decision-makers
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      
      <div className="recommendation-box">
        <h4 className="recommendation-title">
          Strategic Recommendation
        </h4>
        <p className="recommendation-text">
          {plan.recommendation || 
            "Based on their profile analysis and communication preferences, follow up within 3-5 days with a concise message that provides additional value. Reference your initial conversation and offer a specific next step. Avoid generic follow-ups and always include a clear call to action."
          }
        </p>
      </div>
      
      <button className="export-btn" onClick={exportPlan}>
        Export Follow-up Plan
      </button>
    </div>
  );
}
