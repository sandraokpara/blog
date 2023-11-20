"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { background, opacity } from "@/lib/anim"
import styles from "@/styles/header.module.scss"
import Nav from "./Nav"

export function Header() {
  const [isActive, setIsActive] = useState(false)
  const { title } = siteConfig

  return (
    <header
      className={`${
        styles.header
      } text-base md:text-lg tracking-tight fixed top-0 z-40 w-full ${
        isActive ? "bg-black bg-opacity-50" : ""
      }`}
    >
      <div className={styles.bar}>
        <Link href="/">{title}®</Link>
        <div
          onClick={() => {
            setIsActive(!isActive)
          }}
          className={styles.el}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
          <div className={styles.label}>
            <motion.p
              variants={opacity}
              animate={!isActive ? "open" : "closed"}
            >
              Katigoris
            </motion.p>
            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>
              Close
            </motion.p>
          </div>
        </div>
        <motion.div
          variants={opacity}
          animate={!isActive ? "open" : "closed"}
          className={styles.shopContainer}
        >
          {/* <a
            href="mailto:sandraokpara@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex"
          > */}
          Let&apos;s talk
          {/* </a> */}
        </motion.div>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={styles.background}
      ></motion.div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </header>
  )
}
