"use client";

import { Button } from "@heroui/react";
import { useSession, signIn as logIn, signOut } from "next-auth/react";
import { signIn } from "../action/sign-in";

export default function LoginPage() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <main className="flex-1 p-8 space-y-10">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold">Login Page</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, Deepak! Here’s a quick overview of your site's
          performance.
        </p>
      </div>

      {/* Key Metrics */}
      <section>
        {session ? (
          <>
            <p>Welcome {session.user?.name}. Signed In As</p>
            <p>{session.user?.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            <p>Not Signed In</p>
            <form action={signIn}>
              <Button type="submit">Signin with GitHub</Button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
