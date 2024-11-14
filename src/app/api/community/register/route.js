// app/api/community/register/route.js
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

        // Add community to the user's list if not already joined
        if (!user.communitiesJoined.includes(communityId)) {
            user.communitiesJoined.push(communityId);
            await user.save();
        }

        // Add user to the community's member list if not already a member
        if (!community.members.includes(userId)) {
            community.members.push(userId);
            await community.save();
        }

        return new Response(JSON.stringify({ message: "Successfully registered" }), { status: 200 });
    } catch (error) {
        console.error("Error registering user to community:", error);
        return new Response(JSON.stringify({ message: "Error registering user" }), { status: 500 });
    }
}
