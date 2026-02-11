import { useState } from 'react'
import { motion } from 'framer-motion'
import './CorePowers.css'

const CorePowers = () => {
  const [activeModule, setActiveModule] = useState(null)

  const modules = [
    {
      id: 'vision',
      icon: '🎥',
      name: 'Vision Engine',
      description: 'Real-time video analytics, tracking',
      story: 'Built production systems that process live traffic feeds, detect vehicles across multiple camera streams, and track objects through complex scenes. Designed low-latency pipelines that handle real-world noise, lighting variations, and camera failures.',
      position: { top: '10%', left: '50%' }
    },
    {
      id: 'acceleration',
      icon: '⚡',
      name: 'Acceleration Core',
      description: 'CUDA, multi-GPU, FP16/INT8',
      story: 'Optimized inference pipelines for H200 and L4 GPUs, achieving 3-5x speedups through precision optimization and memory bandwidth tuning. Benchmarked multi-node systems under MLPerf constraints, validating throughput and latency at scale.',
      position: { top: '30%', left: '20%' }
    },
    {
      id: 'pipeline',
      icon: '🔁',
      name: 'Pipeline Orchestrator',
      description: 'GStreamer, multi-stream',
      story: 'Designed GStreamer-based video pipelines that process multiple RTSP streams simultaneously, with intelligent buffering and batching. Built systems that scale from single-camera deployments to multi-camera logistics operations.',
      position: { top: '50%', left: '50%' }
    },
    {
      id: 'learning',
      icon: '🧠',
      name: 'Learning Unit',
      description: 'CV, BERT, Transformers',
      story: 'Trained computer vision models for vehicle detection and classification. Deployed multilingual BERT models achieving 90%+ accuracy across English, Hindi, and Marathi. Worked on temporal models (LSTM/RNN) for motion prediction from video sequences.',
      position: { top: '70%', left: '20%' }
    },
    {
      id: 'infrastructure',
      icon: '🧱',
      name: 'Infrastructure Layer',
      description: 'DGX, H200, L4, MLPerf',
      story: 'Managed DGX cloud operations, executed MLPerf benchmarks across vision, NLP, and LLM workloads. Validated AI infrastructure under strict acceptance criteria, documenting performance metrics for deployment readiness.',
      position: { top: '50%', left: '80%' }
    }
  ]

  return (
    <section id="powers" className="core-powers-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Core Powers</h2>
          <p className="section-subtitle">Modules I Run</p>
          
          <div className="modules-container">
            <div className="modules-diagram">
              {modules.map((module, idx) => (
                <motion.div
                  key={module.id}
                  className={`module-node ${activeModule === module.id ? 'active' : ''}`}
                  style={module.position}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="module-icon">{module.icon}</div>
                  <div className="module-name">{module.name}</div>
                  <div className="module-desc">{module.description}</div>
                </motion.div>
              ))}
              
              {/* Connection lines */}
              <svg className="module-connections" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="50" y1="10" x2="50" y2="50" stroke="var(--nvidia-green)" strokeWidth="0.5" opacity="0.3" />
                <line x1="20" y1="30" x2="50" y2="50" stroke="var(--nvidia-green)" strokeWidth="0.5" opacity="0.3" />
                <line x1="50" y1="50" x2="80" y2="50" stroke="var(--nvidia-green)" strokeWidth="0.5" opacity="0.3" />
                <line x1="20" y1="70" x2="20" y2="30" stroke="var(--nvidia-green)" strokeWidth="0.5" opacity="0.3" />
              </svg>
            </div>
            
            {activeModule && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="module-story"
              >
                <h3>{modules.find(m => m.id === activeModule)?.name}</h3>
                <p>{modules.find(m => m.id === activeModule)?.story}</p>
                <button onClick={() => setActiveModule(null)}>CLOSE</button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CorePowers
