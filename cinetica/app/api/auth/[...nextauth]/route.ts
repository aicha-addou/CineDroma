import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { user as crd } from "@/repository/user";

// Configuration NextAuth
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Username + Password",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const pwdok = await bcrypt.compare(credentials?.password || "", crd.password);
        if (crd.username === credentials?.username && pwdok) {
          return { id: crd.username, name: crd.username };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

// Exportez uniquement les gestionnaires nécessaires
export { handler as GET, handler as POST };