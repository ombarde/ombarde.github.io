import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import './BootSequence3D.css'

const GPUChip = ({ onComplete }) => {
  const chipRef = useRef()
  const [linesActive, setLinesActive] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [cameraZoom, setCameraZoom] = useState(false)

  const bootTexts = [
    'Initializing System: Oms',
    'Loading Vision Modules...',
    'Multi-GPU Scaling: ONLINE',
    'GPU Online.',
    'I build AI systems that see, scale, and survive real-world chaos.'
  ]

  useEffect(() => {
    // Activate lines after a short delay
    setTimeout(() => setLinesActive(true), 800)
    setTimeout(() => setTextVisible(true), 1000)
    // Start typing effect (includes final full-sentence line)
    let textIndex = 0
    let charIndex = 0
    const finalIndex = bootTexts.length - 1
    const typeInterval = setInterval(() => {
      if (textIndex < bootTexts.length) {
        if (charIndex < bootTexts[textIndex].length) {
          setCurrentText(bootTexts[textIndex].substring(0, charIndex + 1))
          charIndex++
        } else {
          // If final line, keep visible longer then zoom + complete
          if (textIndex === finalIndex) {
            clearInterval(typeInterval)
            setTimeout(() => {
              setCameraZoom(true)
              setTimeout(() => onComplete(), 3500)
            }, 3500)
          } else {
            setTimeout(() => {
              textIndex++
              charIndex = 0
            }, 1100)
          }
        }
      }
    }, 45)

    return () => clearInterval(typeInterval)
  }, [])

  useFrame((state, delta) => {
    if (chipRef.current) {
      // stronger multi-axis motion for a more 3D look
      chipRef.current.rotation.y += delta * 0.6
      chipRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.9) * 0.12
      chipRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.6) * 0.05
    }
  })

  // Create CUDA cores
  const cores = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      cores.push([i * 0.3 - 1.05, j * 0.3 - 1.05, 0])
    }
  }

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} enablePan={false} />
      
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1} color="#ffffff" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[10, 6, 6]} intensity={0.6} color="#76b900" />
      <pointLight position={[-8, -6, -6]} intensity={0.3} color="#76b900" />

      <group ref={chipRef} position={[0, 0, 0]} scale={0.7}>
        {/* GPU Chip Base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 2, 0.2]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* CUDA Cores */}
        {cores.map((pos, idx) => (
          <mesh key={idx} position={[pos[0], pos[1], 0.15]} castShadow>
            <boxGeometry args={[0.15, 0.15, 0.05]} />
            <meshStandardMaterial 
              color={linesActive ? "#76b900" : "#333"} 
              emissive={linesActive ? "#76b900" : "#000"}
              emissiveIntensity={linesActive ? 0.5 + Math.random() * 0.5 : 0}
            />
          </mesh>
        ))}

        {/* Memory Lanes */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[-1.5 + i, -1.2, 0.1]} castShadow>
            <boxGeometry args={[0.1, 2.4, 0.05]} />
            <meshStandardMaterial 
              color="#76b900"
              emissive="#76b900"
              emissiveIntensity={linesActive ? 0.3 + Math.sin(Date.now() * 0.01 + i) * 0.2 : 0}
            />
          </mesh>
        ))}

        {/* Ground plane to receive shadow for depth */}
        <mesh rotation-x={-Math.PI / 2} position={[0, -1.2, -0.15]} receiveShadow>
          <planeGeometry args={[8, 8]} />
          <meshStandardMaterial color="#000" metalness={0} roughness={1} transparent opacity={0.35} />
        </mesh>

        {/* Text on 3D plane */}
        {textVisible && currentText && (
          <Text
            position={[0, -1.6, 0.5]}
            fontSize={0.45}
            color="#76b900"
            anchorX="center"
            anchorY="middle"
            maxWidth={6}
          >
            {currentText}
          </Text>
        )}
      </group>

      {cameraZoom && (
        <CameraZoom />
      )}
    </>
  )
}

const CameraZoom = () => {
  useFrame((state) => {
    if (state.camera.position.z > 0.5) {
      state.camera.position.z -= 0.05
      state.camera.lookAt(0, 0, 0)
    }
  })
  return null
}

const BootSequence3D = ({ onComplete }) => {
  const [showCTA, setShowCTA] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [enterLoading, setEnterLoading] = useState(false)
  const enterLines = [
    'Initializing System: Oms',
    'Loading Vision Modules...',
    'GPU Online.'
  ]
  const [enterIndex, setEnterIndex] = useState(0)
  const [enterText, setEnterText] = useState('')
  const [enterCursor, setEnterCursor] = useState(true)

  useEffect(() => {
    setTimeout(() => setShowSubtitle(true), 8000)
    setTimeout(() => setShowCTA(true), 10000)
  }, [])

  useEffect(() => {
    if (!enterLoading) return

    if (enterIndex >= enterLines.length) {
      // finished sequence; small pause then complete
      const finish = setTimeout(() => {
        setEnterLoading(false)
        onComplete()
      }, 1400)
      return () => clearTimeout(finish)
    }

    let charIdx = 0
    setEnterText('')
    const speed = 40
    const t = setInterval(() => {
      const line = enterLines[enterIndex]
      if (charIdx < line.length) {
        setEnterText(line.substring(0, charIdx + 1))
        charIdx++
      } else {
        clearInterval(t)
        const pause = setTimeout(() => {
          setEnterIndex(i => i + 1)
        }, 900)
        return () => clearTimeout(pause)
      }
    }, speed)

    return () => clearInterval(t)
  }, [enterLoading, enterIndex])

  useEffect(() => {
    if (!enterLoading) return
    const c = setInterval(() => setEnterCursor(v => !v), 530)
    return () => clearInterval(c)
  }, [enterLoading])

  return (
    <div className="boot-sequence-3d">
      <div className="canvas-container">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }} shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <GPUChip onComplete={onComplete} />
        </Canvas>
      </div>
      <div className="boot-overlay">
        {showSubtitle && (
          <div className="boot-subtitle">
            I build AI systems that see, scale, and survive real-world chaos.
          </div>
        )}
        {showCTA && !enterLoading && (
          <button className="enter-button" onClick={() => { setEnterLoading(true); setEnterIndex(0); setEnterText('') }}>
            ENTER SYSTEM
          </button>
        )}

        {enterLoading && (
          <div className="enter-loading">
            <div className="enter-lines">
              {enterLines.slice(0, enterIndex).map((ln, i) => (
                <div key={i} className="enter-line">{ln}</div>
              ))}
              {enterIndex < enterLines.length && (
                <div className="enter-line">
                  {enterText}{enterCursor && <span className="cursor">_</span>}
                </div>
              )}
            </div>
            <div className="enter-progress">
              <div className="bar" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BootSequence3D
