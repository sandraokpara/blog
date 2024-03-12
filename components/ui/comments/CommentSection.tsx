"use client"

import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { MessageCircle, Share } from "lucide-react"

import { PostComments } from "@/types/comments"
import { siteConfig } from "@/config/site"
import { formatTimeToNow, getRandomNumber } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

import UserAvatar from "../UserAvatar"
import CommentEditor from "./CommentEditor"
import { useState } from "react"

const { url } = siteConfig

const CommentSection = ({}) => {
  const [isEditing, setIsEditing] = useState(false)
  const pathname = usePathname()
  const slug = pathname.replace("/post/", "")

  const { data, isPending } = useQuery({
    queryFn: async () => {
      const { data } = await getComments()
      return data
    }
,
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
      <h1 className="text-xl font-medium">
        {commentCount > 0
          ? `Responses (${commentCount})`
          : "Be the first to post"}
      </h1>
      <CommentEditor postSlug={slug} commentId={selectedCommentId} commentText={selectedCommentText} isEditing={isEditing} setIsEditing={setIsEditing} />
      <div className="min-w-[80svw] pt-4 lg:min-w-[45svw]">
        {data?.comments?.map((comment, index) => (
          !isEditing && ( <div className="space-y-3 border-t py-8" key={index}>
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
          </div>)
        ))}
      </div>
    </div>
  )
}
interface ToggleCommentsAndShareProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
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
    <div className="flex h-fit items-center justify-center">
      <div className="mt-9 flex w-full max-w-3xl items-center gap-6 px-4 text-sm font-normal lg:px-0">
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
    </div>
  )
}

export { CommentSection, ToggleCommentsAndShare }
