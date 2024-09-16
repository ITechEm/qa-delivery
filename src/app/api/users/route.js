import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {User} from "@/models/User";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
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