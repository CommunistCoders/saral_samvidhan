import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";

export default function NewPost() {
  const { data: session } = useSession(); // Get the current session
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State to hold selected image
  const [newPhoto, setNewPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(file);
      // Set the selected image for preview
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null); // Remove the selected image
  };

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

    const formData = new FormData();
    formData.append('file', newPhoto);


    try {
      //First Uploading
      let response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data1 = await response.json();
      if (response.ok) {
        console.log("data1 :",data1.url);
      } else {
        console.error(data.message);
      }
      //Now uploading the post
      response = await fetch("/api/discussionforum/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId,title, content, location, imageUrl:data1.url }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Post Failed: ${data.message || "Server Error"}`);
        return;
      }

      alert(data.message || "Post created successfully");

      // Clear the form and remove selected image
      setContent("");
      setTitle("");
      setLocation("");
      setSelectedImage(null); // Reset selected image after post creation
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
          <input
            type="text"
            className="w-full p-2 rounded-md bg-gray-700 text-stone-50 focus:outline-none"
            placeholder="what is the title ?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
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

        {/* Image Upload Section */}
        <div>
          <input
            type="file"
            className="w-full p-2 rounded-md bg-gray-700 text-stone-50 focus:outline-none"
            onChange={handleFileChange}
          />
          {selectedImage && (
            <div className="mt-4">
              <img
                src={selectedImage}
                alt="Selected preview"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                Remove Image
              </button>
            </div>
          )}
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
