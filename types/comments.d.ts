export type PostComments = {
  comments: PostComment[]
}

export type PostCommentAuthor = {
  id: string
  name: string
  email: string
  emailVerified: string | null
  image: string
  username: string
  isSubscribed: boolean | null
}

export type PostComment = {
  id: string
  text: string
  createdAt: string
  authorId: string
  userId: string
  slug: string
  author: PostCommentAuthor
}
