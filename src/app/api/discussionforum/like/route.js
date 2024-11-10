// app/api/discussionfourm/like/route.js
import dbConnect from "@/lib/dbConnect";
import dfPost from "@/app/models/dfPost";

export async function POST(req) {
    const { postId,userId } = await req.json(); // Accept imageUrl as part of the request  

    try{
        await dbConnect();

        const post = await dfPost.findById(postId);

        // Check if the user already liked the post
        const index = post.likedBy.indexOf(userId);

        if (index === -1) {
            // If not liked, add the user's ID to likedBy
            post.likedBy.push(userId);
          } else {
            // If already liked, remove the user's ID from likedBy
            post.likedBy.splice(index, 1);
          }
        
        await post.save();
      
        return new Response(JSON.stringify({ message: "Post saved successfully" }), { status: 201 });
    } catch (error) {
      console.log("Error saving post:", error);
      return new Response(JSON.stringify({ message: `Error saving post: ${error.message}` }), { status: 500 });
    }
}