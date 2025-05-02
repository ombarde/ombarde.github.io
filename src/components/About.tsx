
import React from 'react';
import { Award, Briefcase, UserCheck } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

const About = () => {
  return (
    <section id="about" className="bg-white">
      <div className="container mx-auto">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-8 items-start mb-6">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                  <div className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                    {/* SVG placeholder for a professional portrait */}
                    <svg className="absolute inset-0" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" fill="#1A365D" />
                      <circle cx="50" cy="35" r="20" fill="#38B2AC" opacity="0.8" />
                      <rect x="30" y="60" width="40" height="50" fill="#38B2AC" opacity="0.8" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                    <div className="absolute bottom-2 left-0 right-0 text-center text-white text-sm font-medium">Om Barde</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-gray-700 leading-relaxed mb-6 animate-fade-in">
                  Results-driven AI/ML Engineer with a BTech in Artificial Intelligence and experience in software development using C++, Python, and machine learning frameworks. Strong background in building scalable ML pipelines, integrating LLMs (e.g., BERT), and deploying AI systems across cloud platforms.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                  Proven record of working on real-world projects including object dynamics from video, sentiment classification, and time-series forecasting. Skilled in data structures, algorithms, and performance optimization, with the ability to contribute across the entire software stack in a collaborative, distributed environment.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <HoverCard>
                <HoverCardTrigger>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-md hover:border-portfolio-secondary/30 cursor-pointer">
                    <UserCheck className="w-8 h-8 text-portfolio-accent mb-4" />
                    <h3 className="text-lg font-semibold mb-2">AI/ML Expertise</h3>
                    <p className="text-gray-600 text-sm">Specializing in cutting-edge AI models and applications</p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">AI/ML Specializations:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Deep Learning & Neural Networks</li>
                      <li>• Natural Language Processing</li>
                      <li>• Computer Vision</li>
                      <li>• Generative Models</li>
                      <li>• Time Series Analysis</li>
                    </ul>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-md hover:border-portfolio-secondary/30 cursor-pointer">
                    <Briefcase className="w-8 h-8 text-portfolio-accent mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Professional</h3>
                    <p className="text-gray-600 text-sm">Experience working with industry-leading technologies</p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Professional Experience:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Data Analysis at UNIFINS IT HUB</li>
                      <li>• R&D at University of Texas at Austin</li>
                      <li>• Multiple AI/ML Internships</li>
                      <li>• Team Leadership</li>
                      <li>• Client Project Delivery</li>
                    </ul>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-md hover:border-portfolio-secondary/30 cursor-pointer">
                    <Award className="w-8 h-8 text-portfolio-accent mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Certified</h3>
                    <p className="text-gray-600 text-sm">Multiple certifications from NVIDIA and other leaders</p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Key Certifications:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• NVIDIA Deep Learning Fundamentals</li>
                      <li>• Google Cloud Professional</li>
                      <li>• Python Data Science Toolbox</li>
                      <li>• Google Analytics</li>
                      <li>• And several more specialized courses</li>
                    </ul>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm transform hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-portfolio-primary border-b border-gray-200 pb-2">Personal Info</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-medium text-gray-700 w-24">Email:</span>
                  <a href="mailto:bardeom6702@gmail.com" className="text-portfolio-secondary hover:underline">bardeom6702@gmail.com</a>
                </li>
                <li className="flex items-start">
                  <span className="font-medium text-gray-700 w-24">Phone:</span>
                  <a href="tel:+918766721568" className="text-gray-600">+91 8766721568</a>
                </li>
                <li className="flex items-start">
                  <span className="font-medium text-gray-700 w-24">Location:</span>
                  <span className="text-gray-600">Nagpur, Maharashtra</span>
                </li>
              </ul>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Connect with me:</h4>
                <div className="flex space-x-3">
                  <a 
                    href="https://github.com/ombarde" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white p-2 rounded-full hover:bg-portfolio-primary transition-colors transform hover:scale-110 hover:rotate-6"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/om-barde-622115171/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-portfolio-primary transition-colors transform hover:scale-110 hover:rotate-6"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
