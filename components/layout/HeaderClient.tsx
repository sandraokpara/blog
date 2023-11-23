"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

import { CategoriesType } from "@/types/validators"
import { siteConfig } from "@/config/site"
import { background, opacity } from "@/lib/anim"
import styles from "@/styles/header.module.scss"

import Nav from "./Nav"

interface HeaderClientProps {
  categories: CategoriesType[]
}

const HeaderClient = ({ categories }: HeaderClientProps) => {
  const [isActive, setIsActive] = useState(false)
  const { title } = siteConfig
  const pathname = usePathname()
  const isBlog = pathname?.startsWith("/blog")

  return (
    <header
      className={`${
        styles.header
      } text-base lg:text-lg tracking-tight absolute lg:fixed top-0 z-40 w-full ${
        isActive ? "bg-black bg-opacity-50" : ""
      }`}
    >
      <div className={styles.bar}>
        {/* Title */}
        <Link href="/">{title}®</Link>

        {/* Katigoris */}
        {isBlog && (
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
              <motion.p
                variants={opacity}
                animate={isActive ? "open" : "closed"}
              >
                Close
              </motion.p>
            </div>
          </div>
        )}
        <motion.div
          variants={opacity}
          animate={!isActive ? "open" : "closed"}
          className={`${styles.shopContainer} hidden md:flex`}
        >
          <a
            href="mailto:sandraokpara@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex"
          >
            Let&apos;s talk
          </a>
        </motion.div>
      </div>

      {/* Background */}
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={styles.background}
      ></motion.div>

      {/* Nav */}
      <AnimatePresence mode="wait">
        {isActive && categories && <Nav categories={categories} />}
      </AnimatePresence>
    </header>
  )
}

export default HeaderClient
