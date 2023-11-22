import React from "react"

import { siteConfig } from "@/config/site"
import FeaturedWork from "@/components/ui/FeaturedWork"
import RotatingText from "@/components/ui/RotatingText"
import { HTMLBackgroundVideo, HTMLVideo } from "@/components/ui/Video"
import Image from "next/image"

const { videos, poster, title, username, excerpt, headline } = siteConfig

export const dynamic = "force-dynamic"

const HeroSection = () => (
  <section className="h-screen w-screen relative text-[#ddeeec]">
    <HTMLBackgroundVideo
      src={videos[0]}
      poster={poster}
      className="h-full w-full absolute"
    />
  </section>
)

const AntiHeroSection = () => (
  <section className="min-h-[100svh] grid grid-cols-1 lg:grid-cols-2">
    <div className="col-span-2 lg:col-span-1 flex flex-col items-end gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center">
        <div>
            <Image src="/round-purple.png" alt={title} width={1080} height={1080} className="h-[200px] w-[200px]" />
        </div>
        <div className="space-y-4">
          <h2 className="font-medium text-3xl">{username}</h2>
          <h4 className="font-normal uppercase text-base">{headline}</h4>
          <p className="text-sm">{excerpt}</p>
        </div>
      </div>
      <RotatingText />
    </div>
    <div className="col-span-2 lg:col-span-1 px-8 gap-5">
    <p className="flex justify-end"><span>fashion, art</span></p>
      <div className="h-[0svh] flex justify-center items-center">
        <HTMLVideo src={videos[0]} poster={poster} className="h-full" />
      </div>
      <p className=""><span>ecotourism, history</span></p>
    </div>
  </section>
)

export default function HomePage() {
  const isVideoQualityGoodEnough = false

  return (
    <div className="mt-24 lg:px-32">
      {isVideoQualityGoodEnough ? <HeroSection /> : <AntiHeroSection />}

      <section
        id="featured-work"
        className="min-h-screen flex justify-center items-center"
      >
        {/* @ts-expect-error */}
        <FeaturedWork />
      </section>
    </div>
  )
}
