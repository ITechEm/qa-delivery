import {authOptions, isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {Order} from "@/models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (_id) {
    return Response.json( await Order.findById(_id) );
  }


  if (admin) {
    return Response.json( await Order.find() );
  }

  if (userEmail) {
    return Response.json( await Order.find({userEmail}) );
  }

}

// export async function GET(req) {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);

//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return new Response(
//         JSON.stringify({ message: "Unauthorized" }),
//         {
//           status: 200,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     const userEmail = session.user.email;
//     const admin = await isAdmin(userEmail);

//     const url = new URL(req.url);
//     const _id = url.searchParams.get('_id');

//     if (_id) {
//       const order = await Order.findById(_id);
//       if (!order) {
//         return new Response(
//           JSON.stringify({ message: "Order not found" }),
//           {
//             status: 404,
//             headers: { 'Content-Type': 'application/json' },
//           }
//         );
//       }
//       return new Response(
//         JSON.stringify(order),
//         {
//           status: 200,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     if (admin) {
//       const orders = await Order.find();
//       return new Response(
//         JSON.stringify(orders),
//         {
//           status: 200,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     } else {
//       return new Response(
//         JSON.stringify({ message: "Forbidden" }),
//         {
//           status: 403,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ message: "Error fetching orders", error: error.message }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }
  
// --Set admin for userEmail--
//   if (admin) {
//     return new Response(
//       JSON.stringify(await Order.find()),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }

//   if (userEmail) {
//     return new Response(
//       JSON.stringify(await Order.find({ userEmail })),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }

//   return new Response(
//     JSON.stringify({ message: "Unauthorized" }),
//     {
//       status: 401,
//       headers: { 'Content-Type': 'application/json' },
//     }
//   );
// }

// export async function POST(req) {
//   await mongoose.connect(process.env.MONGO_URL);

//   try {
//     const orderData = await req.json();
//     const newOrder = new Order({
//       ...orderData,
//       createdAt: new Date(),
//     });

//     const savedOrder = await newOrder.save();

//     return new Response(
//       JSON.stringify(
//         {
//           _id: savedOrder._id,
//           message: "Order successfully created",
//         }
//       ),
//       {
//         status: 201,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ message: "Error creating order", error: error.message }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }

// export async function PUT(req) {
//   await mongoose.connect(process.env.MONGO_URL);

//   try {
//     const { _id, ...data } = await req.json();

//     if (!_id) {
//       return new Response(
//         JSON.stringify({ message: "Order ID is required" }),
//         {
//           status: 400,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(_id, data, { new: true });

//     if (!updatedOrder) {
//       return new Response(
//         JSON.stringify({ message: "Order not found" }),
//         {
//           status: 404,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     return new Response(
//       JSON.stringify({
//         message: "Order updated successfully",
//         user: data,
//       }),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ message: "Error updating order", error: error.message }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }

// export async function DELETE(req) {
//   await mongoose.connect(process.env.MONGO_URL);

//   try {
//     const url = new URL(req.url);
//     const _id = url.searchParams.get('_id');

//     if (!_id) {
//       return new Response(
//         JSON.stringify({ message: "Order ID is required" }),
//         {
//           status: 400,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     const deletedOrder = await Order.findByIdAndDelete(_id);

//     if (!deletedOrder) {
//       return new Response(
//         JSON.stringify({ message: "Order not found" }),
//         {
//           status: 404,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     return new Response(
//       JSON.stringify({ message: "Order successfully deleted" }),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ message: "Error deleting order", error: error.message }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }