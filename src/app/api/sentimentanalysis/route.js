import dbConnect from "@/lib/dbConnect"; // Connect to your database
import dfPost from "@/app/models/dfPost"; // The post model to save the sentiment metrics

export async function POST(req) {
  const { content, postId } = await req.json(); // Get the content and postId from the request

  try {
    // Simulate sentiment analysis results for the post
    const sentimentMetrics = {
      "Hate Speech": "positive",  // Example metric
      "Harassment and Bullying": "negative",
      "Sexual Content": "negative",
      "Spam and Scams": "positive",
    };

    // Step 1: Connect to the database
    await dbConnect();

    // Step 2: Find the post by ID
    const post = await dfPost.findById(postId);
    if (!post) {
      return new Response(JSON.stringify({ message: "Post not found" }), { status: 404 });
    }

    // Step 3: Update the sentiment metrics for the post
    post.sentimentMetrics = sentimentMetrics;
    await post.save(); // Save the updated post document

    return new Response(
      JSON.stringify({ message: "Sentiment analysis completed and saved", sentimentMetrics }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sentiment analysis:", error);
    return new Response(JSON.stringify({ message: "Error during sentiment analysis" }), { status: 500 });
  }
}
