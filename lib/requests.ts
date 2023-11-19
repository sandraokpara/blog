import { AllBlogPostsType, SingleBlogPostType } from "@/types/validators";
import { queryAllPosts, querySinglePost } from "./queries";

async function fetchData(query: string, variables?: Record<string, any>) {
  const hygraphEndpoint = process.env.HYGRAPH_ENDPOINT;

  if (!hygraphEndpoint) {
    throw new Error("HYGRAPH_ENDPOINT is not defined");
  }

  const requestBody = { query, variables: variables || {} };

  const response = await fetch(hygraphEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  return response.json();
}

export async function getPosts(slug?: string) {
  const query = slug ? querySinglePost : queryAllPosts;
  const variables = slug ? { slug } : {};

  const result = await fetchData(query, variables);

  if (slug) {
    console.log(result);
    return result?.data?.post as SingleBlogPostType;
  } else {
    return result?.data?.posts as AllBlogPostsType[];
  }
}
