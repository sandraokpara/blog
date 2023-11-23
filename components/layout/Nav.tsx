"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { CategoriesType } from "@/types/validators"
import { blur, height, opacity, translate } from "@/lib/anim"
import styles from "@/styles/nav.module.scss"

interface NavProps {
  categories: CategoriesType[]
}

interface BodyProps {
  categories: CategoriesType[]
  selectedLink: { isActive: boolean; index: number }
  setSelectedLink: React.Dispatch<
    React.SetStateAction<{ isActive: boolean; index: number }>
  >
}

interface NavImageProps {
  src: string
  isActive: boolean
}

const Nav = ({ categories }: NavProps) => {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  })

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`${styles.nav} text-white`}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body
            categories={categories}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
          />
        </div>
        <NavImage
          src={categories[selectedLink.index]?.picture?.url}
          isActive={selectedLink.isActive}
        />
      </div>
    </motion.div>
  )
}

const Body: React.FC<BodyProps> = ({
  categories,
  selectedLink,
  setSelectedLink,
}) => {
  const getChars = (word: string) => {
    let chars: JSX.Element[] = []
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      )
    })
    return chars
  }

  return (
    <div className={styles.body}>
      {/* <Link className="" href={`/blog`}>
        <motion.p variants={blur}>{getChars("All")}</motion.p>
      </Link> */}
      {categories?.map((link, index) => {
        const { name, id } = link
        return (
          <Link key={`l_${index}`} href={`/blog/category/${id}`}>
            <motion.p
              onMouseOver={() => {
                setSelectedLink({ isActive: true, index })
              }}
              onMouseLeave={() => {
                setSelectedLink({ isActive: false, index })
              }}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(name)}
            </motion.p>
          </Link>
        )
      })}
    </div>
  )
}

const NavImage: React.FC<NavImageProps> = ({ src, isActive }) => (
  <motion.div
    variants={opacity}
    initial="initial"
    animate={isActive ? "open" : "closed"}
    className={styles.imageContainer}
  >
    <Image src={src} fill alt={"nav image"} />
  </motion.div>
)

export default Nav
