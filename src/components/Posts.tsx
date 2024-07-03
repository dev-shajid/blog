import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import BlurImage from "./BlurImage";
import { Suspense } from "react";

export default function Posts({ posts }: { posts: PostType[] }) {
    return (
        <div className="posts grid gap-4 lg:gap-8 lg:grid-cols-3 sm:grid-cols-2">
            {
                posts.map((post, i) => (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Card key={i} className="space-y-3 rounded-md bg-[hsl(var(--card))]">
                            <div className="overflow-hidden dark:bg-gray-700 bg-gray-300 w-full aspect-video rounded-t-md anim">
                                <BlurImage
                                    src={urlForImage(post.image)}
                                    alt="Banner"
                                    className="w-full object-cover aspect-video rounded-t-md"
                                />
                            </div>
                            <div className="p-3 pt-0 grid md:gap-y-3 gap-y-2">
                                <div className="tags flex gap-2 items-center">
                                    {
                                        post.tags?.map((tag, i) => (
                                            <Link key={i} href={`/tags/${tag.slug.current}`}>
                                                <Badge key={i}>{tag?.name}</Badge>
                                            </Link>
                                        ))
                                    }
                                </div>
                                <Link href={`/posts/${post.slug.current}`} className="title2">
                                    {post.title}
                                </Link>
                                <div className='text-xs text-gray-500 font-medium'>{new Date(post.publishedAt).toDateString()}</div>
                            </div>
                        </Card>
                    </Suspense>
                ))
            }
        </div>
    )
}
