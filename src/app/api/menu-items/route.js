import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {MenuItem} from "@/models/MenuItem";
import mongoose from "mongoose";

// export async function POST(req) {
//   mongoose.connect(process.env.MONGO_URL);
//   const data = await req.json();
//   if (await isAdmin()) {
//     const menuItemDoc = await MenuItem.create(data);
//     return Response.json(menuItemDoc);
//   } else {
//     return Response.json({ message: "Menu item created" },
//       { status: 200 });
//   }
// }

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);

  try {
    const data = await req.json();
    const menuItemDoc = await MenuItem.create(data);

    return new Response(
      JSON.stringify({
        _id: menuItemDoc._id,
        message: "Menu item successfully created",
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error creating menu item", error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);

  try {
    const { _id, ...data } = await req.json();

    if (!_id) {
      return new Response(
        JSON.stringify({ message: "Menu item ID is required" }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(_id, data, { new: true });

    if (!updatedMenuItem) {
      return new Response(
        JSON.stringify({ message: "Menu item not found" }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Menu item successfully updated" }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error updating menu item", error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const name = url.searchParams.get('name');

  try {
    let menuItems;
    if (name) {
      menuItems = await MenuItem.find({ name: new RegExp(name, 'i') }); // Case-insensitive search
    } else {
      menuItems = await MenuItem.find();
    }

    return new Response(
      JSON.stringify(menuItems),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching menu items", error: error.message }),
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
  //activate is admin(when we have the login funtion)
  // if (await isAdmin()) {
  //   await MenuItem.deleteOne({_id});
  // }
  await MenuItem.deleteOne({_id});
  return Response.json(
    { message: "Menu item deleted" },
    { status: 200 }
  );
}