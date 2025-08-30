import Link from 'next/link'
import { getAllBlogPosts, formatBlogDate } from '../../../utils/blog'
import type { Metadata } from 'next'

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
                        <div className="space-y-0">
                            {posts.map((post) => (
                                <article
                                    key={post.slug}
                                    className="border border-card-border rounded-lg p-8 mb-8 blog-card"
                                >
                                    <div className="mb-6">
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

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {post.date && (
                                                    <time
                                                        dateTime={post.date}
                                                        className="text-lab-green text-base"
                                                    >
                                                        {formatBlogDate(
                                                            post.date
                                                        )}
                                                    </time>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {post.excerpt && (
                                        <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-3">
                                            {post.tags &&
                                                post.tags.length > 0 && (
                                                    <>
                                                        {post.tags.map(
                                                            (tag) => (
                                                                <Link
                                                                    key={tag}
                                                                    href={`/blog/tag/${tag}`}
                                                                    className="text-white text-base px-3 py-1 rounded border border-navbar-border hover:border-lab-green hover:text-lab-green transition-colors duration-200"
                                                                >
                                                                    {tag}
                                                                </Link>
                                                            )
                                                        )}
                                                    </>
                                                )}
                                        </div>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center text-lab-green hover:text-lab-light-green font-medium transition-colors duration-300"
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
