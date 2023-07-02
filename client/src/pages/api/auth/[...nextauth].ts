import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  pages: {
    signIn: "/signin",
  },
  secret: "i-am-a-secret",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as number;
      session.user.name = token.name as string;
      session.user.role = token.role as string;
      return session;
    },
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        id: { label: "id", type: "text", placeholder: "" },
        role: { label: "role", type: "text", placeholder: "" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_INNER_URL}/api/v1/${credentials?.role}/${credentials?.id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        ).then((res) => res.json());

        // const res = await fetch(
        //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${credentials?.role}`,
        //   {
        //     method: "GET",
        //     headers: {
        //       Accept: "application/json",
        //     },
        //   }
        // ).then((res) => res.json());

        const user = {
          ...res,
          role: credentials?.role,
        };

        if (user && !!credentials && !!credentials.role) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
