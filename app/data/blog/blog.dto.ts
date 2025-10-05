import "server-only";
import { z } from "zod";

export const BlogCreateInputSchema = z.object({
  title: z.string().min(2).max(50),
  content: z.string().min(2).max(600),
  image: z.url().max(500),
});

export type BlogCreateInput = z.infer<typeof BlogCreateInputSchema>;

export const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  image: z.url(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BlogPostDTO = z.infer<typeof BlogPostSchema>;
