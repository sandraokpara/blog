export const queryComments = `query Comments($slug: String!) {
    comments(last: 100, orderBy: createdAt_DESC, where: {post: {slug: $slug}}) {
      id
      text
      createdAt
      post {
        id
      }
      blogUser {
        id
        name
        email
        image
      }
    }
  }`
