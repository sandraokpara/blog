import { getPosts } from "@/lib/requests";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPosts(params.slug);

  console.log(params.slug)

  return (
    <section className="">
      <p className="text-sm">{post?.title}</p>
    </section>
  );
}
