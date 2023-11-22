"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { FeaturedPostsType } from "@/types/validators"
import { splitTitle } from "@/lib/utils"
import styles from "@/styles/featured-work.module.css"

const anim = {
  initial: { width: 0 },

  open: {
    width: "auto",
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },

  closed: { width: 0 },
}

interface WorkProps {
  post: FeaturedPostsType
}

const Work: React.FC<WorkProps> = ({ post }) => {
  const [isActive, setIsActive] = useState(false)
  const { title1, title2 } = splitTitle(post.title)

  return (
    <Link key={post.id} href={`/post/${post.slug}`}>
      <div
        onMouseEnter={() => {
          setIsActive(true)
        }}
        onMouseLeave={() => {
          setIsActive(false)
        }}
        className={styles.project}
      >
        <p>{title1}</p>
        <motion.div
          variants={anim}
          animate={isActive ? "open" : "closed"}
          className={styles.imgContainer}
        >
          <Image
            src={post.coverImage.url}
            alt={post.title}
            height={1000}
            width={1000}
          />
        </motion.div>
        <p>{title2}</p>
      </div>
    </Link>
  )
}

export default Work
