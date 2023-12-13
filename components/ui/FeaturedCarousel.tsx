/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/classnames-order */
"use client"

import Link from "next/link"
import { Carousel } from "react-responsive-carousel"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import Image from "next/image"

import { FeaturedPostsType } from "@/types/validators"
import { abyssinica } from "@/lib/fonts"
import { truncateString } from "@/lib/utils"

interface FeaturedCarouselProps {
  posts: FeaturedPostsType[]
}

const FeaturedCarousel = ({ posts }: FeaturedCarouselProps) => {
  return (
    <section className="my-1 min-h-[50svh] space-y-4 md:my-4 lg:my-16">
      <h1 className="text-center text-xs font-medium uppercase md:text-sm lg:text-start">
        Featured Posts
      </h1>
      <Carousel
        showIndicators={true}
        infiniteLoop={true}
        className="flex items-center justify-center border border-foreground dark:border-[#333333] lg:p-9"
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        transitionTime={1500}
        autoPlay={true}
        axis="horizontal"
        interval={5000}
        stopOnHover={true}
      >
        {posts.flatMap((post) => (
          <Link key={post.id} href={`/post/${post.slug}`} className="">
            <div className="relative w-full grid-cols-1 place-items-center lg:grid lg:grid-cols-2">
              <div className="bg-opacity-20 absolute flex h-[60svh] flex-col items-center justify-end space-y-4 bg-[#f7f5f5] text-start dark:bg-[#00000080] lg:relative lg:justify-center lg:bg-transparent lg:dark:bg-transparent">
                <p className="w-[75%] text-2xl md:text-4xl lg:w-full lg:text-5xl lg:font-thin">
                  {post?.title}
                </p>
                <p className="w-[75%] pb-12 text-xs font-normal md:text-sm lg:w-full lg:pb-1 lg:text-base">
                  <span className={""}>
                    {truncateString(post?.excerpt, 150)}
                  </span>
                </p>
              </div>
              <div className="flex h-[60svh] items-center justify-center">
                <Image
                  src={post.coverImage.url}
                  alt={post.title}
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover object-center lg:object-contain"
                />
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </section>
  )
}

export default FeaturedCarousel
