import { getPostsByTag, getTag } from '@/lib/api'
import React from 'react'
import Posts from "@/components/Posts";
import Error from '@/app/error';

export default async function page({ params: { slug } }: { params: { slug: string } }) {
    const tag: TagType | null = await getTag(slug)

    if (!tag) return <Error error={{ message: "Requrested Tag does not exist!", name: 'tag_error' }} />

    const posts: PostType[] = await getPostsByTag(tag._id)

    return (
        <section className='space-y-6'>
            <div className="title2">#{tag.name} ({posts.length})</div>
            <Posts posts={posts} />
        </section>
    )
}
