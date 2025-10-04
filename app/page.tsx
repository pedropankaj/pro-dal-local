/* eslint-disable @next/next/no-img-element */
import { CreateArticleForm } from "@/components/web/CreateArticleForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogDAL } from "@/app/data/blog/blog.dal";

async function getArticles() {
  const blog = await BlogDAL.public();
  return blog.listArticles();
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="space-y-10">
      <header className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Next.js DAL & DTO Demo
        </h1>
        <p className="mt-2 mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
          A small project for showcasing a clean data access layer and typed
          DTOs while building and rendering blog articles.
        </p>
      </header>

      <CreateArticleForm />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-xl font-semibold">Latest Articles</h2>
        {articles.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No articles yet. Be the first to post!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Card
                key={a.id}
                className="group overflow-hidden border transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-40 w-full overflow-hidden bg-muted">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="truncate">{a.title}</CardTitle>
                  <CardDescription>
                    {a.content.length > 140
                      ? a.content.slice(0, 140) + "…"
                      : a.content}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
