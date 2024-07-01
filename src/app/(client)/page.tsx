
import { getPosts } from "@/lib/api";
import Posts from "@/components/Posts";

export default async function Home() {
  const posts: PostType[] = await getPosts()

  return (
    <>
      <Posts posts={posts} />
    </>
  );
}
