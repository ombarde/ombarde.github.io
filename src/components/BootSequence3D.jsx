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
    'Initializing Om_Barde.ai',
    'Loading Vision Modules...',
    'Multi-GPU Scaling: ONLINE',
    'GPU Online.'
  ]

  useEffect(() => {
    // Activate lines after 1 second
    setTimeout(() => setLinesActive(true), 1000)
    // Show text after 2 seconds
    setTimeout(() => setTextVisible(true), 2000)
    // Start typing effect
    let textIndex = 0
    let charIndex = 0
    const typeInterval = setInterval(() => {
      if (textIndex < bootTexts.length) {
        if (charIndex < bootTexts[textIndex].length) {
          setCurrentText(bootTexts[textIndex].substring(0, charIndex + 1))
          charIndex++
        } else {
          setTimeout(() => {
            textIndex++
            charIndex = 0
            if (textIndex >= bootTexts.length) {
              clearInterval(typeInterval)
              setTimeout(() => {
                setCameraZoom(true)
                setTimeout(() => onComplete(), 2000)
              }, 2000)
            }
          }, 1500)
        }
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [])

  useFrame((state, delta) => {
    if (chipRef.current) {
      chipRef.current.rotation.y += delta * 0.3
      chipRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
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
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#76b900" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#76b900" />

      <group ref={chipRef} position={[0, 0, 0]} scale={0.7}>
        {/* GPU Chip Base */}
        <mesh>
          <boxGeometry args={[3, 2, 0.2]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* CUDA Cores */}
        {cores.map((pos, idx) => (
          <mesh key={idx} position={[pos[0], pos[1], 0.15]}>
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
          <mesh key={i} position={[-1.5 + i, -1.2, 0.1]}>
            <boxGeometry args={[0.1, 2.4, 0.05]} />
            <meshStandardMaterial 
              color="#76b900"
              emissive="#76b900"
              emissiveIntensity={linesActive ? 0.3 + Math.sin(Date.now() * 0.01 + i) * 0.2 : 0}
            />
          </mesh>
        ))}

        {/* Text on 3D plane */}
        {textVisible && currentText && (
          <Text
            position={[0, -2, 0.5]}
            fontSize={0.3}
            color="#76b900"
            anchorX="center"
            anchorY="middle"
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

  useEffect(() => {
    setTimeout(() => setShowSubtitle(true), 8000)
    setTimeout(() => setShowCTA(true), 10000)
  }, [])

  return (
    <div className="boot-sequence-3d">
      <div className="canvas-container">
        <Canvas>
          <GPUChip onComplete={onComplete} />
        </Canvas>
      </div>
      <div className="boot-overlay">
        {showSubtitle && (
          <div className="boot-subtitle">
            I build AI systems that see, scale, and survive real-world chaos.
          </div>
        )}
        {showCTA && (
          <button className="enter-button" onClick={onComplete}>
            ENTER SYSTEM
          </button>
        )}
      </div>
    </div>
  )
}

export default BootSequence3D
