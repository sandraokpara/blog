import Link from "next/link"

import styles from "@/styles/rotating-text.module.css"

interface TextProps {
  primary: string
  href: string
  index?: number
}

function RotatingText({ primary, href, index }: TextProps) {
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

export default function RotatingTextSection() {
  return (
    <section className={styles.body}>
      <RotatingText
        primary="podcast"
        href="https://open.spotify.com/show/4LuvyMi6lg6HURDxXwDN6t"
        index={1}
      />
      <div className="flex items-center lg:justify-end">
        <RotatingText primary="blog" href="/blog" index={2} />
      </div>
      <RotatingText
        primary="youtube"
        href="https://youtube.com/@SandraOkpara"
        index={3}
      />
    </section>
  )
}
