import Image from "next/image"
import Link from "next/link"

import { AllPostsType } from "@/types/validators"
import { abyssinica } from "@/lib/fonts"
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
    <section className="mt-12 lg:mt-0">
      {!isCategory ? (
        <h1 className="pb-4 text-center text-xs font-medium uppercase md:text-sm lg:text-start">
          All Posts
        </h1>
      ) : (
        <h1 className="lg:6xl pb-4 pt-6 text-center text-3xl font-medium uppercase md:pt-12 md:text-4xl lg:pt-20 lg:text-end">
          {posts[0]?.category?.name}
        </h1>
      )}
      <div className="border border-foreground p-4 dark:border-[#333333]">
        {chunkedPosts.map((chunk, index) => (
          <GridSection
            key={index}
            postsChunk={chunk}
            isLastSection={index === chunkedPosts.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

const GridSection = ({
  postsChunk,
  isLastSection,
}: GridSection & { isLastSection: boolean }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
      {postsChunk &&
        postsChunk.map((post, index) => {
          const className = getClassName(index)
          const isLastPost = isLastSection && index === postsChunk.length - 1

          return (
            <div
              key={post.id}
              className={`space-y-4 px-2 py-6 text-xs md:text-sm ${
                isLastPost ? "" : "border-b "
              } ${className} border-foreground dark:border-[#333333]`}
            >
              <div className="flex w-full justify-between font-medium uppercase">
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
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <p className="font-normal">
                    <span className="font-semibold">{post?.title}</span>
                    <span className={abyssinica.className}>
                      {" "}
                      - {truncateString(post?.excerpt, 100)}
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          )
        })}
    </div>
  )
}
