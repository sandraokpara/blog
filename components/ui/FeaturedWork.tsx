import { getFeaturedPosts } from "@/lib/requests";
import Work from "./Work";

const FeaturedWork = async () => {
  const posts = await getFeaturedPosts();

  return (
    <section className="pt-32 md:pt-16 lg:pt-6">
      <p className="text-xs md:text-sm uppercase font-medium pb-4">Featured Posts</p>
      {posts && posts.map((post) => <Work key={post.id} post={post} />)}
      <hr className="border-t border-foreground dark:border-[#333333] lg:w-[90%]" />
    </section>
  );
};

export default FeaturedWork;
