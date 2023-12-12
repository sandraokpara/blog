import { siteConfig } from "@/config/site"
import SignInFireWall from "@/components/auth/SignInFireWall"

const { title } = siteConfig

export const metadata = {
  title,
  description: `Sign in to your ${title} account.`,
}

const SignInPage = () => {
  return (
    <section className="flex h-[70svh] flex-col items-center justify-center md:h-[80svh] lg:h-[90svh] xl:h-[100svh]">
      <SignInFireWall />
    </section>
  )
}

export default SignInPage
