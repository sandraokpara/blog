import React from "react"
import Link from "next/link"

import { getFeaturedPosts } from "@/lib/requests"

interface FeaturedCarouselProps {}

const FeaturedCarousel = async ({}: FeaturedCarouselProps) => {
  const posts = await getFeaturedPosts()

  return (
    <section className="">
      {posts &&
        posts.flatMap((post) => (
          <Link key={post.id} href={`/post/${post.slug}`}>
            <p className="text-sm">{post?.title}</p>
          </Link>
        ))}
    </section>
  )
}

export default FeaturedCarousel
