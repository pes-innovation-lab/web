import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const blogsDirectory = path.join(process.cwd(), 'blogs')

export function formatBlogDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export async function getAllBlogPosts() {
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

                // Skip draft posts
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
                }
            })
    )

    return allPostsData
        .filter((post) => post !== null) // remove drafts
        .sort((a, b) => {
            if (a.date < b.date) {
                return 1
            } else {
                return -1
            }
        })
}

export async function getBlogPost(slug) {
    const fullPath = path.join(blogsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
        return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Skip draft posts
    if (data.draft === true) {
        return null
    }

    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
        slug,
        contentHtml,
        ...data,
    }
}

export function getAllBlogSlugs() {
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
        .filter((slug) => slug !== null)
}

export async function getAllTags() {
    const posts = await getAllBlogPosts()
    const tagSet = new Set()

    posts.forEach((post) => {
        if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach((tag) => tagSet.add(tag))
        }
    })

    return Array.from(tagSet).sort()
}

export async function getPostsByTag(tag) {
    const posts = await getAllBlogPosts()
    return posts.filter(
        (post) =>
            post.tags && Array.isArray(post.tags) && post.tags.includes(tag)
    )
}

export async function getAllTagSlugs() {
    const tags = await getAllTags()
    return tags.map((tag) => ({
        params: {
            tag: tag,
        },
    }))
}
