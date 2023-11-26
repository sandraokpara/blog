import { Metadata } from "next"
import Image from "next/image"
import { RichText } from "@graphcms/rich-text-react-renderer"
import { siteConfig } from "@/config/site"
import { getPosts } from "@/lib/requests"
import { abyssinica } from "@/lib/fonts"

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPosts(params.slug)

  if (Array.isArray(post)) {
    return null
  }

  return (
    <article className="mt-16 md:mt-20 lg:mt-24 flex flex-col items-center">
      <div className="prose max-w-3xl">
        <section className="flex flex-col items-center space-y-8 text-center">
          <h1 className="font-light lg:font-thin text-3xl md:text-5xl lg:text-6xl">
            {post?.title}
          </h1>
          <h3 className="text-xs md:text-sm font-medium">{post?.date}</h3>
          <div className="h-[60svh] md:h-[70svh] lg:h-[80svh] w-full py-8">
            <Image
              src={post?.coverImage.url}
              alt={post?.title}
              height={1000}
              width={1000}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </section>

        <section className={abyssinica.className}>
          <RichText
            content={post?.content.raw}
            renderers={{
              p: ({ children }) => (
                <p className="text-sm md:text-base py-1">{children}</p>
              ),
              img: ({ src }) => (
                <div className="lg:h-[60svh] flex justify-start py-6">
                  {src && (
                    <Image
                      src={src}
                      alt="image"
                      height={1000}
                      width={1000}
                      className="h-full w-fit object-contain object-start"
                    />
                  )}
                </div>
              ),
            }}
          />
        </section>
      </div>
    </article>
  )
}

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  const { siteName, creator, url } = siteConfig
  const post = await getPosts(params.slug)

  if (Array.isArray(post)) {
    return {}
  }

  const title = post?.title
  const description = post?.excerpt
  const images = post?.coverImage.url

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
          url: images,
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
