import { motion } from 'framer-motion'
import './Certifications.css'

const Certifications = () => {
  const certifications = [
    {
      issuer: 'NVIDIA',
      name: 'Compute Technical Curriculum',
      date: 'Nov 2025',
      skills: ['CUDA Programming', 'Parallel Computing Fundamentals', 'Performance Optimization', 'NVIDIA SDKs & Tools'],
      category: 'core'
    },
    {
      issuer: 'NVIDIA',
      name: 'AI Technical Curriculum',
      date: 'Nov 2025',
      skills: ['AI Model Development', 'GPU-Accelerated Training', 'End-to-End AI Workflow'],
      category: 'core'
    },
    {
      issuer: 'NVIDIA',
      name: 'DGX Technical Curriculum',
      date: 'Nov 2025',
      skills: ['DGX Cloud Operations', 'Multi-GPU Scaling', 'AI Infrastructure Management', 'GPU Server Optimization'],
      category: 'core'
    },
    {
      issuer: 'NVIDIA',
      name: 'Networking Technical Curriculum',
      date: 'Nov 2025',
      skills: ['High-Performance Networking', 'InfiniBand & Ethernet Basics', 'Low-Latency Data Transfer', 'Network Optimization for AI'],
      category: 'core'
    },
    {
      issuer: 'NVIDIA',
      name: 'Fundamentals of Deep Learning',
      date: 'Apr 2025',
      skills: ['Deep Learning', 'Neural Networks'],
      category: 'ai'
    },
    {
      issuer: 'NVIDIA',
      name: 'Accelerating End-to-End Data Science Workflows',
      date: 'Apr 2025',
      skills: ['Data Science', 'GPU Acceleration'],
      category: 'ai'
    },
    {
      issuer: 'NVIDIA',
      name: 'Getting Started with AI on Jetson Nano',
      date: 'Apr 2025',
      skills: ['Edge AI', 'Jetson Platform'],
      category: 'ai'
    },
    {
      issuer: 'Google',
      name: 'Professional Cloud Architect',
      date: 'Mar 2025',
      skills: ['Cloud Architecture', 'GCP', 'Infrastructure Management'],
      category: 'cloud'
    },
    {
      issuer: 'LinkedIn',
      name: 'Advanced Prompt Engineering Techniques',
      date: 'Jul 2025',
      skills: ['Prompt Engineering'],
      category: 'ai'
    },
    {
      issuer: 'GitHub',
      name: 'Career Essentials in GitHub Copilot',
      date: 'Jul 2025',
      skills: ['AI Software Development', 'Version Control', 'Code Refactoring'],
      category: 'dev'
    },
    {
      issuer: 'IBM',
      name: 'Docker Essentials: A Developer Introduction',
      date: 'Jul 2025',
      skills: ['Docker', 'Containerization'],
      category: 'dev'
    },
    {
      issuer: 'DataCamp',
      name: 'Python Data Science Toolbox (Part 1 & 2)',
      date: 'Sep 2021',
      skills: ['Python', 'Data Science'],
      category: 'data'
    }
  ]

  const nvidiaCerts = certifications.filter(c => c.issuer === 'NVIDIA' && c.category === 'core')
  const otherCerts = certifications.filter(c => !(c.issuer === 'NVIDIA' && c.category === 'core'))

  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Authority & Trust Layer</p>
          
          <div className="cert-intro">
            <p className="cert-quote">
              "Certified not just to build models — but to run them at scale."
            </p>
          </div>

          <div className="certifications-container">
            <div className="nvidia-badges">
              <h3 className="badge-section-title">NVIDIA Core Certifications</h3>
              <div className="badges-grid">
                {nvidiaCerts.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    className="cert-badge nvidia"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                  >
                    <div className="badge-glow"></div>
                    <div className="badge-content">
                      <div className="badge-issuer">{cert.issuer}</div>
                      <div className="badge-name">{cert.name}</div>
                      <div className="badge-date">{cert.date}</div>
                      <div className="badge-skills">
                        {cert.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="badge-check">✔</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="other-certifications">
              <h3 className="badge-section-title">Additional Certifications</h3>
              <div className="badges-grid">
                {otherCerts.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    className="cert-badge"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="badge-content">
                      <div className="badge-issuer">{cert.issuer}</div>
                      <div className="badge-name">{cert.name}</div>
                      <div className="badge-date">{cert.date}</div>
                      <div className="badge-skills">
                        {cert.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
