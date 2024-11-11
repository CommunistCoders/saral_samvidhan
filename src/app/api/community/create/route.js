import dbConnect from "@/lib/dbConnect";
import dfPost from "@/app/models/dfPost";
import User from "@/app/models/User";
import Community from "@/app/models/Community";

export async function POST(req) {
  const { name, description, imageUrl,userId, tags  } = await req.json(); // Accept imageUrl as part of the request

  try {
    await dbConnect();
    
    let members = [];
    members.push(userId);    

    // Create a new Community
    const newCommunity = new Community({
        name : name,
        description : description,
        imageUrl: imageUrl,  
        members : members,
        tags : tags,
        timestamp: Date.now()
    });

    console.log("New Community before saving:", newCommunity);  // Log the new post object

    await newCommunity.save();  // Save the new post

    // Add the new community ObjectId to the user's community array
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    user.communitiesJoined.push(newCommunity._id);  // Add the new post's ObjectId to the user's posts array
    await user.save();

    return new Response(JSON.stringify({ message: "Community created successfully" }), { status: 201 });
  } catch (error) {
    console.error("Error creating community:", error);
    return new Response(JSON.stringify({ message: "Error creating community" }), { status: 500 });
  }
}
