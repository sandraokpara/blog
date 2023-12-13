"use client"

import { usePathname } from "next/navigation";
import Modal from "./Modal";
import { useState } from "react";

interface ModalProps {
    children: React.ReactNode
}

const NewsletterModal = ({ children }: ModalProps) => {
    const pathname = usePathname()
    const isPostPage = pathname.startsWith("/post")
    const [isModalOpen, setIsModalOpen] = useState(true)
  
    if (!isPostPage) {
      return null
    }
  
    return (
      isModalOpen && (
        <Modal
          className="border border-foreground bg-[#F9F9F9] dark:border-[#333333] dark:bg-black"
          toggleModal={() => setIsModalOpen(!isModalOpen)}
        >
          {children}
        </Modal>
      )
    )
  }

  export default NewsletterModal