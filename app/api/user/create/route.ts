import { z } from "zod"

import { CreateBlogUserRequestValidator } from "@/types/validators"
import { getAuthSession } from "@/lib/auth"
import {
  createNewBlogUser,
  getBlogUserByEmail,
  publishBlogUser,
} from "@/lib/requests"

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { email, name, username, image, isSubscribed } =
      CreateBlogUserRequestValidator.parse(body)

    const blogUserExists = await getBlogUserByEmail(email)

    if (blogUserExists) {
      return new Response("User already exists", { status: 400 })
    }

    const newBlogUser = await createNewBlogUser({
      name,
      email,
      username,
      image,
      isSubscribed,
    })
    await publishBlogUser({ email: newBlogUser?.email })

    return new Response(JSON.stringify(newBlogUser), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      "Could not create user at this time. Please try later",
      {
        status: 500,
      }
    )
  }
}
