// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcrypt';
import User from '@/app/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        isSignup: { label: 'Signup', type: 'boolean' },
      },
      async authorize(credentials) {
        await dbConnect(); // Connect to the database

        if (credentials.isSignup === 'true') {
          // Check if the user already exists
          const existingUser = await User.findOne({ email: credentials.email });
          if (existingUser) {
            throw new Error('User already exists');
          }

          // Hash the password and create a new user
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newUser = new User({
            email: credentials.email,
            password: hashedPassword,
          });

          await newUser.save();
          return { email: newUser.email };
        } else {
          // Login logic
          const user = await User.findOne({ email: credentials.email });
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            return { email: user.email };
          }
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
