import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  telegramChatId: {
    type: String,
    required: true,
    unique: true,
  },
  threadId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Thread", threadSchema);