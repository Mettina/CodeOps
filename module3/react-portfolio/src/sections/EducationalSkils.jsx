// src/sections/EducationSkills.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function EducationSkills() {
  return (
    <>
      <section id="education" className="education-container">
        {/* Education Heading */}
        <section className="education-heading">
          <p>MY JOURNEY</p>
          <h1>Education &amp; Skills</h1>
          <span>My academic background and technical abilities.</span>
        </section>

        {/* Education Card */}
        <section className="glass-card education-card">
          <div className="card-icon">🎓</div>
          <div className="card-content">
            <p className="card-label">EDUCATION</p>
            <h2>Unity University</h2>
            <h3>BSc in Computer Science</h3>
            <span className="year">2026</span>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="skills-section">
          <div className="section-heading">
            <p>WHAT I KNOW</p>
            <h2>Technical Skills</h2>
          </div>

          <div className="skills-grid">
            <div className="glass-card skill-card">
              <div className="skill-icon">HTML</div>
              <h3>HTML</h3>
              <p>Web Structure</p>
            </div>

            <div className="glass-card skill-card">
              <div className="skill-icon">CSS</div>
              <h3>CSS</h3>
              <p>Web Design</p>
            </div>

            <div className="glass-card skill-card">
              <div className="skill-icon">PY</div>
              <h3>Python</h3>
              <p>Programming</p>
            </div>

            <div className="glass-card skill-card">
              <div className="skill-icon">C++</div>
              <h3>C++</h3>
              <p>Programming</p>
            </div>

            <div className="glass-card skill-card">
              <div className="skill-icon">DB</div>
              <h3>MySQL</h3>
              <p>Database</p>
            </div>

            <div className="glass-card skill-card">
              <div className="skill-icon">FB</div>
              <h3>Firebase</h3>
              <p>Backend</p>
            </div>

            <div className="glass-card skill-card">
              <div className="skill-icon">G</div>
              <h3>Git</h3>
              <p>Version Control</p>
            </div>

            <div className="glass-card skill-card">
              <div className="skill-icon">GH</div>
              <h3>GitHub</h3>
              <p>Collaboration</p>
            </div>

            <div className="glass-card skill-card">
              <div className="skill-icon">VS</div>
              <h3>VS Code</h3>
              <p>Development Tool</p>
            </div>
          </div>
        </section>

        {/* Soft Skills */}
        <section className="soft-section">
          <div className="section-heading">
            <p>BEYOND CODE</p>
            <h2>Soft Skills</h2>
          </div>

          <div className="soft-skills">
            <span>Communication</span>
            <span>Leadership</span>
            <span>Problem Solving</span>
            <span>Critical Thinking</span>
            <span>Teamwork</span>
          </div>
        </section>

        
      </section>

      
    </>
  );
}