"use client"

import React, { FC } from "react"

import { siteConfig } from "@/config/site"
import { useDate } from "@/hooks/use-date"

const { title } = siteConfig

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const { year, wish } = useDate()
  return (
    <div
      className={`flex h-10 items-center justify-between px-6 text-center text-xs font-normal md:sm`}
    >
      <p>&#169; {+year + ` ${title} • All rights reserved`}</p>
      <p className="hidden md:flex">{wish}</p>
    </div>
  )
}

export default Footer
