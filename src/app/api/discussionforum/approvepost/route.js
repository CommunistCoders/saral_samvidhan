// /pages/api/discussionforum/approvepost/route.js
import dbConnect from "@/lib/dbConnect";
import dfPost from "@/app/models/dfPost";

export async function POST(req) {
    if (req.method === 'POST') {
      // Extract the postId from the query parameters
      const postId = req.nextUrl.searchParams.get('postId');
        
      console.log("id : ",postId);
      if (!postId) {
        return res.status(400).json({ message: 'Post ID is required' });
      }
  
      try {
        await dbConnect(); // Ensure DB connection
  
        // Find the post by ID and update isReviewed to true
        const post = await dfPost.findByIdAndUpdate(postId, { isReviewed: true }, { new: true });
  
        if (!post) {
          return new Response(JSON.stringify({ message: "Post not found" }), { status: 404 });
        }
  
        return new Response(JSON.stringify({ message: "Post approved successfully" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Error approving post:", error);
        return new Response(JSON.stringify({ message: "Error approving post" }), { status: 500 });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  