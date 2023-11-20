import { siteConfig } from "@/config/site"
import { anticDidone } from "@/lib/fonts"
import { Grid } from "@/components/ui/Grid"
import BackgroundVideo from "@/components/ui/Video"

const { images, videos, title, description } = siteConfig

export const dynamic = "force-dynamic"

export default function HomePage() {
  return (
    <div className="w-full">

      <section className="h-screen w-screen relative text-[#ddeeec]">
        <BackgroundVideo
          src={videos[0]}
          poster={images[1]}
          className="h-full w-full absolute"
        />
        <div className="absolute z-[2] bottom-10 left-5 font-semibold">
          <div className={anticDidone.className}>
          <h2 className="text-6xl md:text-7xl drop-shadow-lg">{title}®</h2>
          <h2 className="text-4xl md:text-5xl mt-2 drop-shadow-lg">{description}</h2>
          </div>
        </div>
      </section>

      <section className="min-h-screen">

      </section>

      <section className="min-h-screen flex justify-center items-center">
        {/* @ts-expect-error */}
        <Grid />
      </section>

    </div>
  )
}
