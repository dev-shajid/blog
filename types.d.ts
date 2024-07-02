interface PostType {
    _type?:string
    title: string
    slug: { current: string }
    publishedAt: string
    tags: TagType[]
    body: any
    _id: string
    image: any
}

interface TagType {
    _type?:string
    name: string
    slug: { current: string }
    _id: string
    count?:number
}