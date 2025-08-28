import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
    getBlogPost,
    getAllBlogSlugs,
    formatBlogDate,
    getAllBlogPosts,
} from '../../../../utils/blog'
import TableOfContents from '../../../../components/TableOfContents'
import RelatedPosts from '../../../../components/RelatedPosts'

interface BlogPost {
    slug: string
    contentHtml: string
    title?: string
    date?: string
    author?: string
    excerpt?: string
    tags?: string[]
}

interface PageProps {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const slugs = getAllBlogSlugs()
    return slugs.map((slug) => ({
        slug: slug.params.slug,
    }))
}

export default async function BlogPost({ params }: PageProps) {
    const post: BlogPost | null = await getBlogPost(params.slug)

    if (!post) {
        notFound()
    }

    const allPosts = await getAllBlogPosts()
    const relatedPosts = allPosts
        .filter((p) => p.slug !== params.slug)
        .slice(0, 4)

    return (
        <div className="min-h-screen bg-lab-bg text-white font-martian-mono">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-8">
                        <div className="hidden xl:block w-64 flex-shrink-0">
                            <div className="sticky top-24">
                                <RelatedPosts relatedPosts={relatedPosts} />
                            </div>
                        </div>

                        <div className="flex-1 max-w-4xl mx-auto">
                            <Link
                                href="/blog"
                                className="inline-flex items-center mb-12 transition-colors duration-300 hover:opacity-80 text-blog-heading-accent font-martian-mono"
                            >
                                ← Back to Blog
                            </Link>

                            <header className="mb-12">
                                <h1 className="text-left mb-6 leading-tight text-blog-heading-accent font-martian-mono text-4xl md:text-5xl font-bold">
                                    {post.title || post.slug}
                                </h1>

                                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-sm text-blog-text-secondary font-martian-mono">
                                    <div className="flex items-center gap-4">
                                        {post.date && (
                                            <time
                                                dateTime={post.date}
                                                className="text-base text-blog-heading-secondary"
                                            >
                                                {formatBlogDate(post.date)}
                                            </time>
                                        )}
                                    </div>
                                    {post.author && (
                                        <span className="text-base">
                                            By {post.author}
                                        </span>
                                    )}
                                </div>

                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex gap-2 mb-6">
                                        {post.tags.map((tag) => (
                                            <Link
                                                key={tag}
                                                href={`/blog/tag/${tag}`}
                                                className="text-base px-3 py-1 rounded text-blog-heading-primary border border-sidebar-border font-martian-mono hover:border-lab-green hover:text-lab-green transition-colors duration-200"
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {post.excerpt && (
                                    <p className="text-xl italic border-l-4 pl-6 py-2 rounded-r text-blog-text-primary border-l-blog-border-primary font-martian-mono bg-lab-sec-transparent">
                                        {post.excerpt}
                                    </p>
                                )}
                            </header>

                            <article className="blog-content">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: post.contentHtml,
                                    }}
                                />
                            </article>

                            <footer className="mt-16 pt-8 font-martian-mono border-t border-t-blog-border-secondary">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center transition-colors duration-300 hover:opacity-80 text-blog-heading-accent"
                                >
                                    ← Back to all posts
                                </Link>
                            </footer>
                        </div>

                        <div className="hidden xl:block w-64 flex-shrink-0">
                            <div className="sticky top-24">
                                <TableOfContents content={post.contentHtml} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
