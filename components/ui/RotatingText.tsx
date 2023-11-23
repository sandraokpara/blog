import Link from "next/link"

import styles from "@/styles/rotating-text.module.css"

interface TextProps {
  primary: string
  href: string
  index?: number
}

function Text({ primary, href, index }: TextProps) {
  return (
    <div className="flex">
      <span className="pt-3 font-medium">0{index}</span>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        className={`${styles.textContainer}`}
      >
        <p className={styles.primary}>{primary}</p>
        <p className={styles.secondary}>{primary}</p>
      </Link>
    </div>
  )
}

export default function RotatingText() {
  return (
    <div className={styles.body}>
      <Text
        primary="podcast"
        href="https://open.spotify.com/show/4LuvyMi6lg6HURDxXwDN6t"
        index={1}
      />
      <div className="flex items-center lg:justify-end">
        <Text primary="blog" href="/blog" index={2} />
      </div>
      <Text
        primary="gallery"
        href="https://www.instagram.com/sandyclopedia"
        index={3}
      />
    </div>
  )
}
