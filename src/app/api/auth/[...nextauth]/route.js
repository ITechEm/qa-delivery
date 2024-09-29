import clientPromise from "@/libs/mongoConnect";
import { UserInfo } from "@/models/UserInfo";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from '@/models/User';
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

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
//         // Check for null pointer references
//         if (!credentials || !credentials.email || !credentials.password) {
//           return null;
//         }

//         const { email, password } = credentials;

//         // Connect to database
//         try {
//           await mongoose.connect(process.env.MONGO_URL);
//         } catch (error) {
//           console.error('Error while connecting to database:', error);
//           return null;
//         }

//         // Find the user
//         try {
//           const user = await User.findOne({ email });
//           if (!user) {
//             return null;
//           }

//           // Compare password
//           const passwordValid = await bcrypt.compare(password, user.password);
//           if (!passwordValid) {
//             return null;
//           }

//           // Return user if authentication is successful
//           return user;
//         } catch (error) {
//           console.error('Error while authenticating:', error);
//           return null;
//         }
//       }
//     })
//   ],
// };


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


// export async function POST(req) {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     const { credentials } = await req.json();
//     if (!credentials || !credentials.email || !credentials.password) {
//       return Response.json(
//         { message: "Email or password invalid" },
//         { status: 400 }
//       );
//     }

//     // Check for unhandled exceptions
//     const user = await User.findOne({ email: credentials.email });
//     if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
//       return Response.json(
//         { message: "Email or password invalid" },
//         { status: 400 }
//       );
//     }

//     // Check for null pointer references
//     if (!user) {
//       return Response.json(
//         { message: "User is not found" },
//         { status: 400 }
//       );
//     }

//     // Return user if authentication is successful
//     const response = await NextAuth(authOptions).callback(req, null);
//     if (response.ok) {
//       await setLoginInProgress(true);
//     } else {
//       await setError(true);
//     }

//     return Response.json({ loginInProgress: await getLoginInProgress() });
//   } catch (error) {
//     console.error(error);
//     if (error.message === "No session found") {
//       return Response.json(
//         { message: "Session is not found" },
//         { status: 400 }
//       );
//     }
//     if (error.message === "No user found") {
//       return Response.json(
//         { message: "User is not found" },
//         { status: 400 }
//       );
//     }
//     return Response.json(
//       { message: "An unexpected error occurred" },
//       { status: 500 }
//     );
//   }
// }







/////////////////////////////////////////////////////////////



// export async function POST(req) {
//   try {
//     const { credentials } = await req.body;

//     // Check for null pointer references
//     if (!credentials || !credentials.email || !credentials.password) {
//       throw new Error("Email or password invalid");
//     }

//     // Connect to database
//     await connectToDatabase();

//     // Check for unhandled exceptions
//     const user = await User.findOne({ email: credentials.email });
//     if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
//       throw new Error("Email or password invalid");
//     }

//     // Return user if authentication is successful
//     return;

//   } catch (error) {
//     // Log the error for debugging
//     console.error(error);

//     // Return a more generic error message
//     return Response.json(
//       { message: "Oh no, something went wrong" },
//       { status: 400 }
//     );
//   }
// }
















// let isConnected = false;

// async function connectToDatabase() {
//   if (!isConnected) {
//     await mongoose.connect(process.env.MONGO_URL);
//     isConnected = true;
//   }
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



let isConnected = false;

async function connectToDatabase() {
  try {
    if (!isConnected && process.env.MONGO_URL) {
      await mongoose.connect(process.env.MONGO_URL);
      isConnected = true;
    }
  } catch (error) {
    console.error('Error while connecting to database:', error);
    isConnected = false;
  }
}

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.username || !credentials.password) {
            return null; // Fail authentication
          }

          await connectToDatabase();
          const user = await User.findOne({ email: credentials.username });
          if (!user) {
            console.error('User not found:', credentials.username);
            return null; // Fail authentication
          }

          const passwordOk = await bcrypt.compare(credentials.password, user.password);
          if (!passwordOk) {
            console.error('Password invalid:', credentials.username);
            return null; // Fail authentication
          }

          return user; // Return the user object if authenticated
        } catch (error) {
          console.error('Error while authenticating:', error);
          return null; // Fail authentication
        }
      },
    }),
  ],
};

export async function isAdmin() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return false;
    }

    const userInfo = await UserInfo.findOne({ email: session.user.email });
    if (!userInfo) {
      return false;
    }

    return userInfo.admin;
  } catch (error) {
    console.error('Error while checking admin status:', error);
    return false;
  }
}

export async function getUserInfo(req, res) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const email = session.user.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user); // Return user info
  } catch (error) {
    console.error('Error while getting user info:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Main handler for NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, getUserInfo };

// Ensure you only allow GET requests here
export default async function apiHandler(req, res) {
  if (!req || !res) {
    console.error('apiHandler: null pointer references');
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  switch (req.method) {
    case 'GET':
      try {
        return await getUserInfo(req, res); // using the correct method
      } catch (error) {
        console.error('apiHandler: unhandled exception', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
