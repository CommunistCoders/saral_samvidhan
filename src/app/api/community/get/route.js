// app/api/community/get/route.js
import dbConnect from "@/lib/dbConnect";
import Community from "@/app/models/Community";
import User from "@/app/models/User";
import dfPost from "@/app/models/dfPost";

export async function GET(req) {
  try {
    await dbConnect();
    
    const communityId = req.nextUrl.searchParams.get('communityId'); // Get the communityId from query params

    if (communityId) {
      // If communityId is provided, fetch only that community
      const community = await Community.findById(communityId)
        .populate('members') // Populate members if a specific community is requested
        .populate('posts');  // Populate posts if a specific community is requested
      
      if (!community) {
        return new Response(JSON.stringify({ message: "Community not found" }), { status: 404 });
      }
      
      return new Response(JSON.stringify(community), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // If no communityId is provided, retrieve all communities without populating members or posts
    const communities = await Community.find();

    return new Response(JSON.stringify(communities), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching community details:", error);
    return new Response(JSON.stringify({ message: "Error fetching community details" }), { status: 500 });
  }
}
