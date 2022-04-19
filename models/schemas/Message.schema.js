import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true }
});

export default MessageSchema;
