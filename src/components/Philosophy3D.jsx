import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import './Philosophy3D.css'

const Philosophy3D = () => {
  const containerRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'philosophy-particle'
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.opacity = Math.random() * 0.5
      container.appendChild(particle)
      particles.push(particle)
    }

    particlesRef.current = particles

    // Animate particles settling
    particles.forEach((particle, idx) => {
      gsap.to(particle, {
        opacity: 0,
        y: `+=${Math.random() * 100}px`,
        duration: 3 + Math.random() * 2,
        delay: idx * 0.1,
        ease: 'power2.out'
      })
    })

    // Breathing animation for text
    const textElements = container.querySelectorAll('.philosophy-text p')
    textElements.forEach((el, idx) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: idx * 0.3 + 2,
        ease: 'power2.out'
      })
    })

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [])

  const quoteLines = [
    "AI only matters when it survives the real world —",
    "noisy data, broken cameras, latency budgets, and humans."
  ]

  return (
    <section id="philosophy" className="philosophy-3d-section" ref={containerRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="philosophy-content-3d"
        >
          <h2 className="section-title">Philosophy</h2>
          <p className="section-subtitle">Calm After Chaos</p>
          
          <div className="philosophy-text">
            {quoteLines.map((line, idx) => (
              <p key={idx} className="quote-line" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                {line}
              </p>
            ))}
          </div>

          <div className="breathing-indicator">
            <div className="breath-circle"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Philosophy3D
