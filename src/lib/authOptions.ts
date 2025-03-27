import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/config/db/connectDB";
import User from "@/models/user.model/user.model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Connect to the database
        await connectDB();

        // Fetch the user from the database
        const user = await User.findOne({ email: credentials?.email });

        const isMatch = await bcrypt.compare(
          credentials?.password,
          user?.password
        );
        const payload = {
          userId: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          provider: user.provider,
          providerAccountId: user.providerAccountId,
        };
        if (isMatch) {
          const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
            expiresIn: "1h",
          });

          return user; // Authentication successful
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
      if (account) {
        const { provider, providerAccountId } = account;
        const { name, email, image } = user;

        await connectDB();
        const findUser = await User.findOne({ email });

        if (!findUser) {
          const newUser = new User({
            provider,
            providerAccountId,
            name,
            email,
            image,
          });
          await newUser.save();
          return newUser;
        }
      }
      return true;
    },
  },
};
