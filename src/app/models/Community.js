// app/models/Community.js
import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: "https://via.placeholder.com/150" }, // URL for the community image
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }], // Array of users who have joined the community
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "dfPost", default: [] }], // Array of posts in the community
  tags: { type: [String], default: [] }, // Array of tags associated with the community
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Community || mongoose.model("Community", communitySchema);
