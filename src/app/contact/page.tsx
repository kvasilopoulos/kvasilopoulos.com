"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

// TODO: Replace these values with your actual social media links and usernames
const socialLinks = [
    {
        name: "Email",
        href: "mailto:contact@example.com", // Replace with your email
        icon: Mail,
        username: "contact@example.com",
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/", // Add your LinkedIn username
        icon: Linkedin,
        username: "LinkedIn Profile",
    },
    {
        name: "GitHub",
        href: "https://github.com/", // Add your GitHub username
        icon: Github,
        username: "GitHub Profile",
    },
    {
        name: "Twitter",
        href: "https://twitter.com/", // Add your Twitter handle
        icon: Twitter,
        username: "@twitter_handle",
    },
]

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

export default function ContactPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12">
            <h1 className="mb-8 text-4xl font-bold">Contact</h1>
            <div className="mb-8">
                <p className="text-lg text-muted-foreground">
                    I'm always open to discussing new projects, opportunities, or
                    collaborations. Feel free to reach out through any of the following
                    channels:
                </p>
            </div>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 md:grid-cols-2"
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
                                <h2 className="font-semibold">{link.name}</h2>
                                <p className="text-sm text-muted-foreground">{link.username}</p>
                            </div>
                        </motion.a>
                    )
                })}
            </motion.div>
            <motion.div
                variants={item}
                initial="hidden"
                animate="show"
                className="mt-12 rounded-lg border bg-card p-6 shadow-sm"
            >
                <h2 className="mb-4 text-2xl font-semibold">Let's Connect</h2>
                <p className="text-muted-foreground">
                    Whether you want to discuss a project, ask about my experience, or just
                    say hello, I'd love to hear from you. I typically respond within 24
                    hours.
                </p>
            </motion.div>
        </div>
    )
} 