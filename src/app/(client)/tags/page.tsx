import { getTags } from '@/lib/api'
import React from 'react'
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default async function page({ params: { slug } }: { params: { slug: string } }) {
    const tags: TagType[] | null = await getTags()

    // if (!tags) return <Error error={{ message: "Requrested Tag does not exist!", name: 'tag_error' }} />

    return (
        <section className='space-y-6'>
            <div className="title2">Tags ({tags.length})</div>
            <div className='flex flex-wrap gap-6'>
                {
                    tags.map((tag, i) => (
                        <Link key={i} href={`/tags/${tag.slug.current}`}>
                            <Badge className="text-base rounded-sm">#{tag.name} ({tag.count})</Badge>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}
