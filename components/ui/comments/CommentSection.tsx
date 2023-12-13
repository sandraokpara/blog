"use client"

import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { MessageCircle, Share } from "lucide-react"
import { siteConfig } from "@/config/site"
import { formatTimeToNow, getRandomNumber } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import UserAvatar from "../UserAvatar"
import CreateComment from "./CreateComment"

interface ToggleCommentsAndShareProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const { url } = siteConfig

const CommentSection = ({}) => {
  const pathname = usePathname()
  const slug = pathname.replace("/post/", "")

  const { data, isPending } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/comments/get?slug=${slug}`)
      return data as PostComments
    },
    queryKey: ["comments", slug],
  })

  let commentCount = 0

  if (!isPending && data?.comments?.length) {
    commentCount = data?.comments?.length
  }

  return (
    <div
      id="comment-section"
      className="max-h-[70svh] space-y-4 overflow-auto py-1 pl-3 pr-6 text-sm"
    >
      <h1 className="text-xl font-medium">Responses ({commentCount})</h1>
      <CreateComment slug={slug} />
      <div className="pt-4">
        {data?.comments?.map((comment, index) => (
          <div className="space-y-3 border-t py-8" key={index}>
            <div className="flex items-center gap-3">
              <UserAvatar user={comment.author} />
              <div>
                <h4 className="font-medium">{comment.author.name}</h4>
                <h6 className="text-muted-foreground">
                  {formatTimeToNow(new Date(comment.createdAt))}
                </h6>
              </div>
            </div>
            <p className="">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const ToggleCommentsAndShare = ({
  isModalOpen,
  setIsModalOpen,
}: ToggleCommentsAndShareProps) => {
  const pathname = usePathname()
  const slug = pathname.replace("/post/", "")
  const sharePage = `${url}${pathname}`

  const { data, isPending } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/comments/get?slug=${slug}`)
      return data
    },
    queryKey: ["comments-count", slug],
  })

  let commentCount = 0

  if (!isPending && data?.comments?.length) {
    commentCount = data?.comments?.length
  }

  const randomShareCount = getRandomNumber()

  const handleSharePage = () => {
    navigator.clipboard.writeText(sharePage)
    toast({
      description: "Url successfully copied to clipboard.",
    })
  }

  return (
    <div className="mt-9 flex w-fit items-center gap-6 px-6 text-sm  font-normal md:px-12 lg:mt-6 lg:px-64">
      <div
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="flex cursor-pointer items-center gap-1 opacity-70 hover:opacity-100"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={0.9} />
        <span className="mt-[0.9]">( {commentCount} )</span>
      </div>
      <div
        onClick={handleSharePage}
        className="flex cursor-pointer items-center gap-1 opacity-70 hover:opacity-100"
      >
        <Share className="h-4 w-4" strokeWidth={0.9} />
        <span className="mt-[0.9]">( {randomShareCount} )</span>
      </div>
    </div>
  )
}

export { CommentSection, ToggleCommentsAndShare }
