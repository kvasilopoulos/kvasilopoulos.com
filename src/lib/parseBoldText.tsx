import * as React from "react"

// Helper function to parse markdown-style bold text (**text**) and render it
export function parseBoldText(text: string): React.ReactNode {
    const parts: React.ReactNode[] = []
    const regex = /\*\*(.*?)\*\*/g
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index))
        }
        // Add the bold text
        parts.push(<strong key={match.index} className="font-semibold">{match[1]}</strong>)
        lastIndex = regex.lastIndex
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? <>{parts}</> : text
}
