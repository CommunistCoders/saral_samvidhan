// src/app/api/discussionforum/get/route.js
import dbConnect from "@/lib/dbConnect";
import Post from "@/app/models/Post";

export async function GET(req) {
    try {
      await dbConnect();
      
      const page = parseInt(req.nextUrl.searchParams.get('page')) || 1;
      const limit = parseInt(req.nextUrl.searchParams.get('limit')) || 3;
      const skip = (page - 1) * limit;
  
      const posts = await Post.find().sort({ timestamp: -1 }).skip(skip).limit(limit);
  
      return new Response(JSON.stringify(posts), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return new Response(JSON.stringify({ message: "Error fetching posts" }), { status: 500 });
    }
  }
  