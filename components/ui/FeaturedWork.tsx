import { getFeaturedPosts } from "@/lib/requests";
import Work from "./Work";

const FeaturedWork = async () => {
  const posts = await getFeaturedPosts();

  return (
    <section className="">
      <p className="text-lg pb-2">Featured Work</p>
      {posts && posts.map((post) => <Work key={post.id} post={post} />)}
      <hr className="border-t border-black w-[90%]" />
    </section>
  );
};

export default FeaturedWork;
