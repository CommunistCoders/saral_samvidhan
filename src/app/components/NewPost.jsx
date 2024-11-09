//New Post for Discussion Forum
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function NewPost() {
  const { data: session } = useSession(); // Get the current session
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if the user is logged in
    if (!session) {
      alert("You must be logged in to create a post.");
      setIsSubmitting(false);
      return;
    }

    const userId = session.user.id; // Assuming user ID is stored here in session

    try {
      const response = await fetch("/api/discussionforum/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, content, location }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Post Failed: ${data.message || "Server Error"}`);
        return;
      }

      alert(data.message || "Post created successfully");

      // Clear the form
      setContent("");
      setLocation("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-stone-50">
      <h2 className="text-lg font-bold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            className="w-full p-2 rounded-md bg-gray-700 text-stone-50 focus:outline-none"
            rows="4"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-gray-700 text-stone-50 focus:outline-none"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-amber-600 rounded-md text-stone-50 hover:bg-amber-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}
