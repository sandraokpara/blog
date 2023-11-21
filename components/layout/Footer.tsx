"use client"

import React, { FC } from "react"
import Link from "next/link"
import { LogIn } from "lucide-react"
import { useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { useDate } from "@/hooks/use-date"
import { buttonVariants } from "@/components/ui/Button"

import UserAuthNav from "../ui/UserAuthNav"
import { ThemeToggle } from "./ThemeToggle"

const { title } = siteConfig

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const { year } = useDate()
  const { data: session } = useSession()
  const stanqUser = session?.user

  return (
    <div
      className={`flex h-10 items-center justify-between px-6 text-center text-xs font-normal md:sm`}
    >
      <p>&#169; {+year + ` ${title} • All rights reserved`}</p>
      <p className="hidden md:flex">
        {stanqUser ? (
          <UserAuthNav gUser={stanqUser} />
        ) : (
          <Link href="/sign-in">
            <div
              className={buttonVariants({
                size: "icon",
                variant: "ghost",
              })}
            >
              <LogIn className="h-5 w-5" />
              <span className="sr-only">Sign In</span>
            </div>
          </Link>
        )}
        <ThemeToggle />
      </p>
    </div>
  )
}

export default Footer
