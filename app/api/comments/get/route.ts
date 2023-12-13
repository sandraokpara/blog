import { db } from "@/lib/db"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const slug = url.searchParams.get("slug")

  if (!slug) return new Response("Invalid comment", { status: 400 })

  try {
    const [commentResults] = await Promise.all([
      db.comment.findMany({
        where: {
          slug,
        },
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ])

    const results = {
      comments: commentResults,
    }

    return new Response(JSON.stringify(results))
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 })
  }
}
