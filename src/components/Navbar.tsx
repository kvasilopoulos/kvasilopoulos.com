"use client"

import * as React from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"

const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Skills", path: "/#skills" },
    { name: "Experience", path: "/#experience" },
    // { name: "Projects", path: "/#projects" },
    { name: "Contact", path: "/#contact" },
    { name: "CV", path: "/cv" },
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
            
            const sections = navItems
                .filter(item => item.path.startsWith('/#'))
                .map(item => item.path.substring(2))
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
    }, [pathname])

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault()
        if (path.startsWith('/#')) {
            if (isCV) {
                // If we're on the CV page, first navigate to home
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
                        {navItems.map((item) => (
                            <a
                                key={item.path}
                                href={item.path}
                                onClick={(e) => handleNavClick(e, item.path)}
                                className={`text-muted-foreground hover:text-foreground transition-colors relative group ${
                                    item.path.startsWith('/#') 
                                        ? activeSection === item.path.substring(2) 
                                            ? "text-foreground" 
                                            : "text-foreground/60"
                                        : pathname === item.path 
                                            ? "text-foreground" 
                                            : "text-foreground/60"
                                }`}
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
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
                                {navItems.map((item) => (
                                    <a
                                        key={item.path}
                                        href={item.path}
                                        onClick={(e) => {
                                            handleNavClick(e, item.path)
                                            setIsOpen(false)
                                        }}
                                        className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
} 