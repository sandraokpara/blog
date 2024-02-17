import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { getCategoryPosts } from "@/lib/requests"
import { Grid } from "@/components/ui/Grid"

interface CategoryPageProps {
  params: {
    categoryId: string
  }
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <section>
      {/* @ts-expect-error */}
      <Grid categoryId={params.categoryId} isCategory={true} />
    </section>
  )
}

export const generateMetadata = async ({params}: CategoryPageProps): Promise<Metadata> => {
  const { excerpt: description, siteName, creator, url } = siteConfig
  const posts = await getCategoryPosts(params.categoryId)
  const title = posts?.[0]?.category?.name
  const images = [posts?.[0]?.coverImage?.url, posts?.[1]?.coverImage?.url]

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
          url: images[0],
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
