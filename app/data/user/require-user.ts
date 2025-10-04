import "server-only";
import { cache } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type AppUser = {
  id: string;
  email: string;
  name?: string;
};

export const getCurrentUser = cache(async (): Promise<AppUser | null> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return null;
  return {
    id: user.id,
    email: user.email ?? "",
    name:
      user.given_name || user.family_name
        ? `${user.given_name ?? ""} ${user.family_name ?? ""}`.trim()
        : undefined,
  };
});

export const requireUser = cache(async (): Promise<AppUser> => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  return user;
});
