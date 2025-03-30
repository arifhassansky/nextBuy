import connectDB from "@/config/db/connectDB";
import User from "@/models/user.model/user.model";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      role?: string;
      provider?: string;
      providerAccountId?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string;
    provider?: string;
    providerAccountId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    provider?: string;
    providerAccountId?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email: credentials.email });
        console.log("User from auth options", user);

        if (!user) {
          throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (isMatch) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            provider: user.provider,
            providerAccountId: user.providerAccountId,
          };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      if (account) {
        const { provider, providerAccountId } = account;
        const { name, email, image } = user;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          const newUser = new User({
            provider,
            providerAccountId,
            name,
            email,
            image,
            role: "user",
          });

          await newUser.save();
          user.id = newUser._id.toString();
          user.role = newUser.role;
          user.provider = newUser.provider;
          user.providerAccountId = newUser.providerAccountId;
          return true;
        } else {
          user.id = existingUser._id.toString();
          user.role = existingUser.role;
          user.provider = existingUser.provider;
          user.providerAccountId = existingUser.providerAccountId;
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.provider = user.provider;
        token.providerAccountId = user.providerAccountId;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.provider = token.provider;
        session.user.providerAccountId = token.providerAccountId;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
