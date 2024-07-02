
import { getPosts, getPostsCount } from "@/lib/api";
import Posts from "@/components/Posts";
import PaginationControls from "@/components/PaginationControls";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '10'

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page) // 5, 10, 15 ...

  const posts: PostType[] = await getPosts({ start, end })

  const total: number = await getPostsCount()

  return (
    <>
      <Posts posts={posts} />

      <PaginationControls
        hasNextPage={end < total}
        hasPrevPage={start > 0}
        per_page={per_page}
        total={total}
      />
    </>
  );
}
