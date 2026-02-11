import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Contact3D.css'

const Contact3D = () => {
  const canvasRef = useRef(null)
  const [connectionStatus, setConnectionStatus] = useState('idle')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [waves, setWaves] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })
      
      // Create signal wave
      setWaves(prev => [...prev, { x, y, radius: 0, opacity: 1 }])
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw waves
      setWaves(prev => {
        return prev
          .map(wave => {
            ctx.strokeStyle = `rgba(118, 185, 0, ${wave.opacity})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
            ctx.stroke()
            
            return {
              ...wave,
              radius: wave.radius + 3,
              opacity: wave.opacity - 0.02
            }
          })
          .filter(wave => wave.opacity > 0)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleConnect = () => {
    setConnectionStatus('initiating')
    
    setTimeout(() => {
      setConnectionStatus('exchanging')
    }, 1000)
    
    setTimeout(() => {
      setConnectionStatus('established')
    }, 2000)
  }

  return (
    <section id="contact" className="contact-3d-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">Handshake Protocol</p>
          
          <div className="contact-container-3d">
            <canvas ref={canvasRef} className="signal-canvas"></canvas>
            
            <div className="handshake-terminal">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="btn red"></span>
                  <span className="btn yellow"></span>
                  <span className="btn green"></span>
                </div>
                <div className="terminal-title">handshake.protocol</div>
              </div>
              
              <div className="terminal-body">
                {connectionStatus === 'idle' && (
                  <>
                    <div className="terminal-line">
                      <span className="prompt">$</span>
                      <span className="command"> Ready to establish connection...</span>
                    </div>
                    <div className="terminal-line">
                      <span className="prompt">$</span>
                      <span className="cursor-blink">_</span>
                    </div>
                  </>
                )}
                
                {connectionStatus === 'initiating' && (
                  <>
                    <div className="terminal-line">
                      <span className="output">Initiating secure handshake...</span>
                    </div>
                    <div className="terminal-line">
                      <span className="output">Generating key pair...</span>
                    </div>
                  </>
                )}
                
                {connectionStatus === 'exchanging' && (
                  <>
                    <div className="terminal-line">
                      <span className="output success">✓ Keys exchanged</span>
                    </div>
                    <div className="terminal-line">
                      <span className="output">Verifying signature...</span>
                    </div>
                  </>
                )}
                
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
                      <span className="output">Status: <span className="status-online">ONLINE</span></span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="contact-buttons-3d">
              <motion.button
                className="connect-button"
                onClick={handleConnect}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={connectionStatus === 'established'}
              >
                {connectionStatus === 'idle' && 'INITIATE HANDSHAKE'}
                {connectionStatus === 'initiating' && 'INITIATING...'}
                {connectionStatus === 'exchanging' && 'EXCHANGING KEYS...'}
                {connectionStatus === 'established' && 'CONNECTED ✓'}
              </motion.button>
              
              {connectionStatus === 'established' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="contact-links"
                >
                  <a href="https://www.linkedin.com/in/om-barde-622115171/" target="_blank" rel="noopener noreferrer" className="contact-link">
                    CONNECT ON LINKEDIN
                  </a>
                  <a href="mailto:bardeom6702@gmail.com" className="contact-link">
                    SEND SIGNAL (EMAIL)
                  </a>
                  <button className="contact-link" onClick={() => alert('CV download - implement with your CV file')}>
                    DOWNLOAD SYSTEM SPECS (CV)
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact3D
