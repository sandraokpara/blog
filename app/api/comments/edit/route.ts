import {
  publishCommentById,
  updateExistingComment,
} from "@/features/comments/lib/requests"
import { UpdateCommentRequestValidator } from "@/features/comments/types/validators"
import { z } from "zod"

import { getAuthSession } from "@/lib/auth"

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const { commentId, text } = UpdateCommentRequestValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const updatedComment = await updateExistingComment({
      commentId,
      text,
    })

    await publishCommentById({
      id: updatedComment.id,
    })

    return new Response(JSON.stringify(updatedComment), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data" + error.message, {
        status: 422,
      })
    }

    return new Response(error + " Could not edit comment", { status: 500 })
  }
}
