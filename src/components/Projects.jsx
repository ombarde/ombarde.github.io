import { useState } from 'react'
import { motion } from 'framer-motion'
import './Projects.css'

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null)

  const projects = [
    {
      id: 'speed-detection',
      title: 'Speed Detection System',
      subtitle: 'Real-Time Traffic Intelligence',
      input: 'Live Traffic Feeds',
      process: 'Detection → Tracking → Calibration',
      output: 'Real-Time Speed Violations',
      constraints: ['Low Latency', 'High Uptime'],
      status: 'Stable',
      problem: 'Need to detect and track vehicle speeds in real-time from multiple camera feeds with minimal latency.',
      solution: 'Built GPU-accelerated computer vision models for vehicle detection and tracking. Implemented low-latency GStreamer pipelines with camera calibration and speed estimation logic. Optimized models for real-time inference on NVIDIA GPUs.',
      impact: 'Deployed system processes multiple camera streams simultaneously, providing real-time speed violation alerts with sub-second latency.'
    },
    {
      id: 'dock-management',
      title: 'Dock Management System',
      subtitle: 'Logistics Intelligence',
      input: 'Multi-Camera Dock Feeds',
      process: 'Vehicle Detection → Zone Tracking → Event Analytics',
      output: 'Occupancy, Wait Time, Congestion Alerts',
      constraints: ['Multi-Stream', 'Event-Driven'],
      status: 'Stable',
      problem: 'Monitor vehicle movement, dock occupancy, and turnaround time in complex logistics environments.',
      solution: 'Designed and trained vision models for vehicle detection and classification. Implemented zone-based tracking and event-driven analytics. Integrated AI outputs with backend systems for real-time operations.',
      impact: 'Enabled real-time visibility into dock utilization, reducing wait times and improving logistics efficiency.'
    },
    {
      id: 'gpu-benchmarking',
      title: 'GPU Benchmarking',
      subtitle: 'Truth Under Load',
      input: 'AI Workloads (CV, NLP, LLM)',
      process: 'MLPerf Execution → Performance Analysis → Validation',
      output: 'Throughput, Latency, Scalability Reports',
      constraints: ['Strict Acceptance Criteria', 'Multi-Node'],
      status: 'Validated',
      problem: 'Validate AI infrastructure performance under production-like conditions for acceptance testing.',
      solution: 'Executed MLPerf Training and Inference benchmarks across computer vision, NLP, speech recognition, recommendation systems, and LLM workloads. Benchmarked single-node and multi-node systems, analyzing performance across precision modes.',
      impact: 'Documented benchmark methodology and results for formal acceptance testing, ensuring deployment readiness of H200 and L4 GPU systems.'
    },
    {
      id: 'sentiment-engine',
      title: 'Multilingual Sentiment Engine',
      subtitle: 'Understanding Humans',
      input: 'User Feedback (English, Hindi, Marathi)',
      process: 'BERT Processing → Sentiment Classification → Keyword Extraction',
      output: 'Sentiment Tags, Priority Routing, Trend Analysis',
      constraints: ['90%+ Accuracy', 'Real-Time API'],
      status: 'Deployed',
      problem: 'Analyze sentiment across multiple languages in real-time to enhance customer support efficiency.',
      solution: 'Designed and deployed multilingual BERT-based sentiment analysis engine achieving 90%+ accuracy. Integrated via RESTful APIs on GCP Cloud Run. Built ETL pipelines with RAKE keyword extraction for trend analysis.',
      impact: 'Delivered AI-powered feedback categorization and priority routing, significantly improving support response efficiency.'
    }
  ]

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Deployed in the Wild</p>
          
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className={`project-card ${expandedProject === project.id ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              >
                <div className="card-header">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                  </div>
                  <span className={`status-badge ${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="card-body">
                  <div className="io-section">
                    <div className="io-item">
                      <span className="io-label">INPUT:</span>
                      <span className="io-value">{project.input}</span>
                    </div>
                    <div className="io-item">
                      <span className="io-label">PROCESS:</span>
                      <span className="io-value">{project.process}</span>
                    </div>
                    <div className="io-item">
                      <span className="io-label">OUTPUT:</span>
                      <span className="io-value">{project.output}</span>
                    </div>
                  </div>
                  
                  <div className="constraints">
                    {project.constraints.map((constraint, cIdx) => (
                      <span key={cIdx} className="constraint-tag">{constraint}</span>
                    ))}
                  </div>
                </div>

                {expandedProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="card-expanded"
                  >
                    <div className="expanded-section">
                      <h4>Problem</h4>
                      <p>{project.problem}</p>
                    </div>
                    <div className="expanded-section">
                      <h4>Solution</h4>
                      <p>{project.solution}</p>
                    </div>
                    <div className="expanded-section">
                      <h4>Impact</h4>
                      <p>{project.impact}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
