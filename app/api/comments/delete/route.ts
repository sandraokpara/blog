import {
  deleteCommentById,
  publishCommentById,
} from "@/features/comments/lib/requests"
import { DeleteCommentRequestValidator } from "@/features/comments/types/validators"
import { z } from "zod"

import { getAuthSession } from "@/lib/auth"

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const { commentId } = DeleteCommentRequestValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const deletedComment = await deleteCommentById({
      commentId,
    })

    await publishCommentById({
      id: deletedComment.id,
    })

    return new Response(JSON.stringify(deletedComment), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data" + error.message, {
        status: 422,
      })
    }

    return new Response(error + " Could not delete comment", { status: 500 })
  }
}
