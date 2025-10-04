import "server-only";

type PolicyUser = {
  id: string;
  email: string;
};

export function canCreatePost(user: PolicyUser | null) {
  return Boolean(user);
}

export function canEditPost(
  user: PolicyUser | null,
  post: { id: string; authorId?: string }
) {
  if (!user) return false;
  if (post.authorId && post.authorId === user.id) return true;
  return false;
}
