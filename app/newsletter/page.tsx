import React, { FC } from "react"

import Newsletter from "@/components/ui/Newsletter"

interface NewsletterPageProps {}

const NewsletterPage: FC<NewsletterPageProps> = ({}) => {
  return (
    <section className="flex h-[70svh] flex-col items-center justify-center md:h-[80svh] lg:h-[90svh] xl:h-[100svh]">
      <Newsletter />
    </section>
  )
}

export default NewsletterPage
