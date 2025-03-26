import connectDB from '@/config/db/connectDB';
import User from '@/models/user.model/user.model';
import { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
   // Configure one or more authentication providers
   providers: [
      CredentialsProvider({
         // The name to display on the sign in form (e.g. "Sign in with...")
         name: 'Credentials',
         // `credentials` is used to generate a form on the sign-in page.
         credentials: {
            email: { label: 'Email', type: 'text', placeholder: 'Your Email' },
            password: { label: 'Password', type: 'password' },
         },
         async authorize(credentials: Record<string, string> | undefined) {
            // Add logic here to look up the user from the credentials supplied
            // const user = await LoginUser(credentials);

            if (credentials?.email) {
               // Your logic to validate user goes here.
               // Assuming 'user' is obtained after validating the credentials.
               const user = await User.findOne({ email: credentials.email });

               if (user) {
                  // Any object returned will be saved in `user` property of the JWT
                  return user;
               }
            }
            // If you return null, an error will be displayed advising the user to check their details.
            return null;
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
      signIn: '/login',
   },
   callbacks: {
      async signIn({ user, account }: { user: NextAuthUser; account: any }) {
         if (account) {
            const { provider, providerAccountId } = account;
            const { name, email, image } = user;

            await connectDB();
            const findUser = await User.findOne({ email });

            if (!findUser) {
               const payload = { provider, providerAccountId, name, email, image };
               const newUser = new User(payload);
               await newUser.save();
            }
         }
         return true;
      },
   },
};
