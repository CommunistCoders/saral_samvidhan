// src/app/api/signup/route.js
import dbConnect from '@/lib/dbConnect';
import User from '@/app/models/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { email, password, username } = await req.json();

  try {
    await dbConnect();
    console.log("Database connected successfully");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    // Set default profilePhoto manually if not provided
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      profilePhoto: "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg", // Default profile photo URL
      role:"admin"
    });

    console.log("new User : ",newUser);
    // Save the user
    await newUser.save();

    console.log("User created successfully:", newUser);
    console.log("Assigned profilePhoto URL:", newUser.profilePhoto);

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    console.error("Detailed Error:", error);
    return new Response(JSON.stringify({ message: `Error creating user: ${error.message}` }), { status: 500 });
  }
}
