
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Om Barde | AI/ML Specialist";
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
            
            // Update URL without page reload
            window.history.pushState(null, '', href);
          }
        }
      });
    });

    // Page loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Initialize skill bar animations
    const handleScroll = () => {
      const skillItems = document.querySelectorAll('.skill-item');
      
      skillItems.forEach(item => {
        const skillProgress = item.querySelector('.skill-progress') as HTMLElement;
        
        if (!skillProgress) return;
        
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && skillProgress.style.width === "0%") {
          const width = skillProgress.dataset.width || "0%";
          skillProgress.style.setProperty('--width', width);
          skillProgress.classList.add('animate-progress');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Fade in animations on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section > div > *:not(.section-title)').forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {isLoading ? (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-portfolio-secondary border-t-portfolio-primary rounded-full animate-spin mb-4"></div>
            <div className="text-portfolio-primary text-xl font-medium">
              <span className="ml-2">Loading Portfolio</span>
              <span className="dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
          <Footer />
          
          {/* Cursor follower effect */}
          <div id="cursor-follower" className="cursor-dot"></div>
        </>
      )}

      <style>
        {`
        .cursor-dot {
          position: fixed;
          width: 40px;
          height: 40px;
          background-color: rgba(56, 178, 172, 0.15);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.1s;
        }

        .dots span {
          animation: dots 1.5s infinite;
          display: inline-block;
          opacity: 0;
        }
        
        .dots span:nth-child(2) {
          animation-delay: 0.5s;
        }
        
        .dots span:nth-child(3) {
          animation-delay: 1s;
        }
        
        @keyframes dots {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        `}
      </style>
      
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          const cursor = document.getElementById('cursor-follower');
          
          if (!cursor) return;
          
          document.addEventListener('mousemove', e => {
            cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px) scale(1)';
          });
          
          document.addEventListener('mousedown', (e) => {
            cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px) scale(0.8)';
          });
          
          document.addEventListener('mouseup', (e) => {
            cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px) scale(1)';
          });
          
          document.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px) scale(0)';
          });
          
          // Add animations to skill bars
          document.querySelectorAll('.skill-card-visible').forEach(card => {
            const progressBars = card.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
              const width = bar.getAttribute('data-width');
              bar.style.width = width;
            });
          });
        });
      ` }}></script>
    </div>
  );
};

export default Index;
