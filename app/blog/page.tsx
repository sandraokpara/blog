import React, { FC } from "react"

import FeaturedCarousel from "@/components/ui/FeaturedCarousel"
import { Grid } from "@/components/ui/Grid"


export const dynamic = "force-dynamic"

interface BlogPageProps {}

const BlogPage: FC<BlogPageProps> = ({}) => {
  return (
    <div>
      {/* @ts-expect-error */}
      <FeaturedCarousel />
      <div className="text-5xl">BLOG</div>
      {/* @ts-expect-error */}
      <Grid />
    </div>
  )
}

export default BlogPage
