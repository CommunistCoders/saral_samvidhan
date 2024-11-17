// app/models/User.js
import mongoose from "mongoose";
import dfPost from "./dfPost";
import Community from "./Community";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  profilePhoto: { type: String, default: "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg" }, // URL for the profile photo
  languagePreference: { type: String, default: "English" },
  tags: { type: [String], default: [] }, // Array of tags/interests
  communitiesJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community",default: [] }],    // Array of communities the user has joined
  posts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "dfPost" } // Reference to Post Schema
  ],
  chatbotConversations: {
    type: [
      [
        {
          prompt: { type: String, required: true }, // User input
          reply: { type: String, required: true }   // Chatbot reply
        }
      ]
    ],
    default: [] // Default is an empty array of conversations
  },
  createdAt: { type: Date, default: Date.now }, // Date of account creation
  role: { 
    type: String, 
    enum: ['user', 'admin'], // Only allow 'user' or 'admin'
    default: 'user' // Default role is 'user'
  },
  aboutMe: {
    type: String, // A short bio or description about the user
    default: "This user hasn't added anything about themselves yet." // Default value
  }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
