import { useState, useEffect } from 'react'
import './BootSequence.css'

const BootSequence = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [showCTA, setShowCTA] = useState(false)

  const bootLines = [
    'Initializing Om_Barde.ai',
    'Loading Vision Modules...',
    'GPU Online.',
    '',
    'I build AI systems that see, scale, and survive real-world chaos.'
  ]

  useEffect(() => {
    if (currentLine >= bootLines.length) {
      setShowCTA(true)
      return
    }

    const line = bootLines[currentLine]
    if (!line) {
      setTimeout(() => setCurrentLine(prev => prev + 1), 500)
      return
    }

    let charIndex = 0
    setDisplayText('')

    const typingSpeed = 50
    const postDelay = currentLine === bootLines.length - 1 ? 4000 : 1000

    const typeInterval = setInterval(() => {
      if (charIndex < line.length) {
        setDisplayText(line.substring(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentLine(prev => prev + 1)
        }, postDelay)
      }
    }, typingSpeed)

    return () => clearInterval(typeInterval)
  }, [currentLine])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="boot-sequence">
      <div className="boot-content">
        <div className="boot-text">
          {bootLines.slice(0, currentLine).map((line, idx) => (
            <div key={idx} className="boot-line">{line}</div>
          ))}
          {currentLine < bootLines.length && (
            <div className="boot-line">
              {displayText}
              {showCursor && <span className="cursor">_</span>}
            </div>
          )}
        </div>
        {showCTA && (
          <button className="enter-button" onClick={onComplete}>
            ENTER SYSTEM
          </button>
        )}
      </div>
      <div className="gpu-hum"></div>
    </div>
  )
}

export default BootSequence
