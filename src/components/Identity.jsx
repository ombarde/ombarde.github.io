import { useState } from 'react'
import { motion } from 'framer-motion'
import './Identity.css'

const Identity = () => {
  const [hoveredLang, setHoveredLang] = useState(null)

  const languages = [
    { name: 'Marathi', level: 'Native', status: 'active' },
    { name: 'Hindi', level: 'Professional', status: 'active' },
    { name: 'English', level: 'Professional', status: 'active' },
    { name: 'German', level: 'Elementary', status: 'booting' }
  ]

  return (
    <section id="identity" className="identity-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="identity-content"
        >
          <div className="profile-card">
            <div className="card-header">
              <div className="status-indicator"></div>
              <span className="status-text">PRODUCTION DEPLOYED</span>
            </div>
            <div className="card-body">
              <h2 className="card-title">SYSTEM PROFILE</h2>
              <div className="spec-line">
                <span className="spec-label">Name:</span>
                <span className="spec-value">Om Barde</span>
              </div>
              <div className="spec-line">
                <span className="spec-label">Role:</span>
                <span className="spec-value">AI Developer</span>
              </div>
              <div className="spec-line">
                <span className="spec-label">Specialization:</span>
                <span className="spec-value">Real-Time Vision + GPU Infrastructure</span>
              </div>
              <div className="spec-line">
                <span className="spec-label">Status:</span>
                <span className="spec-value status-online">Production Deployed</span>
              </div>
              <div className="languages-section">
                <div className="spec-label">Languages:</div>
                <div className="language-toggles">
                  {languages.map((lang, idx) => (
                    <div
                      key={idx}
                      className={`lang-toggle ${lang.status}`}
                      onMouseEnter={() => setHoveredLang(idx)}
                      onMouseLeave={() => setHoveredLang(null)}
                    >
                      <span className="lang-name">{lang.name}</span>
                      {hoveredLang === idx && (
                        <span className="lang-detail">({lang.level})</span>
                      )}
                      {lang.status === 'booting' && <span className="booting-dot">...</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="cv-download-section">
                <button
                  className="cv-download-btn"
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = '/curriculum_vitae_OmBarde.pdf'
                    link.download = 'Om_Barde_CV.pdf'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                >
                  <span className="btn-icon">⬇</span>
                  <span className="btn-text">Download CV</span>
                </button>
              </div>
            </div>
          </div>
          <div className="narrative-text">
            <h1 className="section-title">Who Am I?</h1>
            <p className="intro-text">
              I'm not a resume. I'm a deployed system.
            </p>
            <p>
              I'm Om Barde, an AI Developer with hands-on experience in real-time video analytics, 
              GPU-accelerated AI systems, and large-scale AI infrastructure benchmarking. I specialize 
              in building production-grade AI solutions that operate reliably under real-world constraints 
              such as low latency, high throughput, and multi-camera scalability.
            </p>
            <p>
              I hold a B.Tech in Artificial Intelligence and have earned multiple NVIDIA certifications 
              across AI, GPU computing, and infrastructure domains. My recent work focuses on designing 
              GStreamer-based video pipelines, training and optimizing computer vision models, and 
              deploying CUDA-enabled inference systems for traffic monitoring and logistics automation.
            </p>
            <p className="highlight">
              I have practical experience across the full AI lifecycle — from dataset preparation and 
              model training to GPU-accelerated inference, system integration, and performance tuning.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Identity
