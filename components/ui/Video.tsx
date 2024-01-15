import { FC } from "react"
import Image from "next/image"

interface VideoProps {
  src: string[]
  poster?: { sm: string; md: string }
  className?: string
  fallbackSrc: string
  title?: string
}

const Video: FC<VideoProps> = ({
  poster,
  fallbackSrc,
  title,
  className,
  src: [mp4Src, webmSrc, ogvSrc],
}) => {
  return (
    <>
      <video
        data-nosnippet
        loop
        muted
        autoPlay
        className={`${className} hidden object-contain object-center md:flex`}
        poster={poster?.sm}
      >
        <source src={`${mp4Src}`} type="video/mp4" />
        <source src={`${webmSrc}`} type="video/webm" />
        <source src={`${ogvSrc}`} type="video/ogg" />
      </video>
      <Image
        src={fallbackSrc}
        alt={title ?? ""}
        height={1000}
        width={1000}
        className="h-full w-full object-contain object-center md:hidden"
      />
    </>
  )
}

export default Video
