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

const getClassName = (index: number): string => {
  const classMappings = [
    "col-span-1 lg:col-span-2 lg:border-b-0",
    "col-span-1 lg:col-start-3 lg:border-b-0",
    "col-span-1 lg:col-start-4 lg:border-b-0",
    "col-span-1 lg:col-start-1 lg:border-y",
    "col-span-1 lg:col-start-2 lg:border-y",
    "col-span-1 lg:col-span-2 lg:col-start-3 lg:border-y",
  ]

  return classMappings[index] || ""
}

const GridSection = ({
  postsChunk,
  isLastSection,
}: GridSection & { isLastSection: boolean }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
      {postsChunk &&
        postsChunk.map((post, index) => {
          const className = getClassName(index)
          const isLastPost = isLastSection && index === postsChunk.length - 1

          return (
            <div
              key={post.id}
              className={`px-2 py-6 space-y-4 text-xs md:text-sm ${
                isLastPost ? "" : "border-b "
              } ${className} border-foreground dark:border-[#333333]`}
            >
              <div className="w-full flex justify-between uppercase font-medium">
                <Link href={`/blog/category/${post.category.id}`}>
                  <span>{post?.category.name}</span>
                </Link>
                <span>{post?.date}</span>
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

export const Grid = async ({ isCategory, categoryId }: GridProps) => {
  const posts = isCategory
    ? await getCategoryPosts(categoryId)
    : ((await getPosts()) as AllPostsType[])
  const chunkedPosts: AllPostsType[][] = posts.reduce<AllPostsType[][]>(
    (chunks, post, index) => {
      if (index % 6 === 0) {
        chunks.push([post])
      } else {
        chunks[chunks.length - 1].push(post)
      }
      return chunks
    },
    []
  )

  return (
    <section className="mt-12 lg:mt-0 border border-foreground dark:border-[#333333] p-4">
      {chunkedPosts.map((chunk, index) => (
        <GridSection
          key={index}
          postsChunk={chunk}
          isLastSection={index === chunkedPosts.length - 1}
        />
      ))}
    </section>
  )
}
