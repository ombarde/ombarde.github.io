
import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Zap, Brain } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showTagline, setShowTagline] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);
  const codingBackgroundRef = useRef<HTMLDivElement>(null);
  
  const titles = [
    'AI/ML Specialist',
    'Generative AI Enthusiast',
    'NLP & Computer Vision Engineer',
    'PoC Innovator',
    'Cloud & Big Data Explorer'
  ];
  
  useEffect(() => {
    const currentTitle = titles[loopNum % titles.length];
    
    const handleTyping = () => {
      setDisplayText(currentTitle.substring(0, displayText.length + (isDeleting ? -1 : 1)));
      
      if (!isDeleting && displayText === currentTitle) {
        // Pause at end of typing
        setTimeout(() => setIsDeleting(true), 1500);
        setTypingSpeed(100);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, titles]);
  
  useEffect(() => {
    // Show tagline after first title is fully typed
    const timer = setTimeout(() => {
      setShowTagline(true);
    }, 3000);

    // Create the particle effect
    if (particlesRef.current) {
      initParticles();
    }
    
    // Initialize coding background
    if (codingBackgroundRef.current) {
      initCodingBackground();
    }

    return () => clearTimeout(timer);
  }, []);

  const initCodingBackground = () => {
    const container = codingBackgroundRef.current;
    if (!container) return;
    
    // Sample AI/ML related code snippets
    const codeSnippets = [
      "import tensorflow as tf",
      "model = tf.keras.Sequential([",
      "  tf.keras.layers.Dense(128, activation='relu'),",
      "  tf.keras.layers.Dropout(0.2),",
      "  tf.keras.layers.Dense(10, activation='softmax')",
      "])",
      "model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')",
      "model.fit(x_train, y_train, epochs=5)",
      "import torch.nn as nn",
      "class NeuralNetwork(nn.Module):",
      "  def __init__(self):",
      "    super().__init__()",
      "    self.flatten = nn.Flatten()",
      "    self.linear_stack = nn.Sequential(",
      "      nn.Linear(28*28, 512),",
      "      nn.ReLU(),",
      "      nn.Linear(512, 10)",
      "    )",
      "import numpy as np",
      "from sklearn.model_selection import train_test_split",
      "X_train, X_test, y_train, y_test = train_test_split(X, y)",
      "from transformers import AutoTokenizer, AutoModel",
      "tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')",
      "model = AutoModel.from_pretrained('bert-base-uncased')",
      "import cv2",
      "image = cv2.imread('image.jpg')",
      "gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)"
    ];
    
    // Create code lines
    for (let i = 0; i < 30; i++) {
      const line = document.createElement('div');
      const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      line.textContent = randomSnippet;
      line.className = 'code-line';
      line.style.position = 'absolute';
      line.style.left = `${Math.random() * 90}%`;
      line.style.top = `${Math.random() * 100}%`;
      line.style.color = 'rgba(56, 178, 172, 0.15)';
      line.style.fontFamily = 'monospace';
      line.style.fontSize = '12px';
      line.style.whiteSpace = 'nowrap';
      line.style.transform = 'translateX(-50%)';
      line.style.animation = `float-code ${5 + Math.random() * 10}s linear infinite`;
      line.style.animationDelay = `${Math.random() * 5}s`;
      line.style.opacity = `${0.3 + Math.random() * 0.7}`;
      container.appendChild(line);
    }
  };

  const initParticles = () => {
    const canvas = document.createElement('canvas');
    const container = particlesRef.current;
    
    if (!container) return;
    
    container.appendChild(canvas);
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const particlesArray: any[] = [];
    const numberOfParticles = 100;
    
    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;
      speed: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = Math.random() * 0.5 - 0.25;
        this.directionY = Math.random() * 0.5 - 0.25;
        this.size = Math.random() * 2 + 0.5;
        this.color = this.getRandomColor();
        this.speed = Math.random() * 0.5;
      }
      
      getRandomColor() {
        const colors = ['rgba(26, 54, 93, 0.3)', 'rgba(56, 178, 172, 0.3)', 'rgba(79, 209, 197, 0.3)'];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
        this.draw();
      }
    }
    
    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    function connect() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            if (!ctx) return;
            ctx.strokeStyle = `rgba(56, 178, 172, ${0.1 - distance/1000})`;
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }
    
    init();
    animate();
    
    window.addEventListener('resize', () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      particlesArray.length = 0;
      init();
    });
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 px-4 md:px-8">
      {/* Coding background */}
      <div ref={codingBackgroundRef} className="absolute inset-0 z-0 opacity-40 overflow-hidden"></div>
      
      {/* Interactive particle background */}
      <div ref={particlesRef} className="absolute inset-0 z-0"></div>
      
      {/* AI-themed decorative elements */}
      <div className="absolute top-1/4 right-10 md:right-20 w-32 h-32 neural-circle animate-pulse opacity-20"></div>
      <div className="absolute bottom-1/4 left-10 md:left-20 w-24 h-24 neural-circle animate-pulse opacity-15" style={{ animationDelay: "1s" }}></div>
      
      {/* Binary pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-5">
        {Array(20).fill(0).map((_, i) => (
          <div 
            key={i} 
            className="absolute font-mono text-xs text-portfolio-primary"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          >
            {Math.random() > 0.5 ? '10' : '01'}{Math.random() > 0.5 ? '10' : '01'}
          </div>
        ))}
      </div>

      <div className="text-center max-w-4xl z-10">
        <div className="mb-8 inline-block">
          <div className="inline-flex items-center justify-center bg-portfolio-primary/10 px-4 py-2 rounded-full text-portfolio-primary text-sm font-medium">
            <Zap className="w-4 h-4 mr-1" /> AI + Machine Learning Expert
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-portfolio-primary to-portfolio-secondary relative">
            Hello, I'm Om Barde.
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary opacity-30"></span>
          </span>
        </h1>
        
        <div className="h-16 mb-4">
          <h2 className="text-2xl md:text-3xl text-gray-700">
            <span className="inline-block">{displayText}</span>
            <span className="animate-pulse ml-1 font-mono">|</span>
          </h2>
        </div>
        
        {showTagline && (
          <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-fade-in flex items-center justify-center">
            <span className="inline-block mr-2">🧠</span> Turning cutting-edge algorithms into real-world impact.
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in" style={{ animationDelay: '1s' }}>
          <button 
            onClick={scrollToAbout}
            className="bg-gradient-to-r from-portfolio-primary to-portfolio-secondary text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] flex items-center font-medium"
          >
            Explore My Work
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
          <a 
            href="#contact" 
            className="border-2 border-portfolio-primary text-portfolio-primary px-8 py-[11px] rounded-lg hover:bg-portfolio-primary hover:text-white transition-colors duration-300 font-medium"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get In Touch
          </a>
        </div>
      </div>
      
      {/* Neural network visualization */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10 opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1A365D" />
              <stop offset="100%" stopColor="#38B2AC" />
            </linearGradient>
          </defs>
          <path 
            d="M0,50 C150,20 300,80 500,50 C700,20 850,80 1000,50 L1000,100 L0,100 Z" 
            fill="url(#networkGradient)"
          />
        </svg>
      </div>
      
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-gray-500 hover:text-portfolio-primary transition-colors animate-bounce z-20"
        aria-label="Scroll down"
      >
        <ArrowDown className="w-8 h-8" />
      </button>

      <style>
        {`
        .neural-circle {
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56, 178, 172, 0.2) 0%, rgba(26, 54, 93, 0.1) 100%);
          box-shadow: 0 0 30px rgba(56, 178, 172, 0.3);
        }
        
        @keyframes float-code {
          0% { transform: translateY(0) translateX(-50%); }
          100% { transform: translateY(-100vh) translateX(-50%); }
        }
        `}
      </style>
    </section>
  );
};

export default Hero;
