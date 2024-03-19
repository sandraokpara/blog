import { startTransition, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { UseFormReturn } from "react-hook-form"

import { useCustomToast } from "@/hooks/use-custom-toast"
import { toast } from "@/hooks/use-toast"

import {
  CommentType,
  CreateCommentRequestType,
  DeleteCommentRequestType,
  UpdateCommentRequestType,
} from "../types/validators"

interface useCommentsProps {
  initialComments?: CommentType[]
  apiRoute?: string
  form?: UseFormReturn<
    {
      postSlug: string
      blogUserEmail: string
      text: string
    },
    any,
    undefined
  >
}

const useComments = ({ initialComments, form, apiRoute }: useCommentsProps) => {
  const [comments, setComments] = useState(initialComments)
  const router = useRouter()
  const { loginToast } = useCustomToast()

  const { mutate: postSelectedComment, isPending: isPostingSelectedComment } =
    useMutation({
      mutationFn: async (
        payload: CreateCommentRequestType | UpdateCommentRequestType
      ) => {
        const { data } = await axios.patch(`/api/${apiRoute}`, payload)
        return data
      },
      onError: (err) => {
        setComments(initialComments)
        console.log(err)
        form?.clearErrors()
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            return loginToast()
          }
        }
        if (err.message.includes("422")) {
          return toast({
            title: "Invalid request.",
            description: "Comments must be between 3 and 500 characters.",
            variant: "destructive",
          })
        }
        return toast({
          title: "Something went wrong.",
          description: "Please try again later.",
          variant: "destructive",
        })
      },
      onSuccess: () => {
        form?.reset()
        startTransition(() => {
          toast({
            description: "Successfully posted!",
          })
          router.refresh()
        })
      },
    })

  const { mutate: deleteSelectedComment } = useMutation({
    mutationFn: async ({ commentId }: DeleteCommentRequestType) => {
      const payload: DeleteCommentRequestType = {
        commentId,
      }
      const { data } = await axios.patch(`/api/comments/delete`, payload)
      return data
    },
    onError: (err) => {
      console.log(err)
      setComments(initialComments)
      toast({
        description: "Error deleting comment. Try again later.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      startTransition(() => {
        toast({
          description: "Comment deleted.",
        })
        router.refresh()
      })
    },
  })

  return {
    comments,
    setComments,
    postSelectedComment,
    isPostingSelectedComment,
    deleteSelectedComment,
  }
}

export default useComments
