"use client"

import { Dispatch, SetStateAction, startTransition, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useCustomToast } from "@/hooks/use-custom-toast"
import { toast } from "@/hooks/use-toast"

import { Button } from "../Button"
import { Form, FormControl, FormField, FormItem } from "../Form"
import { Textarea } from "../Textarea"
import { CreateCommentRequestValidator, UpdateCommentRequestValidator } from "@/types/validators"

interface CommentEditorProps {
  postSlug: string
  commentText?: string
  commentId?: string
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const CommentEditor = ({ postSlug, commentText, isEditing, setIsEditing, commentId }: CommentEditorProps) => {
  const router = useRouter()
  const apiRoute = isEditing ? "edit" : "create"
  const { loginToast } = useCustomToast()
  const { data: session } = useSession()

  const creatingForm = useForm<z.infer<typeof CreateCommentRequestValidator>>({
    resolver: zodResolver(CreateCommentRequestValidator),
    defaultValues: {
text: commentText ?? "",
blogUserEmail: session?.user?.email ?? "",
postSlug,
    },
  })

  const editingForm = useForm<z.infer<typeof UpdateCommentRequestValidator>>({
    resolver: zodResolver(UpdateCommentRequestValidator),
    defaultValues: {
text: commentText ?? "",
commentId: commentId ?? "",
    },
  })

  const [form, setForm] = useState(creatingForm)

  const { mutate: postComment, isPending } = useMutation({
    mutationFn: async (payload: z.infer<typeof CreateCommentRequestValidator>) => {
      const { data } = await axios.patch(`/api/comments/${apiRoute}`, payload)
      return data
    },
    onError: (err) => {
      console.log(err)
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }
      return toast({
        title: "Something went wrong.",
        description:
          "There was an error posting your comment. Try again later.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      startTransition(() => {
        toast({
          description: "Your comment was posted!",
        })
        if (isEditing) {
          setIsEditing(false)
        }
        router.refresh()
      })
    },
  })

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => postComment(e))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={1}
                    className="h-5 border border-transparent shadow-md placeholder:text-background dark:border-[#333333]"
                    placeholder="What's on your mind?"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            isLoading={isPending}
            isMagnetic={true}
            size="thin"
            type="submit"
          >
            Post
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CommentEditor
