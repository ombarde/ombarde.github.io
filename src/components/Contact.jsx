import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const Contact = () => {
  const [connectionStatus, setConnectionStatus] = useState('establishing')

  useEffect(() => {
    setTimeout(() => {
      setConnectionStatus('established')
    }, 2000)
  }, [])

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">Open Connection</p>
          
          <div className="contact-container">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="btn red"></span>
                  <span className="btn yellow"></span>
                  <span className="btn green"></span>
                </div>
                <div className="terminal-title">connection.terminal</div>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="prompt">$</span>
                  <span className="command"> Establishing secure channel...</span>
                </div>
                {connectionStatus === 'established' && (
                  <>
                    <div className="terminal-line">
                      <span className="output success">✓ Channel established</span>
                    </div>
                    <div className="terminal-line">
                      <span className="output">Location: Nagpur / New Delhi</span>
                    </div>
                    <div className="terminal-line">
                      <span className="output">Availability: Open to AI Systems & Vision Roles</span>
                    </div>
                    <div className="terminal-line">
                      <span className="prompt">$</span>
                      <span className="cursor-blink">_</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="contact-buttons">
              <motion.a
                href="https://www.linkedin.com/in/om-barde-622115171/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-button linkedin"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CONNECT ON LINKEDIN
              </motion.a>
              
              <motion.a
                href="mailto:bardeom6702@gmail.com"
                className="contact-button email"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SEND SIGNAL (EMAIL)
              </motion.a>
              
              <motion.button
                className="contact-button download"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = '/curriculum_vitae_OmBarde.pdf'
                  link.download = 'Om_Barde_CV.pdf'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                DOWNLOAD SYSTEM SPECS (CV)
              </motion.button>
            </div>

            <div className="contact-info">
              <div className="info-item">
                <span className="info-label">Email:</span>
                <a href="mailto:bardeom6702@gmail.com" className="info-value">bardeom6702@gmail.com</a>
              </div>
              <div className="info-item">
                <span className="info-label">Mobile:</span>
                <a href="tel:+918766721568" className="info-value">+91 8766721568</a>
              </div>
              <div className="info-item">
                <span className="info-label">LinkedIn:</span>
                <a href="https://www.linkedin.com/in/ombarde-622115171" target="_blank" rel="noopener noreferrer" className="info-value">linkedin.com/in/ombarde-622115171</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
