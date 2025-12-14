"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Code, Database, TrendingUp } from "lucide-react"
import data from "../../data/data.json"

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

export default function Projects() {
    return (
        <div className="relative pt-20 pb-20">
            {/* Hero Section */}
            <section className="py-12 bg-gradient-to-b from-background to-background/80">
                <div className="container mx-auto max-w-4xl px-4">
                    <motion.h1 
                        className="mb-4 text-4xl font-bold text-center sm:text-5xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Projects
                    </motion.h1>
                    <motion.p 
                        className="text-lg text-muted-foreground text-center max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        A collection of my notable projects, including research platforms and open-source software contributions.
                    </motion.p>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-12">
                <div className="container mx-auto max-w-4xl px-4">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        {data.projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                className="rounded-lg border bg-card p-8 shadow-sm"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            {project.title === "Housing Observatory" ? (
                                                <TrendingUp className="h-6 w-6 text-primary" />
                                            ) : (
                                                <Code className="h-6 w-6 text-primary" />
                                            )}
                                            <h2 className="text-2xl font-semibold">{project.title}</h2>
                                        </div>
                                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                {project.highlights && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium mb-3">Key Highlights</h3>
                                        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                                            {project.highlights.map((highlight, i) => (
                                                <li key={i}>{highlight}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {project.packages && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium mb-3">Packages</h3>
                                        <div className="space-y-4">
                                            {project.packages.map((pkg, i) => (
                                                <div key={i} className="rounded-lg border bg-muted/30 p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <a
                                                                href={pkg.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-primary hover:underline font-semibold text-lg flex items-center gap-2"
                                                            >
                                                                {pkg.name}
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                            <p className="text-muted-foreground mt-1">{pkg.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-4">
                                            Collective downloads exceed 100,000. All packages available at:{" "}
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                r-universe
                                            </a>
                                        </p>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {project.url && (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                                    >
                                        {project.title === "CRAN R Packages" ? "Visit All packages" : "Visit Project"}
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
