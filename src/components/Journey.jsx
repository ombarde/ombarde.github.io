import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Journey.css'

const Journey = () => {
  const { scrollYProgress } = useScroll()
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.9])

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('journey')
      if (element) {
        const rect = element.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)))
        setScrollProgress(progress)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const epochs = [
    {
      epoch: 'Epoch 1',
      title: 'Student Intern',
      period: 'Nov 2020 - Mar 2021',
      description: 'Learning Signals',
      details: 'Performed market analysis, researched latest trends, and helped with planning marketing events. First exposure to real-world problem-solving.',
      status: 'completed'
    },
    {
      epoch: 'Epoch 2',
      title: 'Research @ UT Austin',
      period: 'Jul 2023 - Dec 2023',
      description: 'Temporal Intelligence',
      details: 'Worked on estimation of object dynamics from video sequences using PyTorch and OpenCV. Built CNNs for spatial features and RNNs (LSTM) for sequential dependencies. Gained exposure to distributed AI research practices.',
      status: 'completed'
    },
    {
      epoch: 'Epoch 3',
      title: 'Industry Deployment',
      period: 'Jun 2024 - Present',
      description: 'Latency Meets Reality',
      details: 'Built production AI systems at Unifins IT Hub and CCS Computers. Deployed multilingual BERT models, real-time video analytics, GPU benchmarking, and dock management systems. Learned to optimize for real-world constraints.',
      status: 'active'
    }
  ]

  return (
    <section id="journey" className="journey-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Journey</h2>
          <p className="section-subtitle">Training the System</p>
          
          <div className="progress-bar-container">
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <div className="progress-label">
              System Training Progress: {Math.round(scrollProgress * 100)}%
            </div>
          </div>

          <div className="timeline">
            {epochs.map((epoch, idx) => (
              <motion.div
                key={idx}
                className={`epoch-card ${epoch.status}`}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
              >
                <div className="epoch-header">
                  <span className="epoch-number">{epoch.epoch}</span>
                  <span className="epoch-period">{epoch.period}</span>
                </div>
                <h3 className="epoch-title">{epoch.title}</h3>
                <p className="epoch-description">{epoch.description}</p>
                <p className="epoch-details">{epoch.details}</p>
                {epoch.status === 'active' && (
                  <span className="epoch-status">ACTIVE</span>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="background-shift"
            style={{ opacity: backgroundOpacity }}
          >
            <div className="noise-pattern"></div>
            <div className="clean-pattern"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Journey
