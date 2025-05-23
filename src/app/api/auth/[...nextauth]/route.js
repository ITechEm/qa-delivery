import clientPromise from "@/libs/mongoConnect";
import { UserInfo } from "@/models/UserInfo";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from '@/models/User';
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({email});
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user;
        }
      }
    })
  ],
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

export async function OPTIONS(req) {
  const { email, password } = await req.json();

  await mongoose.connect(process.env.MONGO_URL);

  const user = await User.findOne({ email });
  const passwordOk = bcrypt.compareSync(password, user.password);


  if (!user) {
    return new Response(
      JSON.stringify({ message: "Email Invalid" }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  if (!passwordOk) {
    return new Response(
      JSON.stringify({ message: "Incorrect password" }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  return new Response(
    JSON.stringify({ message: "User successfully login" }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
  );
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}