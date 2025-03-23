"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const navItems = [
    { name: "Home", path: "#hero" },
    { name: "About", path: "#about" },
    { name: "Skills", path: "#skills" },
    { name: "Experience", path: "#experience" },
    // { name: "Projects", path: "#projects" },
    { name: "Contact", path: "#contact" },
]

export function Navigation() {
    const { theme, setTheme } = useTheme()
    const [activeSection, setActiveSection] = React.useState("hero")

    React.useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.path.substring(1))
            const currentPosition = window.scrollY + 100

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i])
                if (section && section.offsetTop <= currentPosition) {
                    setActiveSection(sections[i])
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initialize on mount

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault()
        const element = document.querySelector(path)
        if (element) {
            window.scrollTo({
                top: element.getBoundingClientRect().top + window.scrollY - 80,
                behavior: 'smooth'
            })
        }
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
                <div className="mr-4 hidden md:flex">
                    <a 
                        href="#hero" 
                        onClick={(e) => handleNavClick(e, '#hero')} 
                        className="mr-6 flex items-center space-x-2"
                    >
                        <span className="hidden font-bold sm:inline-block">
                            Kostas Vasilopoulos
                        </span>
                    </a>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <a
                                key={item.path}
                                href={item.path}
                                onClick={(e) => handleNavClick(e, item.path)}
                                className={`transition-colors hover:text-foreground/80 ${activeSection === item.path.substring(1) ? "text-foreground" : "text-foreground/60"
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>
                <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="ml-auto flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-accent"
                >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </button>
            </div>
        </nav>
    )
} 