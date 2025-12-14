"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, ExternalLink, Linkedin, Mail, Twitter, User, ArrowDown, GraduationCap, Award, BookOpen, FileText } from "lucide-react"
import data from "../data/data.json"
import { IconMap } from "@/types"

// Animation variants
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

function SkillBar({ skill, inView }: { skill: typeof data.skills[0]; inView: boolean }) {
    return (
        <div className="mb-6">
            <div className="mb-2">
                <span className="font-medium">{skill.name}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
                <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${skill.level}%` : 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </div>
        </div>
    )
}

function SkillCategory({ category, skills }: { category: string; skills: typeof data.skills }) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <div ref={ref} className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">{category}</h2>
            <div>
                {skills.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} inView={inView} />
                ))}
            </div>
        </div>
    )
}

// Helper function to parse markdown-style bold text (**text**) and render it
function parseBoldText(text: string): React.ReactNode {
    const parts: React.ReactNode[] = []
    const regex = /\*\*(.*?)\*\*/g
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index))
        }
        // Add the bold text
        parts.push(<strong key={match.index} className="font-semibold">{match[1]}</strong>)
        lastIndex = regex.lastIndex
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? <>{parts}</> : text
}

export default function Home() {
    const { scrollYProgress } = useScroll()
    
    const iconMap: IconMap = {
        Mail,
        Linkedin,
        Github,
        Twitter,
        User
    }
    
    return (
        <div className="relative">
            {/* Progress bar */}
            <motion.div 
                className="fixed top-16 left-0 right-0 h-1 bg-primary z-50" 
                style={{ scaleX: scrollYProgress }} 
            />

            {/* Hero Section */}
            <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 pt-16 pb-16">
                <div className="flex flex-col items-center gap-8 text-center px-4 flex-1 justify-center">
                    <div className="relative h-48 w-48 sm:h-56 sm:w-56 overflow-hidden rounded-full bg-muted ring-4 ring-primary ring-offset-2 ring-offset-background">
                        <div className="flex h-full w-full items-center justify-center">
                            <Image
                                src="/assets/linkedin-nohandkerchief.jpeg"
                                alt={data.personal.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <motion.h1 
                            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {data.personal.name}
                        </motion.h1>
                        <motion.p 
                            className="text-lg sm:text-xl md:text-2xl text-muted-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {data.personal.title}
                        </motion.p>
                    </div>
                    <motion.p 
                        className="max-w-[42rem] leading-normal text-muted-foreground text-base sm:text-lg md:text-xl sm:leading-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {data.personal.subtitle}
                    </motion.p>
                </div>
                <motion.div 
                    className="flex flex-col items-center justify-end pb-8"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ 
                        y: [0, 10, 0],
                    }}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                >
                    <a href="#about" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                        <span className="mb-2 text-sm">Scroll Down</span>
                        <ArrowDown className="h-6 w-6" />
                    </a>
                </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="min-h-screen py-20 bg-accent/5">
                <div className="container mx-auto max-w-4xl px-4">
                    <motion.h2 
                        className="mb-8 text-3xl font-bold text-center sm:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        About Me
                    </motion.h2>
                    <div className="space-y-6">
                        {data.personal.about.map((paragraph, index) => (
                            <motion.p 
                                key={index}
                                className="text-lg leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-8 rounded-lg p-6 shadow-sm"
                        >
                            <h3 className="mb-8 text-2xl font-bold border-b pb-3">Core Expertise & Skills</h3>
                            <div className="space-y-10">
                                <div className="rounded-md bg-accent/5 p-5 border border-accent/20">
                                    <h4 className="mb-4 text-xl font-semibold text-primary border-b border-primary/20 pb-2">AI & Machine Learning</h4>
                                    <ul className="list-inside list-disc space-y-3 text-base leading-relaxed">
                                        <li className="pl-2">Generative AI & Large Language Models (<strong className="text-primary">RAG</strong>, <strong className="text-primary">embeddings</strong>, <strong className="text-primary">fine-tuning</strong>)</li>
                                        <li className="pl-2">Natural Language Processing & Text Analytics</li>
                                        <li className="pl-2">Production ML Operations & Model Lifecycle (model deployment, versioning, automated pipelines)</li>
                                        <li className="pl-2">Model Evaluation, Monitoring & Drift Detection</li>
                                    </ul>
                                </div>
                                <div className="rounded-md bg-accent/5 p-5 border border-accent/20">
                                    <h4 className="mb-4 text-xl font-semibold text-primary border-b border-primary/20 pb-2">Engineering & Infra</h4>
                                    <ul className="list-inside list-disc space-y-3 text-base leading-relaxed">
                                        <li className="pl-2">Programming: <strong className="text-primary">Python</strong>, <strong className="text-primary">R</strong>, <strong className="text-primary">SQL</strong>, <strong className="text-primary">JavaScript</strong>, <strong className="text-primary">C++</strong></li>
                                        <li className="pl-2">Distributed Computing & <strong className="text-primary">Microservices</strong> Architecture (horizontally scalable systems, service-oriented architecture)</li>
                                        <li className="pl-2">Cloud & Containers: <strong className="text-primary">AWS</strong>, <strong className="text-primary">Azure</strong>, <strong className="text-primary">Docker</strong>, <strong className="text-primary">Kubernetes</strong></li>
                                        <li className="pl-2">Scalability & Performance Optimization (throughput optimization, cost reduction, runtime efficiency)</li>
                                        <li className="pl-2">Web Development & <strong className="text-primary">REST APIs</strong></li>
                                        <li className="pl-2">Data Engineering: <strong className="text-primary">ElasticSearch</strong>, <strong className="text-primary">Postgres</strong>, <strong className="text-primary">Kafka</strong>, <strong className="text-primary">NoSQL</strong> (search, storage, streaming)</li>
                                        <li className="pl-2">DevOps: <strong className="text-primary">Git</strong>, <strong className="text-primary">Linux</strong>, <strong className="text-primary">CI/CD</strong> Pipelines</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 bg-accent/5">
                <div className="container mx-auto max-w-4xl px-4">
                    <motion.h2 
                        className="mb-12 text-3xl font-bold text-center sm:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Professional Experience
                    </motion.h2>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {Array.from(new Set(data.experience.map(exp => exp.company))).map(company => {
                            const companyExperiences = data.experience
                                .filter(exp => exp.company === company)
                                .sort((a, b) => {
                                    const dateA = new Date(a.period.split(' - ')[0]);
                                    const dateB = new Date(b.period.split(' - ')[0]);
                                    return dateB.getTime() - dateA.getTime();
                                });

                            return (
                                <motion.div
                                    key={company}
                                    variants={item}
                                    className="rounded-lg border border-accent/20 bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="mb-8 pb-4 border-b border-accent/20">
                                        <h3 className="text-2xl font-semibold text-primary">{company}</h3>
                                    </div>
                                    <div className="space-y-10">
                                        {companyExperiences.map((exp, index) => (
                                            <div key={index} className="relative pl-8 border-l-2 border-primary/30">
                                                <div className="absolute -left-[10px] top-0 h-5 w-5 rounded-full bg-primary border-2 border-background shadow-sm" />
                                                <div className="mb-5">
                                                    <h4 className="text-xl font-bold mb-2 text-foreground">{exp.title}</h4>
                                                    <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
                                                        <span className="font-medium">{exp.period}</span>
                                                        {exp.location && (
                                                            <>
                                                                <span className="text-foreground/40">•</span>
                                                                <span>{exp.location}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    {exp.promoted && (
                                                        <p className="mt-2 text-sm italic text-foreground/70 bg-accent/30 px-3 py-1 rounded-md inline-block">
                                                            {exp.promoted}
                                                        </p>
                                                    )}
                                                </div>
                                                <ul className="mb-5 space-y-3">
                                                    {exp.description.map((desc, i) => (
                                                        <li key={i} className="text-foreground/85 leading-relaxed flex items-start gap-3">
                                                            <span className="text-primary mt-1.5 flex-shrink-0 font-bold">▸</span>
                                                            <span>{parseBoldText(desc)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-accent/20">
                                                    {exp.technologies.map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="inline-flex items-center rounded-full bg-accent/30 px-3 py-1 text-sm font-medium text-foreground/80 border border-accent/40"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Education, Publications & Awards Section */}
            <section id="education" className="py-20">
                <div className="container mx-auto max-w-4xl px-4">
                    <motion.h2 
                        className="mb-8 text-3xl font-bold text-center sm:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Education, Publications & Awards
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Education & Awards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="rounded-lg bg-card p-6 shadow-sm"
                        >
                            <h3 className="mb-6 text-xl font-semibold border-b pb-2">Education</h3>
                            <div className="space-y-4 mb-8">
                                {data.personal.education.map((edu, index) => (
                                    <div key={index} className="pb-4 border-b border-accent/20 last:border-b-0 last:pb-0 flex gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <GraduationCap className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-medium mb-1">{edu.degree}</h4>
                                            <p className="text-muted-foreground text-sm">{edu.school}</p>
                                            <p className="text-muted-foreground text-sm">{edu.period}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h3 className="mb-6 text-xl font-semibold border-b pb-2 mt-8">Awards & Achievements</h3>
                            <div className="space-y-4">
                                {data.awards.map((award, index) => (
                                    <div key={index} className="pb-4 border-b border-accent/20 last:border-b-0 last:pb-0 flex gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <Award className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-base font-medium mb-1">{award.title}</h4>
                                            <p className="text-sm text-muted-foreground">{award.institution}</p>
                                            {award.period && (
                                                <p className="text-sm text-muted-foreground">{award.period}</p>
                                            )}
                                            {award.description && (
                                                <p className="text-sm text-muted-foreground mt-1">{award.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Publications & Thesis */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="rounded-lg bg-card p-6 shadow-sm"
                        >
                            <h3 className="mb-6 text-xl font-semibold border-b pb-2">Selected Publications</h3>
                            <div className="space-y-4 mb-8">
                                {data.publications.map((pub, index) => (
                                    <div key={index} className="pb-4 border-b border-accent/20 last:border-b-0 last:pb-0 flex gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <BookOpen className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-base font-medium mb-2">{pub.title}</h4>
                                            <p className="text-sm text-muted-foreground mb-1">{pub.authors}</p>
                                            <p className="text-sm text-muted-foreground">
                                                <em>{pub.journal}</em>
                                                {pub.volume && `, ${pub.volume}`}
                                                {pub.pages && `, ${pub.pages}`}
                                                {pub.year && ` (${pub.year})`}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {data.personal.thesis && (
                                <div className="mt-8">
                                    <h3 className="mb-6 text-xl font-semibold border-b pb-2">Thesis</h3>
                                    <div className="pb-4 flex gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <FileText className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-base font-medium mb-1">{data.personal.thesis.title}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                <em>{data.personal.thesis.publisher}</em>
                                                {data.personal.thesis.year && ` (${data.personal.thesis.year})`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-accent/5">
                <div className="container mx-auto max-w-4xl px-4">
                    <motion.h2 
                        className="mb-8 text-3xl font-bold text-center sm:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Contact
                    </motion.h2>
                    <div className="mb-8">
                        <motion.p 
                            className="text-lg text-muted-foreground text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            I'm always open to discussing new projects, opportunities, or
                            collaborations. Feel free to reach out through any of the following
                            channels:
                        </motion.p>
                    </div>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid gap-6 md:grid-cols-3"
                    >
                        {data.contact.socialLinks.map((link) => {
                            const Icon = iconMap[link.icon]
                            return (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={item}
                                    className="flex items-center gap-4 rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50"
                                >
                                    <div className="rounded-full bg-primary/10 p-3">
                                        <Icon className="h-6 w-6 text-primary" data-testid="social-icon" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{link.name}</h3>
                                        <p className="text-sm text-muted-foreground">{link.username}</p>
                                    </div>
                                </motion.a>
                            )
                        })}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <h4 className="mb-4 text-2xl font-semibold">Let's Connect</h4>
                        <p className="text-muted-foreground">
                            {data.contact.message}
                        </p>
                    </motion.div>
                    
                    {/* Academic Website Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 p-4 bg-accent/10 rounded-lg border border-accent/20"
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <User className="h-5 w-5 text-primary" />
                            <h4 className="text-lg font-semibold text-foreground">Academic Work</h4>
                        </div>
                        <p className="text-base text-muted-foreground text-center">
                            Looking for my academic research and publications? Visit my{" "}
                            <a 
                                href="https://academic.kvasilopoulos.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-semibold text-lg"
                            >
                                academic website
                            </a>
                        </p>
                        <p className="text-sm text-muted-foreground/80 mt-1 text-center">
                            (archived site, no longer maintained)
                        </p>
                    </motion.div>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="py-8 border-t">
                <div className="container mx-auto text-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {data.personal.name}. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
