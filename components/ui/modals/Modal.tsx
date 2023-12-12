"use client"

import { FC } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

import { transition } from "@/lib/anim"

import { Button } from "../Button"

interface ModalProps {
  children: React.ReactNode
  toggleModal?: () => void
  className?: string
  bgBlur?: boolean
}

const Modal: FC<ModalProps> = ({
  children,
  className,
  toggleModal,
  bgBlur = false,
}) => {
  const modalElement = () => (
    <div
      className={`fixed bottom-0 z-[99] min-h-[25svh] w-[100svw] ${className}`}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <Button
          onClick={toggleModal}
          variant="ghost"
          className="absolute right-3 top-4 h-6 w-6 rounded-md p-0"
          aria-label="close modal"
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
      {bgBlur ? (
        <div className="inset bg-opacity/5 fixed z-50 h-screen w-screen bg-[#00000080]">
          <motion.div
            initial={{ y: 800 }}
            animate={{ y: 0 }}
            exit={{ y: 800 }}
            transition={transition}
            className="h-screen w-screen lg:flex lg:justify-center"
          >
            {modalElement()}
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 600 }}
          animate={{ y: 0 }}
          exit={{ y: 600 }}
          transition={transition}
        >
          {modalElement()}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
