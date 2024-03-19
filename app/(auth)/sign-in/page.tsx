import { siteConfig } from "@/config/site"
import SignInSection from "@/components/sections/SignInSection"

const { title } = siteConfig

export const metadata = {
  title,
  description: `Sign in to your ${title} account.`,
}

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

const SignInPage = () => {
  return (
    <section className="flex h-[70svh] flex-col items-center justify-center md:h-[80svh] lg:h-[90svh] xl:h-[100svh]">
      <SignInSection />
    </section>
  )
}

export default SignInPage
