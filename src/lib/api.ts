import { client } from "@/../sanity/lib/client"

export const revalidate = 1000

export async function getPosts() {
  const query = `
      *[_type=="post"]{
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
  const data = await client.fetch(query)
  return data
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
  const data = await client.fetch(query)
  // console.log({ data })
  return data[0]
}

export async function getPostsByTag(tagId: string) {
  const query = `
 *[_type=="post" && references("${tagId}")]{
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
  const data = await client.fetch(query)
  // console.log({ data })
  return data
}

export async function getTags() {
  const query = `
 *[_type=="tag"]{
        _id, 
        slug,
        name,
        "count":count(*[_type=='post' && references("tags), ^._id])
      }
    `
  const data:TagType[] = await client.fetch(query)
  return data
}

export async function getTag(tag:string) {
  const query = `
 *[_type=="tag" && slug.current=='${tag}']{
        _id, 
        slug,
        name,
      }
    `
  const data:TagType[] = await client.fetch(query)
  return data[0]
}