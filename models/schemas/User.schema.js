import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"]
  },
  password: { type: String, required: true },
  createdAt: { type: String },
  updatedAt: { type: String },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
});
UserSchema.index({ email: 1, firstname: 1 });

export default UserSchema;