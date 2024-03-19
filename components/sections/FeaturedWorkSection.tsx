import { getFeaturedPosts } from "@/lib/requests"

import Work from "../common/Work"

const FeaturedWorkSection = async () => {
  const posts = await getFeaturedPosts()

  return (
    <section className="pt-32 md:pt-16 lg:pt-6">
      <p className="px-0 pb-4 text-xs font-medium uppercase md:text-sm lg:px-16">
        Featured Posts
      </p>
      {posts && posts.map((post) => <Work key={post.id} post={post} />)}
      <hr className="border-t border-foreground dark:border-[#333333]" />
    </section>
  )
}

export default FeaturedWorkSection
