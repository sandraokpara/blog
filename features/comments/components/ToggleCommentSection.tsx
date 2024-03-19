"use client"

import React, { FC, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { MessageCircle, Share, X } from "lucide-react"

import { siteConfig } from "@/config/site"
import { getRandomNumber } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

import { Button } from "../../../components/common/Button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../components/common/Drawer"
import { CommentType } from "../types/validators"
import CommentSection from "./CommentSection"

interface ToggleCommentSectionProps {
  comments: CommentType[]
}

const ToggleCommentSection: FC<ToggleCommentSectionProps> = ({ comments }) => {
  const randomShareCount = useMemo(() => getRandomNumber(), [])
  const pathname = usePathname()
  const { url } = siteConfig
  const sharePage = `${url}${pathname}`
  const handleSharePage = () => {
    navigator.clipboard.writeText(sharePage)
    toast({
      description: "Url successfully copied to clipboard.",
    })
  }

  return (
    <>
      <div className="flex h-fit items-center justify-center">
        <div className="mt-9 flex w-full max-w-3xl items-center gap-4 px-4 text-sm font-normal lg:px-0">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="flex cursor-pointer items-center gap-1 opacity-70 hover:opacity-100">
                <MessageCircle className="h-4 w-4" strokeWidth={0.9} />
                <span className="mt-[0.9]">( {comments?.length} )</span>
              </div>
            </DrawerTrigger>
            <DrawerContent className="">
              <DrawerHeader>
                <div className="flex items-center justify-between">
                  <DrawerTitle>
                    {comments?.length > 0
                      ? `Responses (${comments?.length})`
                      : "Be the first to post"}
                  </DrawerTitle>
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className="h-6 w-6 rounded-md p-0"
                      aria-label="close drawer"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerHeader>
              <CommentSection comments={comments} />
            </DrawerContent>
          </Drawer>
          <div
            onClick={handleSharePage}
            className="flex cursor-pointer items-center gap-1 opacity-70 hover:opacity-100"
          >
            <Share className="h-4 w-4" strokeWidth={0.9} />
            <span className="mt-[0.9]">( {randomShareCount} )</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ToggleCommentSection
