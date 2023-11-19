import { z } from 'zod';

export const AllBlogPostsValidator = z.object({
  id: z.string(),
  excerpt: z.string(),
  slug: z.string(),
  title: z.string(),
  date: z.string(),
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

export const SingleBlogPostValidator = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  author: z.object({
    name: z.string(),
    picture: z.object({
      url: z.string(),
    }),
  }),
  date: z.string(),
  updatedAt: z.string(),
  coverImage: z.object({
    url: z.string(),
    id: z.string(),
  }),
   category: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export type AllBlogPostsType = z.infer<typeof AllBlogPostsValidator>;
export type SingleBlogPostType = z.infer<typeof SingleBlogPostValidator>;
