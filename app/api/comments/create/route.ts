import {
  createNewComment,
  publishCommentById,
} from "@/features/comments/lib/requests"
import { CreateCommentRequestValidator } from "@/features/comments/types/validators"
import { z } from "zod"

import { getAuthSession } from "@/lib/auth"

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const { postSlug, blogUserEmail, text } =
      CreateCommentRequestValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const newComment = await createNewComment({
      postSlug,
      blogUserEmail,
      text,
    })

    // console.log(newComment)

    await publishCommentById({
      id: newComment?.id,
    })

    return new Response(JSON.stringify(newComment), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      })
    }

    return new Response(error + " Could not create comment", { status: 500 })
  }
}
