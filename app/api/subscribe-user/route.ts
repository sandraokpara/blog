import { z } from "zod"

// import { NewsletterSubValidator } from "@/types/validators"

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const NewsletterSubValidator = z.object({
      email: z.string().email(),
    })
    const { email } = NewsletterSubValidator.parse(body)
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
    const API_KEY = process.env.MAILCHIMP_API_KEY
    const DATACENTER = process.env.MAILCHIMP_API_SERVER
    const data = {
      email_address: email,
      status: "subscribed",
    }

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,

      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    )

    return new Response(response.statusText, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response("Could not subscribe at this time. Please try later", {
      status: 500,
    })
  }
}
