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
      className={`bebas-neue flex h-10 items-center justify-between px-6 text-center text-sm font-normal md:text-base`}
    >
      <p>&#169; {+year + ` ${title} • ALL RIGHTS RESERVED`}</p>
      <p>{wish}</p>
    </div>
  )
}

export default Footer
