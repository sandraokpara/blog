import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { getBlogUserByEmail } from "@/lib/requests"

export async function GET(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const email = session?.user.email

    const blogUser = await getBlogUserByEmail(email)

    return new Response(JSON.stringify(blogUser), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response("Could not get user at this time. Please try later", {
      status: 500,
    })
  }
}
