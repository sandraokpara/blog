
export const createBlogUser = `mutation createBlogUser( {
    createBlogUser(data: {
        name: token.name
        email: token.email
       username: token.username
      image: token?.picture ?? ""
    }){
      id
      name
      email
      username
      image
      isSubscribed
    }
  }`
  
  export const updateBlogUser = `mutation updateBlogUser($id: ID!, $email: String) {
    updateBlogUser(
      where: {id: $id}
      data: {
  email: $email
    }){
      id
      name
      email
      username
      image
      isSubscribed
    }
  }`
  
  export const publishBlogUser = `mutation publishBlogUser($id: ID!){
    publishBlogUser(where: {
      id: $id
    }, to: PUBLISHED){
      id
    }
  }`
  
  export const createComment = `mutation createComment($slug: String!, $blogUserEmail: String!,  $text: String!) {
    createComment(data: {
      text: $text
      post: {
        connect: {slug: $slug}
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
  
 export const publishPost = `mutation publishPost($id: ID!{
    publishPost(where: {
      id: $id
    }, to: PUBLISHED){
      id
    }
  }`
  
  
  
  
  