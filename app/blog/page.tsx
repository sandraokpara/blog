import { siteConfig } from "@/config/site"
import { getFeaturedPosts } from "@/lib/requests"
import { Grid } from "@/components/common/Grid"
import FeaturedCarouselSection from "@/components/sections/FeaturedCarouselSection"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

const BlogPage = async ({}) => {
  const featuredPosts = await getFeaturedPosts()

  return (
    <div>
      <FeaturedCarouselSection posts={featuredPosts} />
      {/* @ts-expect-error */}
      <Grid />
    </div>
  )
}

export default BlogPage

export const generateMetadata = async ({}) => {
  const {
    title: blogName,
    excerpt: description,
    images,
    siteName,
    creator,
    url,
  } = siteConfig
  const title = `${blogName}'s Blog`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: images[3],
          width: 200,
          height: 200,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
      creator,
      images,
    },
  }
}
