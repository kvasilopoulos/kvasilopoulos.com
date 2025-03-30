"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import { Github, ExternalLink, Linkedin, Mail, Twitter, User, Download } from "lucide-react"
import data from "../../data/data.json"
import { IconMap } from "@/types"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'
import { CVPDF } from "@/components/CVPDF"

const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
    { ssr: false }
)

export default function CV() {
    const iconMap: IconMap = {
        Mail,
        Linkedin,
        Github,
        Twitter,
        User
    }

    return (
        <div className="relative">
            <Navbar />
            
            {/* Main Content */}
            <main className="container mx-auto px-4 pt-24 pb-16">
                {/* Header */}
                <motion.div 
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold mb-4">{data.personal.name}</h1>
                    <p className="text-xl text-muted-foreground">{data.personal.title}</p>
                    <PDFDownloadLink
                        document={<CVPDF />}
                        fileName={`${data.personal.name.toLowerCase().replace(/\s+/g, '-')}-cv.pdf`}
                        className="mt-4 inline-block"
                    >
                        {({ loading }) => (
                            <Button
                                variant="outline"
                                disabled={loading}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                {loading ? 'Generating PDF...' : 'Download PDF'}
                            </Button>
                        )}
                    </PDFDownloadLink>
                </motion.div>

                {/* Contact Info */}
                <motion.div 
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {data.contact.socialLinks.map((link, index) => {
                        const Icon = iconMap[link.icon]
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-2 inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Icon className="h-4 w-4 mr-1" />
                                {link.username}
                                {index < data.contact.socialLinks.length - 1 && " • "}
                            </a>
                        )
                    })}
                </motion.div>

                {/* Summary */}
                <motion.section 
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold mb-4">Summary</h2>
                    <div className="space-y-4">
                        {data.personal.about.map((paragraph, index) => (
                            <p key={index} className="text-muted-foreground">{paragraph}</p>
                        ))}
                    </div>
                </motion.section>

                {/* Experience */}
                <motion.section 
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold mb-6">Experience</h2>
                    <div className="space-y-8">
                        {Array.from(new Set(data.experience.map(exp => exp.company))).map(company => {
                            const companyExperiences = data.experience
                                .filter(exp => exp.company === company)
                                .sort((a, b) => {
                                    const dateA = new Date(a.period.split(' - ')[0]);
                                    const dateB = new Date(b.period.split(' - ')[0]);
                                    return dateB.getTime() - dateA.getTime();
                                });

                            return (
                                <div key={company} className="border-l-2 border-primary/20 pl-4">
                                    <h3 className="text-xl font-semibold text-primary mb-2">{company}</h3>
                                    {companyExperiences.map((exp, index) => (
                                        <div key={index} className="mb-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium">{exp.title}</h4>
                                                <span className="text-sm text-muted-foreground">{exp.period}</span>
                                            </div>
                                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                                {exp.description.map((desc, i) => (
                                                    <li key={i}>{desc}</li>
                                                ))}
                                            </ul>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {exp.technologies.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
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
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold mb-6">Education</h2>
                    <div className="space-y-4">
                        {data.personal.education.map((edu, index) => (
                            <div key={index} className="border-l-2 border-primary/20 pl-4">
                                <h3 className="font-medium">{edu.degree}</h3>
                                <p className="text-muted-foreground">{edu.school} • {edu.period}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Skills */}
                <motion.section 
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold mb-6">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {Array.from(new Set(data.skills.map((skill) => skill.category))).map((category) => (
                            <div key={category}>
                                <h3 className="font-semibold mb-2">{category}</h3>
                                <ul className="space-y-1">
                                    {data.skills
                                        .filter((skill) => skill.category === category)
                                        .map((skill) => (
                                            <li key={skill.name} className="text-muted-foreground">
                                                {skill.name} ({skill.level}%)
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.section>
            </main>
        </div>
    )
} 