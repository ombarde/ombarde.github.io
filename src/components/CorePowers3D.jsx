import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as d3 from 'd3'
import './CorePowers3D.css'

const VIEWBOX = { w: 700, h: 640 }

const layerMeta = [
  { id: 'input', label: 'Layer 1: Input & Data Sources', place: 'top' },
  { id: 'pipelines', label: 'Layer 2: Processing & Pipelines', place: 'top' },
  { id: 'models', label: 'Layer 3: AI & Models (Center)', place: 'center' },
  { id: 'gpu', label: 'Layer 4: GPU & Acceleration', place: 'mid' },
  { id: 'infra', label: 'Layer 5: Infrastructure & Deployment', place: 'mid' },
  { id: 'monitoring', label: 'Layer 6: Monitoring & Validation', place: 'bottom' }
]

const nodeExplanations = {
  'RTSP / IP Cameras': 'Live video streams from traffic and dock cameras feeding into GStreamer pipelines for real-time analytics.',
  'Video Feeds': 'Multi-camera RTSP feeds used in speed detection and dock management systems.',
  'Text / Feedback': 'Multilingual customer feedback (EN/HI/MR) processed by ETL and fed into BERT-based sentiment models.',
  'GStreamer Pipelines': 'Low-latency multi-stream pipelines with batching and buffering for real-time video analytics.',
  'Multi-stream batching': 'Batching frames across streams to maximize GPU utilization and keep latency within budget.',
  'OpenCV': 'Preprocessing, calibration, and frame extraction for detection and tracking models.',
  'ETL (Pandas, spaCy)': 'Structured and unstructured feedback cleaned and transformed for BERT and keyword extraction.',
  'AI COMPUTE CORE': 'Central inference engine: computer vision (detection, tracking, motion prediction) and transformers (BERT sentiment). Time-series and event-based analytics run here.',
  'Detection': 'Vehicle and object detection from video frames; backbone for speed and dock systems.',
  'Tracking': 'Object tracking across frames for speed estimation and dock occupancy.',
  'Sentiment': 'Multilingual sentiment classification (90%+ accuracy) via BERT on Cloud Run.',
  'Motion Prediction': 'Temporal models (e.g. LSTM) for object dynamics from video sequences (research @ UT Austin).',
  'CUDA': 'GPU kernels and memory optimization for inference; multi-GPU scaling for training and benchmarking.',
  'H200': 'MLPerf and production workloads; validated for training and inference acceptance.',
  'L4': 'Edge and mid-tier inference; used in video analytics and benchmarking.',
  'A5000': 'Development and smaller-scale inference and profiling.',
  'Docker': 'Containerized models and APIs for consistent deployment across environments.',
  'GCP / Cloud Run': 'Serverless deployment for sentiment APIs and scalable inference.',
  'REST APIs': 'APIs exposing model outputs to CRM and operations dashboards.',
  'MLPerf': 'Training and inference benchmarking; formal acceptance and performance reporting.',
  'Acceptance Testing': 'Structured acceptance criteria and performance reports for deployment sign-off.'
}

const skillsData = {
  // Layer 1: Input & Data Sources (Top)
  'RTSP / IP Cameras': { x: 120, y: 55, connections: ['GStreamer Pipelines'], color: '#76b900', layer: 'input' },
  'Video Feeds': { x: 350, y: 45, connections: ['GStreamer Pipelines'], color: '#76b900', layer: 'input' },
  'Text / Feedback': { x: 580, y: 55, connections: ['ETL (Pandas, spaCy)'], color: '#76b900', layer: 'input' },

  // Layer 2: Processing & Pipelines
  'GStreamer Pipelines': { x: 200, y: 130, connections: ['AI COMPUTE CORE'], color: '#76b900', layer: 'pipelines' },
  'Multi-stream batching': { x: 350, y: 125, connections: ['AI COMPUTE CORE'], color: '#76b900', layer: 'pipelines' },
  'OpenCV': { x: 480, y: 130, connections: ['AI COMPUTE CORE'], color: '#76b900', layer: 'pipelines' },
  'ETL (Pandas, spaCy)': { x: 580, y: 130, connections: ['AI COMPUTE CORE'], color: '#76b900', layer: 'pipelines' },

  // Layer 3: AI & Models (Center) – floating core + sub-nodes
  'AI COMPUTE CORE': { x: 350, y: 270, connections: ['Detection', 'Tracking', 'Sentiment', 'Motion Prediction'], color: '#76b900', layer: 'models', isCore: true },
  'Detection': { x: 220, y: 340, connections: [], color: '#76b900', layer: 'models' },
  'Tracking': { x: 350, y: 350, connections: [], color: '#76b900', layer: 'models' },
  'Sentiment': { x: 480, y: 340, connections: [], color: '#76b900', layer: 'models' },
  'Motion Prediction': { x: 350, y: 400, connections: [], color: '#76b900', layer: 'models' },

  // Layer 4: GPU & Acceleration
  'CUDA': { x: 150, y: 470, connections: ['AI COMPUTE CORE'], color: '#76b900', layer: 'gpu' },
  'H200': { x: 300, y: 465, connections: ['MLPerf'], color: '#76b900', layer: 'gpu' },
  'L4': { x: 420, y: 465, connections: ['MLPerf'], color: '#76b900', layer: 'gpu' },
  'A5000': { x: 550, y: 470, connections: ['MLPerf'], color: '#76b900', layer: 'gpu' },

  // Layer 5: Infrastructure & Deployment
  'Docker': { x: 200, y: 535, connections: ['REST APIs'], color: '#76b900', layer: 'infra' },
  'GCP / Cloud Run': { x: 350, y: 530, connections: ['REST APIs'], color: '#76b900', layer: 'infra' },
  'REST APIs': { x: 520, y: 535, connections: [], color: '#76b900', layer: 'infra' },

  // Layer 6: Monitoring & Validation (Bottom)
  'MLPerf': { x: 320, y: 600, connections: [], color: '#76b900', layer: 'monitoring' },
  'Acceptance Testing': { x: 500, y: 600, connections: [], color: '#76b900', layer: 'monitoring' }
}

const CorePowers3D = () => {
  const svgRef = useRef(null)
  const sectionRef = useRef(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [activeLayer, setActiveLayer] = useState(null)
  const [clickedNode, setClickedNode] = useState(null)
  const [bandwidth, setBandwidth] = useState(0)
  const [visibleLayers, setVisibleLayers] = useState(['input'])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const assemblyProgress = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 1, 1])

  useEffect(() => {
    const unsub = assemblyProgress.on('change', (v) => {
      const step = Math.min(5, Math.floor(v * 6))
      setVisibleLayers(layerMeta.slice(0, step + 1).map(l => l.id))
    })
    return () => unsub()
  }, [assemblyProgress])

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const nodeData = Object.keys(skillsData).map(key => ({
      id: key,
      ...skillsData[key]
    }))

    const linkData = []
    nodeData.forEach(node => {
      (node.connections || []).forEach(target => {
        linkData.push({ source: node.id, target })
      })
    })

    linkData.forEach(l => {
      l.sourceLayer = nodeData.find(n => n.id === l.source)?.layer
      l.targetLayer = nodeData.find(n => n.id === l.target)?.layer
    })

    const link = svg.append('g').attr('class', 'link-layer')
      .selectAll('line')
      .data(linkData)
      .enter()
      .append('line')
      .attr('stroke', '#76b900')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.35)
      .attr('x1', d => nodeData.find(n => n.id === d.source)?.x ?? 0)
      .attr('y1', d => nodeData.find(n => n.id === d.source)?.y ?? 0)
      .attr('x2', d => nodeData.find(n => n.id === d.target)?.x ?? 0)
      .attr('y2', d => nodeData.find(n => n.id === d.target)?.y ?? 0)

    const node = svg.append('g').attr('class', 'node-layer')
      .selectAll('circle')
      .data(nodeData)
      .enter()
      .append('circle')
      .attr('r', d => d.isCore ? 32 : 18)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => d.color)
      .attr('stroke', '#76b900')
      .attr('stroke-width', d => d.isCore ? 3 : 2)
      .style('cursor', 'pointer')
      .attr('data-layer', d => d.layer)
      .attr('opacity', 0)

    node
      .on('mouseenter', function (event, d) {
        setHoveredNode(d.id)
        setActiveLayer(d.layer)
        d3.select(this).transition().duration(200).attr('r', d.isCore ? 38 : 24).attr('stroke-width', 4)
        svg.selectAll('.node-layer circle').transition().duration(200)
          .attr('opacity', n => (n.layer === d.layer ? 1 : 0.2))
        link.transition().duration(200)
          .attr('stroke-opacity', l => {
            const s = nodeData.find(n => n.id === l.source)
            const t = nodeData.find(n => n.id === l.target)
            return (s?.layer === d.layer || t?.layer === d.layer) ? 0.9 : 0.08
          })
        if (d.id === 'CUDA') {
          const iv = setInterval(() => setBandwidth(b => (b + Math.random() * 8) % 100), 120)
          d3.select(this).attr('data-interval', iv)
        }
      })
      .on('mouseleave', function (event, d) {
        setHoveredNode(null)
        setActiveLayer(null)
        d3.select(this).transition().duration(200).attr('r', d.isCore ? 32 : 18).attr('stroke-width', d.isCore ? 3 : 2)
        svg.selectAll('.node-layer circle').transition().duration(200).attr('opacity', 1)
        link.transition().duration(200).attr('stroke-opacity', 0.35)
        const iv = d3.select(this).attr('data-interval')
        if (iv) clearInterval(Number(iv))
      })
      .on('click', function (event, d) {
        event.stopPropagation()
        setClickedNode(d.id)
      })

    svg.append('g').attr('class', 'label-layer')
      .selectAll('text')
      .data(nodeData)
      .enter()
      .append('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y - (d.isCore ? 45 : 31))
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#fff')
      .attr('font-size', d => d.isCore ? 10 : 9)
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('pointer-events', 'none')
      .attr('data-layer', d => d.layer)
      .text(d => d.id)
      .attr('opacity', 0)

    const breath = setInterval(() => {
      node.filter(d => !d.isCore)
        .transition().duration(1500).ease(d3.easeSinInOut).attr('r', 20)
        .transition().duration(1500).ease(d3.easeSinInOut).attr('r', 18)
    }, 3000)
    return () => clearInterval(breath)
  }, [])

  useEffect(() => {
    if (!svgRef.current || visibleLayers.length === 0) return
    const svg = d3.select(svgRef.current)
    svg.selectAll('.node-layer circle').attr('opacity', function () {
      const layer = d3.select(this).attr('data-layer')
      return visibleLayers.includes(layer) ? 1 : 0.25
    })
    svg.selectAll('.link-layer line').attr('stroke-opacity', function (d) {
      return (visibleLayers.includes(d.sourceLayer) || visibleLayers.includes(d.targetLayer)) ? 0.35 : 0.08
    })
    svg.selectAll('.label-layer text').attr('opacity', function () {
      const layer = d3.select(this).attr('data-layer')
      return visibleLayers.includes(layer) ? 1 : 0.25
    })
  }, [visibleLayers])

  const explanation = clickedNode ? nodeExplanations[clickedNode] : null

  return (
    <section id="powers" className="core-powers-3d-section" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Core Powers</h2>
          <p className="section-subtitle">Live System Architecture Map</p>

          <div className="architecture-layout">
            <div className="layer-labels-vertical left">
              {layerMeta.slice(0, 3).map(l => (
                <button
                  key={l.id}
                  type="button"
                  className={`layer-chip ${activeLayer === l.id ? 'active' : ''}`}
                  onMouseEnter={() => setActiveLayer(l.id)}
                  onMouseLeave={() => setActiveLayer(null)}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="architecture-wrapper">
              <div className="layer-label-overlay top">Input & Data → Pipelines</div>
              <svg
                ref={svgRef}
                className="architecture-svg"
                viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
                preserveAspectRatio="xMidYMid meet"
              />
              <div className="layer-label-overlay center">AI COMPUTE CORE</div>
              <div className="layer-label-overlay bottom">GPU → Infra → Monitoring</div>

              {clickedNode && explanation && (
                <div className="node-explanation-panel">
                  <div className="node-explanation-title">{clickedNode}</div>
                  <p className="node-explanation-text">{explanation}</p>
                  <button type="button" className="node-explanation-close" onClick={() => setClickedNode(null)}>Close</button>
                </div>
              )}

              {hoveredNode === 'CUDA' && (
                <div className="node-info">
                  <div className="info-title">CUDA</div>
                  <div className="bandwidth-counter">Bandwidth: {bandwidth.toFixed(1)} GB/s</div>
                </div>
              )}
              {hoveredNode && hoveredNode !== 'CUDA' && !clickedNode && (
                <div className="node-info">
                  <div className="info-title">{hoveredNode}</div>
                  <div className="info-hint">Click for explanation</div>
                </div>
              )}
            </div>

            <div className="layer-labels-vertical right">
              {layerMeta.slice(3).map(l => (
                <button
                  key={l.id}
                  type="button"
                  className={`layer-chip ${activeLayer === l.id ? 'active' : ''}`}
                  onMouseEnter={() => setActiveLayer(l.id)}
                  onMouseLeave={() => setActiveLayer(null)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <p className="architecture-micro">Hover a layer → others dim. Click a node → short real explanation. Scroll → architecture assembles step by step.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default CorePowers3D
