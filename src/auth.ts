import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing github oauth credentials");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    redirect() {
      return "/dashboard";
    },
  },
});
