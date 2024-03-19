"use client"

import React, { FC } from "react"

import { siteConfig } from "@/config/site"
import useAuth from "@/hooks/use-auth"

import { Button } from "../common/Button"
import { Icons } from "../common/Icons"

interface SignInSectionProps {}

const SignInSection: FC<SignInSectionProps> = ({}) => {
  const { isLoading, loginWithGoogle } = useAuth()

  return (
    <section className="flex h-[65svh] w-full items-center justify-center">
      <div className="space-y-3 rounded-md border-[#333] p-7 text-center shadow dark:border md:p-8 lg:p-9 xl:p-10">
        <Icons.logo />
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in to {siteConfig.title}&apos;s blog
        </h1>
        <Button
          className="w-full"
          onClick={loginWithGoogle}
          isLoading={isLoading}
        >
          {!isLoading && <Icons.google className="mr-2 h-4 w-4" />}
          Google
        </Button>
      </div>
    </section>
  )
}

export default SignInSection
