import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const data = await response.json();
        if (response.status == 200 || response.status == 201) {
          return data;
        }
        return null;
      },
    }),
  ],
  secret: "SECRET_KEY_91d84dc4-aecc-40d6-8e88-68d3ebc5eb10",
};
const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST, nextAuthOptions };
