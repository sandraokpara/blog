"use client"

import { FC, useEffect, useRef } from "react"
import { cva } from "class-variance-authority"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

import { transition } from "@/lib/anim"
import { cn } from "@/lib/utils"

import { Button } from "./Button"

interface DialogProps {
  children: React.ReactNode
  toggleDialog?: () => void
  className?: string
  variant: "popover" | "drawer"
}

export const dialogVariants = () => {
  const variant = {
    drawer:
      "shadow-3xl max-w-3xl rounded-t-3xl border border-transparent bg-white dark:border-[#333333] dark:bg-black",
    popover:
      "border border-foreground bg-[#F9F9F9] dark:border-[#333333] dark:bg-black",
  }

  return cva("fixed bottom-0 z-[99] min-h-[25svh] w-[100svw]", {
    variants: {
      variant,
    },
    defaultVariants: {
      variant: "drawer",
    },
  })
}

const Dialog: FC<DialogProps> = ({
  children,
  className,
  toggleDialog,
  variant,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const isDrawer = variant === "drawer"

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        toggleDialog && toggleDialog()
      }
    }

    if (isDrawer) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      if (isDrawer) {
        document.removeEventListener("click", handleClickOutside)
      }
    }
  }, [isDrawer, toggleDialog])

  const dialogElement = () => (
    <div
      id="dialog"
      ref={dialogRef}
      className={cn(dialogVariants()({ variant, className }))}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <Button
          onClick={toggleDialog}
          variant="ghost"
          className="absolute right-3 top-4 h-6 w-6 rounded-md p-0"
          aria-label="close dialog"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="relative mt-10 px-4 pb-6 md:px-8 lg:px-16 xl:px-32">
          {children}
        </div>
      </div>
    </div>
  )

  return (
    <AnimatePresence mode="wait">
      {isDrawer ? (
        <div
          key="drawer-overlay"
          className="inset bg-opacity/5 fixed z-50 h-screen w-screen bg-[#00000080]"
        >
          <motion.div
            initial={{ y: 800 }}
            animate={{ y: 0 }}
            exit={{ y: 800 }}
            transition={transition}
            className="h-screen w-screen lg:flex lg:justify-center"
          >
            {dialogElement()}
          </motion.div>
        </div>
      ) : (
        <motion.div
          key="popover-dialog"
          initial={{ y: 600 }}
          animate={{ y: 0 }}
          exit={{ y: 600 }}
          transition={transition}
        >
          {dialogElement()}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Dialog
