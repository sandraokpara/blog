import { Hero } from "@/components/Hero"
 
export const dynamic = "force-dynamic"

export default function HomePage() {
  return (
    <div className="w-full">
{/* md */}
      <video data-nosnippet src="https://sandraokpara.sirv.com/blog/video/md/1.mp4" loop muted autoPlay className="h-screen w-screen object-cover object-center hidden md:flex" />
      {/* sm */}
      <video data-nosnippet src="https://sandraokpara.sirv.com/blog/video/sm/1.mp4" loop muted autoPlay className="h-screen w-screen object-cover object-center flex md:hidden" />
      <Hero />
    </div>
  )
}
