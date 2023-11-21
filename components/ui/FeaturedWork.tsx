import { getFeaturedPosts } from '@/lib/requests';
import Link from 'next/link';

interface FeaturedWorkProps {
  
}

const FeaturedWork= async ({  }: FeaturedWorkProps) => {
    const posts = await getFeaturedPosts()

    return (
      <section className="">
        {posts &&
          posts.flatMap((post) => (
            <Link key={post.id} href={`/post/${post.slug}`}>
              <p className="text-sm">{post?.title}</p>
            </Link>
          ))}
      </section>
    )
}

export default FeaturedWork;