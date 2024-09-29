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

        return null
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

const handler = NextAuth(authOptions);

export { handler as GET}




// export async function POST(req) {
//   try {
//     const { credentials } = await req.json();

//     // Check for null pointer references
//     if (!credentials || !credentials.email || !credentials.password) {
//       return Response.json(
//         { message: "Email or password invalid" },
//         { status: 400 }
//       );
//     }

//     const session = await getServerSession(authOptions);
//     if (session?.user?.email) {
//       return Response.json(
//         { message: "Already logged in" },
//         { status: 400 }
//       );
//     }

//     // Connect to database
//     await mongoose.connect(process.env.MONGO_URL);

//     // Check for unhandled exceptions
//     const user = await User.findOne({ email: credentials.email });
//     if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
//       return Response.json(
//         { message: "Email or password invalid" },
//         { status: 400 }
//       );
//     }

//     // Return user if authentication is successful
//     return Response.json(user);
//   } catch (error) {
//     console.error(error);
//     return Response.json(
//       { message: "An unexpected error occurred" },
//       { status: 500 }
//     );
//   }
// }


export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { credentials } = await req.json();
    if (!credentials || !credentials.email || !credentials.password) {
      return Response.json(
        { message: "Email or password invalid" },
        { status: 400 }
      );
    }

    // Check for unhandled exceptions
    const user = await User.findOne({ email: credentials.email });
    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      return Response.json(
        { message: "Email or password invalid" },
        { status: 400 }
      );
    }

    // Check for null pointer references
    if (!user) {
      return Response.json(
        { message: "User is not found" },
        { status: 400 }
      );
    }

    // Return user if authentication is successful
    const response = await NextAuth(authOptions).callback(req, null);
    if (response.ok) {
      await setLoginInProgress(true);
    } else {
      await setError(true);
    }

    return Response.json({ loginInProgress: await getLoginInProgress() });
  } catch (error) {
    console.error(error);
    if (error.message === "No session found") {
      return Response.json(
        { message: "Session is not found" },
        { status: 400 }
      );
    }
    if (error.message === "No user found") {
      return Response.json(
        { message: "User is not found" },
        { status: 400 }
      );
    }
    return Response.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

