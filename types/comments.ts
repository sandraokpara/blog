type PostComments = {
  comments: PostComment[]
}

type PostCommentAuthor = {
  id: string
  name: string
  email: string
  emailVerified: string | null
  image: string
  username: string
  isSubscribed: boolean | null
}

type PostComment = {
  id: string
  text: string
  createdAt: string
  authorId: string
  userId: string
  slug: string
  author: PostCommentAuthor
}
