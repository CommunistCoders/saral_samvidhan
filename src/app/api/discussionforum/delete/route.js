// app/api/discussionforum/delete/route.js
import dbConnect from "@/lib/dbConnect";
import dfPost from "@/app/models/dfPost";

export async function DELETE(req) {
  try {
    await dbConnect();

    // Extract the postId from the query parameters
    const postId = req.nextUrl.searchParams.get('postId');
    
    if (!postId) {
      return new Response(JSON.stringify({ message: "Post ID is required" }), { status: 400 });
    }

    // Try to find and delete the post by its ID
    const post = await dfPost.findByIdAndDelete(postId);
    
    if (!post) {
      return new Response(JSON.stringify({ message: "Post not found" }), { status: 404 });
    }

    // If the post was found and deleted
    return new Response(JSON.stringify({ message: "Post deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response(JSON.stringify({ message: "Error deleting post" }), { status: 500 });
  }
}
