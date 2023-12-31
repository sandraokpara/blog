"use client"

import { useEffect, useState } from "react"
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
  const isBlog = pathname === "/blog"
  const [show, handleShow] = useState(false)
  const headerBG =
    show && !isActive ? "dark:bg-[#00000080] bg-[#f7f5f5] bg-opacity-80" : ""

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true)
    } else {
      handleShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar)
    return () => window.removeEventListener("scroll", transitionNavBar)
  }, [])

  return (
    <header
      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
      className={`${
        styles.header
      } ${headerBG} top-0 z-40 w-full text-base tracking-tight placeholder:fixed lg:text-lg ${
        isActive ? "bg-black bg-opacity-50" : ""
      }
  
      `}
    >
      <div className={styles.bar}>
        {/* Title */}
        <Link href="/">{title}®</Link>

        {/* Katigoris */}
        {isBlog ? (
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
                {/* Katigoris */}
                Categories
              </motion.p>
              <motion.p
                variants={opacity}
                animate={isActive ? "open" : "closed"}
                className={` ${isActive ? "text-white" : ""}`}
              >
                Close
              </motion.p>
            </div>
          </div>
        ) : (
          <div className={styles.el}>
            <div className={styles.label}>
              {isActive ? (
                <motion.p
                  onClick={() => {
                    setIsActive(!isActive)
                  }}
                  variants={opacity}
                  animate={isActive ? "open" : "closed"}
                  className={` ${isActive ? "text-white" : ""}`}
                >
                  Close
                </motion.p>
              ) : (
                <motion.p>
                  <Link href="/blog">Blog</Link>
                </motion.p>
              )}
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
            {/* Let&apos;s talk */}
            Contact Me
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
