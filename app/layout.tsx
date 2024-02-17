import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { GeistSans } from "@/lib/fonts"
import Newsletter from "@/components/ui/Newsletter"
import { CommentSection } from "@/components/ui/comments/CommentSection"
import CommentsModal from "@/components/ui/modals/CommentsModal"
import NewsletterModal from "@/components/ui/modals/NewsletterModal"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Providers from "@/components/layout/Providers"
import { Toaster } from "@/components/layout/Toaster"

const { description, title, images, siteName, creator, url } = siteConfig

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={GeistSans.className}>
          <Providers>
            <div className="relative flex min-h-[100svh] flex-col bg-background">
              {/* @ts-expect-error */}
              <Header />

              <div className="mt-24 px-6 md:mt-12 md:px-12 lg:mt-6 lg:px-32">
                {children}
              </div>

              <CommentsModal>
                <CommentSection />
              </CommentsModal>
              <Footer />

              <NewsletterModal>
                <Newsletter />
              </NewsletterModal>

              <Toaster />
            </div>
          </Providers>
        </body>
      </html>
    </>
  )
}

export const generateMetadata = async ({}): Promise<Metadata> => {
  return {
    metadataBase: new URL(url),
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
    robots: {
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
      },
    },
  }
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
}
