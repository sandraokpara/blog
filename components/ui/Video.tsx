import { FC } from "react"

interface VideoProps {

}

const Video: FC<VideoProps> = ({ gUser }) => {
  return (
    <div
      className={}
    >
    
    </div>
  )
}

export default Video
 
 
 
<video data-nosnippet loop muted autoPlay className="h-screen w-screen object-cover object-center hidden md:flex" poster="BSCA_Logo.png">
        <source src={`${}/md.mp4`} type="video/mp4" />
        <source src={`${}/md.ogg`}  type="video/ogg" />
        <source src={`${}/md.webm`}  type="video/webm" />
    </video>