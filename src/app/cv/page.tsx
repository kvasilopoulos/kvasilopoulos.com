/*
 * Paper-Style CV Page
 * 
 * This CV page is designed to resemble a printed document:
 * - A4 paper proportions and layout
 * - Clean, professional typography
 * - Minimal colors (black text on white)
 * - Print-ready styling
 * - Section order: Summary → Experience → Education → Skills
 */

"use client"

import { motion } from "framer-motion"
import data from "../../data/data.json"

export default function CVPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* A4 Paper Container */}
      <div className="mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
        {/* Paper Sheet */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg mx-auto relative"
          style={{ 
            width: '210mm', 
            minHeight: '297mm',
            padding: '20mm'
          }}
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-center mb-8 pb-6 border-b-2 border-black"
          >
            <h1 className="text-4xl font-bold mb-2 text-black tracking-wide">
              {data.personal.name}
            </h1>
            <p className="text-xl font-semibold text-gray-700 mb-4">
              {data.personal.title}
            </p>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-600 flex-wrap">
              {data.contact.socialLinks.map((link, index) => (
                <span key={link.name} className="flex items-center">
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    {link.username}
                  </a>
                  {index < data.contact.socialLinks.length - 1 && (
                    <span className="mx-2 text-gray-400">•</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Professional Summary */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-lg font-bold mb-4 text-black uppercase tracking-wider border-b border-gray-300 pb-1">
              Professional Summary
            </h2>
            <div className="space-y-3">
              {data.personal.about.map((paragraph, index) => (
                <p key={index} className="text-sm text-gray-700 leading-relaxed text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>

          {/* Professional Experience */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-lg font-bold mb-4 text-black uppercase tracking-wider border-b border-gray-300 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {Array.from(new Set(data.experience.map(exp => exp.company))).map(company => {
                const companyExperiences = data.experience
                  .filter(exp => exp.company === company)
                  .sort((a, b) => {
                    const dateA = new Date(a.period.split(' - ')[0]);
                    const dateB = new Date(b.period.split(' - ')[0]);
                    return dateB.getTime() - dateA.getTime();
                  });

                return (
                  <div key={company} className="break-inside-avoid">
                    <h3 className="text-base font-bold text-black mb-3">{company}</h3>
                    {companyExperiences.map((exp, index) => (
                      <div key={index} className={`${index < companyExperiences.length - 1 ? 'mb-4' : ''}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-semibold text-gray-800 flex-1">{exp.title}</h4>
                          <span className="text-xs text-gray-600 font-medium ml-4">{exp.period}</span>
                        </div>
                        
                        <ul className="space-y-1 mb-3">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="text-xs text-gray-700 leading-relaxed pl-4 relative">
                              <span className="absolute left-0 text-gray-500">•</span>
                              {desc}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-2">
                          <p className="text-xs font-semibold text-gray-600 mb-1">Key Technologies:</p>
                          <p className="text-xs text-gray-600 leading-tight">
                            {exp.technologies.join(' • ')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-lg font-bold mb-4 text-black uppercase tracking-wider border-b border-gray-300 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {data.personal.education.map((edu, index) => (
                <div key={index} className="break-inside-avoid">
                  <h3 className="text-sm font-semibold text-black mb-1">{edu.degree}</h3>
                  <p className="text-sm text-gray-700 mb-1">{edu.school}</p>
                  <p className="text-xs text-gray-600">{edu.period}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Technical Skills */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-lg font-bold mb-4 text-black uppercase tracking-wider border-b border-gray-300 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from(new Set(data.skills.map((skill) => skill.category))).map((category) => (
                <div key={category} className="break-inside-avoid">
                  <h3 className="text-sm font-semibold text-black mb-3 border-b border-gray-200 pb-1">
                    {category}
                  </h3>
                  <div className="space-y-1">
                    {data.skills
                      .filter((skill) => skill.category === category)
                      .map((skill) => (
                        <div key={skill.name} className="flex justify-between items-center">
                          <span className="text-xs text-gray-700">{skill.name}</span>
                          <span className="text-xs text-gray-500 font-medium">{skill.level}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .fixed {
            display: none !important;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  )
} 