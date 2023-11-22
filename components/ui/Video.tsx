import { FC } from "react"
// import Video from "next-video"

interface VideoProps {
  src: string
  poster?: { sm: string; md: string }
  className?: string
}

const HTMLVideo: FC<VideoProps> = ({ src, poster, className }) => {
  return (
    <video
      data-nosnippet
      loop
      muted
      autoPlay
      className={`${className} object-contain object-center`}
      poster={poster?.sm}
    >
      <source src={`${src}/sm.mp4`} type="video/mp4" />
      <source src={`${src}/sm.webm`} type="video/webm" />
      <source src={`${src}/sm.ogg`} type="video/ogg" />
    </video>
  )
}

const HTMLBackgroundVideo: FC<VideoProps> = ({ src, poster, className }) => {
  return (
    <div className="w-full h-full">
      <video
        data-nosnippet
        loop
        muted
        autoPlay
        className={`${className} object-cover object-center hidden md:flex`}
        poster={poster?.md}
      >
        <source src={`${src}/md.mp4`} type="video/mp4" />
        <source src={`${src}/md.webm`} type="video/webm" />
        <source src={`${src}/md.ogg`} type="video/ogg" />
      </video>
      <video
        data-nosnippet
        loop
        muted
        autoPlay
        className={`${className} object-cover object-center flex md:hidden`}
        poster={poster?.sm}
      >
        <source src={`${src}/sm.mp4`} type="video/mp4" />
        <source src={`${src}/sm.webm`} type="video/webm" />
        <source src={`${src}/sm.ogg`} type="video/ogg" />
      </video>
    </div>
  )
}
// const NextVideo: FC<VideoProps> = ({ src, poster, className }) => {
//   return (
//     <div className="w-full h-full">
//       <Video
//         data-nosnippet
//         loop
//         controls={false}
//         src={`${src}/sm.mp4`}
//         muted
//         autoPlay
//         className={`${className} object-cover object-center`}
//         poster={poster?.md}
//       />
//     </div>
//   )
// }

export { HTMLVideo, HTMLBackgroundVideo }
