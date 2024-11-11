// app/api/community/deregister/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/app/models/User";
import Community from "@/app/models/Community";

export async function POST(req) {
    try {
        await dbConnect();

        const { userId, communityId } = await req.json();

        // Find the user and community
        const user = await User.findById(userId);
        const community = await Community.findById(communityId);

        if (!user || !community) {
            return new Response(JSON.stringify({ message: "User or Community not found" }), { status: 404 });
        }

        // Remove the community from the user's list if they are currently a member
        user.communitiesJoined = user.communitiesJoined.filter(id => id.toString() !== communityId);
        await user.save();

        // Remove the user from the community's members list
        community.members = community.members.filter(id => id.toString() !== userId);
        await community.save();

        return new Response(JSON.stringify({ message: "Successfully deregistered" }), { status: 200 });
    } catch (error) {
        console.error("Error deregistering user from community:", error);
        return new Response(JSON.stringify({ message: "Error deregistering user" }), { status: 500 });
    }
}
