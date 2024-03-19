import "@/styles/globals.css"
import { Metadata } from "next"
import Providers from "@/providers"

import { siteConfig } from "@/config/site"
import { GeistSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import LayoutClient from "@/components/layout/LayoutClient"

const { description, title, images, siteName, creator, url } = siteConfig

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            GeistSans.className,
            "relative flex min-h-[100svh] flex-col bg-background"
          )}
        >
          <Providers>
            {/* @ts-expect-error */}
            <Header />
            <LayoutClient>{children}</LayoutClient>
            <Footer />
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
