import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type BlogPost = {
    slug: string
    contentHtml: string
    title?: string
    date?: string
    author?: string
    excerpt?: string
    tags?: string[]
    draft?: boolean
}

const blogsDirectory = path.join(process.cwd(), 'blogs')

export function formatBlogDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    if (!fs.existsSync(blogsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(blogsDirectory)
    const allPostsData = await Promise.all(
        fileNames
            .filter((fileName) => fileName.endsWith('.md'))
            .map(async (fileName) => {
                const slug = fileName.replace(/\.md$/, '')
                const fullPath = path.join(blogsDirectory, fileName)
                const fileContents = fs.readFileSync(fullPath, 'utf8')
                const { data, content } = matter(fileContents)

                if (data.draft === true) {
                    return null
                }

                const processedContent = await remark()
                    .use(html)
                    .process(content)
                const contentHtml = processedContent.toString()

                return {
                    slug,
                    contentHtml,
                    ...data,
                } as BlogPost
            })
    )

    return allPostsData
        .filter((post): post is BlogPost => post !== null) // type guard
        .sort((a, b) => {
            if (!a.date || !b.date) return 0
            return a.date < b.date ? 1 : -1
        })
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const fullPath = path.join(blogsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
        return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    if (data.draft === true) {
        return null
    }

    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
        slug,
        contentHtml,
        ...data,
    } as BlogPost
}

export function getAllBlogSlugs(): { params: { slug: string } }[] {
    if (!fs.existsSync(blogsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(blogsDirectory)

    return fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const fullPath = path.join(blogsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data } = matter(fileContents)

            if (data.draft === true) {
                return null
            }

            return {
                params: {
                    slug: fileName.replace(/\.md$/, ''),
                },
            }
        })
        .filter(
            (slug): slug is { params: { slug: string } } => slug !== null
        )
}

export async function getAllTags(): Promise<string[]> {
    const posts = await getAllBlogPosts()
    const tagSet = new Set<string>()

    posts.forEach((post) => {
        if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach((tag) => tagSet.add(tag))
        }
    })

    return Array.from(tagSet).sort()
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
    const posts = await getAllBlogPosts()
    return posts.filter(
        (post) => post.tags && Array.isArray(post.tags) && post.tags.includes(tag)
    )
}

export async function getAllTagSlugs(): Promise<{ params: { tag: string } }[]> {
    const tags = await getAllTags()
    return tags.map((tag) => ({
        params: { tag },
    }))
}
