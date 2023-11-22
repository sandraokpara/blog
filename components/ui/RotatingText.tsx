"use client"

import { useRef } from "react"

import styles from "@/styles/rotating-text.module.css"

interface TextProps {
  primary: string
  secondary: string
  className?: string
}

function Text({ primary, secondary, className }: TextProps) {
  const text1 = useRef(null)
  const text2 = useRef(null)

  return (
    <div className={`${styles.textContainer} ${className}`}>
      <p className={styles.primary} ref={text1}>
        {primary}
      </p>
      <p className={styles.secondary} ref={text2}>
        {secondary}
      </p>
    </div>
  )
}

export default function RotatingText() {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Text primary={"01 Blog"} secondary={"01 Blog"} />
        <Text className="align-end object-end justify-end" primary={"02 Podcast"} secondary={"02 Podcast"} />
        <Text primary={"03 Gallery"} secondary={"03 Gallery"} />
      </div>
    </div>
  )
}
