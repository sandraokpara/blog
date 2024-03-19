"use client"

import { useForm } from "react-hook-form"

import useAutoFocus from "@/hooks/use-auto-focus"

import { Button } from "../../../components/common/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../components/common/Form"
import { Textarea } from "../../../components/common/TextArea"
import useComments from "../hooks/use-comments"
import {
  CreateCommentRequestType,
  UpdateCommentRequestType,
} from "../types/validators"

interface CommentEditorSectionProps {
  apiRoute: string
  formValues: CreateCommentRequestType | UpdateCommentRequestType
  placeholder?: string | "What's on your mind?"
  isEditing?: boolean
  setSelectedCommentId?: (set: string) => void
}

const CommentEditor = ({
  apiRoute,
  formValues,
  placeholder,
  isEditing,
  setSelectedCommentId,
}: CommentEditorSectionProps) => {
  const form = useForm({
    defaultValues: formValues,
  })

  const { postSelectedComment, isPostingSelectedComment } = useComments({
    apiRoute,
    form,
  })

  const textAreaRef = useAutoFocus()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => postSelectedComment(e))}
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
                  placeholder={placeholder}
                  autoFocus
                  ref={textAreaRef}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2 pb-4">
          <Button
            isLoading={isPostingSelectedComment}
            isMagnetic={true}
            size="thin"
            type="submit"
          >
            Post
          </Button>
          {isEditing && setSelectedCommentId && (
            <Button
              isMagnetic={true}
              onClick={() => {
                setSelectedCommentId("")
              }}
              size="thin"
              type="submit"
              variant="outline"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}

export default CommentEditor
