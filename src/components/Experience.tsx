
import React from 'react';
import { Briefcase } from 'lucide-react';

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const Experience = () => {
  const jobs: Job[] = [
    {
      title: "DATA ANALYST",
      company: "UNIFINS IT HUB",
      location: "Nagpur, MH",
      period: "Jun 2024 – present",
      description: [
        "Led the end-to-end development of a multi-language sentiment analysis engine using BERT, deployed via cloud APIs for client integration.",
        "Implemented scalable pipelines for handling structured and unstructured datasets, achieving real-time classification with 90%+ accuracy.",
        "Collaborated with frontend/backend teams to integrate AI solutions into enterprise systems using RESTful APIs and modular design.",
        "Led a team to implement AI solutions and manage data-driven projects."
      ]
    },
    {
      title: "RESEARCH & DEVELOPMENT INTERN",
      company: "University of Texas at Austin",
      location: "Remote",
      period: "Jun 2023 – Dec 2023",
      description: [
        "Worked on the estimation of object dynamics from video sequences, applying deep learning models with PyTorch and OpenCV.",
        "Performed feature learning, model training, and iterative optimization to improve temporal object tracking.",
        "Gained exposure to distributed AI research practices and global collaboration."
      ]
    },
    {
      title: "AI/ML INTERN",
      company: "The Sparks Foundation",
      location: "Remote",
      period: "Feb 2023 – Mar 2023",
      description: [
        "Built supervised learning models using Scikit-learn, including classification and regression with real-world datasets.",
        "Applied visualization and statistical analysis for feature exploration and model evaluation."
      ]
    },
    {
      title: "AI INTERN",
      company: "TechKrow",
      location: "Remote",
      period: "Nov 2021 – Dec 2021",
      description: [
        "Assisted in the design and deployment of basic ML systems; implemented preprocessing pipelines and predictive models."
      ]
    },
    {
      title: "STUDENT INTERN",
      company: "TechnoGhat",
      location: "Hinganghat, MH",
      period: "Nov 2020 – Mar 2021",
      description: [
        "Conducted market research and trend analysis; supported the development of technical content and automation strategies."
      ]
    }
  ];

  return (
    <section id="experience" className="bg-white">
      <div className="container mx-auto">
        <h2 className="section-title">Work Experience</h2>
        
        <div className="space-y-10">
          {jobs.map((job, index) => (
            <div 
              key={index}
              className={`relative pl-8 md:pl-0 ${index !== jobs.length - 1 ? "pb-10" : ""}`}
            >
              {/* Timeline line */}
              {index !== jobs.length - 1 && (
                <div className="absolute left-3 md:left-[11.5rem] top-8 bottom-0 w-0.5 bg-gray-200"></div>
              )}
              
              <div className="md:flex">
                {/* Timeline dot */}
                <div className="absolute left-0 md:static md:mr-8 top-1.5">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-portfolio-primary text-white">
                    <Briefcase className="w-3 h-3" />
                  </div>
                </div>
                
                {/* Time period - For larger screens */}
                <div className="hidden md:block w-40 text-right">
                  <span className="text-sm font-medium text-gray-500">{job.period}</span>
                </div>
                
                {/* Job details */}
                <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 ml-0 md:ml-8">
                  {/* Time period - For mobile */}
                  <div className="md:hidden mb-2">
                    <span className="text-sm font-medium text-gray-500">{job.period}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-portfolio-primary">{job.title}</h3>
                  <div className="text-gray-600 mb-4">
                    {job.company} <span className="text-gray-400 mx-2">|</span> {job.location}
                  </div>
                  
                  <ul className="space-y-2">
                    {job.description.map((item, i) => (
                      <li key={i} className="text-gray-700 flex gap-3">
                        <span className="text-portfolio-secondary font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
