import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import './Experience3D.css'

const Experience3D = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const events = [
    {
      id: 'ut-austin',
      title: 'UT Austin Research',
      period: 'Jul 2023 - Dec 2023',
      description: 'Object dynamics estimation from video',
      unlocks: ['vision-systems'],
      position: { x: 100, y: 100 }
    },
    {
      id: 'unifins',
      title: 'Unifins IT Hub',
      period: 'Jun 2024 - Jul 2025',
      description: 'Multilingual BERT deployment',
      unlocks: ['production-nlp'],
      position: { x: 300, y: 200 }
    },
    {
      id: 'ccs',
      title: 'CCS Computers',
      period: 'Jul 2025 - Present',
      description: 'GPU Benchmarking & Video Analytics',
      unlocks: ['infra-mastery'],
      position: { x: 500, y: 300 }
    },
    {
      id: 'vision-systems',
      title: 'Vision Systems',
      period: 'Unlocked',
      description: 'Real-time video analytics',
      unlockedBy: 'ut-austin',
      position: { x: 200, y: 150 }
    },
    {
      id: 'production-nlp',
      title: 'Production NLP',
      period: 'Unlocked',
      description: 'Scalable sentiment analysis',
      unlockedBy: 'unifins',
      position: { x: 400, y: 250 }
    },
    {
      id: 'infra-mastery',
      title: 'Infrastructure Mastery',
      period: 'Unlocked',
      description: 'MLPerf & GPU optimization',
      unlockedBy: 'ccs',
      position: { x: 600, y: 350 }
    }
  ]

  const [activeEvents, setActiveEvents] = useState([])
  const [lightPosition, setLightPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const activeCount = Math.min(Math.floor(progress * events.length), events.length - 1)
      setActiveEvents(events.slice(0, Math.max(1, activeCount + 1)))
      
      if (activeCount >= 0 && activeCount < events.length && events[activeCount]) {
        setLightPosition(events[activeCount].position)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <section id="experience" className="experience-3d-section" ref={containerRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Timeline With Causality</p>
          
          <div className="causality-container">
            <svg className="causality-svg" viewBox="0 0 800 500">
              {/* Light pulse */}
              <defs>
                <radialGradient id="lightGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#76b900" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#76b900" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              <circle
                className="light-pulse"
                cx={lightPosition.x}
                cy={lightPosition.y}
                r="100"
                fill="url(#lightGradient)"
                style={{
                  opacity: activeEvents.length > 0 ? 1 : 0,
                  transition: 'all 0.5s ease'
                }}
              />

              {/* Connections */}
              {events.map(event => {
                if (!event.unlocks) return null
                return event.unlocks.map(unlockId => {
                  const unlockEvent = events.find(e => e.id === unlockId)
                  if (!unlockEvent) return null
                  
                  const isActive = activeEvents.some(e => e.id === event.id || e.id === unlockId)
                  
                  return (
                    <line
                      key={`${event.id}-${unlockId}`}
                      x1={event.position.x}
                      y1={event.position.y}
                      x2={unlockEvent.position.x}
                      y2={unlockEvent.position.y}
                      stroke={isActive ? '#76b900' : '#333'}
                      strokeWidth={isActive ? 3 : 1}
                      strokeOpacity={isActive ? 0.8 : 0.2}
                      markerEnd="url(#arrowhead)"
                    />
                  )
                })
              })}

              {/* Arrow marker */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#76b900" />
                </marker>
              </defs>

              {/* Event nodes */}
              {events.map((event, idx) => {
                const isActive = activeEvents.some(e => e.id === event.id)
                const isUnlocked = !event.unlockedBy || activeEvents.some(e => e.id === event.unlockedBy)
                
                return (
                  <g key={event.id} className={`event-node ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`}>
                    <circle
                      cx={event.position.x}
                      cy={event.position.y}
                      r={isActive ? 25 : 20}
                      fill={isActive ? '#76b900' : '#333'}
                      stroke="#76b900"
                      strokeWidth={isActive ? 3 : 1}
                      opacity={isUnlocked ? 1 : 0.3}
                    />
                    <text
                      x={event.position.x}
                      y={event.position.y - 40}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="12"
                      fontFamily="JetBrains Mono, monospace"
                      opacity={isUnlocked ? 1 : 0.5}
                    >
                      {event.title}
                    </text>
                    <text
                      x={event.position.x}
                      y={event.position.y + 50}
                      textAnchor="middle"
                      fill="#76b900"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                      opacity={isUnlocked ? 1 : 0.5}
                    >
                      {event.period}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Event details */}
            <div className="event-details">
              {activeEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  className="event-detail-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  {event.unlocks && (
                    <div className="unlocks">
                      <span>Unlocks:</span>
                      {event.unlocks.map(unlock => (
                        <span key={unlock} className="unlock-tag">{unlock}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience3D
