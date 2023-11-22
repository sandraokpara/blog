import Link from "next/link"

import { getFeaturedPosts } from "@/lib/requests"
import { splitTitle } from "@/lib/utils"
import Image from "next/image"
import styles from "@/styles/featured-work.module.css"

interface FeaturedWorkProps {}

// {
//   id: 'clp472c424rvy0bmrtjpznrnq',
//   slug: 'the-blunt-sides-of-a-police-cell-with-somma',
//   title: 'The Blunt Sides Of A Police Cell With Somma.',
//   date: '2023-05-05',
//   excerpt: 'In this blog post, I interviewed my friend Somma about her experience in a police cell. Somma was arrested for a minor offense and spent 96 hours in custody. In this interview, she shares her thoughts and feelings about the experience, as well as some practical tips for anyone who might find themselves in a similar situation.',
//   coverImage: {
//     url: 'https://media.graphassets.com/zwuVTmwVQ7iIwqbWG84G',
//     id: 'clp46us8d4tv00bla5syzhv2x'
//   },
//   category: { id: 'clp7yhst05uy70amhoiv38mf0', name: 'Guests' }
// }

const FeaturedWork = async ({}: FeaturedWorkProps) => {
  const posts = await getFeaturedPosts()

  return (
    <section className="">
      {posts &&
        posts.flatMap((post) => {
          const { title1, title2 } = splitTitle(post.title)

          return (
            <Link key={post.id} href={`/post/${post.slug}`}>
              <div className={styles.project}>
                <p>{title1}</p>
                <div className={styles.imgContainer}>
                  <Image src={post.coverImage.url} alt={post.title} fill />
                </div>
                <p>{title2}</p>
              </div>
            </Link>
          )
        })}
    </section>
  )
}

export default FeaturedWork
