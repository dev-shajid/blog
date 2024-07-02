import { getPostBySlug } from '@/lib/api'
import React from 'react'
import { urlForImage } from '../../../../../sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { getContent } from '@/lib/posts'
import Error from '../../error'

export default async function page({ params: { slug } }: { params: { slug: string } }) {
    const post: PostType | null = await getPostBySlug(slug)

    if (!post) return <Error error={{ message: "Requrested Blog does not exist!", name: 'slug_error' }} />

    let content = await getContent(post.body)

    return (
        <>
            <section className='space-y-4 w-full'>
                <div className="max-w-[900px]">
                    <article className='prose space-y-4 max-w-full !w-ful dark:prose-invert'>
                        <div className="">
                            <Image
                                src={urlForImage(post.image)}
                                width={300}
                                height={300}
                                alt="Banner"
                                className="w-full object-cover aspect-video rounded-md"
                            />
                        </div>

                        <div className='text- text-gray-600 font-medium'>{new Date(post.publishedAt).toDateString()}</div>

                        <div className="title">{post.title}</div>

                        <div className="tags flex gap-2 items-center">
                            {
                                post.tags?.map((tag, i) => (
                                    <Link key={i} href={`/tags/${tag.slug.current}`}>
                                        <Badge key={i}>{tag?.name}</Badge>
                                    </Link>
                                ))
                            }
                        </div>

                        <div className='blog_content'>
                            {content}
                        </div>

                    </article>
                </div>
            </section>
        </>
    )
}
