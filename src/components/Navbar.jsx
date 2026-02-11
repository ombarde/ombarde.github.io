import { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [gpuSpike, setGpuSpike] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNvidiaClick = () => {
    setGpuSpike(true)
    setTimeout(() => setGpuSpike(false), 2000)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={handleNvidiaClick}>
          <span className="logo-text">System: Oms</span>
          {gpuSpike && <div className="gpu-spike">⚡ GPU SPIKE ⚡</div>}
        </div>
        <div className="nav-links">
          <a href="#identity">IDENTITY</a>
          <a href="#powers">MODULES</a>
          <a href="#journey">JOURNEY</a>
          <a href="#projects">PROJECTS</a>
          <a href="#contact">CONNECT</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
