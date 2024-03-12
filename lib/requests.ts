import {
  AllPostsType,
  CategoriesType,
  CategoryPostsType,
  FeaturedPostsType,
  SinglePostType,
  NewsletterSubType,
  CommentType,
  CreateCommentRequestType,
  CreateCommentResponseType,
  UpdateCommentRequestType,
  DeleteCommentRequestType,
  DeleteCommentResponseType,
  UpdateCommentResponseType,
  PublishCommentRequestType,
  PublishCommentResponseType,
  PublishPostRequestType,
  PublishPostResponseType,
  PublishBlogUserRequestType,
  UpdateBlogUserRequestType,
  UpdateBlogUserResponseType,
} from "@/types/validators";

import {
  queryAllPosts,
  queryCategories,
  queryCategoryPosts,
  queryFeaturedPosts,
  querySinglePost,
} from "./queries";

import {
  createComment,
  updateComment,
  deleteComment,
  publishComment,
  publishPost,
  createBlogUser,
  updateBlogUser,
  publishBlogUser,
} from "./mutations"

async function request(query: string, variables?: Record<string, any>) {
  const hygraphEndpoint = process.env.HYGRAPH_ENDPOINT;

  if (!hygraphEndpoint) {
    throw new Error("HYGRAPH_ENDPOINT is not defined");
  }

  const requestBody = { query, variables: variables || {} };

  const response = await fetch(hygraphEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return response.json();
}

export async function getPosts(slug?: string) {
  const query = slug ? querySinglePost : queryAllPosts;
  const variables = slug ? { slug } : {};

  const result = await request(query, variables);

  if (slug) {
    return result?.data?.post as SinglePostType;
  } else {
    return result?.data?.posts as AllPostsType[];
  }
}

export async function getFeaturedPosts() {
  const query = queryFeaturedPosts;
  const variables = {};

  const result = await request(query, variables);
  return result?.data?.posts as FeaturedPostsType[];
}

export async function getCategoryPosts(categoryId?: string) {
  const query = categoryId ? queryCategoryPosts : queryAllPosts;
  const variables = categoryId ? { categoryId } : {};

  const result = await request(query, variables);

  if (categoryId) {
    return result?.data?.posts as CategoryPostsType[];
  } else {
    return result?.data?.posts as AllPostsType[];
  }
}

export async function getCategories() {
  const query = queryCategories;
  const variables = {};

  const result = await request(query, variables);
  return result?.data?.categories as CategoriesType[];
}

ex[o]

// Mutations

export async function createNewComment(variables: CreateCommentRequestType) {
  const query = createComment;

  const result = await request(query, variables);
  return result?.data?.createComment as CreateCommentResponseType;
}

export async function updateExistingComment(variables: UpdateCommentRequestType) {
  const query = updateComment;

  const result = await request(query, variables);
  return result?.data?.updateComment as UpdateCommentResponseType;
}

export async function deleteCommentById(variables: DeleteCommentRequestType) {
  const query = deleteComment;

  const result = await request(query, variables);
  return result?.data?.deleteComment as DeleteCommentResponseType;
}

export async function publishCommentById(variables: PublishCommentRequestType) {
  const query = publishComment;

  const result = await request(query, variables);
  return result?.data?.publishComment as PublishCommentResponseType;
}

export async function publishPostById(variables: PublishPostRequestType) {
  const query = publishPost;

  const result = await request(query, variables);
  return result?.data?.publishPost as PublishPostResponseType;
}

export async function createNewBlogUser(variables: ) {
  const query = createBlogUser;

  const result = await request(query, variables);
  return result?.data?.createBlogUser as NewsletterSubType;
}

export async function updateBlogUserEmailById(variables: UpdateBlogUserRequestType) {
  const query = updateBlogUser;

  const result = await request(query, variables);
  return result?.data?.updateBlogUser as UpdateBlogUserResponseType;
}

export async function publishBlogUserById(variables: PublishBlogUserRequestType) {
  const query = publishBlogUser;

  const result = await request(query, variables);
  return result?.data?.publishBlogUser as PublishCommentResponseType;
}
