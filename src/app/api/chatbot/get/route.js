// app/ api/chatbot/get/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/app/models/User";

export async function GET(req) {
  try {
    await dbConnect();

    const userId = req.nextUrl.searchParams.get('userId'); // Get the userId from query params

    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), { status: 400 });
    }

    // Fetch the user's chatbot conversations
    const user = await User.findById(userId).select("chatbotConversations");

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user.chatbotConversations), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching chatbot conversations:", error);
    return new Response(JSON.stringify({ message: "Error fetching chatbot conversations" }), { status: 500 });
  }
}