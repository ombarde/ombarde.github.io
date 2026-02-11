import { motion } from 'framer-motion'
import './Experience.css'

const Experience = () => {
  const logs = [
    {
      type: 'INFO',
      timestamp: '2025-07 - Present',
      company: 'CCS COMPUTERS PVT. LTD.',
      role: 'AI Developer',
      location: 'New Delhi, Delhi, India',
      entries: [
        '[INFO] Deployed MLPerf benchmarks on H200',
        '[INFO] Executed Training and Inference benchmarks across CV, NLP, speech, recommendation, and LLM workloads',
        '[INFO] Benchmarked single-node and multi-node systems, validating throughput and latency',
        '[INFO] Built real-time vehicle speed detection system using GPU-accelerated AI',
        '[INFO] Designed and trained computer vision models for vehicle detection and tracking',
        '[INFO] Implemented low-latency video processing pipelines with GStreamer',
        '[INFO] Developed AI-driven dock management solution for logistics automation',
        '[SUCCESS] System stability achieved for long-running deployments',
        '[SUCCESS] Acceptance criteria passed for production deployment'
      ]
    },
    {
      type: 'INFO',
      timestamp: '2024-06 - 2025-07',
      company: 'Unifins IT Hub Private Limited',
      role: 'Data Analyst',
      location: 'Nagpur, Maharashtra, India',
      entries: [
        '[INFO] Deployed multilingual sentiment analysis engine using BERT',
        '[SUCCESS] Achieved 90%+ accuracy across English, Hindi, and Marathi',
        '[INFO] Integrated model into CRM via RESTful APIs on GCP Cloud Run',
        '[INFO] Built modular ETL pipelines in Python (Pandas, spaCy)',
        '[INFO] Stored results in BigQuery and Google Sheets',
        '[INFO] Used RAKE for keyword extraction and trend analysis',
        '[SUCCESS] Led 3-member team for system integration',
        '[INFO] Led comparative market study for wealth management platform',
        '[INFO] Designed scalable, SEBI-compliant mutual fund distribution model'
      ]
    },
    {
      type: 'INFO',
      timestamp: '2023-07 - 2023-12',
      company: 'The University of Texas at Austin',
      role: 'Research And Development Intern',
      location: 'Austin, Texas, United States',
      entries: [
        '[INFO] Working on object dynamics estimation from video sequences',
        '[INFO] Applied deep learning models with PyTorch and OpenCV',
        '[INFO] Built preprocessing pipelines for frame extraction and annotation',
        '[INFO] Applied CNNs for spatial features',
        '[INFO] Integrated RNNs (LSTM) for sequential dependencies',
        '[SUCCESS] Improved temporal coherence of tracking through optimization'
      ]
    },
    {
      type: 'INFO',
      timestamp: '2023-04 - 2024-04',
      company: 'IEEE SB GHRIETN',
      role: 'Vice Chair',
      location: 'Nagpur, Maharashtra, India',
      entries: [
        '[INFO] Overseeing subcommittees and managing activities',
        '[INFO] Leading technical initiatives and events'
      ]
    }
  ]

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Production Logs</p>
          
          <div className="logs-container">
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                className="log-entry"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <div className="log-header">
                  <span className={`log-type ${log.type.toLowerCase()}`}>[{log.type}]</span>
                  <span className="log-timestamp">{log.timestamp}</span>
                </div>
                <div className="log-company">{log.company}</div>
                <div className="log-role">{log.role}</div>
                <div className="log-location">{log.location}</div>
                <div className="log-entries">
                  {log.entries.map((entry, eIdx) => {
                    const entryType = entry.match(/\[(\w+)\]/)?.[1] || 'INFO'
                    return (
                      <div key={eIdx} className={`log-line ${entryType.toLowerCase()}`}>
                        {entry}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
