import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {User} from "@/models/User";
import {UserInfo} from "@/models/UserInfo";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const {_id, name, image, ...otherUserInfo} = data;

  let filter = {};
  if (_id) {
    filter = {_id};
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = {email};
  }

  const user = await User.findOne(filter);
  await User.updateOne(filter, {name, image});
  await UserInfo.findOneAndUpdate({email:user.email}, otherUserInfo, {upsert:true});

  return Response.json(true);
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
        message: "The user is deleted"
      }
    );
  }
  
  return Response.json([]);
}

/*export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (!_id) {
      return Response.json(
        {
          message: "User not found",
          status: 404,
        },
      );
    }
  }*/

    export async function GET(req) {
      mongoose.connect(process.env.MONGO_URL);
    
      const url = new URL(req.url);
      const _id = url.searchParams.get('_id');
    
      let filterUser = {};
      if (!_id) {
        filterUser = {_id};
      } else {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        if (!email) {
          return Response.json(
            {
              message: "User not found",
              status: 404,
              ok: false
            },
            {
              status: 404,
            }
          );
        }
        filterUser = {email};
      }
    
      const user = await User.findOne(filterUser).lean();
      const userInfo = await UserInfo.findOne({email:user.email}).lean();
    
      return Response.json({...user, ...userInfo});
    
    }