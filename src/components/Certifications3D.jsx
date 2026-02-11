import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import './Certifications3D.css'

const Certifications3D = () => {
  const [performanceSpike, setPerformanceSpike] = useState(false)
  const [fps, setFps] = useState(60)

  const coreCertifications = [
    {
      issuer: 'NVIDIA',
      name: 'Compute Technical Curriculum',
      date: 'Nov 2025',
      hash: '0x4a8f2c...',
      category: 'core'
    },
    {
      issuer: 'NVIDIA',
      name: 'AI Technical Curriculum',
      date: 'Nov 2025',
      hash: '0x7b3e9d...',
      category: 'core'
    },
    {
      issuer: 'NVIDIA',
      name: 'DGX Technical Curriculum',
      date: 'Nov 2025',
      hash: '0x9c5f1a...',
      category: 'core',
      triggersSpike: true
    },
    {
      issuer: 'NVIDIA',
      name: 'Networking Technical Curriculum',
      date: 'Nov 2025',
      hash: '0x2d8b4e...',
      category: 'core'
    }
  ]

  const additionalCertifications = [
    { issuer: 'NVIDIA', name: 'Fundamentals of Deep Learning', date: 'Apr 2025' },
    { issuer: 'NVIDIA', name: 'Accelerating End-to-End Data Science Workflows', date: 'Apr 2025' },
    { issuer: 'NVIDIA', name: 'Getting Started with AI on Jetson Nano', date: 'Apr 2025' },
    { issuer: 'NVIDIA', name: 'Disaster Risk Monitoring Using Satellite Imagery', date: 'Apr 2025' },
    { issuer: 'NVIDIA', name: 'Develop, Customize, and Publish in Omniverse with Extensions', date: 'Apr 2025' },
    { issuer: 'Udemy', name: 'Google Cloud Professional Cloud Architect', date: 'Mar 2025' },
    { issuer: 'LinkedIn', name: 'Advanced Prompt Engineering Techniques', date: 'Jul 2025' },
    { issuer: 'GitHub', name: 'Career Essentials in GitHub Copilot (Professional Certificate)', date: 'Jul 2025' },
    { issuer: 'IBM', name: 'Docker Essentials: A Developer Introduction', date: 'Jul 2025' },
    { issuer: 'DataCamp', name: 'Python Data Science Toolbox', date: 'Sep 2021' },
    { issuer: 'Skillshop', name: 'Google Analytics Certification', date: 'Apr 2025' },
    { issuer: 'NPTEL', name: 'Entrepreneurship', date: 'Nov 2023' },
    { issuer: 'LinkedIn Learning', name: 'Graphic Design: Layout & Composition', date: 'Aug 2021' },
    { issuer: 'MKCL', name: 'Certified Web Designer Associate (CWDSA)', date: 'May 2017' }
  ]

  useEffect(() => {
    if (performanceSpike) {
      const interval = setInterval(() => {
        setFps(prev => {
          if (prev < 120) return prev + 5
          return prev
        })
      }, 50)

      setTimeout(() => {
        clearInterval(interval)
        setFps(60)
        setPerformanceSpike(false)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [performanceSpike])

  const handleCertClick = (cert) => {
    if (cert.triggersSpike) {
      setPerformanceSpike(true)
    }
  }

  return (
    <section id="certifications" className="certifications-3d-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Trust Layer Verification</p>
          
          {performanceSpike && (
            <div className="fps-counter">
              FPS: {fps.toFixed(0)} ⚡ PERFORMANCE SPIKE
            </div>
          )}

          <div className="core-certifications">
            <h3 className="cert-section-label">Core Certifications</h3>
            <div className="certifications-grid-3d core-grid">
              {coreCertifications.map((cert, idx) => (
                <CertificationKey
                  key={idx}
                  cert={cert}
                  index={idx}
                  onClick={() => handleCertClick(cert)}
                  isCore={true}
                />
              ))}
            </div>
          </div>

          <div className="additional-certifications">
            <h3 className="cert-section-label">Additional Certifications</h3>
            <div className="certifications-grid-3d additional-grid">
              {additionalCertifications.map((cert, idx) => (
                <CertificationKey
                  key={idx}
                  cert={cert}
                  index={idx}
                  onClick={() => handleCertClick(cert)}
                  isCore={false}
                />
              ))}
            </div>
          </div>

          <div className="trust-chain">
            <div className="chain-label">TRUST CHAIN</div>
            <div className="chain-line"></div>
            <div className="chain-status">VERIFIED ✓</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const CertificationKey = ({ cert, index, onClick, isCore }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (cardRef.current && isCore) {
      const card = cardRef.current
      
      if (isHovered) {
        gsap.to(card, {
          rotationY: 360,
          duration: 2,
          ease: 'power2.inOut',
          repeat: -1
        })
      } else {
        gsap.to(card, {
          rotationY: 0,
          duration: 0.5
        })
      }
    }
  }, [isHovered, isCore])

  return (
    <motion.div
      ref={cardRef}
      className={`cert-key-3d ${isCore ? 'core' : 'additional'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="key-hologram">
        {isCore && <div className="hologram-glow"></div>}
        <div className="key-content">
          <div className="key-issuer">{cert.issuer}</div>
          <div className="key-name">{cert.name}</div>
          <div className="key-date">{cert.date}</div>
          {isCore && cert.hash && (
            <div className="key-hash">
              <span className="hash-label">SIGNATURE:</span>
              <span className="hash-value">{cert.hash}</span>
            </div>
          )}
        </div>
        {isCore && (
          <div className="key-emission">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="emission-particle"
                style={{
                  '--angle': `${(i * 45)}deg`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Certifications3D
