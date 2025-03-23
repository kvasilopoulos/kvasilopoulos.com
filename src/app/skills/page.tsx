"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

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

export default function SkillsPage() {
    const categories = Array.from(new Set(skills.map((skill) => skill.category)))

    return (
        <div className="container mx-auto max-w-4xl py-12">
            <h1 className="mb-8 text-4xl font-bold">Skills & Expertise</h1>
            <p className="mb-12 text-lg text-muted-foreground">
                Here's an overview of my technical skills and proficiency levels in various
                technologies and domains.
            </p>
            {categories.map((category) => (
                <SkillCategory
                    key={category}
                    category={category}
                    skills={skills.filter((skill) => skill.category === category)}
                />
            ))}
        </div>
    )
} 