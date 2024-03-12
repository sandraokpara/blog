import { z } from "zod"

export const NewsletterSubValidator = z.object({
  email: z.string().email(),
})

export const CommentValidator = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  post: z.object({
    id: z.string(),
  }),
  blogUser: z.object({
    id: z.string(),
    image: z.string(),
    name: z.string(),
  }),
})

export const FeaturedPostsValidator = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  excerpt: z.string(),
  coverImage: z.object({
    url: z.string(),
    id: z.string(),
  }),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
})

export const AllPostsValidator = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  author: z.object({
    name: z.string(),
  }),
  date: z.string(),
  excerpt: z.string(),
  coverImage: z.object({
    url: z.string(),
    id: z.string(),
  }),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
})

export const CategoryPostsValidator = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  author: z.object({
    name: z.string(),
  }),
  date: z.string(),
  excerpt: z.string(),
  coverImage: z.object({
    url: z.string(),
    id: z.string(),
  }),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
})

export const CategoriesValidator = z.object({
  id: z.string(),
  name: z.string(),
  picture: z.object({
    id: z.string(),
    url: z.string(),
    altText: z.string(),
  }),
})

export const SinglePostValidator = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  author: z.object({
    name: z.string(),
    picture: z.object({
      url: z.string(),
    }),
  }),
  content: z.object({
    raw: z.any(),
  }),
  date: z.string(),
  updatedAt: z.string(),
  excerpt: z.string(),
  coverImage: z.object({
    url: z.string(),
    id: z.string(),
  }),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  isFeatured: z.boolean(),
})

export const CreateCommentRequestValidator = z.object({
  postSlug: z.string(),
  blogUserEmail: z.string().email(),
  text: z.string().min(3).max(500),
});

export const CreateCommentResponseValidator = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  post: z.object({
    id: z.string(),
  }),
  blogUser: z.object({
    id: z.string(),
  }),
});

export const UpdateCommentRequestValidator = z.object({
  commentId: z.string(),
  text: z.string().min(3).max(500),
});

export const UpdateCommentResponseValidator = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  post: z.object({
    id: z.string(),
  }),
  blogUser: z.object({
    id: z.string(),
  }),
});

export const DeleteCommentRequestValidator = z.object({
  commentId: z.string(),
});

export const DeleteCommentResponseValidator = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
});

export const PublishCommentRequestValidator = z.object({
  id: z.string(),
});

export const PublishCommentResponseValidator = z.object({
  id: z.string(),
});

export const PublishPostRequestValidator = z.object({
  id: z.string(),
});

export const PublishPostResponseValidator = z.object({
  id: z.string(),
});

export const CreateBlogUserRequestValidator = z.object({
  data: z.object({
    name: z.string(),
    email: z.string().email(),
    username: z.string(),
    image: z.string(),
  }),
});

export const UpdateBlogUserRequestValidator = z.object({
  id: z.string(),
  email: z.string().email(),
});

export const PublishBlogUserRequestValidator = z.object({
  id: z.string(),
});

export const CreateBlogUserResponseValidator = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  image: z.string(),
  isSubscribed: z.boolean(),
});

export const UpdateBlogUserResponseValidator = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  image: z.string(),
  isSubscribed: z.boolean(),
});

export const PublishBlogUserResponseValidator = z.object({
  id: z.string(),
});


export type NewsletterSubType = z.infer<typeof NewsletterSubValidator>
export type CommentType = z.infer<typeof CommentValidator>
export type FeaturedPostsType = z.infer<typeof FeaturedPostsValidator>
export type AllPostsType = z.infer<typeof AllPostsValidator>
export type CategoryPostsType = z.infer<typeof CategoryPostsValidator>
export type CategoriesType = z.infer<typeof CategoriesValidator>
export type SinglePostType = z.infer<typeof SinglePostValidator>

export type CreateCommentRequestType = z.infer<typeof CreateCommentRequestValidator>;
export type CreateCommentResponseType = z.infer<typeof CreateCommentResponseValidator>;
export type UpdateCommentRequestType = z.infer<typeof UpdateCommentRequestValidator>;
export type UpdateCommentResponseType = z.infer<typeof UpdateCommentResponseValidator>;
export type DeleteCommentRequestType = z.infer<typeof DeleteCommentRequestValidator>;
export type DeleteCommentResponseType = z.infer<typeof DeleteCommentResponseValidator>;
export type PublishCommentRequestType = z.infer<typeof PublishCommentRequestValidator>;
export type PublishCommentResponseType = z.infer<typeof PublishCommentResponseValidator>;
export type PublishPostRequestType = z.infer<typeof PublishPostRequestValidator>;
export type PublishPostResponseType = z.infer<typeof PublishPostResponseValidator>;
export type CreateBlogUserRequestType = z.infer<typeof CreateBlogUserRequestValidator>;
export type UpdateBlogUserRequestType = z.infer<typeof UpdateBlogUserRequestValidator>;
export type PublishBlogUserRequestType = z.infer<typeof PublishBlogUserRequestValidator>;
export type CreateBlogUserResponseType = z.infer<typeof CreateBlogUserResponseValidator>;
export type UpdateBlogUserResponseType = z.infer<typeof UpdateBlogUserResponseValidator>;
export type PublishBlogUserResponseType = z.infer<typeof PublishBlogUserResponseValidator>;