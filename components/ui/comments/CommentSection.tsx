"use client"

import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { MessageCircle, Share } from "lucide-react"
import { useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"

import { Input } from "../Input"
import UserAvatar from "../UserAvatar"
import CreateComment from "./CreateComment"

interface CommentSectionProps {}

interface ToggleCommentsAndShareProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const { title, email, images } = siteConfig

const comments = Array.from({ length: 10 }, (_, index) => ({
  text: `Comment ${
    index + 1
  }: My employer and other large employers in my region still conduct some traditional performance reviews. They do feature negative comments.`,
  author: {
    name: title,
    email: email,
    image: images[0],
  },
  date: "2 days ago",
  replies: [
    {
      text: "This is a reply",
      author: {
        name: "Reply Author",
        image: "https://i.pravatar.cc/300",
      },
      date: "2 days ago",
    },
  ],
}))

const CommentSection = ({}) => {
  const pathname = usePathname()
  const slug = pathname.replace("/post/", "")
  // const { data: session } = useSession();
  const { data, isPending } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/comments/get?slug=${slug}`)
      return data
    },
    queryKey: ["comments", slug],
  })

  console.log(data)

  return (
    <div
      id="comment-section"
      className="max-h-[70svh] space-y-4 overflow-auto py-1 pl-3 pr-6 text-sm"
    >
      <h1 className="text-xl font-medium">
        Responses ({comments?.length ?? 0})
      </h1>
      <CreateComment slug={slug} />
      <div className="pt-4">
        {comments.map((comment, index) => (
          <div className="space-y-3 border-t py-8" key={index}>
            <div className="flex items-center gap-3">
              <UserAvatar user={comment.author} />
              <div>
                <h4 className="font-medium">{comment.author.name}</h4>
                <h6 className="text-muted-foreground">{comment.date}</h6>
              </div>
            </div>
            <p className="">{comment.text}</p>
          </div>
        ))}
        c
      </div>
    </div>
  )
}

const ToggleCommentsAndShare = ({
  isModalOpen,
  setIsModalOpen,
}: ToggleCommentsAndShareProps) => {
  return (
    <div className="mt-9 flex w-fit items-center gap-6 px-6 text-sm  font-normal md:px-12 lg:mt-6 lg:px-64">
      <div
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="flex cursor-pointer items-center gap-1 opacity-70 hover:opacity-100"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={0.9} />
        <span className="mt-[0.9]">( 23 )</span>
      </div>
      <div className="flex cursor-pointer items-center gap-1 opacity-70 hover:opacity-100">
        <Share className="h-4 w-4" strokeWidth={0.9} />
        <span className="mt-[0.9]">( 64 )</span>
      </div>
    </div>
  )
}

export { CommentSection, ToggleCommentsAndShare }
