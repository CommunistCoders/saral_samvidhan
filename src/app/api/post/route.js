import dbConnect from "@/lib/dbConnect";
import Post from "@/app/models/Post";

export async function POST(req) {
  const { userId, content, location } = await req.json();

  try {
    await dbConnect();

    // Create a new post
    const newPost = new Post({ user: userId, content, location, timestamp: Date.now() });
    await newPost.save();

    return new Response(JSON.stringify({ message: "Post created successfully" }), { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response(JSON.stringify({ message: "Error creating post" }), { status: 500 });
  }
}

