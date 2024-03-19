import { z } from "zod"

export const CommentValidator = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  post: z.object({
    id: z.string(),
  }),
  blogUser: z.object({
    id: z.string(),
    image: z.string(),
    name: z.string(),
  }),
})

export const CreateCommentRequestValidator = z.object({
  postSlug: z.string(),
  blogUserEmail: z.string().email(),
  text: z.string().min(3).max(500),
})

export const CreateCommentResponseValidator = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  post: z.object({
    id: z.string(),
  }),
  blogUser: z.object({
    id: z.string(),
  }),
})

export const UpdateCommentRequestValidator = z.object({
  commentId: z.string(),
  text: z.string().min(3).max(500),
})

export const UpdateCommentResponseValidator = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  post: z.object({
    id: z.string(),
  }),
  blogUser: z.object({
    id: z.string(),
  }),
})

export const DeleteCommentRequestValidator = z.object({
  commentId: z.string(),
})

export const DeleteCommentResponseValidator = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
})

export const PublishCommentRequestValidator = z.object({
  id: z.string(),
})

export const PublishCommentResponseValidator = z.object({
  id: z.string(),
})

export type CommentType = z.infer<typeof CommentValidator>
export type CreateCommentRequestType = z.infer<
  typeof CreateCommentRequestValidator
>
export type CreateCommentResponseType = z.infer<
  typeof CreateCommentResponseValidator
>
export type UpdateCommentRequestType = z.infer<
  typeof UpdateCommentRequestValidator
>
export type UpdateCommentResponseType = z.infer<
  typeof UpdateCommentResponseValidator
>
export type DeleteCommentRequestType = z.infer<
  typeof DeleteCommentRequestValidator
>
export type DeleteCommentResponseType = z.infer<
  typeof DeleteCommentResponseValidator
>
export type PublishCommentRequestType = z.infer<
  typeof PublishCommentRequestValidator
>
export type PublishCommentResponseType = z.infer<
  typeof PublishCommentResponseValidator
>
