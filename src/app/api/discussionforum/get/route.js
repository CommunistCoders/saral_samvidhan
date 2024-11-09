// src/app/api/discussionforum/get/route.js
import dbConnect from "@/lib/dbConnect";
import dfPost from "@/app/models/dfPost";

export async function GET(req) {
  try {
    await dbConnect();
    
    const page = parseInt(req.nextUrl.searchParams.get('page')) || 1;
    const limit = parseInt(req.nextUrl.searchParams.get('limit')) || 3;
    const skip = (page - 1) * limit;
    
    const userId = req.nextUrl.searchParams.get('userId'); // Get the userId from query params

    let query = {}; // Initialize an empty query object
    if (userId) {
      query.user = userId; // If userId is provided, filter posts by userId
    }

    // Fetch posts and populate the user field with the actual user document
    const posts = await dfPost.find(query) // Use the query to filter posts by userId
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user'); // Populate the user field with the User object
    
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ message: "Error fetching posts" }), { status: 500 });
  }
}
