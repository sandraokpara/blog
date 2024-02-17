import { Metadata } from "next"
import Image from "next/image"
import { RichText } from "@graphcms/rich-text-react-renderer"
import { siteConfig } from "@/config/site"
import { abyssinica } from "@/lib/fonts"
import { getPosts } from "@/lib/requests"

interface PostPageProps {
  params: {
    slug: string
  }
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPosts(params.slug)

  if (Array.isArray(post)) {
    return null
  }

  return (
    <>
      <article className="mt-16 flex flex-col items-center md:mt-20 lg:mt-24">
        <div className="prose max-w-3xl">
          <section className="flex flex-col items-center space-y-8 text-center">
            <h1 className="text-3xl font-light md:text-5xl lg:text-6xl lg:font-thin">
              {post?.title}
            </h1>
            <h3 className="text-xs font-medium md:text-sm">{post?.date}</h3>
            <div className="h-[60svh] w-full py-8 md:h-[70svh] lg:h-[80svh]">
              <Image
                src={post?.coverImage.url}
                alt={post?.title}
                height={1000}
                width={1000}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </section>

          <section className={abyssinica.className}>
            <RichText
              content={post?.content.raw}
              renderers={{
                p: ({ children }) => (
                  <p className="py-1 text-sm md:text-base">{children}</p>
                ),
                img: ({ src }) => (
                  <div className="flex justify-start py-6 lg:h-[60svh]">
                    {src && (
                      <Image
                        src={src}
                        alt="image"
                        height={1000}
                        width={1000}
                        className="object-start h-full w-fit object-contain"
                      />
                    )}
                  </div>
                ),
              }}
            />
          </section>
        </div>
      </article>
    </>
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
