// src/app/api/signup/route.js
import dbConnect from '@/lib/dbConnect';
import User from '@/app/models/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { email, password, username } = await req.json();

  try {
    await dbConnect();
    console.log("Database connected successfully"); // Log for connection success

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully"); // Log for password hashing

    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();
    console.log("User created successfully:", newUser); // Log for user creation

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    console.error("Detailed Error:", error); // Log the full error for debugging
    return new Response(JSON.stringify({ message: `Error creating user: ${error.message}` }), { status: 500 });
  }
}
