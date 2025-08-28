import Link from 'next/link'
import {
    getPostsByTag,
    getAllTags,
    formatBlogDate,
} from '../../../../../utils/blog'
import { notFound } from 'next/navigation'

type BlogPost = {
    slug: string
    contentHtml: string
    title?: string
    date?: string
    author?: string
    excerpt?: string
    tags?: string[]
}

export async function generateStaticParams() {
    const tags = await getAllTags()
    return tags.map((tag) => ({
        tag: tag,
    }))
}

export default async function TagPage({ params }: { params: { tag: string } }) {
    const { tag } = params
    const posts: BlogPost[] = await getPostsByTag(tag)

    if (posts.length === 0) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-lab-bg text-white font-martian-mono">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <Link
                            href="/blog"
                            className="text-lab-green hover:text-lab-accent transition-colors duration-200 mb-4 inline-flex items-center font-martian-mono text-sm"
                        >
                            ← Back to Blog
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-martian-mono">
                            Posts tagged &ldquo;{tag}&rdquo;
                        </h1>
                        <p className="text-gray-300">
                            {posts.length} post{posts.length !== 1 ? 's' : ''}{' '}
                            found
                        </p>
                    </div>

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
                                                    {formatBlogDate(post.date)}
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
                                        {post.tags && post.tags.length > 0 && (
                                            <>
                                                {post.tags.map((postTag) => (
                                                    <Link
                                                        key={postTag}
                                                        href={`/blog/tag/${postTag}`}
                                                        className={`text-white text-base px-3 py-1 rounded border transition-colors duration-200 ${
                                                            postTag === tag
                                                                ? 'border-lab-green text-lab-green'
                                                                : 'border-navbar-border hover:border-lab-green hover:text-lab-green'
                                                        }`}
                                                    >
                                                        {postTag}
                                                    </Link>
                                                ))}
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
                </div>
            </div>
        </div>
    )
}
