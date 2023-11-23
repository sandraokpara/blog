import Link from "next/link"

import { getCategoryPosts, getPosts } from "@/lib/requests"

interface GridProps {
  isCategory?: boolean
  categoryId?: string
}

export const Grid = async ({ isCategory, categoryId }: GridProps) => {
  let posts = []
  
  if (isCategory) {
    posts = await getCategoryPosts(categoryId)
  } else {
    posts = (await getPosts()) as any[]
  }

  return (
    <section className="">
      <div className="border border-foreground dark:border-[#333333]">
      {posts &&
        posts.flatMap((post) => (
          <div key={post.id}>
            <Link href={`/post/${post.slug}`}>
              <p className="text-sm">Name:{post?.title}</p>
            </Link>
            <Link href={`/blog/category/${post.category.id}`}>
              <p className="text-sm">Category:{post?.category.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
