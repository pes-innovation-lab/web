'use client'
import Link from 'next/link'

interface BlogPost {
    slug: string
    title?: string
    date?: string
    author?: string
    excerpt?: string
    tags?: string[]
}

interface RelatedPostsProps {
    relatedPosts: BlogPost[]
}

export default function RelatedPosts({ relatedPosts }: RelatedPostsProps) {
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            })
        } catch {
            return ''
        }
    }

    return (
        <div className="w-full">
            <div className="bg-transparent rounded-lg p-4 font-martian-mono border border-sidebar-border">
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wide text-blog-heading-accent">
                    More Articles
                </h3>

                {relatedPosts.length > 0 ? (
                    <nav>
                        <ul className="space-y-1">
                            {relatedPosts.map((post) => (
                                <li key={post.slug}>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="block w-full text-left text-xs py-1 rounded transition-all duration-200 hover:opacity-80 text-blog-text-primary"
                                    >
                                        <div>
                                            <h4 className="font-medium line-clamp-2 mb-1">
                                                {post.title || post.slug}
                                            </h4>
                                            {post.date && (
                                                <time className="opacity-60 text-blog-text-secondary">
                                                    {formatDate(post.date)}
                                                </time>
                                            )}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-xs opacity-60 text-blog-text-secondary">
                            No related posts found
                        </p>
                        <Link
                            href="/blog"
                            className="inline-block mt-2 text-xs transition-colors duration-200 hover:opacity-80 text-blog-text-primary"
                        >
                            View all posts →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
