import {
  AllPostsType,
  CategoryPostsType,
  FeaturedPostsType,
  SinglePostType,
} from "@/types/validators"

import { queryAllPosts, queryCategoryPosts, queryFeaturedPosts, querySinglePost } from "./queries"

async function fetchData(query: string, variables?: Record<string, any>) {
  const hygraphEndpoint = process.env.HYGRAPH_ENDPOINT

  if (!hygraphEndpoint) {
    throw new Error("HYGRAPH_ENDPOINT is not defined")
  }

  const requestBody = { query, variables: variables || {} }

  const response = await fetch(hygraphEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })

  return response.json()
}

export async function getPosts(slug?: string) {
  const query = slug ? querySinglePost : queryAllPosts
  const variables = slug ? { slug } : {}

  const result = await fetchData(query, variables)

  if (slug) {
    return result?.data?.post as SinglePostType
  } else {
    return result?.data?.posts as AllPostsType[]
  }
}

export async function getFeaturedPosts() {
  const query = queryFeaturedPosts
  const variables = {}

  const result = await fetchData(query, variables)
  return result?.data?.posts as FeaturedPostsType[]
}

export async function getCategoryPosts(categoryId?: string) {
  const query = categoryId ? queryCategoryPosts : queryAllPosts
  const variables = categoryId ? { categoryId } : {}

  const result = await fetchData(query, variables)

  if (categoryId) {
    // console.log(result)
    return result?.data?.posts as CategoryPostsType[]
  } else {
    return result?.data?.posts as AllPostsType[]
  }
}
