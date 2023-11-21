import { siteConfig } from "@/config/site"
import RotatingText from "@/components/ui/RotatingText"
import Video, { BackgroundVideo } from "@/components/ui/Video"
import FeaturedWork from "@/components/ui/FeaturedWork"

const { images, videos, title, description } = siteConfig

export const dynamic = "force-dynamic"

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero */}
      {/* <section className="h-screen w-screen relative text-[#ddeeec]">
        <BackgroundVideo
          src={videos[0]}
          poster={images[1]}
          className="h-full w-full absolute"
        />
      </section> */}

      {/* Anti Hero */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="col-span-2 lg:col-span-1">
          <div></div>
          <div>
            <RotatingText />
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Video src={videos[0]} poster={images[0]} className="" />
        </div>
      </section>

      <section className="min-h-screen flex justify-center items-center">
        {/* @ts-expect-error */}
        <FeaturedWork />
      </section>
    </div>
  )
}
