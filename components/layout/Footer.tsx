"use client"

import React, { FC } from "react"
import Link from "next/link"
import { LogIn } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { socialLinks } from "@/lib/social"
import { useDate } from "@/hooks/use-date"
import { buttonVariants } from "@/components/common/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/DropDownMenu"

import UserAvatar from "../common/UserAvatar"
import { ThemeToggle } from "./ThemeToggle"

const { title } = siteConfig

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const { year } = useDate()
  const { data: session } = useSession()
  const stanqUser = session?.user
  const isMagnetic = false

  return (
    <footer className="md:px-4.5 lg:px-5.5 px-3.5">
      <div className="flex h-[50svh] items-center justify-center text-center">
        <div className="w-full md:max-w-[70%] lg:max-w-[50%]">
          <h2 className="mb-2 text-4xl font-normal md:text-5xl lg:text-6xl">
            Lets get in touch.
          </h2>
          {socialLinks.map(({ name: title, url: href }) => (
            <Link
              href={href}
              key={title}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants(isMagnetic)({
                variant: "link",
              })}
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`flex h-10 items-center justify-between text-center text-xs font-normal`}
      >
        <p>&#169; {+year + ` ${title} • All rights reserved`}</p>
        <p className="i-no-go-hide-you-ke">
          {stanqUser ? (
            <div
              className={buttonVariants(isMagnetic)({
                size: "icon",
                variant: "ghost",
              })}
            >
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserAvatar
                    className="h-5 w-5"
                    user={{
                      name: stanqUser?.name || null,
                      image: stanqUser?.image || null,
                    }}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onSelect={() => {
                      signOut()
                    }}
                    className="cursor-pointer"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/sign-in">
              <div
                className={buttonVariants(isMagnetic)({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <LogIn className="h-4 w-4 lg:h-5 lg:w-5" />
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
