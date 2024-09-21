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
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToDatabase();
        const email = credentials?.username;
        const password = credentials?.password;

        try {
          const user = await User.findOne({ email });
          if (user && await bcrypt.compare(password, user.password)) {
            return user;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
        }
        return null; // Fail authentication
      }
    })
  ],
};

export async function isAdmin() {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) return false;

    const userInfo = await UserInfo.findOne({ email: userEmail });
    return userInfo ? userInfo.admin : false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };




// let isConnected = false;

// async function connectToDatabase() {
//   if (!isConnected) {
//     await mongoose.connect(process.env.MONGO_URL);
//     isConnected = true;
//   }
// }

// export const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60 // 30 days
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       id: 'credentials',
//       credentials: {
//         username: { label: "Email", type: "email", placeholder: "test@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const email = credentials?.username; // Fixed key access
//         const password = credentials?.password;

//         await connectToDatabase();
        
//         try {
//           const user = await User.findOne({ email });
//           if (user && await bcrypt.compare(password, user.password)) {
//             return user;
//           }
//         } catch (error) {
//           console.error("Error during authorization:", error);
//           return null;
//         }

//         return null;
//       }
//     })
//   ],
// };

// export async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return false;
//   }
  
//   try {
//     const userInfo = await UserInfo.findOne({ email: userEmail });
//     return userInfo ? userInfo.admin : false;
//   } catch (error) {
//     console.error("Error checking admin status:", error);
//     return false;
//   }
// }

// // New API Route to Get User Info
// export async function getUserInfo(req, res) {
//   const session = await getServerSession(authOptions);
  
//   if (!session) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.status(200).json(user);
//   } catch (error) {
//     console.error("Error fetching user information:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// // Modify the handler export to include the new API function
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST, getUserInfo as GET_USER_INFO };

// // In your API routes file, you can define how to handle this new route:
// export default async function apiHandler(req, res) {
//   if (req.method === 'GET_USER_INFO') {
//     return getUserInfo(req, res)
//   }
  
//   return res.status(405).json({ message: "Method Not Allowed" });
// }



// /////////////////////////////////////////////////////////////////

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


// import clientPromise from "@/libs/mongoConnect";
// import {UserInfo} from "@/models/UserInfo";
// import bcrypt from "bcrypt";
// import * as mongoose from "mongoose";
// import {User} from '@/models/User';
// import NextAuth, {getServerSession} from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"

// export const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60 // 30 days
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       id: 'credentials',
//       credentials: {
//         username: { label: "Email", type: "email", placeholder: "test@example.com" },
//         password: { label: "Password", type: "password" },
//       },
      
//       async authorize(credentials, req) {
//         const email = credentials?.email;
//         const password = credentials?.password;

//         mongoose.connect(process.env.MONGO_URL);
//         const user = await User.findOne({email});
//         const passwordOk = user && bcrypt.compareSync(password, user.password);

//         if (passwordOk) {
//           return user;
//         }

//         return null
//       }
//     })
//   ],
// };

// export async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return false;
//   }
//   const userInfo = await UserInfo.findOne({email:userEmail});
//   if (!userInfo) {
//     return false;
//   }
//   return userInfo.admin;
// }

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }



// import clientPromise from "@/libs/mongoConnect";
// import { UserInfo, User } from "@/models/UserInfo";
// import bcrypt from "bcrypt";
// import * as mongoose from "mongoose";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";

// let isConnected = false;

// async function connectToDatabase() {
//   if (!isConnected) {
//     await mongoose.connect(process.env.MONGO_URL);
//     isConnected = true;
//   }
// }

// export const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: "Email", type: "email", placeholder: "test@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connectToDatabase();
//         const user = await User.findOne({ email: credentials.username });
//         if (user && await bcrypt.compare(credentials.password, user.password)) {
//           return user; // Return the user object if authenticated
//         }
//         return null; // Fail authentication
//       },
//     }),
//   ],
// };

// export async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) return false;

//   const userInfo = await UserInfo.findOne({ email: session.user.email });
//   return userInfo ? userInfo.admin : false;
// }

// export async function getUserInfo(req, res) {
//   const session = await getServerSession(authOptions);
//   if (!session) return res.status(401).json({ message: "Unauthorized" });

//   const user = await User.findOne({ email: session.user.email });
//   if (!user) return res.status(404).json({ message: "User not found" });

//   return res.status(200).json(user); // Return user info
// }

// // Main handler for NextAuth
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST, getUserInfo };

// // Ensure you only allow GET requests here
// export default async function apiHandler(req, res) {
//   switch (req.method) {
//     case 'GET':
//       return await getUserInfo(req, res); // using the correct method
//     default:
//       return res.status(405).json({ message: "Method Not Allowed" });
//   }
// }