import { getPostsByTag, getPostsPerTagCount, getTag } from '@/lib/api'
import React from 'react'
import Posts from "@/components/Posts";
import Error from '@/app/(client)/error';
import { Separator } from '@/components/ui/separator';
import PaginationControls from '@/components/PaginationControls';

export default async function PostsByTag({
    searchParams,
    params: { slug },
}: {
    searchParams: { [key: string]: string | string[] | undefined },
    params: { slug: string },
}) {
    const tag: TagType | null = await getTag(slug)

    if (!tag) return <Error error={{ message: "Requrested Tag does not exist!", name: 'tag_error' }} />

    const page = searchParams['page'] ?? '1'
    const per_page = searchParams['per_page'] ?? '10'

    // mocked, skipped and limited in the real app
    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
    const end = start + Number(per_page) // 5, 10, 15 ...

    const posts: PostType[] = await getPostsByTag(tag._id, { start, end })

    const total: number = await getPostsPerTagCount(tag._id)

    return (
        <section className='space-y-6'>
            <div className="title2">#{tag.name} ({total})</div>
            <Separator />
            <Posts posts={posts} />


            <PaginationControls
                hasNextPage={end < total}
                hasPrevPage={start > 0}
                per_page={per_page}
                total={total}
            />
        </section>
    )
}