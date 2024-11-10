// app/api/discussionfourm/like/route.js
import dbConnect from "@/lib/dbConnect";
import dfPost from "@/app/models/dfPost";

export async function POST(req) {
    const { postId,userId } = await req.json(); // Accept imageUrl as part of the request  

    try{
        await dbConnect();
        
        console.log("post id",postId);
        const post = await dfPost.findById(postId);
        console.log("post : ",post);
        // Check if the user already liked the post
        const index = post.dislikedBy.indexOf(userId);
        console.log("index : ",index);
        if (index === -1) {
            console.log("came here");
            // If not liked, add the user's ID to dislikedBy
            post.dislikedBy.push(userId);
          } else {
            // If already liked, remove the user's ID from dislikedBy
            post.dislikedBy.splice(index, 1);
          }
        
        await post.save();
        console.log("post saved : ",post);
        return new Response(JSON.stringify({ message: "Post saved successfully" }), { status: 201 });
    } catch (error) {
      console.log("Error saving post:", error);
      return new Response(JSON.stringify({ message: `Error saving post: ${postId}` }), { status: 500 });
    }
}