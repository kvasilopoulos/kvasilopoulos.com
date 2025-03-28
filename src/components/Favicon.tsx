"use client"

import { useEffect } from "react"

export function Favicon() {
    useEffect(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 32
        canvas.height = 32
        const ctx = canvas.getContext("2d")

        if (ctx) {
            // Set background
            ctx.fillStyle = "#000000"
            ctx.fillRect(0, 0, 32, 32)

            // Set text properties
            ctx.fillStyle = "#ffffff"
            ctx.font = "bold 20px Inter"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"

            // Draw text
            ctx.fillText("KV", 16, 16)

            // Convert to favicon
            const link = document.createElement("link")
            link.rel = "icon"
            link.type = "image/png"
            link.href = canvas.toDataURL("image/png")
            document.head.appendChild(link)

            return () => {
                document.head.removeChild(link)
            }
        }
    }, [])

    return null
} 