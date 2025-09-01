'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface BlogPost {
    slug: string
    title?: string
    date?: string
    author?: string
    excerpt?: string
    tags?: string[]
}

function FilterChip({
    label,
    isActive,
    onClick,
}: {
    label: string
    isActive: boolean
    onClick: () => void
}) {
    return (
        <motion.button
            onClick={onClick}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border font-martian-mono backdrop-blur-sm ${
                isActive
                    ? 'bg-lab-green/30 text-lab-green border-lab-green/50 shadow-lg shadow-accent-glow scale-105'
                    : 'bg-lab-sec/50 text-gray-400 border-card-border hover:bg-lab-sec hover:border-lab-green/30 hover:text-lab-green hover:scale-105'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {label}
        </motion.button>
    )
}

export default function BlogFilter({ posts }: { posts: BlogPost[] }) {
    const [selectedYear, setSelectedYear] = useState('All')
    const [selectedTag, setSelectedTag] = useState('All')

    const allYears = [
        'All',
        ...Array.from(
            new Set(
                posts
                    .map((post) => post.date?.slice(0, 4))
                    .filter((y): y is string => !!y)
            )
        ).sort((a, b) => b.localeCompare(a)),
    ]

    const allTags = [
        'All',
        ...Array.from(new Set(posts.flatMap((post) => post.tags || []))).sort(),
    ]

    const filteredPosts = posts.filter((post) => {
        const postYear = post.date?.slice(0, 4)
        const yearMatch = selectedYear === 'All' || postYear === selectedYear
        const tagMatch =
            selectedTag === 'All' || post.tags?.includes(selectedTag)
        return yearMatch && tagMatch
    })

    return (
        <div className="min-h-screen bg-lab-bg">
            <div className="pt-6 pb-16 px-6 text-center">
                {/* Year Filter */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-step-8 font-bold text-lab-green mb-6 font-martian-mono">
                        Blogs
                    </h1>
                    <h2 className="text-step-4 text-white font-dm-sans font-medium mb-4">
                        Blogs You can read
                    </h2>
                </motion.div>
            </div>

            {/* //////////////// */}

            {/* Year Filter */}

            <div className="max-w-7xl mx-auto px-6 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center"
                >
                    <h3 className="text-step-1 font-semibold text-lab-green mb-6 font-martian-mono">
                        Filter by Year
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {allYears.map((year) => (
                            <FilterChip
                                key={year}
                                label={year}
                                isActive={selectedYear === year}
                                onClick={() => setSelectedYear(year)}
                            />
                        ))}

                        {/* {allTags.map((tag) => (
                            <FilterChip
                                key={tag}
                                label={tag}
                                isActive={selectedTag === tag}
                                onClick={() => setSelectedTag(tag)}
                            />
                        ))} */}
                    </div>
                </motion.div>

                {/* Tag Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center"
                >
                    <h3 className="text-step-1 mt-4 font-semibold text-lab-green mb-6 font-martian-mono">
                        Filter by Tags
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {allTags.map((tag) => (
                            <FilterChip
                                key={tag}
                                label={tag}
                                isActive={selectedTag === tag}
                                onClick={() => setSelectedTag(tag)}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Posts */}
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                    <article
                        key={post.slug}
                        className="border border-card-border rounded-lg p-8 mb-8 blog-card"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group flex-1"
                            >
                                <h2 className="text-step-3 font-bold text-white group-hover:text-lab-green transition-colors duration-300">
                                    {post.title || post.slug}
                                </h2>
                            </Link>
                            {post.author && (
                                <span className="text-step-1 text-gray-300 ml-4">
                                    By {post.author}
                                </span>
                            )}
                        </div>

                        {post.date && (
                            <time
                                dateTime={post.date}
                                className="text-lab-green text-base"
                            >
                                {post.date}
                            </time>
                        )}
                        {post.excerpt && (
                            <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                                {post.excerpt}
                            </p>
                        )}
                    </article>
                ))
            ) : (
                <div className="text-center py-20 text-gray-400">
                    No posts found for this filter!
                </div>
            )}
        </div>
    )
}
