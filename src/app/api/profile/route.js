import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {User} from "@/models/User";
import {UserInfo} from "@/models/UserInfo";
import { ok } from "assert";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import { userInfo } from "os";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);

  try {
    const data = await req.json();
    const { _id, name, image, ...otherUserInfo } = data;

    let filter = {};
    if (_id) {
      filter = { _id };
    } else {
      const session = await getServerSession(authOptions);
      if (!session) {
        return new Response(
          JSON.stringify({ message: "Unauthorized" }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      const email = session.user.email;
      filter = { email };
    }

    const user = await User.findOne(filter);
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    await User.updateOne(filter, { name, image });
    await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true });

    return new Response(
      JSON.stringify({
        message: "Profile updated successfully",
        user: data,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error updating profile", error: error.message }),
      {status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  let filterUser = {};
  if (_id) {
    filterUser = {_id};
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json(
        {
          message: "The email is not registered in app",
          status: 400,
          ok: false
        },
        {
          status: 400,
        }
      );
    }
    filterUser = {email};
  }

  const user = await User.findOne(filterUser).lean();
  const userInfo = await UserInfo.findOne({email:user.email}).lean();

  return Response.json({...user, ...userInfo});

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