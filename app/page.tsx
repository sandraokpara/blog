import React from "react"

import { siteConfig } from "@/config/site"
import FeaturedWork from "@/components/ui/FeaturedWork"
import RotatingText from "@/components/ui/RotatingText"
import { HTMLBackgroundVideo, HTMLVideo } from "@/components/ui/Video"

const { videos, poster } = siteConfig

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
  <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    <div className="col-span-2 lg:col-span-1 flex flex-col justify-center">
      <div></div>
      <div>
        <RotatingText />
      </div>
    </div>
    <div className="col-span-2 lg:col-span-1">
      <div className="h-[31.25rem] flex justify-center items-center">
        <HTMLVideo src={videos[0]} poster={poster} className="h-full" />
      </div>
    </div>
  </section>
)

export default function HomePage() {
  const isVideoQualityGoodEnough = false

  return (
    <div className="mt-24 px-6">
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
