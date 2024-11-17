import dbConnect from "@/lib/dbConnect";
import User from "@/app/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { userId, conversationId, prompt, reply } = body;

    console.log("user id:", userId);
    console.log("conversation id:", conversationId);
    console.log({ prompt, reply });

    // Validate request data
    if (!userId || !prompt || !reply) {
      return new Response(
        JSON.stringify({ message: "User ID, prompt, and reply are required" }),
        { status: 400 }
      );
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Ensure conversations exist
    if (!user.chatbotConversations) {
      user.chatbotConversations = [];
    }

    // Find or create the target conversation
    let conversation;
    if (conversationId !== undefined && user.chatbotConversations[conversationId]) {
      conversation = user.chatbotConversations[conversationId];
      // Append the new prompt-reply pair to the conversation
      conversation.push({ prompt, reply });
    } else {
      // If conversation ID is not provided or invalid, create a new conversation
      conversation = [];
      // Append the new prompt-reply pair to the conversation
      conversation.push({ prompt, reply });
      user.chatbotConversations.push(conversation);
    }

    // Save the user document
    await user.save();

    return new Response(
      JSON.stringify({ message: "Prompt and reply saved successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error saving chatbot conversation:", error);
    return new Response(
      JSON.stringify({ message: "Error saving chatbot conversation" }),
      { status: 500 }
    );
  }
}
