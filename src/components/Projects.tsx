
import React, { useState } from 'react';
import { Code, Eye, BookOpen } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string; // SVG content or other image representation
  technologies: string[];
  impacts: string[];
  links?: {
    demo?: string;
    code?: string;
    publication?: string;
  };
}

const Projects = () => {
  // SVG images representing each project
  const objDynamicsSvg = `
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1A365D" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#38B2AC" stop-opacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#f8f9fa" />
      <circle cx="50" cy="75" r="30" fill="url(#grad1)" opacity="0.7">
        <animate attributeName="cx" from="50" to="150" dur="3s" repeatCount="indefinite" />
      </circle>
      <rect x="120" y="45" width="60" height="60" fill="url(#grad1)" opacity="0.7" transform="rotate(45 150 75)">
        <animate attributeName="x" from="120" to="20" dur="3s" repeatCount="indefinite" />
      </rect>
    </svg>
  `;

  const satelliteSvg = `
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1A365D" stroke-width="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#f8f9fa" />
      <rect width="100%" height="100%" fill="url(#grid)" />
      <circle cx="100" cy="75" r="40" fill="#38B2AC" opacity="0.2" />
      <path d="M 80,55 L 120,95 M 80,95 L 120,55" stroke="#1A365D" stroke-width="3" opacity="0.7" />
      <rect x="85" y="60" width="30" height="30" fill="none" stroke="#1A365D" stroke-width="3" opacity="0.7" />
    </svg>
  `;

  const stockSvg = `
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8f9fa" />
      <path d="M 20,120 L 40,90 L 60,100 L 80,60 L 100,80 L 120,40 L 140,50 L 160,30 L 180,20" stroke="#38B2AC" stroke-width="3" fill="none" />
      <path d="M 20,120 L 40,110 L 60,115 L 80,95 L 100,105 L 120,85 L 140,90 L 160,70 L 180,75" stroke="#1A365D" stroke-width="3" fill="none" opacity="0.7" />
    </svg>
  `;

  const robotSvg = `
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8f9fa" />
      <rect x="20" y="20" width="160" height="110" fill="none" stroke="#1A365D" stroke-width="1" stroke-dasharray="2" />
      <circle cx="40" cy="40" r="10" fill="#38B2AC" opacity="0.7" />
      <path d="M 40,40 L 60,60 L 100,40 L 140,90 L 160,110" stroke="#1A365D" stroke-width="2" fill="none" stroke-dasharray="5,5" />
      <circle cx="160" cy="110" r="10" fill="#1A365D" opacity="0.7" />
    </svg>
  `;

  const projects: Project[] = [
    {
      title: "OBJECT DYNAMICS ESTIMATION FROM VIDEO",
      description: "Collaborated remotely on a research project under Prof. Chandrajit Bajaj. Developed models to estimate object motion and predict physical dynamics from real-world video footage. Focused on temporal pattern recognition and movement estimation using CNNs + RNNs.",
      image: objDynamicsSvg,
      technologies: ["PyTorch", "OpenCV", "CNNs", "RNNs", "Motion Tracking"],
      impacts: ["Aided ongoing research on motion understanding and physical scene interpretation."],
    },
    {
      title: "SATELLITECHANGENET – DEEP LEARNING FOR SATELLITE IMAGERY",
      description: "Developed an AI system to detect changes in satellite imagery using deep learning architectures. Benchmarked U-Net (85% accuracy for fine-grained segmentation), YOLO (88% real-time object detection), and R-CNN (83% for localization). Designed modular architecture and followed SDLC phases including requirement analysis, design, and testing.",
      image: satelliteSvg,
      technologies: ["TensorFlow", "PyTorch", "U-Net", "YOLO", "R-CNN", "Satellite Imagery"],
      impacts: ["Enabled improved land-use monitoring and disaster analysis.", "Published results in IJARSCT (2024)."],
      links: {
        publication: "#"
      }
    },
    {
      title: "STOCK PRICE PREDICTION USING LSTM",
      description: "Designed and trained a deep learning model using LSTM networks to predict stock prices. Applied backpropagation through time and stochastic gradient descent to update weights. Conducted time-series analysis and evaluated MSE/RMSE for multiple time horizons. Also, designed reusable code structure for extensibility and future model integration.",
      image: stockSvg,
      technologies: ["TensorFlow", "LSTM", "Time Series Analysis", "Python", "Data Visualization"],
      impacts: ["Demonstrated feasibility of AI for stock forecasting under noisy financial data."],
    },
    {
      title: "ROBOTIC PATH PLANNING",
      description: "Implemented pathfinding algorithms using both Holonomic and Non-Holonomic movement strategies. Developed simulation models and decision systems for robot navigation in static environments. Visualized paths and optimized for shortest route using geometric heuristics.",
      image: robotSvg,
      technologies: ["Python", "Robotics", "Algorithms", "Path Planning", "Simulation"],
      impacts: ["Contributed to foundational logic for autonomous navigation and motion planning."],
    }
  ];

  const [activeProject, setActiveProject] = useState<number>(0);

  return (
    <section id="projects" className="bg-gray-50 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-portfolio-primary opacity-5 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-portfolio-secondary opacity-5 rounded-tr-full"></div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="section-title">Key Projects</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Project selection sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {projects.map((project, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-4 transition-all duration-300 border-l-4 ${
                    activeProject === index
                      ? 'border-l-portfolio-primary bg-gray-50'
                      : 'border-l-transparent hover:bg-gray-50 hover:border-l-gray-300'
                  } ${index !== 0 ? 'border-t border-gray-100' : ''}`}
                  onClick={() => setActiveProject(index)}
                >
                  <h3 className={`font-medium ${
                    activeProject === index ? 'text-portfolio-primary' : 'text-gray-800'
                  }`}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {project.technologies.slice(0, 3).join(", ")}
                    {project.technologies.length > 3 ? " ..." : ""}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Project details */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full">
              <div className="mb-6 rounded-md overflow-hidden bg-gray-50 border border-gray-100 h-40 flex items-center justify-center">
                <div dangerouslySetInnerHTML={{ __html: projects[activeProject].image }} className="w-full h-full" />
              </div>

              <h3 className="text-2xl font-bold text-portfolio-primary mb-4 pb-2 border-b border-gray-100">
                {projects[activeProject].title}
              </h3>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {projects[activeProject].description}
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[activeProject].technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-portfolio-secondary hover:text-white transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Impact</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {projects[activeProject].impacts.map((impact, index) => (
                    <li key={index} className="text-gray-700">
                      {impact}
                    </li>
                  ))}
                </ul>
              </div>

              {projects[activeProject].links && (
                <div className="flex gap-3">
                  {projects[activeProject].links.demo && (
                    <a
                      href={projects[activeProject].links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-portfolio-primary hover:underline group"
                    >
                      <Eye size={16} className="group-hover:scale-110 transition-transform" /> View Demo
                    </a>
                  )}
                  {projects[activeProject].links.code && (
                    <a
                      href={projects[activeProject].links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-portfolio-primary hover:underline group"
                    >
                      <Code size={16} className="group-hover:scale-110 transition-transform" /> View Code
                    </a>
                  )}
                  {projects[activeProject].links.publication && (
                    <a
                      href={projects[activeProject].links.publication}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-portfolio-primary hover:underline group"
                    >
                      <BookOpen size={16} className="group-hover:scale-110 transition-transform" /> Read Publication
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
