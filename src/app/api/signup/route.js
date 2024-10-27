// src/app/api/signup/route.js
import dbConnect from '@/lib/dbConnect';
import User from '@/app/models/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
  // Parse the incoming request data
  const { name, email, password } = await req.json();

  try {
    // Connect to the database
    await dbConnect();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Return success response
    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ message: 'Error creating user' }), { status: 500 });
  }
}
