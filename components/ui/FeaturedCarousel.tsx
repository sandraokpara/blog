"use client"

import Link from "next/link"
import { Carousel } from "react-responsive-carousel"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import Image from "next/image"

import { FeaturedPostsType } from "@/types/validators"

interface FeaturedCarouselProps {
  posts: FeaturedPostsType[]
}

const FeaturedCarousel = ({ posts }: FeaturedCarouselProps) => {
  return (
    <section className="my-1 md:my-4 lg:my-16 min-h-[50svh] space-y-4">
      <h1 className="text-xs md:text-sm uppercase font-medium">Featured Posts</h1>
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
            <div className="w-full lg:grid grid-cols-1 lg:grid-cols-2 place-items-center relative">
              <div className="absolute lg:relative h-[60svh] space-y-4 flex flex-col justify-center items-center text-start">
                <p className="w-[75%] lg:w-full lg:font-thin text-3xl md:text-4xl lg:text-5xl">
                  {post?.title}
                </p>
                <p className="w-[75%] lg:w-full font-normal text-xs md:text-sm lg:text-base">
                  {post?.excerpt}
                </p>
              </div>
              <div className="h-[60svh] flex justify-center items-center">
                <Image
                  src={post.coverImage.url}
                  alt={post.title}
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover lg:object-contain object-center"
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
