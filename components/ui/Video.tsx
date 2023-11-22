import { FC } from "react"

interface VideoProps {
  src: string
  poster: string
  className?: string
}

const Video: FC<VideoProps> = ({ src, poster, className }) => {
  return (
    <div className="w-full h-full">
      <video
        data-nosnippet
        loop
        muted
        autoPlay
        className={`${className} object-cover object-center`}
        poster={poster}
      >
        <source src={`${src}/sm.webm`} type="video/webm" />
        <source src={`${src}/sm.mp4`} type="video/mp4" />
        <source src={`${src}/sm.ogg`} type="video/ogg" />
      </video>
    </div>
  )
}

const BackgroundVideo: FC<VideoProps> = ({ src, poster, className }) => {
  return (
    <div className="w-full h-full">
      <video
        data-nosnippet
        loop
        muted
        autoPlay
        className={`${className} object-cover object-center hidden md:flex`}
        poster={poster}
      >
        <source src={`${src}/md.webm`} type="video/webm" />
        <source src={`${src}/md.mp4`} type="video/mp4" />
        <source src={`${src}/md.ogg`} type="video/ogg" />
      </video>
      <video
        data-nosnippet
        loop
        muted
        autoPlay
        className={`${className} object-cover object-center flex md:hidden`}
        poster={poster}
      >
        <source src={`${src}/sm.webm`} type="video/webm" />
        <source src={`${src}/sm.mp4`} type="video/mp4" />
        <source src={`${src}/sm.ogg`} type="video/ogg" />
      </video>
    </div>
  )
}

export { BackgroundVideo }

export default Video
