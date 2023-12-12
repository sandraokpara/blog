"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

import { ToggleCommentsAndShare } from "../comments/CommentSection"
import Modal from "./Modal"

interface ModalProps {
  children: React.ReactNode
}

const CommentsModal = ({ children }: ModalProps) => {
  const pathname = usePathname()
  // console.log(pathname)
  const slug = pathname.replace("/post/", "")
  // console.log(slug)
  const isPostPage = pathname.startsWith("/post")
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!isPostPage) {
    return null
  }

  return (
    <>
      <ToggleCommentsAndShare
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {isModalOpen && (
        <Modal
          className="shadow-3xl max-w-3xl rounded-t-3xl border border-transparent bg-white dark:border-[#333333] dark:bg-black"
          toggleModal={() => setIsModalOpen(!isModalOpen)}
          bgBlur={true}
        >
          {children}
        </Modal>
      )}
    </>
  )
}

export default CommentsModal
