import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedEmail = "heshammourad@gmail.com";
      if (user?.email === allowedEmail) {
        return true;
      }
      return false; // Blocks anyone other than heshammourad@gmail.com
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth-error",
  },
  trustHost: true,
});
