import { User } from "@/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// Ensure mongoose is connected once when the app starts
async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const pass = body.password;

    // Validate password
    if (!pass || pass.length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(pass, salt);
    
    // Create user
    const createdUser = await User.create(body);
    return Response.json(createdUser);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return Response.json(
      { message: "An error occurred" },
      { status: 500 }
    );
  }
}

  
