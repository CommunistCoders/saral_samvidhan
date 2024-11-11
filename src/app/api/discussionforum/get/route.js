// app/api/discussionforum/get/route.js
import dbConnect from "@/lib/dbConnect";
import dfPost from "@/app/models/dfPost";
import User from "@/app/models/User";

export async function GET(req) {
  try {
    await dbConnect();
    
    const page = parseInt(req.nextUrl.searchParams.get('page')) || 1;
    const limit = parseInt(req.nextUrl.searchParams.get('limit')) || 30;
    const skip = (page - 1) * limit;
    
    const userId = req.nextUrl.searchParams.get('userId');
    const postId = req.nextUrl.searchParams.get('postId');
    const tags = req.nextUrl.searchParams.getAll('tags'); // Get all 'tags' values from query params

    let query = {};

    if (postId) {
      // Fetch only the specified post by ID
      const post = await dfPost.findById(postId).populate('user');
      if (!post) {
        return new Response(JSON.stringify({ message: "Post not found" }), { status: 404 });
      }
      return new Response(JSON.stringify(post), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (userId) {
      query.user = userId;
    }

    // Add a condition to filter posts by tags if the tags array is provided
    if (tags.length > 0) {
      query.tags = { $in: tags }; // Matches any posts containing at least one of the specified tags
    }

    // Fetch posts matching the query and apply pagination
    const posts = await dfPost.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user');

    console.log("posts : ",posts);
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ message: "Error fetching posts" }), { status: 500 });
  }
}
