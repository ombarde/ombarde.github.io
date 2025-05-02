
import React from 'react';
import { Github, Linkedin, Mail, MapPin, PhoneCall } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-portfolio-primary to-portfolio-primary/90 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold mb-4">Om Barde</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              AI/ML specialist with expertise in deep learning, computer vision, NLP, and building scalable machine learning systems.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/ombarde" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-portfolio-secondary transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/om-barde-622115171/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-portfolio-secondary transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:bardeom6702@gmail.com" 
                className="text-white hover:text-portfolio-secondary transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-300 hover:text-portfolio-secondary transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <PhoneCall size={16} className="mr-2 text-portfolio-secondary" />
                <a href="tel:+918766721568" className="text-gray-300 hover:text-white">+91 8766721568</a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-portfolio-secondary" />
                <a href="mailto:bardeom6702@gmail.com" className="text-gray-300 hover:text-white">bardeom6702@gmail.com</a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-portfolio-secondary" />
                <span className="text-gray-300">Nagpur, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/20 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Om Barde. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Background wave decoration */}
      <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none overflow-hidden">
        <svg preserveAspectRatio="none" width="100%" height="50" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white" opacity=".25" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white" />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
