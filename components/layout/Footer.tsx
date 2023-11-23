"use client"

import React, { FC } from "react"
import Link from "next/link"
import { LogIn } from "lucide-react"
import { useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { socialLinks } from "@/lib/social"
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
    <footer className="px-6">
      <div className="h-[50svh] text-center flex items-center justify-center">
        <div className="w-full md:max-w-[70%] lg:max-w-[50%]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-2">Lets get in touch.</h2>
          {socialLinks.map(({ name: title, url: href }) => (
            <Link
              href={href}
              key={title}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "link",
              })}
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`flex h-10 items-center justify-between text-center text-xs font-normal md:sm`}
      >
        <p>&#169; {+year + ` ${title} • All rights reserved`}</p>
        <p className="">
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
    </footer>
  )
}

export default Footer
