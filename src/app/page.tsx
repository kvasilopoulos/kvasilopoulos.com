"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, ExternalLink, Linkedin, Mail, Twitter, User, ArrowDown } from "lucide-react"
import data from "../data/data.json"
import { Navbar } from "@/components/Navbar"
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
            <Navbar />
            
            {/* Progress bar */}
            <motion.div 
                className="fixed top-16 left-0 right-0 h-1 bg-primary z-50" 
                style={{ scaleX: scrollYProgress }} 
            />

            {/* Hero Section */}
            <section id="hero" className="relative flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-background to-background/80 pt-32 pb-16 sm:pt-40 sm:pb-24">
                <div className="flex flex-col items-center gap-8 text-center px-4">
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
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <h4 className="mb-4 text-xl font-medium">Expertise</h4>
                                <ul className="list-inside list-disc space-y-2 text-lg">
                                    {data.personal.expertise.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="space-y-4"
                            >
                                <h4 className="mb-4 text-xl font-medium">Education</h4>
                                {data.personal.education.map((edu, index) => (
                                    <div key={index} className="rounded-lg border bg-card p-3 shadow-sm">
                                        <h5 className="text-lg font-medium">{edu.degree}</h5>
                                        <p className="text-muted-foreground">{edu.school} • {edu.period}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20">
                <div className="container mx-auto max-w-4xl px-4">
                    <motion.h2 
                        className="mb-8 text-3xl font-bold text-center sm:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Skills & Expertise
                    </motion.h2>
                    <motion.p 
                        className="mb-10 text-lg text-muted-foreground text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Here's an overview of my technical skills and proficiency levels.
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                        {Array.from(new Set(data.skills.map((skill) => skill.category))).map((category) => (
                            <div key={category}>
                                <h3 className="mb-6 text-xl font-semibold">{category}</h3>
                                <div>
                                    {data.skills
                                        .filter((skill) => skill.category === category)
                                        .map((skill) => (
                                            <div key={skill.name} className="mb-4">
                                                <div className="mb-2">
                                                    <span className="font-medium">{skill.name}</span>
                                                </div>
                                                <div className="h-2 w-full rounded-full bg-secondary">
                                                    <motion.div
                                                        className="h-full rounded-full bg-primary"
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.level}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 bg-accent/5">
                <div className="container mx-auto max-w-4xl px-4">
                    <motion.h2 
                        className="mb-8 text-3xl font-bold text-center sm:text-4xl"
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
                        className="space-y-12"
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
                                    className="rounded-lg border bg-card p-6 shadow-sm"
                                >
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-semibold text-primary">{company}</h3>
                                    </div>
                                    <div className="space-y-8">
                                        {companyExperiences.map((exp, index) => (
                                            <div key={index} className="relative pl-6 border-l-2 border-primary/20">
                                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary/20" />
                                                <div className="mb-4">
                                                    <h4 className="text-xl font-semibold">{exp.title}</h4>
                                                    <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                                                        <span>{exp.period}</span>
                                                    </div>
                                                </div>
                                                <ul className="mb-4 list-inside list-disc space-y-2">
                                                    {exp.description.map((desc, i) => (
                                                        <li key={i} className="text-muted-foreground">
                                                            {desc}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.technologies.map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
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