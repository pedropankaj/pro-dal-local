import "server-only";
import prisma from "@/lib/db";
import { requireUser, getCurrentUser } from "@/app/data/user/require-user";
import {
  BlogCreateInput,
  BlogCreateInputSchema,
  BlogPostDTO,
} from "./blog.dto";
import { canCreatePost } from "./blog.policy";

export class BlogDAL {
  private constructor(private readonly userId: string) {}

  static async create() {
    const user = await requireUser();
    return new BlogDAL(user.id);
  }

  static async public() {
    // For read-only access without requiring auth (e.g., public list)
    const user = await getCurrentUser();
    return new BlogDAL(user?.id ?? "");
  }

  async listArticles(): Promise<BlogPostDTO[]> {
    const rows = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      content: r.content,
      image: r.image,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  }

  async createArticle(input: BlogCreateInput): Promise<BlogPostDTO> {
    const parsed = BlogCreateInputSchema.safeParse(input);
    if (!parsed.success) {
      const message = parsed.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join(", ");
      throw new Error(`ValidationError: ${message}`);
    }

    const user = await requireUser();
    if (!canCreatePost(user)) {
      throw new Error("Forbidden: cannot create post");
    }

    const created = await prisma.article.create({
      data: {
        title: parsed.data.title,
        content: parsed.data.content,
        image: parsed.data.image,
        authorId: user.id,
      },
    });

    return {
      id: created.id,
      title: created.title,
      content: created.content,
      image: created.image,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }
}
