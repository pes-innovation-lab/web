import Link from 'next/link'
import { getAllBlogPosts, formatBlogDate } from '../../../utils/blog'
import type { Metadata } from 'next'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import BlogFilter from './blogFilter'

export const metadata: Metadata = {
    title: 'Blog',
}

interface BlogPost {
    slug: string
    contentHtml: string
    title?: string
    date?: string
    author?: string
    excerpt?: string
    tags?: string[]
}

export default async function BlogPage() {
    const posts: BlogPost[] = await getAllBlogPosts()

    return (
        <div className="min-h-screen bg-lab-bg text-white font-martian-mono">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="text-center text-lab-accent">
                            <p className="text-3xl">Content coming soon!</p>
                        </div>
                    ) : (
                        <BlogFilter posts={posts} />
                    )}
                </div>
            </div>
        </div>
    )
}
