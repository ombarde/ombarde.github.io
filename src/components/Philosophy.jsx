import { motion } from 'framer-motion'
import './Philosophy.css'

const Philosophy = () => {
  return (
    <section id="philosophy" className="philosophy-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="philosophy-content"
        >
          <h2 className="section-title">Philosophy</h2>
          <p className="section-subtitle">Why I Build</p>
          
          <div className="philosophy-text">
            <p className="main-quote">
              "AI only matters when it survives the real world —<br />
              noisy data, broken cameras, latency budgets, and humans."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Philosophy
