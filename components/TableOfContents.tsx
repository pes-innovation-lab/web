'use client'
import { useEffect, useState } from 'react'

interface TOCItem {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
    const [tocItems, setTocItems] = useState<TOCItem[]>([])
    const [minLevel, setMinLevel] = useState<number>(1)

    useEffect(() => {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = content

        const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
        const items: TOCItem[] = []

        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1))
            const text = heading.textContent || ''
            const id = `heading-${index}`

            heading.id = id

            items.push({ id, text, level })
        })

        // Find the minimum heading level to align the first level with the title
        const minHeadingLevel =
            items.length > 0 ? Math.min(...items.map((item) => item.level)) : 1
        setMinLevel(minHeadingLevel)
        setTocItems(items)

        const articleContent = document.querySelector('.blog-content')
        if (articleContent) {
            articleContent.innerHTML = tempDiv.innerHTML
        }
    }, [content])

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    if (tocItems.length === 0) return null

    return (
        <div className="w-full">
            <div className="bg-transparent rounded-lg p-4 font-martian-mono border border-sidebar-border">
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wide text-blog-heading-accent">
                    Contents
                </h3>

                <nav>
                    <ul className="space-y-1">
                        {tocItems.map((item) => {
                            const relativeLevel = item.level - minLevel
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => scrollToHeading(item.id)}
                                        className={`
                        block w-full text-left text-xs py-1 rounded transition-all duration-200 hover:opacity-80
                        ${relativeLevel === 1 ? 'ml-2' : ''}
                        ${relativeLevel === 2 ? 'ml-4' : ''}
                        ${relativeLevel >= 3 ? 'ml-6' : ''}
                        text-blog-text-primary bg-transparent
                      `}
                                    >
                                        {item.text}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )
}
