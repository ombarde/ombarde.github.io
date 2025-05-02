
import React from 'react';
import { BookOpen, Award, FileText, Users } from 'lucide-react';

interface Education {
  degree: string;
  institution: string;
  period: string;
  location?: string;
  details?: string;
}

interface Certification {
  name: string;
  issuer: string;
}

const Education = () => {
  const educationInfo: Education[] = [
    {
      degree: "BACHELOR IN TECHNOLOGY",
      institution: "G.H. RAISONI INSTITUTE OF ENGINEERING AND TECHNOLOGY, NAGPUR",
      period: "2020 – 2024",
      details: "Artificial Intelligence | CGPA: 8.25/10"
    }
  ];

  const certifications: Certification[] = [
    { name: "Fundamentals of Deep Learning", issuer: "NVIDIA" },
    { name: "Accelerating End-to-End Data Science Workflows", issuer: "NVIDIA" },
    { name: "Getting Started with AI on Jetson Nano", issuer: "NVIDIA" },
    { name: "Disaster Risk Monitoring Using Satellite Imagery", issuer: "NVIDIA" },
    { name: "Develop, Customize, and Publish in Omniverse with Extensions", issuer: "NVIDIA" },
    { name: "Google Cloud Professional Cloud Architect", issuer: "Udemy" },
    { name: "Python Data Science Toolbox", issuer: "DataCamp" },
    { name: "Google Analytics Certification", issuer: "Skillshop" },
    { name: "Entrepreneurship", issuer: "NPTEL" },
    { name: "Graphic Design: Layout & Composition", issuer: "LinkedIn Learning" },
    { name: "Certified Web Designer Associate (CWDSA)", issuer: "MKCL" }
  ];

  const publications = [
    {
      title: "SatelliteChangeNet: Deep Learning approach for Detection & Prediction",
      journal: "International Journal of Advanced Research in Science, Communication and Technology",
      date: "May 2024"
    }
  ];

  const leadership = [
    "Vice Chair, IEEE SB GHRIETN",
    "President, AIBOTRIX – AI Forum",
    "Member, IEEE India",
    "Volunteer, Feel Good Foundation & I-SMART India"
  ];

  return (
    <section id="education" className="bg-white">
      <div className="container mx-auto">
        <h2 className="section-title">Education & Background</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-portfolio-accent" />
              Education
            </h3>
            
            {educationInfo.map((item, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 mb-6 hover:shadow-md transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-portfolio-primary">{item.degree}</h4>
                <p className="text-gray-700 font-medium mt-1">{item.institution}</p>
                <p className="text-gray-600 text-sm mt-2">{item.period}</p>
                {item.location && <p className="text-gray-600 text-sm">{item.location}</p>}
                {item.details && <p className="text-gray-700 mt-3">{item.details}</p>}
              </div>
            ))}
            
            <h3 className="text-xl font-bold mb-6 mt-10 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-portfolio-accent" />
              Publications
            </h3>
            
            {publications.map((pub, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-portfolio-primary">{pub.title}</h4>
                <p className="text-gray-600 mt-2">{pub.journal}</p>
                <p className="text-gray-500 text-sm mt-1">{pub.date}</p>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-7">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-portfolio-accent" />
              Certifications
            </h3>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div 
                    key={index}
                    className="bg-white p-4 rounded border border-gray-100 hover:border-portfolio-accent transition-all duration-300"
                  >
                    <h4 className="font-medium text-portfolio-primary">{cert.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">Issued by {cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-portfolio-accent" />
              Leadership & Volunteering
            </h3>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <ul className="space-y-3">
                {leadership.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-portfolio-primary rounded-full mr-3"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
