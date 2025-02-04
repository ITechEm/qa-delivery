import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {Category} from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const {name} = await req.json();
  
    const categoryDoc = await Category.create({name});
    return Response.json(categoryDoc);
 
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const {_id, name} = await req.json();
  await Category.updateOne({_id}, {name});
  // if (await isAdmin()) {
  //   await Category.updateOne({_id}, {name});
  // }
  return Response.json(
    {
      name: name,
      message: "The Category is successfully updated",
    }
  );
}

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  if (name) {
    try {
      const category = await Category.findOne({ name });
      if (!category) {
        return new Response(
          JSON.stringify({ message: "Category not found" }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      return new Response(
        JSON.stringify(category),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Error finding category" }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } else {
    const categories = await Category.find();
    return new Response(
      JSON.stringify(categories),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  // if (await isAdmin()) {
  //   await Category.deleteOne({_id});
  //   return Response.json(
  //     {
  //       message: "The category is deleted"
  //     }
  //   );
  // }else {
  //   return Response.json(
  //     {
  //       message: "You don't have the rights to delete this category",
  //       status: "not Admin"
  //     } 
  //   );
  // }
 if (await Category.deleteOne({_id})) {    // delete a categorie as not an admin
      return Response.json(
        {
          message: "The categorie is deleted"
        }
      );
    }
  return Response.json(true);
}