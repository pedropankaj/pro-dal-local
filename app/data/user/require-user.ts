import "server-only";
import { cache } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getCurrentUser = cache(async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return null;
  return {
    id: user.id,
    email: user.email ?? "",
    name: user.given_name ?? "",
  };
});

export const requireUser = cache(async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  return user;
});
