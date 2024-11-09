import dbConnect from "@/lib/dbConnect";
import dfPost from "@/app/models/dfPost";
import User from "@/app/models/User";

export async function POST(req) {
  const { userId,title, content, location, imageUrl } = await req.json(); // Accept imageUrl as part of the request

  try {
    await dbConnect();

    console.log("post image : ", imageUrl);  // Log image URL

    // Create a new post with the imageUrl
    const newPost = new dfPost({
      user: userId,
      title,
      content,
      location,
      imageUrl: imageUrl,  // Ensure this field is included
      timestamp: Date.now(),
    });

    console.log("New post before saving:", newPost);  // Log the new post object

    await newPost.save();  // Save the new post

    // Add the new post's ObjectId to the user's posts array
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    user.posts.push(newPost._id);  // Add the new post's ObjectId to the user's posts array
    await user.save();

    return new Response(JSON.stringify({ message: "Post created successfully" }), { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response(JSON.stringify({ message: "Error creating post" }), { status: 500 });
  }
}
