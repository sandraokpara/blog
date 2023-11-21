"use client"

import { useRef } from "react"

import styles from "@/styles/rotating-text.module.css"

interface TextProps {
  primary: string
  secondary: string
}

function Text({ primary, secondary }: TextProps) {
  const text1 = useRef(null)
  const text2 = useRef(null)

  return (
    <div className={styles.textContainer}>
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
        <Text primary={"Turning"} secondary={"Turning"} />
        <Text primary={"Space"} secondary={"Space"} />
        <Text primary={"Into"} secondary={"Into"} />
      </div>
    </div>
  )
}
