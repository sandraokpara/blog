"use client"

import { startTransition } from "react"
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

interface CreateCommentProps {
  slug: string
}

const CreateComment = ({ slug }: CreateCommentProps) => {
  const router = useRouter()
  const { loginToast } = useCustomToast()
  const { data: session } = useSession()
  const CommentValidator = z.object({
    slug: z.string(),
    text: z
      .string()
      .min(3, {
        message: "Comment must be at least 3 characters.",
      })
      .max(150, {
        message: "Comment must be less than 150 characters.",
      }),
    authorId: z.string(),
  })

  const form = useForm<z.infer<typeof CommentValidator>>({
    resolver: zodResolver(CommentValidator),
    defaultValues: {
      slug,
      text: "",
      authorId: session?.user?.id || "",
    },
  })

  const { mutate: postComment, isPending } = useMutation({
    mutationFn: async (payload: z.infer<typeof CommentValidator>) => {
      const { data } = await axios.patch(`/api/comments/post`, payload)
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

export default CreateComment
