"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Skills", path: "/#skills" },
    { name: "Experience", path: "/#experience" },
    // { name: "Projects", path: "/#projects" },
    { name: "Contact", path: "/#contact" },
    { name: "CV", path: "/cv" },
]

export function Navigation() {
    const { theme, setTheme } = useTheme()
    const [activeSection, setActiveSection] = React.useState("hero")
    const pathname = usePathname()
    const isHome = pathname === "/"
    const isCV = pathname === "/cv"

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
        if (path.startsWith('/#')) {
            e.preventDefault()
            const element = document.querySelector(path.substring(1))
            if (element) {
                window.scrollTo({
                    top: element.getBoundingClientRect().top + window.scrollY - 80,
                    behavior: 'smooth'
                })
            }
        }
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-xl font-bold">
                        KV
                    </Link>
                    <div className="flex gap-4">
                        <Link 
                            href="/" 
                            className={`text-sm font-medium transition-colors hover:text-primary ${
                                isHome ? "text-primary" : "text-muted-foreground"
                            }`}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/cv" 
                            className={`text-sm font-medium transition-colors hover:text-primary ${
                                isCV ? "text-primary" : "text-muted-foreground"
                            }`}
                        >
                            CV
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
} 