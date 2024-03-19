export const createBlogUser = `mutation createBlogUser($name: String!, $email: String!, $username: String!, $image: String!, $isSubscribed: Boolean!) {
    createBlogUser(data: {
        name: $name
        email: $email
       username: $username
      image: $image
      isSubscribed: $isSubscribed
    }){
      id
      name
      email
      username
      image
      isSubscribed
    }
  }`

export const updateBlogUser = `mutation updateBlogUser($email: String!, $isSubscribed: Boolean!) {
    updateBlogUser(
      where: {email: $email}
      data: {
        isSubscribed: $isSubscribed
    }){
      id
      name
      email
      username
      image
      isSubscribed
    }
  }`

export const publishBlogUserById = `mutation publishBlogUser($id: ID!){
    publishBlogUser(where: {
      id: $id
    }, to: PUBLISHED){
      id
    }
  }`

export const publishBlogUserByEmail = `mutation publishBlogUser($email: String!){
    publishBlogUser(where: {
      email: $email
    }, to: PUBLISHED){
      id,
      name
      email
      username
    }
  }`

export const publishPost = `mutation publishPost($id: ID!{
    publishPost(where: {
      id: $id
    }, to: PUBLISHED){
      id
    }
  }`
