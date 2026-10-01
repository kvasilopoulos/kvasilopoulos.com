/*
 * Paper-Style CV Page
 *
 * Mirrors the Overleaf CV (cv/main.tex) in a single A4 column:
 * Summary → Experience → Education → AI & ML → Engineering & Infra →
 * Selected Publications → Software Contributions → Awards & Achievements
 */

"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import data from "../../data/data.json"
import { parseBoldText } from "@/lib/parseBoldText"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h2 className="text-lg font-bold mb-3 text-black uppercase tracking-wider border-b border-gray-300 pb-1">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((text, i) => (
        <li key={i} className="text-xs text-gray-700 leading-relaxed pl-4 relative">
          <span className="absolute left-0 text-gray-500">•</span>
          {parseBoldText(text)}
        </li>
      ))}
    </ul>
  )
}

const packages = data.projects.find((p) => "packages" in p)?.packages ?? []
const skillCategories = Array.from(new Set(data.skills.map((s) => s.category)))

export default function CVPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* PDF download (compiled from Overleaf); `fixed` keeps it out of print */}
      <a
        href="/assets/Kostas_Vasilopoulos_CV.pdf"
        download
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-gray-800 transition-colors"
      >
        <Download className="h-4 w-4" />
        Download PDF
      </a>

      {/* A4 Paper Sheet */}
      <div className="mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg mx-auto relative"
          style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}
        >
          {/* Header */}
          <header className="text-center mb-8 pb-6 border-b-2 border-black">
            <h1 className="text-4xl font-bold mb-2 text-black tracking-wide">Dr {data.personal.name}</h1>
            <p className="text-xl font-semibold text-gray-700 mb-4">{data.personal.title}</p>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-600 flex-wrap">
              <span>{data.personal.location}</span>
              {data.contact.socialLinks.map((link) => (
                <span key={link.name} className="flex items-center">
                  <span className="mx-2 text-gray-400">•</span>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                    {link.username}
                  </a>
                </span>
              ))}
            </div>
          </header>

          <Section title="Summary">
            <p className="text-sm text-gray-700 leading-relaxed text-justify">{parseBoldText(data.personal.cvSummary)}</p>
          </Section>

          <Section title="Experience">
            <div className="space-y-5">
              {data.experience.map((exp) => (
                <div key={exp.title + exp.period} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold text-black">{exp.title}</h3>
                    <span className="text-xs text-gray-600 font-medium ml-4 whitespace-nowrap">{exp.period}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <p className="text-sm text-gray-700">{exp.company}</p>
                    <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">{exp.location}</span>
                  </div>
                  {"promoted" in exp && exp.promoted && (
                    <p className="text-xs italic text-gray-600 mb-1">{exp.promoted.replace("--", "–")}</p>
                  )}
                  <Bullets items={exp.description} />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Education">
            <div className="space-y-3">
              {data.personal.education.map((edu) => (
                <div key={edu.degree} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold text-black">{edu.degree}</h3>
                    <span className="text-xs text-gray-600 ml-4">{edu.period}</span>
                  </div>
                  <p className="text-sm text-gray-700">{edu.school}</p>
                  {"description" in edu && edu.description && (
                    <p className="text-xs text-gray-600 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {skillCategories.map((category) => (
            <Section key={category} title={category}>
              <Bullets items={data.skills.filter((s) => s.category === category).map((s) => s.name)} />
            </Section>
          ))}

          <Section title="Selected Publications">
            <ul className="space-y-2">
              {data.publications.map((pub) => (
                <li key={pub.title} className="text-xs text-gray-700 leading-relaxed">
                  {pub.authors} ({pub.year}). {pub.title}. <em>{pub.journal}</em>
                  {"volume" in pub && pub.volume && `, ${pub.volume}`}
                  {"pages" in pub && pub.pages && `, ${pub.pages}`}.
                  {"url" in pub && pub.url && (
                    <> <a href={pub.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-black">{pub.url.replace("https://doi.org/", "doi:")}</a></>
                  )}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Software Contributions">
            <ul className="space-y-1 mb-2">
              {packages.map((pkg) => (
                <li key={pkg.name} className="text-xs text-gray-700 leading-relaxed">
                  <a href={pkg.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-black underline">{pkg.name}</a>: {pkg.description}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-600">
              Collective downloads exceed 100,000. The complete package list is available at{" "}
              <a href="https://kvasilopoulos.r-universe.dev/packages" target="_blank" rel="noopener noreferrer" className="underline">r-universe</a>.
            </p>
          </Section>

          <Section title="Awards & Achievements">
            <ul className="space-y-1">
              {data.awards.map((award) => (
                <li key={award.title} className="text-xs text-gray-700">
                  <span className="font-semibold text-black">{award.title}</span>, {award.institution}
                  {"period" in award && award.period && `, ${award.period}`}
                  {"description" in award && award.description && ` (${award.description})`}
                </li>
              ))}
            </ul>
          </Section>
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
