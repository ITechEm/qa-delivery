import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {User} from "@/models/User";
import mongoose from "mongoose";

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get('_id');

//   if (!userId) {
//     return new Response(
//       JSON.stringify({ message: "User ID is required" }),
//       {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }

//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     const user = await User.findById(userId);
//     if (!user) {
//       return new Response(
//         JSON.stringify({ message: "User not found" }),
//         {
//           status: 404,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     return new Response(
//       JSON.stringify(user),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({ message: "Internal Server Error" }),
//       {    status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } finally {
//     mongoose.connection.close();
//   }
// }

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('_id');

    if (await isAdmin()) {
      if (userId) {
        const user = await User.findById(userId);
        if (!user) {
          return new Response(
            JSON.stringify({ message: "User not found" }),
            {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        return new Response(
          JSON.stringify(user),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } else {
        const users = await User.find();
        return new Response(
          JSON.stringify(users),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } else {
      if (userId) {
        const user = await User.findById(userId);
        if (!user) {
          return new Response(
            JSON.stringify({ message: "User not found" }),
            {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        return new Response(
          JSON.stringify(user),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } else {
        return new Response(
          JSON.stringify({ message: "Unauthorized access" }),
          {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching users", error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await User.deleteOne({_id})) {
    return Response.json(
      {
        message: "The user is deleted",
      }
    );
  }
  
  return Response.json([]);
}