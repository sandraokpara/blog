import { z } from 'zod';

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
});

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
});

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
});

export const CategoriesValidator = z.object({
  id: z.string(),
  name: z.string(),
  picture: z.object({
    id: z.string(),
    url: z.string(),
    altText: z.string(),
  })
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
      html: z.string(),
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
});

export type FeaturedPostsType = z.infer<typeof FeaturedPostsValidator>;
export type AllPostsType = z.infer<typeof AllPostsValidator>;
export type CategoryPostsType = z.infer<typeof CategoryPostsValidator>;
export type CategoriesType = z.infer<typeof CategoriesValidator>;
export type SinglePostType = z.infer<typeof SinglePostValidator>;

