import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import { ReactElement } from 'react'
import { JSXElementConstructor } from 'react'

export async function getContent(rawMDX: string): Promise<ReactElement<any, string | JSXElementConstructor<any>>> {

    const { frontmatter, content } = await compileMDX({
        source: rawMDX,
        // components: {
        // Video,
        // CustomImage,
        // },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    rehypeHighlight,
                    rehypeSlug,
                    rehypeCodeTitles,
                    rehypePrism,
                    [rehypeAutolinkHeadings, {
                        behavior: 'wrap'
                    }],
                ],
                remarkPlugins: [

                ],
                format: 'mdx'
            },
        }
    })

    return content
}