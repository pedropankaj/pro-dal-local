import { buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="text-3xl font-semibold">
          Dal<span className="text-blue-500">Pro</span>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <LogoutLink className={buttonVariants({ variant: "outline" })}>
              Logout
            </LogoutLink>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <LoginLink className={buttonVariants({ variant: "outline" })}>
              Login
            </LoginLink>
            <RegisterLink className={buttonVariants()}>Register</RegisterLink>
          </div>
        )}
      </div>
    </nav>
  );
}
