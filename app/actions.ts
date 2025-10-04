"use server";

import { revalidatePath } from "next/cache";
import { BlogDAL } from "@/app/data/blog/blog.dal";
import {
  BlogCreateInput,
  BlogCreateInputSchema,
} from "@/app/data/blog/blog.dto";

export async function createArticleAction(input: BlogCreateInput) {
  const parsed = BlogCreateInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join(", "),
    };
  }

  try {
    const dal = await BlogDAL.create();
    const created = await dal.createArticle(parsed.data);
    revalidatePath("/");
    return { ok: true as const, postId: created.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false as const, error: message };
  }
}
