// src/app/models/dfPost.js
import mongoose from "mongoose";

const dfPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  location: { type: String },
  imageUrl: { type: String }, 
  liked : {type:String},
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.dfPost || mongoose.model("dfPost", dfPostSchema);
