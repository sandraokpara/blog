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

  // const {
  //   id,
  //   slug,
  //   title,
  //   excerpt,
  //   author: { name, picture: { url: authorPictureUrl } },
  //   date,
  //   updatedAt,
  //   coverImage: { id: coverImageId, url: coverImageUrl },
  //   category: { id: categoryId, name: categoryName },
  // } = post as SingleBlogPostType;

  console.log(params.slug);

  return (
    <section className="">
      <p className="text-sm">{post?.title}</p>
      {/* Access other destructured properties as needed */}
    </section>
  );
}
