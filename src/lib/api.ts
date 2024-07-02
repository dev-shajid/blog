import { client } from "@/../sanity/lib/client"

export async function getPosts({ start, end }: { start: number, end: number }) {
  const query = `
      *[_type=="post"] [${start}...${end}]{
        title,
        slug,
        image,
        tags[]->{
          _id, 
          slug,
          name,
        },
        publishedAt,
      }
    `
  const data = await client.fetch(query, {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every hour
      }
    }
  )
  return data
}

export async function getPostsCount() {
  const query = `
      count(*[_type=='post'])
    `
  const data = await client.fetch(query, {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every hour
      }
    }
  )

  return Number(data)
}

export async function getPostBySlug(slug: string) {
  const query = `
 *[_type=="post" && slug.current=='${slug}']{
        title,
        slug,
        image,
        tags[]->{
          _id, 
          slug,
          name,
        },
        body,
        publishedAt,
        }
    `
  const data = await client.fetch(query, { slug },
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every hour
      }
    }
  )
  // console.log({ data })
  return data[0]
}

export async function getPostsPerTagCount(tagId: string) {
  console.log(tagId)
  const query = `
      count(*[_type=='post' && references("${tagId}")])
    `
  const data = await client.fetch(query, {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every hour
      }
    }
  )

  return Number(data)
}

export async function getPostsByTag(
  tagId: string,
  { start, end }: { start: number, end: number }
) {
  console.log({ start, end })
  const query = `
 *[_type=="post" && references("${tagId}")] [${start}...${end}]{
        title,
        slug,
        image,
        tags[]->{
          _id, 
          slug,
          name,
        },
        body,
        publishedAt,
        }
    `
  const data = await client.fetch(query, {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every hour
      }
    })
  // console.log({ data })
  return data
}

export async function getTags() {
  const query = `
      *[_type=="tag"]{
        _id, 
        slug,
        name,
        "count":count(*[_type=='post' && references("tags", ^._id)])
        }
        `
  // "count":count(*[_type=='post' && references("tags"), ^._id])
  const data: TagType[] = await client.fetch(query, {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every hour
      }
    })
  return data
}

export async function getTag(tag: string) {
  const query = `
 *[_type=="tag" && slug.current=='${tag}']{
        _id, 
        slug,
        name,
      }
    `
  const data: TagType[] = await client.fetch(query, {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every hour
      }
    })
  return data[0]
}

export async function getSearch(slug: string) {
  const query = `
    *[_type in ['tag', 'post'] && 
      (
        title match '${slug}*'
        || slug.current match '${slug}*'
        // | order(_createdAt desc)
      )
      ]{
          _type,
          _createdAt,
          name,
          title,
          slug
      }
    `
  const data = await client.fetch(query, {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every hour
      }
    })

  const res: SearchResultType = {
    success: slug.length != 0 ? true : false,
    found: data.length != 0 ? true : false,
    tags: data.filter((e: TagType) => e._type == 'tag'),
    posts: data.filter((e: PostType) => e._type == 'post'),
  }
  return res
}

export type SearchResultType = {
  success: boolean
  found: boolean
  tags: TagType[]
  posts: PostType[]
}