import BackgroundVideo from "@/components/ui/Video"
import { Grid } from "@/components/ui/Grid"
import { siteConfig } from "@/config/site"

const {images, videos} = siteConfig

export const dynamic = "force-dynamic"

export default function HomePage() {
  return (
    <div className="w-full">
      <BackgroundVideo
        src={videos[0]}
        poster={images[1]}
        className="w-screen h-screen"
      />
      {/* @ts-expect-error */}
      <Grid />
    </div>
  )
}
