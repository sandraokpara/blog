"use client"

import React, { FC } from "react"
import { usePathname } from "next/navigation"

import useSubscription from "@/hooks/use-subscription"

import SubscriptionPopover from "./SubscriptionPopover"
import { Toaster } from "./Toaster"

interface LayoutClientProps {
  children: React.ReactNode
}

const LayoutClient: FC<LayoutClientProps> = ({ children }) => {
  const pathname = usePathname()
  const isPostPage = pathname.startsWith("/post")
  const { isUserSubscribed } = useSubscription()

  return (
    <div className="">
      <div
        className={
          isPostPage ? "" : `mt-24 px-6 md:mt-12 md:px-12 lg:mt-6 lg:px-32`
        }
      >
        {children}
      </div>
      {isPostPage && !isUserSubscribed && <SubscriptionPopover />}
      <Toaster />
    </div>
  )
}

export default LayoutClient
