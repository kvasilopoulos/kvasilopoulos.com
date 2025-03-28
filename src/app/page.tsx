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
    { name: "Python & R", level: 90, category: "Programming Languages" },
    { name: "SQL", level: 75, category: "Programming Languages" },
    { name: "JavaScript/TypeScript & HTML/CSS", level: 60, category: "Programming Languages" },

    // Machine Learning & AI
    { name: "Generative AI & LLMs", level: 90, category: "Machine Learning & AI" },
    { name: "Natural Language Processing", level: 85, category: "Machine Learning & AI" },
    { name: "Deep Learning & Neural Networks", level: 75, category: "Machine Learning & AI" },
    

    // Data Science
    // { name: "Data Analysis & Statistics", level: 95, category: "Data Science" },
    // { name: "Data Visualization", level: 90, category: "Data Science" },
    // { name: "Big Data Processing", level: 85, category: "Data Science" },
    // { name: "Time Series Analysis", level: 85, category: "Data Science" },

    // Tools & Technologies
    { name: "Docker & K8s", level: 85, category: "Tools & Technologies" },
    { name: "AWS Cloud Services", level: 85, category: "Tools & Technologies" },
    { name: "Git & CI/CD, DevOps", level: 80, category: "Tools & Technologies" },
    
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
        title: "Machine Learning Engineer, Manager",
        company: "Pfizer",
        period: "May 2023 - Present",
        description: [
            "Managed the integration of Large Language Models (LLMs) into the platform, resolving technical obstacles and boosting platform capabilities",
            "Implemented MLOps best practices to enhance the efficiency, scalability, and performance of AI solutions within the platform",
            "Technical Lead for Ethicara ML: Led the development and implementation of ethical AI solutions for Pfizer, ensuring compliance with industry standards and guiding responsible AI practices",
            "Engaged with users and stakeholders to align platform enhancements with business goals, while fostering cross-team collaboration"
        ],
        technologies: [
            "Python",
            "Machine Learning",
            "LLMs",
            "MLOps",
            "Kubernetes",
            "Cloud Computing"
        ],
    },
    {
        title: "Machine Learning Engineer",
        company: "SophoTree",
        period: "January 2022 - May 2023",
        description: [
            "Tech Lead for company-specific contributions to the Infinitech and AI4PP European Projects (Horizon 2020)",
            "Led the design and implementation of a distributed data collection system in Kubernetes, enabling horizontal scaling to support millions of jobs daily",
            "Deployed multiple ML models to production, integrating them into the platform with autoscaling, microbatching, and runtime optimizations, resulting in a 320% increase in throughput and a 40% cost reduction",
            "Delivered API microservices with integrated Postgres, Elasticsearch, and analytics capabilities, enhancing the platform's data processing and retrieval"
        ],
        technologies: [
            "Python",
            "Kubernetes",
            "PostgreSQL",
            "Elasticsearch",
            "Machine Learning",
            "Microservices"
        ],
    },
    {
        title: "Data Scientist",
        company: "SophoTree",
        period: "June 2021 - January 2022",
        description: [
            "Led data analysis and machine learning initiatives",
            "Developed and implemented data-driven solutions"
        ],
        technologies: [
            "Python",
            "Data Analysis",
            "Machine Learning",
            "Statistics"
        ],
    },
    {
        title: "Visiting Researcher",
        company: "Lancaster University",
        period: "July 2021 - July 2022",
        description: [
            "Developed scalable and efficient methods for data analysis and model development, enhancing data cleansing, manipulation, and processing within existing software applications and frameworks",
            "Achieved recognition for the Housing Observatory, featured in prominent economics journals like The Times, with findings actively utilized by practitioners and institutions such as Central Banks"
        ],
        technologies: [
            "Data Analysis",
            "Statistical Modeling",
            "Research",
            "Economics"
        ],
    },
    {
        title: "Teaching Associate",
        company: "Lancaster University",
        period: "November 2020 - August 2021",
        description: [
            "Teaching and mentoring students in economics and data analysis"
        ],
        technologies: [
            "Teaching",
            "Economics",
            "Data Analysis"
        ],
    },
    {
        title: "Research Assistant",
        company: "Lancaster University",
        period: "May 2019 - October 2020",
        description: [
            "Analyzing and modelling UK national and regional housing markets",
            "Developing interactive tools for real-time monitoring of real estate markets",
            "Maintaining the website to ensure optimal performance and user experience"
        ],
        technologies: [
            "Data Analysis",
            "Statistical Modeling",
            "Web Development",
            "Economics"
        ],
    },
    {
        title: "Teaching Assistant",
        company: "Lancaster University",
        period: "October 2016 - September 2020",
        description: [
            "Teaching Economics to classes of 15-60 students in weekly discussion sessions for six semesters",
            "Courses Tutored:",
            "- Econ222: Intermediate Macroeconomics I",
            "- Econ 102: Principles of Economics B"
        ],
        technologies: [
            "Teaching",
            "Economics",
            "Education"
        ],
    }
]

// Social Links data
const socialLinks = [
    {
        name: "Email",
        href: "mailto:k.vasilopoulo@gmail.com", // Replace with your email
        icon: Mail,
        username: "k.vasilopoulo@gmail.com",
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/kvasilopoulos/", // Add your LinkedIn username
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
            <section id="hero" className="relative flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-background to-background/80 pt-32 pb-16 sm:pt-40 sm:pb-24">
                <div className="flex flex-col items-center gap-8 text-center px-4">
                    <div className="relative h-48 w-48 sm:h-56 sm:w-56 overflow-hidden rounded-full bg-muted ring-4 ring-primary ring-offset-2 ring-offset-background">
                        <div className="flex h-full w-full items-center justify-center">
                            <Image
                                src="/assets/linkedin2.jpg"
                                alt="Kostas Vasilopoulos"
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
                            Kostas Vasilopoulos
                        </motion.h1>
                        <motion.p 
                            className="text-lg sm:text-xl md:text-2xl text-muted-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            AI & Machine Learning Engineer
                        </motion.p>
                    </div>
                    <motion.p 
                        className="max-w-[42rem] leading-normal text-muted-foreground text-base sm:text-lg md:text-xl sm:leading-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        I specialize in developing and deploying machine learning solutions,
                        with expertise in deep learning and natural language processing.
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
                                    <li>Large Language Models & Generative AI</li>
                                    <li>Machine Learning Operations (MLOps)</li>
                                    <li>Natural Language Processing</li>
                                    <li>Distributed Systems & Cloud Computing</li>
                                    <li>Data Analysis & Statistical Modeling</li>
                                    <li>Ethical AI & Responsible AI Practices</li>
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
                                    <h5 className="text-lg font-medium">Ph.D. in Economics</h5>
                                    <p className="text-muted-foreground">Lancaster University • 2016-2020</p>
                                </div>
                                <div className="rounded-lg border bg-card p-3 shadow-sm">
                                    <h5 className="text-lg font-medium">M.Sc. in Economics, Applied Finance</h5>
                                    <p className="text-muted-foreground">University of Macedonia • 2014-2016</p>
                                </div>
                                <div className="rounded-lg border bg-card p-3 shadow-sm">
                                    <h5 className="text-lg font-medium">B.Sc. in Economics</h5>
                                    <p className="text-muted-foreground">University of Macedonia • 2009-2014</p>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                        {Array.from(new Set(skills.map((skill) => skill.category))).map((category) => (
                            <div key={category}>
                                <h3 className="mb-6 text-xl font-semibold">{category}</h3>
                                <div>
                                    {skills
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
                        {Array.from(new Set(experiences.map(exp => exp.company))).map(company => {
                            const companyExperiences = experiences
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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
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