export const createComment = `mutation createComment($postSlug: String!, $blogUserEmail: String!,  $text: String!) {
    createComment(data: {
      text: $text
      post: {
        connect: {slug: $postSlug}
      }
      blogUser: {
        connect: {email: $blogUserEmail}
      }
    }){
      id
      text
      createdAt
      post {
        id
      }
      blogUser {
        id
      }
    }
  }`

export const updateComment = `mutation updateComment($commentId: ID!, $text: String!) {
  updateComment(
    where: {id: $commentId}
    data: {text: $text}
  ){
      id
      text
      createdAt
      post {
        id
      }
      blogUser {
        id
      }
    }
  }`

export const deleteComment = `mutation deleteComment($commentId: ID!) {
  deleteComment(
    where: {id: $commentId}
  ){
      id
      text
      createdAt
    }
  }`

export const publishComment = `mutation publishComment($id: ID!){
    publishComment(where: {
      id: $id
    }, to: PUBLISHED){
      id
    }
  }`
