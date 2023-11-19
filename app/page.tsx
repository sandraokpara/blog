import { Hero } from "@/components/Hero"
import BackgroundVideo from "@/components/ui/Video"

export const dynamic = "force-dynamic"

export default function HomePage() {
  return (
    <div className="w-full">
      <BackgroundVideo src="https://sandraokpara.sirv.com/blog/video" poster="https://sandraokpara.sirv.com/blog/image/green.jpg" className="w-screen h-screen" />
      <Hero />
    </div>
  )
}
