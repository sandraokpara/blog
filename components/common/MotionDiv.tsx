"use client"

import React, { ReactNode } from "react"
import { Variants, motion } from "framer-motion"

interface MotionDivProps {
  children?: ReactNode
  className?: string
  variants?: Variants
  custom?: number
  initial?: string
  animate?: string
  exit?: string
}

const MotionDiv: React.FC<MotionDivProps> = ({
  children,
  className,
  variants,
  initial,
  animate,
  exit,
}) => {
  "use server"
  return (
    <motion.div
      className={className}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
    >
      {children}
    </motion.div>
  )
}

export default MotionDiv
