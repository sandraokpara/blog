import { getPosts } from "@/lib/requests";
import { SingleBlogPostType } from "@/types/validators";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPosts(params.slug);

  if (Array.isArray(post)) {
    return null;
  }

  return (
    <section className="">
      <p className="text-sm">{post?.title}</p>
    </section>
  );
}
