import FeaturedCarousel from "@/components/ui/FeaturedCarousel"
import { Grid } from "@/components/ui/Grid"
import { getFeaturedPosts } from "@/lib/requests"


export const dynamic = "force-dynamic"

const BlogPage = async ({}) => {
  const featuredPosts = await getFeaturedPosts()

  return (
    <div>
      <FeaturedCarousel posts={featuredPosts} />
      {/* @ts-expect-error */}
      <Grid />
    </div>
  )
}

export default BlogPage
