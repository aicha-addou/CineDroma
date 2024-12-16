import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { user } from "@/repository/user";
import { SECRET_KEY as NEXTAUTH_SECRET } from "@/repository/user";


declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

const authOptions: NextAuthOptions = {
secret : NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Username + Password",
      credentials: {
        username: { 
          label: "Username", 
          type: "text",
          placeholder: "Votre nom d'utilisateur"
        },
        password: { 
          label: "Password", 
          type: "password",
          placeholder: "Votre mot de passe"
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Identifiants manquants");
          }

          // Vérification des identifiants
          const pwdok = await bcrypt.compare(credentials.password, user.password);
          
          if (user.username === credentials.username && pwdok) {
            return {
              id: user.username,
              name: user.username,
              // Vous pouvez ajouter d'autres propriétés utilisateur ici
            };
          }
          
          throw new Error("Identifiants invalides");
        } catch (error) {
          console.error("Erreur d'authentification:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

