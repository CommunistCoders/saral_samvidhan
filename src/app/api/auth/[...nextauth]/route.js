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
            role: 'user', // Set default role to 'user' for new users
          });

          await newUser.save();
          return {
            email: newUser.email,
            id: newUser._id,
            username: newUser.username,
            role: newUser.role, // Include role in the returned user object
            languagePreference: newUser.languagePreference,
            tags: newUser.tags,
            profilePhoto: newUser.profilePhoto,
            communitiesJoined: newUser.communitiesJoined,
            aboutMe: newUser.aboutMe, // Include `aboutMe`
          };
        } else {
          // Login logic
          const user = await User.findOne({ email: credentials.email })
          .populate({
            path: 'communitiesJoined',
            select: 'name', // Populate only the `name` field of communities
          });
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            return {
              email: user.email,
              id: user._id,
              username: user.username,
              role: user.role, // Include role in the returned user object
              languagePreference: user.languagePreference,
              tags: user.tags,
              profilePhoto: user.profilePhoto,
              communitiesJoined: user.communitiesJoined,
              aboutMe: user.aboutMe, // Include `aboutMe`
            };
          }
          throw new Error('Invalid email or password');
        }
      }      
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.username = user.username;
        token.role = user.role; // Store role in the JWT token
        token.languagePreference = user.languagePreference;
        token.tags = user.tags;
        token.profilePhoto = user.profilePhoto;
        token.communitiesJoined = user.communitiesJoined; 
        token.aboutMe = user.aboutMe; // Include `aboutMe` in token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.role = token.role; // Include role in session
      session.user.languagePreference = token.languagePreference;
      session.user.tags = token.tags;
      session.user.profilePhoto = token.profilePhoto;
      session.user.communitiesJoined = token.communitiesJoined;
      session.user.aboutMe = token.aboutMe; // Include `aboutMe` in session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
