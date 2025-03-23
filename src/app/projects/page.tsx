"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"

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

export default function ProjectsPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12">
            <h1 className="mb-8 text-4xl font-bold">Projects</h1>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 md:grid-cols-2"
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        className="group rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50"
                    >
                        <h2 className="mb-2 text-2xl font-semibold">{project.title}</h2>
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
    )
} 