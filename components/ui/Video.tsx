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
  src,
  poster,
  fallbackSrc,
  title,
  className,
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
        <source src={`${src}/sm.mp4`} type="video/mp4" />
        <source src={`${src}/sm.webm`} type="video/webm" />
        <source src={`${src}/sm.ogg`} type="video/ogg" />
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
