// queries

import { request } from "@/lib/requests"

import {
  CommentType,
  CreateCommentRequestType,
  CreateCommentResponseType,
  DeleteCommentRequestType,
  DeleteCommentResponseType,
  PublishCommentRequestType,
  PublishCommentResponseType,
  UpdateCommentRequestType,
  UpdateCommentResponseType,
} from "../types/validators"
import {
  createComment,
  deleteComment,
  publishComment,
  updateComment,
} from "./mutations"
import { queryComments } from "./queries"

export async function getComments(slug?: string) {
  const query = queryComments
  const variables = slug ? { slug } : {}

  try {
    const result = await request(query, variables)
    return result?.data?.comments as CommentType[]
  } catch (error: any) {
    throw new Error(`Failed to get comments: ${error.message}`)
  }
}

// mutations

export async function createNewComment(variables: CreateCommentRequestType) {
  const query = createComment

  try {
    const result = await request(query, variables)
    return result?.data?.createComment as CreateCommentResponseType
  } catch (error: any) {
    throw new Error(`Failed to create new comment: ${error.message}`)
  }
}

export async function updateExistingComment(
  variables: UpdateCommentRequestType
) {
  const query = updateComment

  try {
    const result = await request(query, variables)
    return result?.data?.updateComment as UpdateCommentResponseType
  } catch (error: any) {
    throw new Error(`Failed to update existing comment: ${error.message}`)
  }
}

export async function deleteCommentById(variables: DeleteCommentRequestType) {
  const query = deleteComment

  try {
    const result = await request(query, variables)
    return result?.data?.deleteComment as DeleteCommentResponseType
  } catch (error: any) {
    throw new Error(`Failed to delete comment by ID: ${error.message}`)
  }
}

export async function publishCommentById(variables: PublishCommentRequestType) {
  const query = publishComment

  try {
    const result = await request(query, variables)
    return result?.data?.publishComment as PublishCommentResponseType
  } catch (error: any) {
    throw new Error(`Failed to publish comment by ID: ${error.message}`)
  }
}
