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
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
                <div className="mr-4 hidden md:flex">
                    <Link 
                        href="/"
                        className="mr-6 flex items-center space-x-2"
                    >
                        <span className="hidden font-bold sm:inline-block">
                            Kostas Vasilopoulos
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navItems.map((item) => (
                            item.path.startsWith('/#') ? (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    onClick={(e) => handleNavClick(e, item.path)}
                                    className={`transition-colors hover:text-foreground/80 ${activeSection === item.path.substring(2) ? "text-foreground" : "text-foreground/60"
                                        }`}
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`transition-colors hover:text-foreground/80 ${pathname === item.path ? "text-foreground" : "text-foreground/60"}`}
                                >
                                    {item.name}
                                </Link>
                            )
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