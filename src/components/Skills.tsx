
import React, { useEffect, useRef } from 'react';
import { Code, Database, Terminal, BarChart, Globe, Server, Zap } from 'lucide-react';


interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: {
    name: string;
    level: number; // 0-100
  }[];
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: "Languages",
      icon: <BarChart className="w-8 h-8 text-portfolio-primary" />,
      skills: [
        { name: "Python programming", level: 90 },
        { name: "C programming", level: 85 },
        { name: "C++ programming", level: 85 },
        { name: "SQL", level: 80 },
        { name: "NoSQL", level: 85 },
        { name: "R", level: 75 },
      ]
    },
    {
      name: "AI/ML",
      icon: <BarChart className="w-8 h-8 text-portfolio-primary" />,
      skills: [
        { name: "Machine Learning", level: 90 },
        { name: "Deep Learning", level: 85 },
        { name: "Transformers & LLMs", level: 85 },
        { name: "Computer Vision", level: 80 },
        { name: "NLP", level: 85 },
        { name: "Time-Series Analysis", level: 75 },
        { name: "Model Optimization", level: 80 },
      ]
    },
    {
      name: "Frameworks & Tools",
      icon: <Terminal className="w-8 h-8 text-portfolio-primary" />,
      skills: [
        { name: "TensorFlow", level: 85 },
        { name: "PyTorch", level: 90 },
        { name: "Scikit-learn", level: 90 },
        { name: "OpenCV", level: 85 },
        { name: "Hugging Face", level: 80 },
        { name: "Pandas", level: 90 },
        { name: "NumPy", level: 90 },
      ]
    },
    {
      name: "Software Development",
      icon: <Database className="w-8 h-8 text-portfolio-primary" />,
      skills: [
        { name: "OOP", level: 85 },
        { name: "Design Patterns", level: 75 },
        { name: "SDLC", level: 80 },
        { name: "Git", level: 85 },
        { name: "Data Structures & Algorithms", level: 80 },
        { name: "REST APIs", level: 75 },
        { name: "Flask/Django", level: 70 },
      ]
    },
    {
      name: "Cloud & DevOps",
      icon: <Globe className="w-8 h-8 text-portfolio-primary" />,
      skills: [
        { name: "GCP", level: 75 },
        { name: "Docker", level: 65 },
        { name: "API Integration", level: 80 },
        { name: "CI/CD", level: 65 },
        { name: "Cloud Deployment", level: 70 },
        { name: "Version Control", level: 85 },
      ]
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          document.querySelectorAll('.skill-card').forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('skill-card-visible');
            }, index * 100);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-20" ref={sectionRef}>
      {/* Neural network animated background */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" className="opacity-5">
          <defs>
            <pattern id="neural-net" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="#1A365D" />
            </pattern>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A365D" />
              <stop offset="100%" stopColor="#38B2AC" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-net)" />
          
          {/* Neural network connections */}
          {Array(20).fill(0).map((_, i) => (
            <g key={i} className="neural-connection">
              <line 
                x1={Math.random() * 100 + "%"} 
                y1={Math.random() * 100 + "%"} 
                x2={Math.random() * 100 + "%"} 
                y2={Math.random() * 100 + "%"} 
                stroke="url(#line-gradient)" 
                strokeWidth="0.5" 
                opacity="0.3" 
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Floating ML icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['⚛️', '🧠', '🔍', '📊', '🤖', '📈'].map((emoji, i) => (
          <div 
            key={i}
            className="absolute text-2xl opacity-30 floating-icon"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animation: `float 8s ease-in-out ${i * 1.5}s infinite`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
      
      <div className="container mx-auto relative z-10 px-4">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-portfolio-primary to-portfolio-secondary relative">
            Skills & Expertise
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-portfolio-accent"></span>
          </h2>
          <p className="text-gray-600 max-w-xl text-center">Advanced proficiency in machine learning technologies, algorithms, and frameworks</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="skill-card bg-white p-8 rounded-lg shadow-lg border border-gray-200 transform opacity-0 transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="mr-4 p-3 rounded-full bg-gradient-to-br from-portfolio-primary/20 to-portfolio-secondary/20">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold text-portfolio-primary">
                  {category.name}
                </h3>
              </div>
              
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item transform transition-all duration-500" style={{ transitionDelay: `${(index * 100) + (skillIndex * 50)}ms` }}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-xs font-semibold bg-portfolio-primary text-white px-2 py-0.5 rounded-full">{skill.level}%</span>
                    </div>
                    <div className="skill-bar h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="skill-progress h-full rounded-full bg-gradient-to-r from-portfolio-primary to-portfolio-secondary will-change-transform" 
                        style={{ 
                          width: "0%"
                        }}
                        data-width={`${skill.level}%`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-portfolio-primary opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-10 w-60 h-60 bg-portfolio-secondary opacity-5 rounded-full blur-3xl"></div>
      </div>

      <style>
        {`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }

        .neural-connection line {
          animation: pulse-opacity 8s infinite;
        }

        .neural-connection:nth-child(odd) line {
          animation-delay: 2s;
        }

        .skill-card {
          transform: translateY(30px);
        }

        .skill-card-visible {
          transform: translateY(0);
          opacity: 1;
        }

        .skill-item .skill-progress {
          transition: width 1.5s cubic-bezier(0.1, 0.5, 0.2, 1);
        }

        .skill-card-visible .skill-progress {
          width: var(--width);
        }

        /* Ensure the skill bars animate correctly */
        .animate-progress {
          width: var(--width) !important;
        }
        `}
      </style>
    </section>
  );
};

export default Skills;
