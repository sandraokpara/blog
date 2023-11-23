import Image from "next/image"
import Link from "next/link"

import { AllPostsType } from "@/types/validators"
import { getCategoryPosts, getPosts } from "@/lib/requests"
import { truncateString } from "@/lib/utils"

interface GridProps {
  isCategory?: boolean
  categoryId?: string
}

interface GridSection {
  postsChunk: AllPostsType[]
}

export const Grid = async ({ isCategory, categoryId }: GridProps) => {
  let posts = []

  if (isCategory) {
    posts = await getCategoryPosts(categoryId)
  } else {
    posts = (await getPosts()) as any[]
  }

  const chunkedPosts = []
  if (posts.length > 0) {
    for (let i = 0; i < posts.length; i += 6) {
      chunkedPosts.push(posts.slice(i, i + 6))
    }
  }

  const GridSection = ({ postsChunk }: GridSection) => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
        {postsChunk &&
          postsChunk.map((post, index) => {
            let className = ""

            if (index === 0) {
              className = "col-span-1 lg:col-span-2"
            } else if (index === 1) {
              className = "col-span-1 lg:col-start-3"
            } else if (index === 2) {
              className = "col-span-1 lg:col-start-4"
            } else if (index === 3) {
              className = "col-span-1 lg:col-start-1 lg:border-y "
            } else if (index === 4) {
              className = "col-span-1 lg:col-start-2 lg:border-y]"
            } else if (index === 5) {
              className = "col-span-1 lg:col-span-2 lg:col-start-3 lg:border-y"
            }

            return (
              <div
                key={post.id}
                className={`${className} px-2 py-6 space-y-4 text-xs md:text-sm border-b border-foreground dark:border-[#333333]`}
              >
                <div className="w-full flex justify-between uppercase font-medium">
                  <Link href={`/blog/category/${post.category.id}`}>
                    <span className="">{post?.category.name}</span>
                  </Link>
                  <span className="">{post?.date}</span>
                </div>
                <div>
                  <Link href={`/post/${post.slug}`} className="space-y-4">
                    <div className="h-[70svh] w-full">
                      <Image
                        src={post?.coverImage.url}
                        alt={post?.title}
                        height={1000}
                        width={1000}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <p className="font-normal">
                      <span className="font-semibold">{post?.title}</span>
                      <span> - {truncateString(post?.excerpt, 100)}</span>
                    </p>
                  </Link>
                </div>
              </div>
            )
          })}
      </div>
    )
  }

  return (
    <section className="mt-12 lg:mt-0 border border-foreground dark:border-[#333333] p-4">
      {chunkedPosts.map((chunk, index) => (
        <GridSection key={index} postsChunk={chunk} />
      ))}
    </section>
  )
}
