// app/api/user/updateAboutMe/route.js
import dbConnect from '@/lib/dbConnect';
import User from '@/app/models/User';

export async function PUT(req) {
  try {
    await dbConnect();

    const { userId, aboutMe } = await req.json(); // Parse the request body

    if (!userId || typeof aboutMe !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid data' }), { status: 400 });
    }

    // Find the user by ID and update their aboutMe field
    const user = await User.findByIdAndUpdate(
      userId,
      { aboutMe },
      { new: true } // Return the updated document
    );

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ aboutMe: user.aboutMe }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

export function GET(req) {
  return new Response(JSON.stringify({ message: 'This route only supports PUT requests.' }), {
    status: 405,
    headers: { "Allow": "PUT" },
  });
}
