import { useState, useEffect } from 'react'
import BootSequence3D from './components/BootSequence3D'
import Identity from './components/Identity'
import CorePowers3D from './components/CorePowers3D'
import Journey from './components/Journey'
import Projects3D from './components/Projects3D'
import Certifications3D from './components/Certifications3D'
import Experience3D from './components/Experience3D'
import Philosophy3D from './components/Philosophy3D'
import Contact3D from './components/Contact3D'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [bootComplete, setBootComplete] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [fps, setFps] = useState(60)

  useEffect(() => {
    // Konami code for debug mode
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let konamiIndex = 0

    const handleKeyPress = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          setDebugMode(true)
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  useEffect(() => {
    if (!debugMode) return

    let animationFrameId
    let frameCount = 0
    let lastTime = performance.now()

    const updateFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        setFps(frameCount)
        frameCount = 0
        lastTime = currentTime
      }
      
      animationFrameId = requestAnimationFrame(updateFPS)
    }

    animationFrameId = requestAnimationFrame(updateFPS)
    return () => cancelAnimationFrame(animationFrameId)
  }, [debugMode])

  if (!bootComplete) {
    return <BootSequence3D onComplete={() => setBootComplete(true)} />
  }

  return (
    <div className="app">
      {debugMode && (
        <div className="debug-overlay">
          <div className="debug-panel">
            <h3>DEBUG MODE</h3>
            <div>FPS: <span id="fps">{fps}</span></div>
            <div>GPU: <span className="status-online">ONLINE</span></div>
            <div>Memory: <span>8.2 GB / 16 GB</span></div>
            <div>Temperature: <span>42°C</span></div>
            <button onClick={() => setDebugMode(false)}>CLOSE</button>
          </div>
        </div>
      )}
      <Navbar />
      <Identity />
      <CorePowers3D />
      <Journey />
      <Projects3D />
      <Certifications3D />
      <Experience3D />
      <Philosophy3D />
      <Contact3D />
    </div>
  )
}

export default App
