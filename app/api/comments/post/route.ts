import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PATCH(req: Request) {
  try {
    const CommentValidator = z.object({
      slug: z.string(),
      text: z.string(),
      authorId: z.string(),
    })
    const body = await req.json()

    const { slug, text, authorId } = CommentValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    await db.comment.create({
      data: {
        text,
        slug,
        userId: session.user.id,
        authorId,
      },
    })

    return new Response("OK")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data" + error.message, {
        status: 422,
      })
    }

    return new Response("Could not post data", { status: 500 })
  }
}
