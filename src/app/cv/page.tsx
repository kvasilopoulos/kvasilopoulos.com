'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CVPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById('cv-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      pdf.save('kostas-vasilopoulos-cv.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Curriculum Vitae</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generatePDF}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </motion.button>
      </div>

      <div id="cv-content" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Kostas Vasilopoulos</h2>
          <p className="text-gray-600 dark:text-gray-300">Software Engineer</p>
        </div>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Professional Summary</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Experienced software engineer with expertise in full-stack development,
            specializing in modern web technologies and cloud solutions.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Skills</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Frontend</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>React/Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>HTML5/CSS3</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Backend</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>Node.js</li>
                <li>Python</li>
                <li>SQL/NoSQL</li>
                <li>REST APIs</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Experience</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Senior Software Engineer</h4>
              <p className="text-gray-600 dark:text-gray-400">Company Name • 2020 - Present</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
                <li>Led development of key features</li>
                <li>Implemented scalable architecture</li>
                <li>Mentored junior developers</li>
              </ul>
            </div>
            {/* Add more experience items as needed */}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Education</h3>
          <div>
            <h4 className="font-semibold">Bachelor of Science in Computer Science</h4>
            <p className="text-gray-600 dark:text-gray-400">University Name • 2015 - 2019</p>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">Contact</h3>
          <div className="text-gray-700 dark:text-gray-300">
            <p>Email: your.email@example.com</p>
            <p>LinkedIn: linkedin.com/in/yourprofile</p>
            <p>GitHub: github.com/yourusername</p>
          </div>
        </section>
      </div>
    </div>
  );
} 