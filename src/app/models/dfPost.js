import mongoose from "mongoose";

const dfPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  location: { type: String },
  imageUrl: { type: String },
  liked: { type: String },
  timestamp: { type: Date, default: Date.now },
  sentimentMetrics: {
    type: Map,
    of: String, // Maps sentiment categories to values (e.g., positive, negative)
    required: true,
    default: {
      "Hate Speech": "negative",             // Default is 'negative' (can change to 'positive' if desired)
      "Harassment and Bullying": "negative", // Default is 'negative'
      "Sexual Content": "negative",          // Default is 'negative'
      "Spam and Scams": "negative"           // Default is 'negative'
    }
  }
});

export default mongoose.models.dfPost || mongoose.model("dfPost", dfPostSchema);
