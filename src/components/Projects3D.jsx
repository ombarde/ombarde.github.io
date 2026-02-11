import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Projects3D.css'

const Projects3D = () => {
  const [activeProject, setActiveProject] = useState(null)

  const projects = [
    {
      id: 'speed-detection',
      title: 'Speed Detection System',
      subtitle: 'Real-Time Traffic Intelligence',
      simulation: 'speed',
      metrics: {
        latency: '38ms',
        streams: '6',
        status: 'Stable'
      },
      problem: 'Detect and track vehicle speeds in real time across multiple traffic camera streams with strict latency budgets.',
      solution: 'GPU-accelerated detection and tracking with calibrated speed estimation pipelines tuned for production latency.',
      color: 'red'
    },
    {
      id: 'dock-management',
      title: 'Dock Management System',
      subtitle: 'Logistics Intelligence',
      simulation: 'dock',
      metrics: {
        activeDocks: '3',
        congestion: 'Low',
        status: 'Running'
      },
      problem: 'Monitor dock occupancy, turnaround time, and congestion across a busy logistics hub.',
      solution: 'Zone-based tracking with event-driven analytics for occupancy, wait time, and congestion alerts.',
      color: 'green'
    },
    {
      id: 'gpu-benchmarking',
      title: 'GPU Benchmarking & MLPerf',
      subtitle: 'Truth Under Load',
      simulation: 'gpu',
      metrics: {
        gpu: 'H200',
        mode: 'FP16',
        result: 'Accepted'
      },
      problem: 'Validate AI infrastructure under production-like workloads before deployment.',
      solution: 'Executed MLPerf Training & Inference suites across CV, NLP, speech, recommendation, and LLM workloads on H200/L4.',
      color: 'blue'
    },
    {
      id: 'sentiment-engine',
      title: 'Multilingual Sentiment System',
      subtitle: 'Understanding Humans',
      simulation: 'sentiment',
      metrics: {
        accuracy: '90%+',
        deployment: 'Cloud Run',
        langs: 'EN / HI / MR'
      },
      problem: 'Analyze multilingual customer feedback in real time to support operations teams.',
      solution: 'Deployed BERT-based multilingual sentiment engine behind REST APIs with ETL pipelines and keyword extraction.',
      color: 'purple'
    }
  ]

  return (
    <section id="projects" className="projects-3d-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Realtime Simulation Mode</p>
          
          <div className="projects-grid-3d">
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={activeProject === project.id}
                onActivate={() => setActiveProject(activeProject === project.id ? null : project.id)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, isActive, onActivate }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const isRunning = true // idle mode: always running

  // Detect if device supports touch
  useEffect(() => {
    const isTouchSupported = () => {
      return (('ontouchstart' in window) ||
              (navigator.maxTouchPoints > 0) ||
              (navigator.msMaxTouchPoints > 0))
    }
    setIsTouchDevice(isTouchSupported())
  }, [])

  useEffect(() => {
    if (!isRunning || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      let w = canvas.offsetWidth
      let h = canvas.offsetHeight

      // Ensure minimum dimensions for mobile
      w = Math.max(w, 100)
      h = Math.max(h, 100)

      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Initial resize with a small delay to ensure DOM is ready
    resize()
    setTimeout(resize, 0)

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)

    if (project.simulation === 'speed') {
      // Speed detection simulation
      let frameCount = 0
      const boxes = []

      const animate = () => {
        if (hovered) {
          // Pause while overlay is visible
          animationRef.current = requestAnimationFrame(animate)
          return
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw blurred background (stylized video)
        ctx.fillStyle = 'rgba(10, 10, 10, 0.8)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Responsive sizing
        const isMobile = canvas.width < 400
        const fontSize = isMobile ? 11 : 16

        // Draw road
        ctx.strokeStyle = '#333'
        ctx.lineWidth = 2
        ctx.setLineDash([20, 20])
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)
        ctx.lineTo(canvas.width, canvas.height / 2)
        ctx.stroke()
        ctx.setLineDash([])

        // Add bounding boxes
        frameCount++
        if (frameCount % 60 === 0) {
          boxes.push({
            x: -50,
            y: canvas.height / 2 - 30,
            width: 80,
            height: 60,
            speed: 2 + Math.random() * 3,
            speedValue: Math.floor(30 + Math.random() * 50)
          })
        }

        boxes.forEach((box, idx) => {
          box.x += box.speed

          // Draw bounding box
          ctx.strokeStyle = box.speedValue > 60 ? '#ff4444' : '#76b900'
          ctx.lineWidth = 2
          ctx.strokeRect(box.x, box.y, box.width, box.height)

          // Draw speed text
          ctx.fillStyle = box.speedValue > 60 ? '#ff4444' : '#76b900'
          ctx.font = `bold ${fontSize}px JetBrains Mono`
          ctx.textAlign = 'left'
          ctx.fillText(`${box.speedValue} km/h`, box.x + 5, box.y - 5)

          // Warning flash
          if (box.speedValue > 60 && frameCount % 30 < 15) {
            ctx.fillStyle = 'rgba(255, 68, 68, 0.2)'
            ctx.fillRect(box.x - 5, box.y - 5, box.width + 10, box.height + 10)
          }

          // Remove off-screen boxes
          if (box.x > canvas.width) {
            boxes.splice(idx, 1)
          }
        })

        // idle mode: run slower when not active
        if (!isActive) {
          if (frameCount % 2 === 0) animationRef.current = requestAnimationFrame(animate)
          else animationRef.current = requestAnimationFrame(animate)
        } else {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animate()
    } else if (project.simulation === 'dock') {
      // Dock management simulation
      const isMobile = canvas.width < 400
      const zoneRadius = isMobile ? 25 : 40
      const fontSize = isMobile ? 9 : 12

      const zones = [
        { id: 1, x: canvas.width * 0.2, y: canvas.height * 0.3, occupied: false, timer: 0 },
        { id: 2, x: canvas.width * 0.5, y: canvas.height * 0.3, occupied: true, timer: 45 },
        { id: 3, x: canvas.width * 0.8, y: canvas.height * 0.3, occupied: false, timer: 0 },
        { id: 4, x: canvas.width * 0.2, y: canvas.height * 0.7, occupied: true, timer: 120 },
        { id: 5, x: canvas.width * 0.5, y: canvas.height * 0.7, occupied: false, timer: 0 },
        { id: 6, x: canvas.width * 0.8, y: canvas.height * 0.7, occupied: true, timer: 30 }
      ]

      let frameCount = 0

      const animate = () => {
        if (hovered) {
          animationRef.current = requestAnimationFrame(animate)
          return
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Background
        ctx.fillStyle = 'rgba(10, 10, 10, 0.8)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        zones.forEach(zone => {
          // Draw zone
          ctx.strokeStyle = zone.occupied ? '#76b900' : '#333'
          ctx.lineWidth = zone.occupied ? 3 : 1
          ctx.fillStyle = zone.occupied ? 'rgba(118, 185, 0, 0.1)' : 'transparent'
          ctx.beginPath()
          ctx.arc(zone.x, zone.y, zoneRadius, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()

          // Draw timer
          if (zone.occupied) {
            ctx.fillStyle = '#76b900'
            ctx.font = `bold ${fontSize}px JetBrains Mono`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(`${zone.timer}s`, zone.x, zone.y + 2)

            // Update timer
            if (frameCount % 60 === 0) {
              zone.timer++
            }
          }

          // Glow effect when occupied
          if (zone.occupied) {
            ctx.shadowBlur = 20
            ctx.shadowColor = '#76b900'
            ctx.beginPath()
            ctx.arc(zone.x, zone.y, zoneRadius, 0, Math.PI * 2)
            ctx.stroke()
            ctx.shadowBlur = 0
          }
        })

        // Animate vehicles entering/exiting
        if (frameCount % 300 === 0) {
          const randomZone = zones[Math.floor(Math.random() * zones.length)]
          randomZone.occupied = !randomZone.occupied
          if (randomZone.occupied) {
            randomZone.timer = 0
          }
        }

        frameCount++
        animationRef.current = requestAnimationFrame(animate)
      }

      animate()
    } else if (project.simulation === 'gpu') {
      // GPU benchmarking simulation
      let frame = 0
      const animate = () => {
        if (hovered) {
          animationRef.current = requestAnimationFrame(animate)
          return
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Background
        ctx.fillStyle = 'rgba(10, 10, 10, 0.9)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Responsive sizing based on canvas dimensions
        const isUltraMobile = canvas.width < 320
        const isMobile = canvas.width < 400

        let fontSize, smallFontSize, barHeight

        if (isUltraMobile) {
          fontSize = 7
          smallFontSize = 5
          barHeight = 7
        } else if (isMobile) {
          fontSize = 8
          smallFontSize = 6
          barHeight = 9
        } else {
          fontSize = 11
          smallFontSize = 8
          barHeight = 13
        }

        const padding = 8
        const contentWidth = Math.max(80, canvas.width - padding * 2)
        const startX = (canvas.width - contentWidth) / 2
        const boxHeight = fontSize + 1

        // Tight spacing to fit everything
        let currentY = padding

        // Precision switches
        const precisions = ['FP32', 'FP16', 'INT8']
        const precisionY = currentY
        const boxWidth = Math.max(10, Math.floor(contentWidth / 5))

        precisions.forEach((p, i) => {
          const active = (frame / 120) % precisions.length < i + 1 && (frame / 120) % precisions.length >= i
          const boxX = startX + i * (boxWidth + 2)

          ctx.strokeStyle = active ? '#76b900' : '#555'
          ctx.lineWidth = active ? 2 : 1
          ctx.strokeRect(boxX, precisionY, boxWidth, boxHeight)

          ctx.fillStyle = active ? '#76b900' : '#aaa'
          ctx.font = `bold ${smallFontSize}px JetBrains Mono`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          const textX = boxX + boxWidth / 2
          const textY = precisionY + boxHeight / 2
          if (textX >= 0 && textX <= canvas.width && textY >= 0 && textY <= canvas.height) {
            ctx.fillText(p, textX, textY)
          }
        })

        currentY += boxHeight + 4

        // Throughput label
        const labelY = currentY
        ctx.fillStyle = '#76b900'
        ctx.font = `bold ${fontSize}px JetBrains Mono`
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        if (labelY >= 0 && labelY <= canvas.height) {
          ctx.fillText('Throughput', startX, labelY)
        }

        currentY += fontSize + 2

        // Throughput bar
        const barY = currentY
        const maxBarWidth = contentWidth
        const load = 0.5 + 0.4 * Math.sin(frame / 40)
        const barFillWidth = maxBarWidth * load

        ctx.fillStyle = '#333'
        ctx.fillRect(startX, barY, maxBarWidth, barHeight)
        ctx.fillStyle = '#76b900'
        ctx.fillRect(startX, barY, barFillWidth, barHeight)

        currentY += barHeight + 4

        // Result status
        const statusY = currentY
        ctx.fillStyle = '#76b900'
        ctx.font = `${fontSize}px JetBrains Mono`
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        if (statusY >= 0 && statusY <= canvas.height) {
          ctx.fillText('Result: ACCEPTED', startX, statusY)
        }

        frame++
        animationRef.current = requestAnimationFrame(animate)
      }
      animate()
    } else if (project.simulation === 'sentiment') {
      // Sentiment system simulation
      let frame = 0
      const texts = ['\"Service is great\"', '\"डिलिव्हरी उशिरा झाली\"', '\"Support was helpful\"', '\"सिस्टम स्लो आहे\"']
      const langs = ['EN', 'MR', 'EN', 'MR']
      const sentiments = ['POS', 'NEG', 'POS', 'NEG']

      const animate = () => {
        if (hovered) {
          animationRef.current = requestAnimationFrame(animate)
          return
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Background
        ctx.fillStyle = 'rgba(10, 10, 10, 0.9)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Responsive sizing
        const isMobile = canvas.width < 400
        const fontSize = isMobile ? 11 : 14
        const smallFontSize = isMobile ? 9 : 12
        const padding = isMobile ? 12 : 20

        // Incoming text stream
        const idx = Math.floor(frame / 120) % texts.length
        ctx.fillStyle = '#ffffff'
        ctx.font = `bold ${fontSize}px JetBrains Mono`
        ctx.textAlign = 'left'
        ctx.fillText(texts[idx], padding, canvas.height * 0.25)

        // Language tag
        ctx.fillStyle = '#76b900'
        ctx.font = `${smallFontSize}px JetBrains Mono`
        ctx.fillText(`Lang: ${langs[idx]}`, padding, canvas.height * 0.25 + 20)

        // Sentiment gauge
        const isPositive = sentiments[idx] === 'POS'
        const gaugeMaxWidth = Math.min(canvas.width * 0.6, canvas.width - padding * 2)
        const gaugeY = canvas.height * 0.55

        ctx.fillStyle = '#333'
        ctx.fillRect(padding, gaugeY, gaugeMaxWidth, 14)
        ctx.fillStyle = isPositive ? '#4ade80' : '#f97373'
        const gaugeWidth = gaugeMaxWidth * (isPositive ? 0.7 : 0.3)
        ctx.fillRect(padding, gaugeY, gaugeWidth, 14)

        ctx.fillStyle = '#76b900'
        ctx.font = `bold ${smallFontSize}px JetBrains Mono`
        ctx.fillText(`Sentiment: ${isPositive ? 'Positive' : 'Negative'}`, padding, gaugeY - 8)
        ctx.fillText('Accuracy: 90%+', padding, gaugeY + 28)
        ctx.fillText('Deployment: Cloud Run', padding, gaugeY + 44)

        frame++
        animationRef.current = requestAnimationFrame(animate)
      }
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      ro.disconnect()
    }
  }, [isActive, project.simulation, hovered, isRunning])

  return (
    <motion.div
      className={`project-card-3d ${isActive ? 'active' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onActivate}
      onMouseEnter={() => !isTouchDevice && setHovered(true)}
      onMouseLeave={() => !isTouchDevice && setHovered(false)}
    >
      <div className="card-header-3d">
        <h3 className="project-title-3d">{project.title}</h3>
        <p className="project-subtitle-3d">{project.subtitle}</p>
      </div>

      <div className="simulation-container">
        <canvas ref={canvasRef} className="simulation-canvas"></canvas>
      </div>

      <div className="card-footer-3d">
        <div className="metrics-row">
          {project.simulation === 'speed' && (
            <>
              <span>Latency: {project.metrics.latency}</span>
              <span>Streams: {project.metrics.streams}</span>
              <span>Status: {project.metrics.status}</span>
            </>
          )}
          {project.simulation === 'dock' && (
            <>
              <span>Active Docks: {project.metrics.activeDocks}</span>
              <span>Congestion: {project.metrics.congestion}</span>
              <span>Status: {project.metrics.status}</span>
            </>
          )}
          {project.simulation === 'gpu' && (
            <>
              <span>GPU: {project.metrics.gpu}</span>
              <span>Mode: {project.metrics.mode}</span>
              <span>Result: {project.metrics.result}</span>
            </>
          )}
          {project.simulation === 'sentiment' && (
            <>
              <span>Accuracy: {project.metrics.accuracy}</span>
              <span>Deployment: {project.metrics.deployment}</span>
              <span>Langs: {project.metrics.langs}</span>
            </>
          )}
        </div>
        <div className="simulation-meta">
          <span className="simulation-badge">LIVE SIMULATION</span>
        </div>
      </div>

      {(hovered || (isTouchDevice && isActive)) && (
        <div className="project-overlay">
          <div className="overlay-section">
            <h4>Problem</h4>
            <p>{project.problem}</p>
          </div>
          <div className="overlay-section">
            <h4>Solution</h4>
            <p>{project.solution}</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default Projects3D
