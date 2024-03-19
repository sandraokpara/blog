import { MoreVertical } from "lucide-react"

import { formatTimeToNow } from "@/lib/utils"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/common/DropDownMenu"
import UserAvatar from "../../../components/common/UserAvatar"
import { CommentType } from "../types/validators"

interface CommentProps {
  comments: CommentType[]
  setComments: (set: CommentType[]) => void
  selectedComment: CommentType
  isSelectedCommentAuthor: boolean
  deleteSelectedComment: ({ commentId }: { commentId: string }) => void
  setSelectedCommentId: (set: string) => void
}

const Comment = ({
  comments,
  setComments,
  selectedComment,
  isSelectedCommentAuthor,
  deleteSelectedComment,
  setSelectedCommentId,
}: CommentProps) => {
  return (
    <div className="w-full space-y-3 border-t py-8">
      <div className="flex items-center gap-2">
        <UserAvatar user={selectedComment.blogUser} />
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{selectedComment.blogUser.name}</h4>
            {isSelectedCommentAuthor && (
              <button className="flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="select-none outline-none focus:bg-transparent data-[state=open]:bg-transparent">
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onSelect={() => {
                        setSelectedCommentId(selectedComment.id)
                      }}
                      className="cursor-pointer"
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => {
                        setComments(
                          comments?.filter((c) => c.id !== selectedComment.id)
                        )
                        deleteSelectedComment({ commentId: selectedComment.id })
                      }}
                      className="cursor-pointer"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </button>
            )}
          </div>
          <h6 className="text-muted-foreground">
            {formatTimeToNow(new Date(selectedComment.createdAt))}
          </h6>
        </div>
      </div>
      <p className="px-1">{selectedComment.text}</p>
    </div>
  )
}

export default Comment
