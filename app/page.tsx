import React from "react"
import Image from "next/image"

import { siteConfig } from "@/config/site"
import FeaturedWork from "@/components/ui/FeaturedWork"
import RotatingText from "@/components/ui/RotatingText"
import Video from "@/components/ui/Video"

const { videos, poster, title, excerpt, headline, images } = siteConfig

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function HomePage() {
  return (
    <div className="mt-24">
      <section className="grid grid-cols-1 space-y-32 lg:grid-cols-2 lg:space-y-0">
        <div className="col-span-2 flex flex-col items-end gap-8 space-y-16 lg:col-span-1 lg:space-y-0">
          <div className="grid grid-cols-1 place-items-center lg:grid-cols-2">
            <div>
              <Image
                src="/round-purple.png"
                alt={title}
                width={1080}
                height={1080}
                className="h-[200px] w-[200px]"
              />
            </div>
            <div className="space-y-4 text-center lg:text-start">
              <h2 className="text-2xl font-medium">{title}</h2>
              <h4 className="text-base font-normal uppercase">{headline}</h4>
              <p className="text-sm">{excerpt}</p>
            </div>
          </div>
          <RotatingText />
        </div>
        <div className="col-span-2 space-y-2 lg:col-span-1 lg:mr-16">
          <p className="flex justify-end text-sm">
            <span>ecotourism, history</span>
          </p>
          <div className="flex h-[70svh] items-center justify-center">
            <Video
              src={videos}
              poster={poster}
              fallbackSrc={images[4]}
              title={title}
              className="h-full lg:-ml-12"
            />
          </div>
          <p className="text-sm">
            <span>fashion, art</span>
          </p>
        </div>
      </section>

      {/* @ts-expect-error */}
      <FeaturedWork />
    </div>
  )
}
