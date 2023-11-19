export const queryAllPosts = `{
  posts(last: 100, orderBy: date_DESC) {
      id
      excerpt
      slug
      title
      date
      coverImage {
        url
        id
      }
       category {
      id
      name
    }
    isFeatured
  }
}`

export const querySinglePost = `
  query SinglePost($slug: String!) {
    post(where: { slug: $slug }) {
      id
      slug
      title
      author {
        name
        picture {
          url
        }
      }
      content {
        html
      }
      date
      updatedAt
      excerpt
      coverImage {
        url
        id
      }
       category {
      id
      name
    }
    }
  }
`;
