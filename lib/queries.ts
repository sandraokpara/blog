// /home
export const queryFeaturedPosts = `query FeaturedPostsQuery {
  posts(where: {isFeatured: true} ) {
    id
    slug
    title
    date
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
}`

// /blog
export const queryAllPosts = `query AllPostsQuery {
  posts(last: 100, orderBy: date_DESC) {
    id
    slug
    title
    author {
      name
    }
    date
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
}`

// /blog/category/[categoryId]
export const queryCategoryPosts = `query CategoryPostsQuery($categoryId: ID) {
  posts(last: 100, orderBy: date_DESC, where: {category: {id: $categoryId}} ) {
    id
    slug
    title
    author {
      name
    }
    date
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
}`

// /blog/post/[slug]
export const querySinglePost = `query SinglePost($slug: String!) {
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
      isFeatured
    }
  }`;