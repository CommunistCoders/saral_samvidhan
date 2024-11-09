import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  profilePhoto: { type: String, default: "" }, // URL for the profile photo
  languagePreference: { type: String, default: "English" },
  tags: { type: [String], default: [] }, // Array of tags/interests
  communitiesJoined: { type: [String], default: [] }, // Array of communities the user has joined
  posts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "dfPost" } // Reference to Post Schema
  ],
  createdAt: { type: Date, default: Date.now } // Date of account creation
});

export default mongoose.models.User || mongoose.model("User", userSchema);
