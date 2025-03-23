"use client"

import { motion } from "framer-motion"

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

export default function ExperiencePage() {
    return (
        <div className="container mx-auto max-w-4xl py-12">
            <h1 className="mb-8 text-4xl font-bold">Professional Experience</h1>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-12"
            >
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        className="rounded-lg border bg-card p-6 shadow-sm"
                    >
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold">{exp.title}</h2>
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
    )
}