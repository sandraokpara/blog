"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

import useComments from "../hooks/use-comments"
import { CommentType } from "../types/validators"
import Comment from "./Comment"
import Editor from "./CommentEditor"

interface CommentSectionProps {
  comments: CommentType[]
}

const CommentSection = ({ comments: initialComments }: CommentSectionProps) => {
  const { comments, setComments, deleteSelectedComment } = useComments({
    initialComments,
  })
  const [selectedCommentId, setSelectedCommentId] = useState("")
  const isEditing = selectedCommentId !== ""

  const pathname = usePathname()
  const postSlug = pathname.replace("/post/", "")

  const { data: session } = useSession()
  const blogUserEmail = session?.user?.email ?? ""
  const blogUserName = session?.user?.name

  return (
    <div className="custom-scrollbar space-y-4 py-1 pl-3 pr-6 text-sm">
      {!isEditing && (
        <Editor
          apiRoute="comments/create"
          formValues={{ postSlug, blogUserEmail, text: "" }}
        />
      )}
      {comments
        ?.filter((c) => c.id === selectedCommentId)
        .map((comment, index) => {
          return (
            <Editor
              key={index}
              apiRoute="comments/edit"
              formValues={{ commentId: comment.id, text: comment.text }}
              isEditing={isEditing}
              setSelectedCommentId={setSelectedCommentId}
            />
          )
        })}

      {comments
        ?.filter((c) => c.id !== selectedCommentId)
        .map((comment, index) => {
          const isSelectedCommentAuthor = comment.blogUser.name === blogUserName

          return (
            <Comment
              key={index}
              comments={comments}
              setComments={setComments}
              selectedComment={comment}
              isSelectedCommentAuthor={isSelectedCommentAuthor}
              deleteSelectedComment={deleteSelectedComment}
              setSelectedCommentId={setSelectedCommentId}
            />
          )
        })}
    </div>
  )
}

export default CommentSection
