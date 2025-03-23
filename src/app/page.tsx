"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, ExternalLink, Linkedin, Mail, Twitter, User, ArrowDown } from "lucide-react"

// Skills data
interface Skill {
    name: string
    level: number
    category: string
}

const skills: Skill[] = [
    // Programming Languages
    { name: "Python", level: 95, category: "Programming Languages" },
    { name: "R", level: 90, category: "Programming Languages" },
    { name: "JavaScript/TypeScript", level: 85, category: "Programming Languages" },
    { name: "SQL", level: 85, category: "Programming Languages" },

    // Machine Learning
    { name: "TensorFlow", level: 90, category: "Machine Learning" },
    { name: "PyTorch", level: 90, category: "Machine Learning" },
    { name: "Scikit-learn", level: 95, category: "Machine Learning" },
    { name: "Deep Learning", level: 90, category: "Machine Learning" },

    // Data Science
    { name: "Data Analysis", level: 95, category: "Data Science" },
    { name: "Data Visualization", level: 90, category: "Data Science" },
    { name: "Statistical Analysis", level: 90, category: "Data Science" },
    { name: "Big Data", level: 85, category: "Data Science" },

    // Tools & Technologies
    { name: "Git", level: 90, category: "Tools & Technologies" },
    { name: "Docker", level: 85, category: "Tools & Technologies" },
    { name: "AWS", level: 85, category: "Tools & Technologies" },
    { name: "MLOps", level: 80, category: "Tools & Technologies" },
]

// Projects data
interface Project {
    title: string
    description: string
    technologies: string[]
    github?: string
    demo?: string
    image?: string
}

const projects: Project[] = [
    {
        title: "Deep Learning Vision System",
        description:
            "Developed a computer vision system for real-time object detection and tracking using deep learning. Achieved 95% accuracy on benchmark datasets and deployed the system in production.",
        technologies: ["Python", "PyTorch", "OpenCV", "Docker", "CUDA"],
        github: "https://github.com/username/vision-system",
        demo: "https://demo.vision-system.com",
    },
    {
        title: "NLP Text Analysis Platform",
        description:
            "Built a scalable platform for processing and analyzing large volumes of text data. Implemented sentiment analysis, topic modeling, and named entity recognition.",
        technologies: ["Python", "TensorFlow", "FastAPI", "PostgreSQL", "Redis"],
        github: "https://github.com/username/nlp-platform",
    },
    {
        title: "MLOps Pipeline Framework",
        description:
            "Created a framework for automating ML model training, validation, and deployment. Reduced deployment time by 60% and improved model reliability.",
        technologies: ["Python", "Kubernetes", "AWS", "Jenkins", "MLflow"],
        github: "https://github.com/username/mlops-framework",
        demo: "https://docs.mlops-framework.com",
    },
]

// Experience data
interface Experience {
    title: string
    company: string
    period: string
    description: string[]
    technologies: string[]
}

const experiences: Experience[] = [
    {
        title: "Senior Machine Learning Engineer",
        company: "Tech Company",
        period: "2020 - Present",
        description: [
            "Led the development of computer vision models for autonomous systems",
            "Designed and implemented scalable ML pipelines using cloud infrastructure",
            "Mentored junior engineers and conducted technical interviews",
            "Reduced model inference time by 40% through optimization techniques",
        ],
        technologies: [
            "PyTorch",
            "TensorFlow",
            "Python",
            "Docker",
            "Kubernetes",
            "AWS",
        ],
    },
    {
        title: "Machine Learning Engineer",
        company: "AI Startup",
        period: "2018 - 2020",
        description: [
            "Developed NLP models for text classification and sentiment analysis",
            "Built end-to-end ML pipelines for data processing and model training",
            "Collaborated with cross-functional teams to deliver AI solutions",
            "Improved model accuracy by 25% using advanced preprocessing techniques",
        ],
        technologies: [
            "Python",
            "Scikit-learn",
            "NLTK",
            "SpaCy",
            "FastAPI",
            "PostgreSQL",
        ],
    },
    {
        title: "Data Scientist",
        company: "Research Institute",
        period: "2016 - 2018",
        description: [
            "Conducted research in deep learning and computer vision",
            "Published papers in top-tier conferences and journals",
            "Developed novel algorithms for image segmentation",
            "Collaborated with international research teams",
        ],
        technologies: [
            "Python",
            "R",
            "TensorFlow",
            "OpenCV",
            "MATLAB",
            "LaTeX",
        ],
    },
]

// Social Links data
const socialLinks = [
    {
        name: "Email",
        href: "mailto:k.vasilopoulo@gmail.com", // Replace with your email
        icon: Mail,
        username: "contact@example.com",
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/kvasilopoulos/", // Add your LinkedIn username
        icon: Linkedin,
        username: "LinkedIn Profile",
    },
    {
        name: "GitHub",
        href: "https://github.com/kvasilopoulos", // Add your GitHub username
        icon: Github,
        username: "GitHub Profile",
    },
    // {
    //     name: "Twitter",
    //     href: "https://twitter.com/", // Add your Twitter handle
    //     icon: Twitter,
    //     username: "@twitter_handle",
    // },
]

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

function SkillBar({ skill, inView }: { skill: Skill; inView: boolean }) {
    return (
        <div className="mb-6">
            <div className="mb-2 flex justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}%</span>
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

function SkillCategory({ category, skills }: { category: string; skills: Skill[] }) {
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
    
    return (
        <div className="relative">
            {/* Progress bar */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50" 
                style={{ scaleX: scrollYProgress }} 
            />

            {/* Hero Section */}
            <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 py-12 sm:py-20">
                <div className="flex flex-col items-center gap-6 text-center">
                    <div className="relative h-48 w-48 overflow-hidden rounded-full bg-muted ring-4 ring-primary ring-offset-2 ring-offset-background">
                        <div className="flex h-full w-full items-center justify-center">
                            <Image
                                src="/assets/profile.jpg"
                                alt="Kostas Vasilopoulos"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <motion.h1 
                            className="text-4xl font-bold tracking-tighter sm:text-5xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Kostas Vasilopoulos
                        </motion.h1>
                        <motion.p 
                            className="text-lg text-muted-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            AI & Machine Learning Engineer
                        </motion.p>
                    </div>
                    <motion.p 
                        className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        I specialize in developing and deploying machine learning solutions,
                        with expertise in deep learning and natural language processing.
                    </motion.p>
                </div>
                <motion.div 
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.5, 
                        delay: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 0.2
                    }}
                >
                    <a href="#about" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
                        <span className="mb-2 text-sm">Scroll Down</span>
                        <ArrowDown className="h-5 w-5" />
                    </a>
                </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-accent/5">
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
                        <motion.p 
                            className="text-lg leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            I am a Machine Learning Engineer with a passion for developing innovative AI solutions
                            that solve real-world problems. My journey in the field of artificial intelligence
                            began during my academic years, where I developed a strong foundation in mathematics,
                            statistics, and computer science.
                        </motion.p>
                        <motion.p 
                            className="text-lg leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Throughout my career, I have worked on diverse projects ranging from computer vision
                            applications to natural language processing systems. I specialize in designing and
                            implementing scalable machine learning pipelines, optimizing model performance, and
                            deploying AI solutions in production environments.
                        </motion.p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <h4 className="mb-4 text-xl font-medium">Expertise</h4>
                                <ul className="list-inside list-disc space-y-2 text-lg">
                                    <li>Deep Learning & Neural Networks</li>
                                    <li>Computer Vision & Image Processing</li>
                                    <li>Natural Language Processing</li>
                                    <li>Machine Learning Operations (MLOps)</li>
                                    <li>Data Analysis & Visualization</li>
                                    <li>Cloud Computing & Distributed Systems</li>
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
                                <div className="rounded-lg border bg-card p-3 shadow-sm">
                                    <h5 className="text-lg font-medium">Ph.D. in Machine Learning</h5>
                                    <p className="text-muted-foreground">University Name • 2018-2022</p>
                                </div>
                                <div className="rounded-lg border bg-card p-3 shadow-sm">
                                    <h5 className="text-lg font-medium">M.Sc. in Computer Science</h5>
                                    <p className="text-muted-foreground">University Name • 2016-2018</p>
                                </div>
                                <div className="rounded-lg border bg-card p-3 shadow-sm">
                                    <h5 className="text-lg font-medium">B.Sc. in Computer Science</h5>
                                    <p className="text-muted-foreground">University Name • 2012-2016</p>
                                </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                        {Array.from(new Set(skills.map((skill) => skill.category))).map((category) => (
                            <div key={category}>
                                <h3 className="mb-6 text-xl font-semibold">{category}</h3>
                                <div>
                                    {skills
                                        .filter((skill) => skill.category === category)
                                        .map((skill) => (
                                            <div key={skill.name} className="mb-4">
                                                <div className="mb-2 flex justify-between">
                                                    <span className="font-medium">{skill.name}</span>
                                                    <span className="text-muted-foreground">{skill.level}%</span>
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
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                className="rounded-lg border bg-card p-6 shadow-sm"
                            >
                                <div className="mb-4">
                                    <h3 className="text-2xl font-semibold">{exp.title}</h3>
                                    <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                                        <span>{exp.company}</span>
                                        <span>•</span>
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
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Projects Section */}
            {/* <section id="projects" className="py-20">
                <div className="container mx-auto max-w-4xl px-4">
                    <motion.h2 
                        className="mb-8 text-3xl font-bold text-center sm:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Projects
                    </motion.h2>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid gap-6 md:grid-cols-2"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                className="group rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50"
                            >
                                <h3 className="mb-2 text-2xl font-semibold">{project.title}</h3>
                                <p className="mb-4 text-muted-foreground">{project.description}</p>
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {project.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            <Github className="h-4 w-4" />
                                            GitHub
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            Demo
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section> */}

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
                        {socialLinks.map((link) => {
                            const Icon = link.icon
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
                        variants={item}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mt-12 rounded-lg border bg-card p-6 shadow-sm"
                    >
                        <h4 className="mb-4 text-2xl font-semibold">Let's Connect</h4>
                        <p className="text-muted-foreground">
                            Whether you want to discuss a project, ask about my experience, or just
                            say hello, I'd love to hear from you. 
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t">
                <div className="container mx-auto text-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Kostas Vasilopoulos. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}