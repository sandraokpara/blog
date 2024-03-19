import Link from "next/link"

import { buttonVariants } from "@/components/common/Button"

import { toast } from "./use-toast"

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login required.",
      description: "You need to be logged in to do that",
      variant: "destructive",
      action: (
        <Link
          href="/sign-in"
          onClick={() => dismiss()}
          className={buttonVariants(false)({ variant: "outline" })}
        >
          Login
        </Link>
      ),
    })
  }

  return { loginToast }
}
