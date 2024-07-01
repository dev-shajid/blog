import { getPostsByTag, getTag } from '@/lib/api'
import React from 'react'
import Posts from "@/components/Posts";

export default async function page({ params: { slug } }: { params: { slug: string } }) {
    const tag: TagType = await getTag(slug)
    const posts: PostType[] = await getPostsByTag(tag._id)

    return (
        <section className='space-y-6'>
            <div className="title2">#{tag.name} ({posts.length})</div>
            <Posts posts={posts} />
        </section>
    )
}
