import { User } from "@/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { userName, password, email } = body; // Extract email and password
    const isEmailValid = /\S+@\S+\.\S+/.test(email);

    // Validate username
    if (!userName || userName.length < 3) { // Assuming minimum length of 3 for username
      return Response.json(
        { message: "Username must be at least 3 characters" },
        { status: 400 }
      );
    }

    // Validate email
    if (!isEmailValid) {
      return Response.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password
    if (!password || password.length < 6 ) {
      return Response.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }
    if (!password ||password.length > 12) {
      return Response.json(
        { message: "Password must be at most 12 characters" },
        { status: 400 }
      );
    }
   
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(password, salt);
    
    // Create user
    const createdUser = await User.create(body);
    return Response.json(createdUser);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return Response.json(
      { message: "The user is already registered" }, // More generic error message
      { status: 400 }
    );
  }
}

  
