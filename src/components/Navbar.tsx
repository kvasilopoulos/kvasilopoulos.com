"use client"

import * as React from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"

const navItems = [
    { name: "Home", path: "/", section: "hero" },
    { name: "About", path: "/#about", section: "about" },
    { name: "Experience", path: "/#experience", section: "experience" },
    { name: "Education", path: "/#education", section: "education" },
    
    { name: "Contact", path: "/#contact", section: "contact" },
]

const otherNavItems = [
    { name: "Projects", path: "/projects", section: null },
    { name: "CV", path: "/cv", section: null },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { theme, setTheme } = useTheme()
    const [activeSection, setActiveSection] = React.useState("hero")
    const pathname = usePathname()
    const router = useRouter()
    const isHome = pathname === "/"
    const isCV = pathname === "/cv"
    const isProjects = pathname === "/projects"

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    React.useEffect(() => {
        const handleScroll = () => {
            if (pathname !== '/') return // Only handle scroll on home page
            
            const sections = ["hero", "about", "experience", "education", "contact"]
            const currentPosition = window.scrollY + 100
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight

            // Check if we're near the bottom of the page (within 100px)
            const nearBottom = currentPosition + windowHeight >= documentHeight - 100

            // If we're near the bottom, activate contact section
            if (nearBottom) {
                setActiveSection("contact")
                return
            }

            // Check each section from bottom to top
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i])
                if (section) {
                    const sectionTop = section.offsetTop
                    const sectionHeight = section.offsetHeight
                    const sectionBottom = sectionTop + sectionHeight

                    // If we're in this section
                    if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
                        setActiveSection(sections[i])
                        break
                    }
                }
            }
        }

        if (pathname === '/') {
            window.addEventListener('scroll', handleScroll)
            handleScroll() // Initialize on mount
        } else {
            // If not on home page, clear active section
            setActiveSection("")
        }

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [pathname])

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault()
        if (path.startsWith('/#')) {
            if (isCV || isProjects) {
                // If we're on the CV or Projects page, first navigate to home
                router.push('/')
                // Wait for navigation to complete before scrolling
                setTimeout(() => {
                    const element = document.querySelector(path.substring(1))
                    if (element) {
                        window.scrollTo({
                            top: element.getBoundingClientRect().top + window.scrollY - 80,
                            behavior: 'smooth'
                        })
                    }
                }, 100)
            } else {
                // If we're already on the home page, just scroll
                const element = document.querySelector(path.substring(1))
                if (element) {
                    window.scrollTo({
                        top: element.getBoundingClientRect().top + window.scrollY - 80,
                        behavior: 'smooth'
                    })
                }
            }
        } else {
            // For non-hash links, just navigate normally
            router.push(path)
        }
    }

    const isItemActive = (item: typeof navItems[0] | typeof otherNavItems[0]) => {
        if (item.path === "/cv") {
            return isCV
        } else if (item.path === "/projects") {
            return isProjects
        } else if (item.section) {
            return isHome && activeSection === item.section
        } else if (item.path === "/") {
            return isHome && activeSection === "hero"
        }
        return false
    }

    return (
        <motion.nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link 
                        href="/"
                        className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                    >
                        KV
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => {
                            const isActive = isItemActive(item)
                            return (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    onClick={(e) => handleNavClick(e, item.path)}
                                    className={`transition-colors relative group ${
                                        isActive 
                                            ? "text-primary font-medium" 
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {item.name}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                                        isActive ? "w-full" : "w-0 group-hover:w-full"
                                    }`} />
                                </a>
                            )
                        })}
                        <div className="h-6 w-px bg-border mx-2" />
                        {otherNavItems.map((item) => {
                            const isActive = isItemActive(item)
                            return (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    onClick={(e) => handleNavClick(e, item.path)}
                                    className={`transition-colors relative group ${
                                        isActive 
                                            ? "text-primary font-medium" 
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {item.name}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                                        isActive ? "w-full" : "w-0 group-hover:w-full"
                                    }`} />
                                </a>
                            )
                        })}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                            className="ml-4"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        <button
                            className="p-2 rounded-lg hover:bg-accent/50 transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-4">
                                {navItems.map((item) => {
                                    const isActive = isItemActive(item)
                                    return (
                                        <a
                                            key={item.path}
                                            href={item.path}
                                            onClick={(e) => {
                                                handleNavClick(e, item.path)
                                                setIsOpen(false)
                                            }}
                                            className={`block transition-colors py-2 ${
                                                isActive 
                                                    ? "text-primary font-medium" 
                                                    : "text-muted-foreground hover:text-foreground"
                                            }`}
                                        >
                                            {item.name}
                                        </a>
                                    )
                                })}
                                <div className="h-px bg-border my-2" />
                                {otherNavItems.map((item) => {
                                    const isActive = isItemActive(item)
                                    return (
                                        <a
                                            key={item.path}
                                            href={item.path}
                                            onClick={(e) => {
                                                handleNavClick(e, item.path)
                                                setIsOpen(false)
                                            }}
                                            className={`block transition-colors py-2 ${
                                                isActive 
                                                    ? "text-primary font-medium" 
                                                    : "text-muted-foreground hover:text-foreground"
                                            }`}
                                        >
                                            {item.name}
                                        </a>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
} 