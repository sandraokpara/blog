import { getPosts } from "@/lib/requests"
import Link from "next/link"

interface HeroProps {}

export const Hero = async ({}: HeroProps) => {
  const posts = await getPosts()

  return (
        <section className="">
{ posts && 
 posts.flatMap(post => <Link key={post.id} href={`/post/${post.slug}`}><p className="text-sm">{post?.title}</p></Link>)
 }
        </section>
  )
}
