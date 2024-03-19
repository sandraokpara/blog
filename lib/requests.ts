import {
  AllPostsType,
  CategoriesType,
  CategoryPostsType,
  CommentType,
  CreateBlogUserRequestType,
  CreateBlogUserResponseType,
  FeaturedPostsType,
  PublishBlogUserRequestType,
  PublishBlogUserResponseType,
  PublishPostRequestType,
  PublishPostResponseType,
  SinglePostType,
  UpdateBlogUserRequestType,
  UpdateBlogUserResponseType,
} from "@/types/validators"

import {
  createBlogUser,
  publishBlogUserByEmail,
  publishBlogUserById,
  publishPost,
  updateBlogUser,
} from "./mutations"
import {
  queryAllPosts,
  queryBlogUser,
  queryCategories,
  queryCategoryPosts,
  queryFeaturedPosts,
  querySinglePost,
} from "./queries"

export async function request(query: string, variables?: Record<string, any>) {
  const hygraphEndpoint = process.env.HYGRAPH_ENDPOINT
  const hygraphToken = process.env.HYGRAPH_TOKEN

  if (!hygraphEndpoint) {
    throw new Error("HYGRAPH_ENDPOINT is not defined")
  }

  if (!hygraphToken) {
    throw new Error("HYGRAPH_TOKEN is not defined")
  }

  const requestBody = { query, variables: variables || {} }

  try {
    const response = await fetch(hygraphEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${hygraphToken}`,
      },
      body: JSON.stringify(requestBody),
    })

    return response.json()
  } catch (error: any) {
    throw new Error(`Request failed: ${error.message}`)
  }
}

// queries

export async function getPosts(slug?: string) {
  const query = slug ? querySinglePost : queryAllPosts
  const variables = slug ? { slug } : {}

  try {
    const result = await request(query, variables)

    if (slug) {
      return result?.data?.post as SinglePostType
    } else {
      return result?.data?.posts as AllPostsType[]
    }
  } catch (error: any) {
    throw new Error(`Failed to get posts: ${error.message}`)
  }
}

export async function getFeaturedPosts() {
  const query = queryFeaturedPosts
  const variables = {}

  try {
    const result = await request(query, variables)
    return result?.data?.posts as FeaturedPostsType[]
  } catch (error: any) {
    throw new Error(`Failed to get featured posts: ${error.message}`)
  }
}

export async function getCategoryPosts(categoryId?: string) {
  const query = categoryId ? queryCategoryPosts : queryAllPosts
  const variables = categoryId ? { categoryId } : {}

  try {
    const result = await request(query, variables)

    if (categoryId) {
      return result?.data?.posts as CategoryPostsType[]
    } else {
      return result?.data?.posts as AllPostsType[]
    }
  } catch (error: any) {
    throw new Error(`Failed to get category posts: ${error.message}`)
  }
}

export async function getCategories() {
  const query = queryCategories
  const variables = {}

  try {
    const result = await request(query, variables)
    return result?.data?.categories as CategoriesType[]
  } catch (error: any) {
    throw new Error(`Failed to get categories: ${error.message}`)
  }
}

export async function getBlogUserByEmail(email: string | null | undefined) {
  const query = queryBlogUser
  const variables = email ? { email } : {}

  try {
    const result = await request(query, variables)
    return result?.data?.blogUser as CreateBlogUserResponseType
  } catch (error: any) {
    throw new Error(`Failed to get blog user by email: ${error.message}`)
  }
}

export async function publishPostById(variables: PublishPostRequestType) {
  const query = publishPost

  try {
    const result = await request(query, variables)
    return result?.data?.publishPost as PublishPostResponseType
  } catch (error: any) {
    throw new Error(`Failed to publish post by ID: ${error.message}`)
  }
}

export async function createNewBlogUser(variables: CreateBlogUserRequestType) {
  const query = createBlogUser

  try {
    const result = await request(query, variables)
    return result?.data?.createBlogUser as CreateBlogUserResponseType
  } catch (error: any) {
    throw new Error(`Failed to create new blog user: ${error.message}`)
  }
}

export async function updateBlogUserSubscriptionByEmail(
  variables: UpdateBlogUserRequestType
) {
  const query = updateBlogUser

  try {
    const result = await request(query, variables)
    return result?.data?.updateBlogUser as UpdateBlogUserResponseType
  } catch (error: any) {
    throw new Error(
      `Failed to update blog user subscription by email: ${error.message}`
    )
  }
}

export async function publishBlogUser(variables: PublishBlogUserRequestType) {
  const query = publishBlogUserByEmail || publishBlogUserById

  try {
    const result = await request(query, variables)
    return result?.data?.publishBlogUser as PublishBlogUserResponseType
  } catch (error: any) {
    throw new Error(`Failed to publish blog user: ${error.message}`)
  }
}
