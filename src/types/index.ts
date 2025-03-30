import { LucideIcon } from "lucide-react"

export type IconName = "Mail" | "Linkedin" | "Github" | "Twitter" | "User"

export interface SocialLink {
    name: string
    href: string
    icon: IconName
    username: string
}

export interface IconMap {
    [key: string]: LucideIcon
} 