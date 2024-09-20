import clientPromise from "@/libs/mongoConnect";
import { UserInfo } from "@/models/UserInfo";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from '@/models/User';
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

let isConnected = false;

async function connectToDatabase() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
  }
}

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
        const email = credentials?.username; // Fixed key access
        const password = credentials?.password;

        await connectToDatabase();
        
        try {
          const user = await User.findOne({ email });
          if (user && await bcrypt.compare(password, user.password)) {
            return user;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }

        return null;
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
  
  try {
    const userInfo = await UserInfo.findOne({ email: userEmail });
    return userInfo ? userInfo.admin : false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

///////////////////////////////////////////////////////////////////

// export async function POST(req) {
//   mongoose.connect(process.env.MONGO_URL);
  
//   if (response.ok) {
//       setLoginInProgress(true)
//     }
//     else {
//       setError(true);
//       }
//   return Response.json(setLoginInProgress);
// }

// export async function GET() {
//   mongoose.connect(process.env.MONGO_URL);
//   return Response.json(
//     await setLoginInProgress()
//   );
// }